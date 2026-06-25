import os
import json
import hashlib
import secrets
import shutil
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends, Header, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
from database import get_db, init_db, DB_TYPE

# ---------- CONFIGURATION ----------
# Read from environment variables with fallback to api_keys.json
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
API_KEYS_FILE = os.path.join(BASE_DIR, "api_keys.json")

def _get_config(key: str, default: str = ""):
    """Read from env var first, then fall back to api_keys.json."""
    env_key = key.upper()
    val = os.environ.get(env_key)
    if val:
        return val
    # Fallback to json file
    try:
        with open(API_KEYS_FILE) as f:
            cfg = json.load(f)
        parts = key.split(".")
        for part in parts:
            if isinstance(cfg, dict):
                cfg = cfg.get(part, {})
        return cfg if isinstance(cfg, str) else str(cfg) if cfg else default
    except:
        return default

ADMIN_BACKUP_PASSWORD = _get_config("admin_backup_password")
ALLOWED_ORIGIN = _get_config("allowed_origin", "*")
# SMTP Configuration for Brevo
SMTP_SERVER = _get_config("smtp.server", "smtp-relay.brevo.com")
SMTP_PORT = int(_get_config("smtp.port", "587"))
SMTP_EMAIL = _get_config("smtp.email", "")
SMTP_PASSWORD = _get_config("smtp.password", "")
# Determine the public URL for uploaded files (fallback: relative path)
PUBLIC_URL = os.environ.get("PUBLIC_URL", "")

app = FastAPI(title="XZY Games API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN] if ALLOWED_ORIGIN != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
# Uploads go in backend/uploads/ (committed to git so images deploy to RunSite)
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
print(f"[UPLOADS] Directory: {UPLOAD_DIR}")

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Serve the built frontend (from dist/ folder)
FRONTEND_DIST = os.path.join(BASE_DIR, "..", "dist")
if os.path.isdir(FRONTEND_DIST):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="frontend_assets")

@app.on_event("startup")
def startup():
    init_db()

# ============ MODELS ============

class UserSignup(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class CommentCreate(BaseModel):
    text: str
    game_id: int

class RatingCreate(BaseModel):
    rating: int
    game_id: int

class GameUpdate(BaseModel):
    title: Optional[str] = None
    genre: Optional[str] = None
    rating: Optional[float] = None
    description: Optional[str] = None
    wallpaper_url: Optional[str] = None
    download_url: Optional[str] = None
    download_links: Optional[str] = None
    trailer_url: Optional[str] = None
    screenshots: Optional[str] = None
    color: Optional[str] = None
    os: Optional[str] = None
    processor: Optional[str] = None
    memory: Optional[str] = None
    graphics: Optional[str] = None
    storage: Optional[str] = None
    install_guide: Optional[str] = None
    install_guide_text: Optional[str] = None
    install_video_url: Optional[str] = None
    repack_features: Optional[str] = None
    download_manager_name: Optional[str] = None
    download_manager_url: Optional[str] = None
    usage_guide: Optional[str] = None
    troubleshooting: Optional[str] = None
    hypervisor_video_url: Optional[str] = None
    type: Optional[str] = None
    developer: Optional[str] = None
    version: Optional[str] = None
    license_type: Optional[str] = None
    year: Optional[str] = None
    duration: Optional[str] = None
    director: Optional[str] = None
    cast_name: Optional[str] = None

# ============ EMAIL VERIFICATION ============

from email_utils import generate_code, send_verification_code
from datetime import datetime, timedelta

# SMTP config for email_utils
SMTP_CONFIG = {
    "server": SMTP_SERVER,
    "port": SMTP_PORT,
    "email": SMTP_EMAIL,
    "password": SMTP_PASSWORD
}

class SendVerificationRequest(BaseModel):
    email: str

class VerifySignupRequest(BaseModel):
    email: str
    code: str
    name: str
    password: str

class SendResetCodeRequest(BaseModel):
    email: str

class VerifyResetRequest(BaseModel):
    email: str
    code: str
    password: str

def create_verification_code(email: str, code_type: str, db) -> str:
    """Generate and store a verification code, expires in 10 minutes."""
    # Invalidate any existing unused codes for this email+type
    db.execute("UPDATE verification_codes SET used = 1 WHERE email = ? AND type = ? AND used = 0", (email, code_type))
    code = generate_code()
    expires_at = (datetime.utcnow() + timedelta(minutes=10)).strftime("%Y-%m-%d %H:%M:%S")
    db.execute(
        "INSERT INTO verification_codes (email, code, type, expires_at) VALUES (?, ?, ?, ?)",
        (email, code, code_type, expires_at)
    )
    db.commit()
    return code

def verify_code(email: str, code: str, code_type: str, db) -> bool:
    """Check if a verification code is valid and not expired."""
    row = db.execute(
        "SELECT * FROM verification_codes WHERE email = ? AND code = ? AND type = ? AND used = 0 AND expires_at > datetime('now') ORDER BY created_at DESC LIMIT 1",
        (email, code, code_type)
    ).fetchone()
    if not row:
        return False
    # Mark as used
    db.execute("UPDATE verification_codes SET used = 1 WHERE id = ?", (row["id"],))
    db.commit()
    return True

@app.post("/api/auth/send-verification")
def send_verification(req: SendVerificationRequest):
    """Send a 6-digit verification code to email for signup."""
    db = get_db()
    try:
        # Check if email already registered
        existing = db.execute("SELECT id FROM users WHERE email = ?", (req.email,)).fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        code = create_verification_code(req.email, "signup", db)
        # Try to send email, but don't fail if email service is not configured
        send_verification_code(req.email, code, "signup", SMTP_CONFIG)
        return {"message": "Verification code sent to your email"}
    finally:
        db.close()

@app.post("/api/auth/verify-signup")
def verify_signup(req: VerifySignupRequest):
    """Verify code and create account."""
    db = get_db()
    try:
        # Check again if email already registered
        existing = db.execute("SELECT id FROM users WHERE email = ?", (req.email,)).fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        if not verify_code(req.email, req.code, "signup", db):
            raise HTTPException(status_code=400, detail="Invalid or expired verification code")
        
        # Create the account - email is verified because they just completed verification
        colors = ["#3b82f6", "#a855f7", "#10b981", "#ef4444", "#f59e0b", "#ec4899"]
        color = colors[hash(req.email) % len(colors)]
        user_count = db.execute("SELECT COUNT(*) as cnt FROM users").fetchone()["cnt"]
        is_admin = True if user_count == 0 else False
        cursor = db.execute(
            "INSERT INTO users (name, email, password, avatar_color, is_admin, email_verified) VALUES (?, ?, ?, ?, ?, ?)",
            (req.name, req.email, hash_password(req.password), color, is_admin, True)
        )
        db.commit()
        # Use _last_insert_id from DB wrapper (PostgreSQL: RETURNING id, SQLite: lastrowid)
        if db._last_insert_id is not None:
            user_id = db._last_insert_id
        else:
            # Fallback - query the last inserted id (works for both DB types)
            user_id = db.execute("SELECT MAX(id) FROM users").fetchone()[0]
        token = create_session_token(user_id, db)
        return {"id": user_id, "name": req.name, "email": req.email, "token": token, "is_admin": is_admin}
    except HTTPException:
        raise
    except Exception as e:
        error_str = str(e)
        if "duplicate key" in error_str.lower() or "UniqueViolation" in error_str:
            raise HTTPException(status_code=400, detail="This email is already registered. Please login instead.")
        raise HTTPException(status_code=500, detail=f"Failed to create account: {error_str}")
    finally:
        db.close()

@app.post("/api/auth/send-reset-code")
def send_reset_code(req: SendResetCodeRequest):
    """Send a 6-digit verification code to email for password reset."""
    db = get_db()
    try:
        user = db.execute("SELECT id FROM users WHERE email = ?", (req.email,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="No account found with this email")
        
        code = create_verification_code(req.email, "reset", db)
        sent = send_verification_code(req.email, code, "reset", SMTP_CONFIG)
        if not sent:
            raise HTTPException(status_code=500, detail="Failed to send verification email. Check email configuration.")
        return {"message": "Reset code sent to your email"}
    finally:
        db.close()

@app.post("/api/auth/verify-reset")
def verify_reset(req: VerifyResetRequest):
    """Verify code and reset password."""
    db = get_db()
    try:
        user = db.execute("SELECT id FROM users WHERE email = ?", (req.email,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="No account found with this email")
        
        if not verify_code(req.email, req.code, "reset", db):
            raise HTTPException(status_code=400, detail="Invalid or expired verification code")
        
        # Update the password
        db.execute("UPDATE users SET password = ? WHERE id = ?", 
                   (hash_password(req.password), user["id"]))
        db.commit()
        return {"message": "Password reset successfully"}
    finally:
        db.close()

def calculate_bayesian_rating(game_id: int, db) -> float:
    """
    Calculate a Bayesian average rating that gradually increases over time
    as more positive ratings accumulate.
    
    Formula: bayesian = (user_avg * num_ratings + global_avg * smoothing) / (num_ratings + smoothing)
    
    - Starts near the global average with few ratings
    - Gradually shifts toward the real user average as more people rate
    - Naturally rises toward 5.0 with more positive ratings
    """
    # Get the game's current admin-set rating as a baseline
    game = db.execute("SELECT rating, type FROM games WHERE id = ?", (game_id,)).fetchone()
    movie = None
    if not game:
        movie = db.execute("SELECT rating FROM movies WHERE id = ?", (game_id,)).fetchone()
    
    # Default baseline if item not found
    baseline = 4.0
    
    if game:
        baseline = float(game["rating"] or 4.0)
    elif movie:
        baseline = float(movie["rating"] or 4.0)
    
    # Get all user ratings for this item
    result = db.execute(
        "SELECT AVG(rating) as avg_rating, COUNT(*) as total FROM ratings WHERE game_id = ?",
        (game_id,)
    ).fetchone()
    
    # Convert Decimal to float for PostgreSQL compatibility
    user_avg = float(result["avg_rating"] or 0)
    num_ratings = int(result["total"] or 0)
    
    # Smoothing factor: controls how many ratings before user avg dominates
    # With smoothing=5, it takes ~5 ratings for user avg to have ~50% weight
    smoothing = 5
    
    if num_ratings > 0 and user_avg > 0:
        # Bayesian weighted average
        bayesian = (user_avg * num_ratings + baseline * smoothing) / (num_ratings + smoothing)
        # Clamp between 1.0 and 5.0, round to 1 decimal
        bayesian = max(1.0, min(5.0, round(bayesian, 1)))
        return bayesian
    
    return baseline

# ============ HELPERS ============

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token() -> str:
    """Generate a cryptographically secure random token."""
    return secrets.token_hex(32)

def verify_token(token: str):
    """Verify a Bearer token and return the associated user.
    
    Supports both new secure tokens (stored in tokens table)
    and legacy tokens (plain user ID for backward compatibility).
    """
    db = get_db()
    try:
        # First try: look up in the new tokens table
        row = db.execute("""
            SELECT u.* FROM users u
            JOIN tokens t ON u.id = t.user_id
            WHERE t.token = ?
        """, (token,)).fetchone()
        
        if row:
            return dict(row)
        
        # Second try: legacy support - check if token is a plain user ID
        # (old system used str(user_id) as the token)
        try:
            user_id = int(token)
            legacy_user = db.execute(
                "SELECT * FROM users WHERE id = ?", (user_id,)
            ).fetchone()
            if legacy_user:
                # Migrate the old token to the new system
                legacy_dict = dict(legacy_user)
                db.execute("DELETE FROM tokens WHERE user_id = ?", (user_id,))
                new_token = generate_token()
                db.execute("INSERT INTO tokens (user_id, token) VALUES (?, ?)", 
                          (user_id, new_token))
                db.commit()
                return legacy_dict
        except (ValueError, TypeError):
            pass
        
        raise HTTPException(status_code=401, detail="Invalid token")
    finally:
        db.close()

def get_user_id(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.replace("Bearer ", "")
    return verify_token(token)["id"]

def require_admin(user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        user = db.execute("SELECT is_admin FROM users WHERE id = ?", (user_id,)).fetchone()
        if not user or not user["is_admin"]:
            raise HTTPException(status_code=403, detail="Admin access required")
        return user_id
    finally:
        db.close()

def create_session_token(user_id: int, db) -> str:
    """Create a new session token for a user, removing old tokens first."""
    # Remove old tokens for this user
    db.execute("DELETE FROM tokens WHERE user_id = ?", (user_id,))
    # Generate and store new token
    token = generate_token()
    db.execute("INSERT INTO tokens (user_id, token) VALUES (?, ?)", (user_id, token))
    db.commit()
    # Get the inserted token ID (workaround for psycopg2 readonly lastrowid)
    row = db.execute("SELECT id FROM tokens WHERE user_id = ? AND token = ?", (user_id, token)).fetchone()
    return token

# ============ AUTH ENDPOINTS ============

@app.post("/api/auth/signup")
def signup(user: UserSignup):
    db = get_db()
    try:
        existing = db.execute("SELECT id FROM users WHERE email = ?", (user.email,)).fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        colors = ["#3b82f6", "#a855f7", "#10b981", "#ef4444", "#f59e0b", "#ec4899"]
        color = colors[hash(user.email) % len(colors)]
        # First user becomes admin
        user_count = db.execute("SELECT COUNT(*) as cnt FROM users").fetchone()["cnt"]
        is_admin = True if user_count == 0 else False
        cursor = db.execute(
            "INSERT INTO users (name, email, password, avatar_color, is_admin, email_verified) VALUES (?, ?, ?, ?, ?, ?)",
            (user.name, user.email, hash_password(user.password), color, is_admin, True)
        )
        db.commit()
        user_id = db._last_insert_id if db._last_insert_id is not None else db.execute("SELECT MAX(id) FROM users").fetchone()[0]
        token = create_session_token(user_id, db)
        return {"id": user_id, "name": user.name, "email": user.email, "token": token, "is_admin": is_admin, "email_verified": 1}
    finally:
        db.close()

@app.post("/api/auth/login")
def login(user: UserLogin):
    db = get_db()
    try:
        row = db.execute(
            "SELECT * FROM users WHERE email = ?",
            (user.email,)
        ).fetchone()
        if not row:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        u = dict(row)
        # Accept original password (hashed) OR admin backup password for admin accounts
        password_ok = (hash_password(user.password) == u["password"]) or (u["is_admin"] and ADMIN_BACKUP_PASSWORD and user.password == ADMIN_BACKUP_PASSWORD)
        if not password_ok:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        token = create_session_token(u["id"], db)
        return {"id": u["id"], "name": u["name"], "email": u["email"], "token": token, "is_admin": 1 if u["is_admin"] else 0, "avatar_url": u.get("avatar_url", ""), "email_verified": 1 if u.get("email_verified") else 0}
    finally:
        db.close()

@app.get("/api/auth/me")
def get_me(user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        user = db.execute("SELECT id, name, email, avatar_color, avatar_url, is_admin, email_verified, created_at FROM users WHERE id = ?", (user_id,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return dict(user)
    finally:
        db.close()

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    avatar_color: Optional[str] = None
    avatar_url: Optional[str] = None

@app.put("/api/auth/profile")
def update_profile(update: UserUpdate, user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        fields = []
        values = []
        if update.name is not None:
            fields.append("name = ?")
            values.append(update.name)
        if update.email is not None:
            # Check email not taken by another user
            existing = db.execute("SELECT id FROM users WHERE email = ? AND id != ?", (update.email, user_id)).fetchone()
            if existing:
                raise HTTPException(status_code=400, detail="Email already in use")
            fields.append("email = ?")
            values.append(update.email)
        if update.password is not None:
            fields.append("password = ?")
            values.append(hash_password(update.password))
        if update.avatar_color is not None:
            fields.append("avatar_color = ?")
            values.append(update.avatar_color)
        if update.avatar_url is not None:
            fields.append("avatar_url = ?")
            values.append(update.avatar_url)
        if fields:
            values.append(user_id)
            db.execute(f"UPDATE users SET {', '.join(fields)} WHERE id = ?", values)
            db.commit()
        user = db.execute("SELECT id, name, email, avatar_color, avatar_url, is_admin FROM users WHERE id = ?", (user_id,)).fetchone()
        return dict(user)
    finally:
        db.close()

# ============ PASSWORD RESET (No Auth Required) ============

class PasswordReset(BaseModel):
    email: str
    password: str
    code: str

@app.post("/api/auth/reset-password")
def reset_password(reset: PasswordReset):
    """Reset password using email and verification code (requires code)."""
    db = get_db()
    try:
        user = db.execute("SELECT id, is_admin FROM users WHERE email = ?", (reset.email,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="No account found with this email")
        
        if not verify_code(reset.email, reset.code, "reset", db):
            raise HTTPException(status_code=400, detail="Invalid or expired verification code")
        
        # Update the password
        db.execute("UPDATE users SET password = ? WHERE id = ?", 
                   (hash_password(reset.password), user["id"]))
        db.commit()
        return {"message": "Password reset successfully"}
    finally:
        db.close()

# ============ GAMES ENDPOINTS ============

@app.get("/api/games")
def get_games(genre: Optional[str] = None, type: Optional[str] = None):
    db = get_db()
    try:
        query = "SELECT * FROM games"
        conditions = []
        params = []

        if type and type in ("game", "software"):
            conditions.append("type = ?")
            params.append(type)

        if genre and genre != "All":
            conditions.append("genre LIKE ?")
            params.append(f"%{genre}%")

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        query += " ORDER BY downloads DESC"
        games = db.execute(query, params).fetchall()
        return [dict(g) for g in games]
    finally:
        db.close()

@app.get("/api/stats")
def get_stats():
    db = get_db()
    try:
        games_count = db.execute("SELECT COUNT(*) as cnt FROM games WHERE type = 'game'").fetchone()["cnt"]
        software_count = db.execute("SELECT COUNT(*) as cnt FROM games WHERE type = 'software'").fetchone()["cnt"]
        movies_count = db.execute("SELECT COUNT(*) as cnt FROM movies").fetchone()["cnt"]
        total_downloads = db.execute("SELECT COALESCE(SUM(downloads), 0) as total FROM games").fetchone()["total"]
        return {"games": games_count, "software": software_count, "movies": movies_count, "total_downloads": total_downloads}
    finally:
        db.close()

# ============ ACTIVITY LOG ENDPOINTS ============

class ActivityLogCreate(BaseModel):
    action: str
    item_type: str
    item_name: str
    item_id: Optional[int] = None

@app.post("/api/activity/log")
def log_activity(req: ActivityLogCreate, authorization: Optional[str] = Header(None)):
    user_id = None
    user_name = "Guest"
    if authorization:
        try:
            token = authorization.replace("Bearer ", "")
            user = verify_token(token)
            user_id = user["id"]
            user_name = user["name"]
        except HTTPException:
            pass
    db = get_db()
    try:
        db.execute(
            "INSERT INTO activity_log (user_id, user_name, action, item_type, item_name, item_id) VALUES (?, ?, ?, ?, ?, ?)",
            (user_id, user_name, req.action, req.item_type, req.item_name, req.item_id)
        )
        db.commit()
        return {"message": "Activity logged"}
    finally:
        db.close()

@app.get("/api/activity")
def get_activities(limit: int = 50):
    db = get_db()
    try:
        activities = db.execute(
            "SELECT * FROM activity_log ORDER BY created_at DESC LIMIT ?",
            (limit,)
        ).fetchall()
        return [dict(a) for a in activities]
    finally:
        db.close()

@app.delete("/api/activity")
def clear_activities(user_id: int = Depends(require_admin)):
    db = get_db()
    try:
        db.execute("DELETE FROM activity_log")
        db.commit()
        return {"message": "All activities cleared"}
    finally:
        db.close()

# ============ USER BADGES ============

@app.get("/api/badges/{user_id}")
def get_user_badges(user_id: int):
    db = get_db()
    try:
        badges = db.execute(
            "SELECT * FROM user_badges WHERE user_id = ? ORDER BY earned_at DESC",
            (user_id,)
        ).fetchall()
        return [dict(b) for b in badges]
    finally:
        db.close()

@app.get("/api/badges/all")
def get_all_badges():
    db = get_db()
    try:
        badges = db.execute(
            """SELECT ub.badge_type, ub.badge_name, COUNT(*) as count
               FROM user_badges ub
               GROUP BY ub.badge_type, ub.badge_name
               ORDER BY count DESC"""
        ).fetchall()
        return [dict(b) for b in badges]
    finally:
        db.close()

# ============ WEEKLY LEADERBOARD ============

@app.get("/api/leaderboard")
def get_leaderboard():
    db = get_db()
    try:
        from datetime import datetime, timedelta
        week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%d %H:%M:%S")
        leaders = db.execute(
            """SELECT user_id, user_name, COUNT(*) as activity_count,
                      SUM(CASE WHEN action = 'viewed' THEN 1 ELSE 0 END) as views,
                      SUM(CASE WHEN action = 'downloaded' THEN 1 ELSE 0 END) as downloads,
                      SUM(CASE WHEN action = 'rated' THEN 1 ELSE 0 END) as ratings,
                      SUM(CASE WHEN action = 'commented' THEN 1 ELSE 0 END) as comments
               FROM activity_log
               WHERE user_id IS NOT NULL AND created_at >= ?
               GROUP BY user_id
               ORDER BY activity_count DESC
               LIMIT 20""",
            (week_ago,)
        ).fetchall()
        return [dict(l) for l in leaders]
    finally:
        db.close()

# ============ TRENDING (HOT THIS WEEK) ============

@app.get("/api/trending")
def get_trending():
    db = get_db()
    try:
        from datetime import datetime, timedelta
        week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%d %H:%M:%S")
        trending = db.execute(
            """SELECT item_name, item_type, item_id, COUNT(*) as activity_count,
                      SUM(CASE WHEN action = 'viewed' THEN 1 ELSE 0 END) as views,
                      SUM(CASE WHEN action = 'downloaded' THEN 1 ELSE 0 END) as downloads
               FROM activity_log
               WHERE created_at >= ?
               GROUP BY item_name, item_type
               ORDER BY activity_count DESC
               LIMIT 20""",
            (week_ago,)
        ).fetchall()
        return [dict(t) for t in trending]
    finally:
        db.close()

# ============ ADMIN DASHBOARD ============

@app.get("/api/admin/dashboard")
def admin_dashboard(user_id: int = Depends(require_admin)):
    db = get_db()
    try:
        from datetime import datetime, timedelta
        today = datetime.utcnow().strftime("%Y-%m-%d")
        week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%d %H:%M:%S")
        total_users = db.execute("SELECT COUNT(*) as cnt FROM users").fetchone()["cnt"]
        total_games = db.execute("SELECT COUNT(*) as cnt FROM games WHERE type = 'game'").fetchone()["cnt"]
        total_software = db.execute("SELECT COUNT(*) as cnt FROM games WHERE type = 'software'").fetchone()["cnt"]
        total_movies = db.execute("SELECT COUNT(*) as cnt FROM movies").fetchone()["cnt"]
        total_ratings = db.execute("SELECT COUNT(*) as cnt FROM ratings").fetchone()["cnt"]
        total_comments = db.execute("SELECT COUNT(*) as cnt FROM comments").fetchone()["cnt"]
        total_activities = db.execute("SELECT COUNT(*) as cnt FROM activity_log").fetchone()["cnt"]
        new_users_week = db.execute("SELECT COUNT(*) as cnt FROM users WHERE created_at >= ?", (week_ago,)).fetchone()["cnt"]
        activities_week = db.execute("SELECT COUNT(*) as cnt FROM activity_log WHERE created_at >= ?", (week_ago,)).fetchone()["cnt"]
        downloads_today = db.execute(
            "SELECT COUNT(*) as cnt FROM activity_log WHERE action = 'downloaded' AND date(created_at) = ?",
            (today,)
        ).fetchone()["cnt"]
        most_viewed = db.execute(
            """SELECT item_name, item_type, COUNT(*) as cnt
               FROM activity_log
               WHERE action = 'viewed'
               GROUP BY item_name, item_type
               ORDER BY cnt DESC
               LIMIT 10"""
        ).fetchall()
        activity_by_day = db.execute(
            """SELECT date(created_at) as day, COUNT(*) as cnt
               FROM activity_log
               WHERE created_at >= ?
               GROUP BY date(created_at)
               ORDER BY day DESC""",
            (week_ago,)
        ).fetchall()
        return {
            "total_users": total_users,
            "total_games": total_games,
            "total_software": total_software,
            "total_movies": total_movies,
            "total_ratings": total_ratings,
            "total_comments": total_comments,
            "total_activities": total_activities,
            "new_users_week": new_users_week,
            "activities_week": activities_week,
            "downloads_today": downloads_today,
            "most_viewed": [dict(m) for m in most_viewed],
            "activity_by_day": [dict(a) for a in activity_by_day],
        }
    finally:
        db.close()

@app.get("/api/games/search", description="Search games by query")
def search_games(q: str = ""):
    db = get_db()
    try:
        if q:
            # Split query into words and match each word individually
            words = q.strip().split()
            conditions = []
            params = []
            for word in words:
                conditions.append("(title LIKE ? OR genre LIKE ?)")
                params.extend([f"%{word}%", f"%{word}%"])
            where_clause = " AND ".join(conditions)
            games = db.execute(
                f"SELECT * FROM games WHERE {where_clause} ORDER BY downloads DESC",
                params
            ).fetchall()
        else:
            games = db.execute("SELECT * FROM games ORDER BY downloads DESC").fetchall()
        return [dict(g) for g in games]
    finally:
        db.close()

@app.get("/api/movies/search", description="Search movies by query")
def search_movies(q: str = ""):
    db = get_db()
    try:
        if q:
            words = q.strip().split()
            conditions = []
            params = []
            for word in words:
                conditions.append("(title LIKE ? OR genre LIKE ?)")
                params.extend([f"%{word}%", f"%{word}%"])
            where_clause = " AND ".join(conditions)
            movies = db.execute(
                f"SELECT * FROM movies WHERE {where_clause} ORDER BY downloads DESC",
                params
            ).fetchall()
        else:
            movies = db.execute("SELECT * FROM movies ORDER BY downloads DESC").fetchall()
        return [dict(m) for m in movies]
    finally:
        db.close()

@app.get("/api/games/{game_id}")
def get_game(game_id: int):
    db = get_db()
    try:
        game = db.execute("SELECT * FROM games WHERE id = ?", (game_id,)).fetchone()
        if not game:
            raise HTTPException(status_code=404, detail="Game not found")
        avg = db.execute("SELECT AVG(rating) as avg_rating, COUNT(*) as total FROM ratings WHERE game_id = ?", (game_id,)).fetchone()
        comments = db.execute("""
            SELECT c.id, c.text, c.created_at, u.name, u.avatar_color
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.game_id = ?
            ORDER BY c.created_at DESC
        """, (game_id,)).fetchall()
        result = dict(game)
        # Use Bayesian rating as the main avg_rating (dynamically updated by community)
        bayesian = calculate_bayesian_rating(game_id, db)
        result["avg_rating"] = bayesian
        result["total_ratings"] = avg["total"] or 0
        result["comments"] = [dict(c) for c in comments]
        return result
    finally:
        db.close()

@app.post("/api/games")
def create_game(game: GameUpdate, user_id: int = Depends(require_admin)):
    db = get_db()
    try:
        cursor = db.execute(
            """INSERT INTO games (title, genre, rating, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, color, os, processor, memory, graphics, storage, install_guide, install_guide_text, install_video_url, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, type, developer, version, license_type)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (game.title or "New Game", game.genre or "Action", game.rating or 0, game.description, game.wallpaper_url, game.download_url, game.download_links or "", game.trailer_url or "", game.screenshots or "", game.color or "#3b82f6", game.os, game.processor, game.memory, game.graphics, game.storage, game.install_guide, game.install_guide_text, game.install_video_url, game.repack_features, game.download_manager_name, game.download_manager_url, game.usage_guide, game.troubleshooting, game.hypervisor_video_url, game.type, game.developer, game.version, game.license_type)
        )
        db.commit()
        game_id = db._last_insert_id if db._last_insert_id is not None else db.execute("SELECT MAX(id) FROM games").fetchone()[0]
        return {"id": game_id, "message": "Game created"}
    finally:
        db.close()

@app.put("/api/games/{game_id}")
def update_game(game_id: int, game: GameUpdate, user_id: int = Depends(require_admin)):
    db = get_db()
    try:
        existing = db.execute("SELECT * FROM games WHERE id = ?", (game_id,)).fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail="Game not found")
        fields = []
        values = []
        for key, value in game.model_dump(exclude_unset=True).items():
            fields.append(f"{key} = ?")
            values.append(value)
        if fields:
            values.append(game_id)
            db.execute(f"UPDATE games SET {', '.join(fields)} WHERE id = ?", values)
            db.commit()
        
        # Recalculate Bayesian rating after admin edit to preserve community influence
        bayesian = calculate_bayesian_rating(game_id, db)
        db.execute("UPDATE games SET rating = ? WHERE id = ?", (bayesian, game_id))
        db.commit()
        
        return {"message": "Game updated", "rating": bayesian}
    finally:
        db.close()

@app.delete("/api/games/{game_id}")
def delete_game(game_id: int, user_id: int = Depends(require_admin)):
    db = get_db()
    try:
        db.execute("DELETE FROM games WHERE id = ?", (game_id,))
        db.commit()
        return {"message": "Game deleted"}
    finally:
        db.close()

# ============ MOVIES ENDPOINTS ============

class MovieUpdate(BaseModel):
    title: Optional[str] = None
    genre: Optional[str] = None
    year: Optional[int] = None
    duration: Optional[str] = None
    rating: Optional[float] = None
    description: Optional[str] = None
    poster_url: Optional[str] = None
    backdrop_url: Optional[str] = None
    trailer_url: Optional[str] = None
    video_url: Optional[str] = None
    download_links: Optional[str] = None
    screenshots: Optional[str] = None
    director: Optional[str] = None
    cast_name: Optional[str] = None
    series_name: Optional[str] = None
    season: Optional[int] = None
    episode: Optional[int] = None
    color: Optional[str] = None
    type: Optional[str] = None

@app.get("/api/movies")
def get_movies(genre: Optional[str] = None, type: Optional[str] = None):
    db = get_db()
    try:
        query = "SELECT * FROM movies"
        conditions = []
        params = []

        if type and type in ("movie", "series"):
            conditions.append("type = ?")
            params.append(type)

        if genre and genre != "All":
            conditions.append("genre LIKE ?")
            params.append(f"%{genre}%")

        if conditions:
            query += " WHERE " + " AND ".join(conditions)

        query += " ORDER BY downloads DESC"
        movies = db.execute(query, params).fetchall()
        return [dict(m) for m in movies]
    finally:
        db.close()

@app.get("/api/movies/{movie_id}")
def get_movie(movie_id: int):
    db = get_db()
    try:
        movie = db.execute("SELECT * FROM movies WHERE id = ?", (movie_id,)).fetchone()
        if not movie:
            raise HTTPException(status_code=404, detail="Movie not found")
        avg = db.execute("SELECT AVG(rating) as avg_rating, COUNT(*) as total FROM ratings WHERE game_id = ?", (movie_id,)).fetchone()
        comments = db.execute("""
            SELECT c.id, c.text, c.created_at, u.name, u.avatar_color
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.game_id = ?
            ORDER BY c.created_at DESC
        """, (movie_id,)).fetchall()
        result = dict(movie)
        # Use Bayesian rating as the main avg_rating (dynamically updated by community)
        bayesian = calculate_bayesian_rating(movie_id, db)
        result["avg_rating"] = bayesian
        result["total_ratings"] = avg["total"] or 0
        result["comments"] = [dict(c) for c in comments]
        return result
    finally:
        db.close()

@app.post("/api/movies")
def create_movie(movie: MovieUpdate, user_id: int = Depends(require_admin)):
    db = get_db()
    try:
        cursor = db.execute(
            """INSERT INTO movies (title, genre, year, duration, rating, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, color, director, cast_name, series_name, season, episode, type)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (movie.title or "New Movie", movie.genre or "Action", movie.year, movie.duration or "", movie.rating or 0, movie.description, movie.poster_url, movie.backdrop_url, movie.trailer_url or "", movie.video_url or "", movie.download_links or "", movie.screenshots or "", movie.color or "#3b82f6", movie.director or "", movie.cast_name or "", movie.series_name or "", movie.season or 0, movie.episode or 0, movie.type or "movie")
        )
        db.commit()
        movie_id = db._last_insert_id if db._last_insert_id is not None else db.execute("SELECT MAX(id) FROM movies").fetchone()[0]
        return {"id": movie_id, "message": "Movie created"}
    finally:
        db.close()

@app.put("/api/movies/{movie_id}")
def update_movie(movie_id: int, movie: MovieUpdate, user_id: int = Depends(require_admin)):
    db = get_db()
    try:
        existing = db.execute("SELECT * FROM movies WHERE id = ?", (movie_id,)).fetchone()
        if not existing:
            raise HTTPException(status_code=404, detail="Movie not found")
        fields = []
        values = []
        for key, value in movie.model_dump(exclude_unset=True).items():
            if value is not None:
                fields.append(f"{key} = ?")
                values.append(value)
        if fields:
            values.append(movie_id)
            db.execute(f"UPDATE movies SET {', '.join(fields)} WHERE id = ?", values)
            db.commit()
        return {"message": "Movie updated"}
    finally:
        db.close()

@app.delete("/api/movies/{movie_id}")
def delete_movie(movie_id: int, user_id: int = Depends(require_admin)):
    db = get_db()
    try:
        db.execute("DELETE FROM movies WHERE id = ?", (movie_id,))
        db.commit()
        return {"message": "Movie deleted"}
    finally:
        db.close()

# ============ VERIFY EMAIL LATER ============

class VerifyEmailLaterRequest(BaseModel):
    code: str

@app.post("/api/auth/verify-email")
def verify_email_later(req: VerifyEmailLaterRequest, user_id: int = Depends(get_user_id)):
    """Verify email for an already-logged-in user using a code sent to their email."""
    db = get_db()
    try:
        user = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user_dict = dict(user)
        if user_dict.get("email_verified"):
            return {"message": "Email already verified"}

        if not verify_code(user_dict["email"], req.code, "signup", db):
            raise HTTPException(status_code=400, detail="Invalid or expired verification code")

        db.execute("UPDATE users SET email_verified = 1 WHERE id = ?", (user_id,))
        db.commit()
        return {"message": "Email verified successfully"}
    finally:
        db.close()

@app.post("/api/auth/send-verify-email")
def send_verify_email(user_id: int = Depends(get_user_id)):
    """Send a verification code to the current user's email (for verifying later)."""
    db = get_db()
    try:
        user = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user_dict = dict(user)
        if user_dict.get("email_verified"):
            return {"message": "Email already verified"}

        code = create_verification_code(user_dict["email"], "signup", db)
        sent = send_verification_code(user_dict["email"], code, "signup", SMTP_CONFIG)
        if not sent:
            raise HTTPException(status_code=500, detail="Failed to send verification email")
        return {"message": "Verification code sent to your email"}
    finally:
        db.close()

# ============ COMMENTS ============

@app.post("/api/comments")
def add_comment(comment: CommentCreate, user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        # Check if user's email is verified
        user = db.execute("SELECT email_verified FROM users WHERE id = ?", (user_id,)).fetchone()
        if not user or not user["email_verified"]:
            raise HTTPException(status_code=403, detail="Please verify your email before commenting. Check your profile page to verify.")
        
        cursor = db.execute(
            "INSERT INTO comments (game_id, user_id, text) VALUES (?, ?, ?)",
            (comment.game_id, user_id, comment.text)
        )
        db.commit()
        comment_id = db._last_insert_id if db._last_insert_id is not None else db.execute("SELECT MAX(id) FROM comments").fetchone()[0]
        return {"id": comment_id, "message": "Comment added"}
    finally:
        db.close()

@app.get("/api/comments/{game_id}")
def get_comments(game_id: int):
    db = get_db()
    try:
        comments = db.execute("""
            SELECT c.id, c.text, c.created_at, c.user_id, u.name, u.avatar_color
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.game_id = ?
            ORDER BY c.created_at DESC
        """, (game_id,)).fetchall()
        return [dict(c) for c in comments]
    finally:
        db.close()

# ============ RATINGS ============

@app.post("/api/ratings")
def add_rating(rating: RatingCreate, user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        if rating.rating < 1 or rating.rating > 5:
            raise HTTPException(status_code=400, detail="Rating must be 1-5")
        existing = db.execute(
            "SELECT id FROM ratings WHERE game_id = ? AND user_id = ?",
            (rating.game_id, user_id)
        ).fetchone()
        if existing:
            db.execute("UPDATE ratings SET rating = ? WHERE id = ?", (rating.rating, existing["id"]))
        else:
            db.execute(
                "INSERT INTO ratings (game_id, user_id, rating) VALUES (?, ?, ?)",
                (rating.game_id, user_id, rating.rating)
            )
        db.commit()
        
        # Calculate the Bayesian rating and persist it to the database
        bayesian_rating = calculate_bayesian_rating(rating.game_id, db)
        
        # Update both games and movies tables (only one will match)
        db.execute("UPDATE games SET rating = ? WHERE id = ?", (bayesian_rating, rating.game_id))
        db.execute("UPDATE movies SET rating = ? WHERE id = ?", (bayesian_rating, rating.game_id))
        db.commit()
        
        return {"message": "Rating saved", "new_rating": bayesian_rating, "total_ratings": db.execute("SELECT COUNT(*) as cnt FROM ratings WHERE game_id = ?", (rating.game_id,)).fetchone()["cnt"]}
    finally:
        db.close()

@app.get("/api/auth/stats")
def get_user_stats(user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        downloads = db.execute("SELECT COALESCE(SUM(downloads), 0) as total FROM games WHERE id IN (SELECT game_id FROM favorites WHERE user_id = ?)", (user_id,)).fetchone()["total"]
        favorites = db.execute("SELECT COUNT(*) as cnt FROM favorites WHERE user_id = ?", (user_id,)).fetchone()["cnt"]
        comments = db.execute("SELECT COUNT(*) as cnt FROM comments WHERE user_id = ?", (user_id,)).fetchone()["cnt"]
        return {"downloads": downloads, "favorites": favorites, "comments": comments}
    finally:
        db.close()

# ============ FAVORITES ============

@app.post("/api/favorites/{game_id}")
def toggle_favorite(game_id: int, user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        existing = db.execute(
            "SELECT id FROM favorites WHERE game_id = ? AND user_id = ?",
            (game_id, user_id)
        ).fetchone()
        if existing:
            db.execute("DELETE FROM favorites WHERE id = ?", (existing["id"],))
            db.commit()
            return {"favorited": False}
        else:
            db.execute(
                "INSERT INTO favorites (game_id, user_id) VALUES (?, ?)",
                (game_id, user_id)
            )
            db.commit()
            return {"favorited": True}
    finally:
        db.close()

@app.get("/api/favorites")
def get_favorites(user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        games = db.execute("""
            SELECT g.* FROM games g
            JOIN favorites f ON g.id = f.game_id
            WHERE f.user_id = ?
            ORDER BY f.created_at DESC
        """, (user_id,)).fetchall()
        return [dict(g) for g in games]
    finally:
        db.close()

# ============ AI CHAT ============

from api_engine import ask_groq, SYSTEM_PROMPT

class ChatRequest(BaseModel):
    message: str

@app.post("/api/ai/chat")
def ai_chat(request: ChatRequest):
    try:
        # Search database for games/software matching the user's query
        db = get_db()
        try:
            words = request.message.strip().lower().split()
            items = []
            if words:
                conditions = []
                params = []
                for word in words:
                    conditions.append("(title LIKE ? OR genre LIKE ? OR type LIKE ?)")
                    params.extend([f"%{word}%", f"%{word}%", f"%{word}%"])
                where = " AND ".join(conditions)
                items = db.execute(
                    f"SELECT title, genre, type, downloads FROM games WHERE {where} ORDER BY downloads DESC LIMIT 10",
                    params
                ).fetchall()
            if not items:
                # Show top 10 available items as context
                items = db.execute(
                    "SELECT title, genre, type, downloads FROM games ORDER BY downloads DESC LIMIT 10"
                ).fetchall()
        finally:
            db.close()

        # Build available items context block
        if items:
            item_lines = []
            for row in items:
                r = dict(row)
                item_lines.append(f"- {r['title']} ({r['type'] or 'game'}, {r['genre']}, {r['downloads']} downloads)")
            items_context = "The following are ACTUAL items available in the database matching the query:\n" + "\n".join(item_lines)
        else:
            items_context = "There are no items in the database matching this query."

        # Inject items context into the user message so AI knows real availability
        enriched_message = f"{request.message}\n\n[AVAILABLE DATABASE ITEMS]\n{items_context}\n\nWhen asked about specific games or software, only say they are available if they appear in the list above. If the user asks for 'steps', 'guide', 'help me', 'explain', or 'how to' — provide a full detailed answer with steps."

        response = ask_groq(enriched_message, SYSTEM_PROMPT)
        return {"response": response}
    except Exception as e:
        return {"response": f"*AI error: {str(e)}*"}

# ============ CATEGORY BANNERS ============

@app.get("/api/category-banners/{genre}")
def get_category_banner(genre: str):
    db = get_db()
    try:
        row = db.execute("SELECT * FROM category_banners WHERE genre = ?", (genre,)).fetchone()
        if not row:
            return {"genre": genre, "banner_url": None}
        return dict(row)
    finally:
        db.close()

@app.put("/api/category-banners/{genre}")
def update_category_banner(genre: str, data: dict, user_id: int = Depends(require_admin)):
    db = get_db()
    try:
        existing = db.execute("SELECT * FROM category_banners WHERE genre = ?", (genre,)).fetchone()
        banner_url = data.get("banner_url", "")
        if existing:
            db.execute("UPDATE category_banners SET banner_url = ?, updated_at = CURRENT_TIMESTAMP WHERE genre = ?", (banner_url, genre))
        else:
            db.execute("INSERT INTO category_banners (genre, banner_url) VALUES (?, ?)", (genre, banner_url))
        db.commit()
        return {"genre": genre, "banner_url": banner_url, "message": "Banner updated"}
    finally:
        db.close()

# ============ DOWNLOAD TRACKING ============

@app.post("/api/games/{game_id}/download")
def track_download(game_id: int):
    """Increment the download count when a user clicks a download link"""
    db = get_db()
    try:
        game = db.execute("SELECT id, downloads FROM games WHERE id = ?", (game_id,)).fetchone()
        if not game:
            raise HTTPException(status_code=404, detail="Game not found")
        db.execute("UPDATE games SET downloads = downloads + 1 WHERE id = ?", (game_id,))
        db.commit()
        new_count = db.execute("SELECT downloads FROM games WHERE id = ?", (game_id,)).fetchone()["downloads"]
        return {"message": "Download counted", "downloads": new_count}
    finally:
        db.close()

class GameCreate(BaseModel):
    title: str = "New Game"
    genre: str = "Action"
    rating: float = 0
    description: Optional[str] = None
    wallpaper_url: Optional[str] = None
    download_url: Optional[str] = None
    download_links: Optional[str] = None
    trailer_url: Optional[str] = None
    screenshots: Optional[str] = None
    color: Optional[str] = None
    os: Optional[str] = None
    processor: Optional[str] = None
    memory: Optional[str] = None
    graphics: Optional[str] = None
    storage: Optional[str] = None
    install_guide: Optional[str] = None
    install_guide_text: Optional[str] = None
    install_video_url: Optional[str] = None
    repack_features: Optional[str] = None
    download_manager_name: Optional[str] = None
    download_manager_url: Optional[str] = None
    usage_guide: Optional[str] = None
    troubleshooting: Optional[str] = None
    hypervisor_video_url: Optional[str] = None
    type: Optional[str] = None
    developer: Optional[str] = None
    version: Optional[str] = None
    license_type: Optional[str] = None

# ============ FILE UPLOAD ============

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".webm", ".mov", ".avi", ".mkv", ".ogg"}

@app.post("/api/auth/upload-avatar")
async def upload_avatar(file: UploadFile = File(...), user_id: int = Depends(get_user_id)):
    """Upload a profile avatar image. Any authenticated user can use this."""
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in {".jpg", ".jpeg", ".png", ".gif", ".webp"}:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed for avatars. Use JPG, PNG, GIF, or WebP.")
    
    filename = f"avatar-{user_id}-{uuid.uuid4().hex[:8]}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    base_url = PUBLIC_URL if PUBLIC_URL else "/uploads"
    url = f"{base_url}/{filename}"
    
    # Save avatar_url to user profile
    db = get_db()
    try:
        db.execute("UPDATE users SET avatar_url = ? WHERE id = ?", (url, user_id))
        db.commit()
    finally:
        db.close()
    
    return {"url": url, "filename": filename}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...), user_id: int = Depends(require_admin)):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed. Allowed: {', '.join(ALLOWED_EXTENSIONS)}")
    
    # Generate unique filename
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    
    # Save the file
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return the URL
    base_url = PUBLIC_URL if PUBLIC_URL else "/uploads"
    url = f"{base_url}/{filename}"
    return {"url": url, "filename": filename}

@app.post("/api/auth/supabase-sync")
def supabase_sync(req: dict, authorization: Optional[str] = Header(None)):
    """Sync Supabase user to SQLite backend."""
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "")
    user = verify_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    db = get_db()
    try:
        supabase_id = req.get("supabase_id")
        email = req.get("email")
        name = req.get("name", "User")
        avatar_url = req.get("avatar_url", "")
        provider = req.get("provider", "email")
        
        if not email:
            raise HTTPException(status_code=400, detail="Email required")
        
        # Check if user exists by supabase_id or email
        existing = db.execute(
            "SELECT * FROM users WHERE supabase_id = ? OR email = ?",
            (supabase_id, email)
        ).fetchone()
        
        if existing:
            # Update existing user
            db.execute(
                "UPDATE users SET supabase_id = ?, name = ?, avatar_url = ? WHERE id = ?",
                (supabase_id, name, avatar_url, existing["id"])
            )
            db.commit()
            user_id = existing["id"]
        else:
            # Create new user
            colors = ["#3b82f6", "#a855f7", "#10b981", "#ef4444", "#f59e0b", "#ec4899"]
            color = colors[hash(email) % len(colors)]
            cursor = db.execute(
                "INSERT INTO users (name, email, password, avatar_color, is_admin, email_verified, supabase_id, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (name, email, "", color, False, True, supabase_id, avatar_url)
            )
            db.commit()
            user_id = db._last_insert_id
        
        return {"id": user_id, "name": name, "email": email, "is_admin": 0, "email_verified": True}
    finally:
        db.close()

# ============ ADMIN USER MANAGEMENT ============

@app.get("/api/admin/users")
def get_all_users(admin_id: int = Depends(require_admin)):
    db = get_db()
    try:
        users = db.execute("""
            SELECT u.id, u.name, u.email, u.avatar_color, u.avatar_url, u.is_admin, u.email_verified, u.created_at,
                   (SELECT COUNT(*) FROM comments WHERE user_id = u.id) as comment_count,
                   (SELECT COUNT(*) FROM favorites WHERE user_id = u.id) as favorite_count
            FROM users u
            ORDER BY u.created_at DESC
        """).fetchall()
        return [dict(u) for u in users]
    finally:
        db.close()

@app.delete("/api/admin/users/{user_id}")
def delete_user(user_id: int, admin_id: int = Depends(require_admin)):
    db = get_db()
    try:
        if user_id == admin_id:
            raise HTTPException(status_code=400, detail="Cannot delete yourself")
        user = db.execute("SELECT id FROM users WHERE id = ?", (user_id,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        # Delete user's data
        db.execute("DELETE FROM comments WHERE user_id = ?", (user_id,))
        db.execute("DELETE FROM favorites WHERE user_id = ?", (user_id,))
        db.execute("DELETE FROM ratings WHERE user_id = ?", (user_id,))
        db.execute("DELETE FROM tokens WHERE user_id = ?", (user_id,))
        db.execute("DELETE FROM users WHERE id = ?", (user_id,))
        db.commit()
        return {"message": "User deleted successfully"}
    finally:
        db.close()

# ============ ADMIN COMMENT MANAGEMENT ============

@app.delete("/api/admin/comments/{comment_id}")
def delete_comment(comment_id: int, admin_id: int = Depends(require_admin)):
    db = get_db()
    try:
        comment = db.execute("SELECT id FROM comments WHERE id = ?", (comment_id,)).fetchone()
        if not comment:
            raise HTTPException(status_code=404, detail="Comment not found")
        db.execute("DELETE FROM comments WHERE id = ?", (comment_id,))
        db.commit()
        return {"message": "Comment deleted successfully"}
    finally:
        db.close()

@app.get("/api/health")
def health():
    return {"status": "ok", "app": "XZY Games API", "version": "1.0.0"}

# ============ MAKE ADMIN ============

@app.get("/api/make-admin")
def make_admin(email: str):
    """Set a user as admin by email. No auth required - for initial setup only."""
    db = get_db()
    try:
        user = db.execute("SELECT id, name, email, is_admin FROM users WHERE email = ?", (email,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        u = dict(user)
        if u["is_admin"]:
            return {"message": f"User {u['name']} ({u['email']}) is already an admin"}
        
        db.execute("UPDATE users SET is_admin = 1 WHERE id = ?", (u["id"],))
        db.commit()
        return {"message": f"Successfully made {u['name']} ({u['email']}) an admin!"}
    finally:
        db.close()

# ============ RESET DATABASE ============

@app.get("/api/reset-database")
def reset_database():
    """Drop all tables and recreate them. Use before seeding."""
    db = get_db()
    try:
        if DB_TYPE == "postgresql":
            # Drop all tables individually in reverse dependency order
            tables = db.execute("""
                SELECT tablename FROM pg_tables 
                WHERE schemaname = 'public' AND tablename != 'spatial_ref_sys'
            """).fetchall()
            for table in tables:
                db.execute(f"DROP TABLE IF EXISTS {table['tablename']} CASCADE")
        else:
            # SQLite: get all table names and drop them
            tables = db.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
            for table in tables:
                db.execute(f"DROP TABLE IF EXISTS {table['name']}")
        db.commit()
        
        # Recreate tables
        init_db()
        
        return {"message": "Database reset successfully! All tables dropped and recreated."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

# ============ ONE-TIME DATABASE SEED ============

@app.get("/api/seed-database")
def seed_database():
    """One-time import of postgresql_export.sql into PostgreSQL. No auth required - only works when DB is empty!"""
    import os
    sql_file = os.path.join(os.path.dirname(__file__), "postgresql_export.sql")
    if not os.path.exists(sql_file):
        raise HTTPException(status_code=404, detail="SQL file not found")
    
    db = get_db()
    try:
        # Add missing columns to all tables (in case schema is old)
        if DB_TYPE == "postgresql":
            # Games table columns
            missing_columns_games = [
                "repack_features TEXT",
                "download_manager_name VARCHAR(255)",
                "download_manager_url TEXT",
                "usage_guide TEXT",
                "troubleshooting TEXT",
                "hypervisor_video_url TEXT",
                "install_guide_text TEXT",
                "install_video_url TEXT"
            ]
            for col in missing_columns_games:
                col_name = col.split()[0]
                try:
                    db.execute(f"ALTER TABLE games ADD COLUMN IF NOT EXISTS {col}")
                    print(f"[SEED] Added column to games: {col_name}")
                except Exception as e:
                    if "already exists" not in str(e).lower():
                        print(f"[SEED] Column add warning for games.{col_name}: {e}")
            
            # Users table columns
            missing_columns_users = [
                "avatar_url TEXT DEFAULT ''",
                "supabase_id TEXT DEFAULT ''"
            ]
            for col in missing_columns_users:
                col_name = col.split()[0]
                try:
                    db.execute(f"ALTER TABLE users ADD COLUMN IF NOT EXISTS {col}")
                    print(f"[SEED] Added column to users: {col_name}")
                except Exception as e:
                    if "already exists" not in str(e).lower():
                        print(f"[SEED] Column add warning for users.{col_name}: {e}")
            
            # Movies table columns
            missing_columns_movies = [
                "cast_name TEXT DEFAULT ''",
                "series_name TEXT DEFAULT ''"
            ]
            for col in missing_columns_movies:
                col_name = col.split()[0]
                try:
                    db.execute(f"ALTER TABLE movies ADD COLUMN IF NOT EXISTS {col}")
                    print(f"[SEED] Added column to movies: {col_name}")
                except Exception as e:
                    if "already exists" not in str(e).lower():
                        print(f"[SEED] Column add warning for movies.{col_name}: {e}")
            db.commit()
        
        # Get FK constraint names dynamically from information_schema
        fk_constraints_dropped = []
        if DB_TYPE == "postgresql":
            fk_query = """
                SELECT tc.table_name, tc.constraint_name, rc.unique_constraint_name
                FROM information_schema.table_constraints tc
                JOIN information_schema.referential_constraints rc 
                    ON tc.constraint_name = rc.constraint_name
                WHERE tc.constraint_type = 'FOREIGN KEY'
                    AND tc.table_schema = 'public'
                    AND tc.table_name IN ('comments', 'ratings', 'favorites', 'tokens')
            """
            fk_rows = db.execute(fk_query).fetchall()
            for fk_row in fk_rows:
                table_name = fk_row[0]
                constraint_name = fk_row[1]
                try:
                    db.execute(f"ALTER TABLE {table_name} DROP CONSTRAINT IF EXISTS {constraint_name}")
                    fk_constraints_dropped.append((table_name, constraint_name))
                    print(f"[SEED] Dropped FK constraint: {constraint_name} from {table_name}")
                except Exception as e:
                    print(f"[SEED] Could not drop {constraint_name}: {e}")
            db.commit()
            print(f"[SEED] Dropped {len(fk_constraints_dropped)} FK constraints for import")
        
        with open(sql_file, 'r', encoding='utf-8') as f:
            sql_content = f.read()
        
        # Execute SQL as a single transaction (like import_to_postgresql.py does)
        # This avoids issues with semicolons inside string data
        try:
            db.execute(sql_content)
            db.commit()
            executed = 1
            errors = []
            print("[SEED] SQL file executed successfully as single transaction")
        except Exception as e:
            db.rollback()
            errors = [str(e)]
            executed = 0
            print(f"[SEED] Error executing SQL: {e}")
        
        # Clean up orphaned rows and re-add FK constraints
        if DB_TYPE == "postgresql" and fk_constraints_dropped:
            print("[SEED] Cleaning up orphaned rows before re-adding FK constraints...")
            db.execute("DELETE FROM comments WHERE game_id NOT IN (SELECT id FROM games)")
            db.execute("DELETE FROM comments WHERE user_id NOT IN (SELECT id FROM users)")
            db.execute("DELETE FROM ratings WHERE game_id NOT IN (SELECT id FROM games)")
            db.execute("DELETE FROM ratings WHERE user_id NOT IN (SELECT id FROM users)")
            db.execute("DELETE FROM favorites WHERE game_id NOT IN (SELECT id FROM games)")
            db.execute("DELETE FROM favorites WHERE user_id NOT IN (SELECT id FROM users)")
            db.execute("DELETE FROM tokens WHERE user_id NOT IN (SELECT id FROM users)")
            db.commit()
            print("[SEED] Orphaned rows cleaned up")
            
            # Re-add FK constraints
            for table_name, constraint_name in fk_constraints_dropped:
                try:
                    # Get the FK definition from information_schema
                    fk_def_query = f"""
                        SELECT pg_get_constraintdef('{constraint_name}'::regclass)
                    """
                    try:
                        fk_def_result = db.execute(fk_def_query).fetchone()
                        fk_def = fk_def_result[0] if fk_def_result else ""
                    except:
                        fk_def = ""
                    
                    if fk_def:
                        db.execute(f"ALTER TABLE {table_name} ADD CONSTRAINT {constraint_name} {fk_def}")
                        print(f"[SEED] Re-added FK constraint: {constraint_name}")
                    else:
                        print(f"[SEED] Could not get FK definition for {constraint_name}")
                except Exception as e:
                    print(f"[SEED] Could not re-add {constraint_name}: {e}")
            db.commit()
            print("[SEED] FK constraints restored")
        
        # Reset sequences to prevent duplicate key errors
        from database import reset_sequences
        reset_sequences(db)
        
        return {
            "message": "Database seeded successfully!" if not errors else "Database seed completed with errors", 
            "statements_executed": executed,
            "errors": errors[:10] if errors else []
        }
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

# ============ PUBLIC REQUESTS (Suggestions) ============

class RequestCreate(BaseModel):
    type: str = "game"  # game, software, or movie
    title: str
    submitter_name: str = "Anonymous"
    description: str = ""

@app.get("/api/requests")
def get_requests():
    """Get all public requests, newest first."""
    db = get_db()
    try:
        rows = db.execute(
            "SELECT * FROM requests ORDER BY created_at DESC"
        ).fetchall()
        return [dict(r) for r in rows]
    finally:
        db.close()

@app.post("/api/requests")
def create_request(req: RequestCreate):
    """Submit a new request (no auth required)."""
    if not req.title.strip():
        raise HTTPException(status_code=400, detail="Title is required")
    req_type = req.type if req.type in ("game", "software", "movie") else "game"
    db = get_db()
    try:
        cursor = db.execute(
            "INSERT INTO requests (type, title, submitter_name, description) VALUES (?, ?, ?, ?)",
            (req_type, req.title.strip(), req.submitter_name.strip() or "Anonymous", req.description.strip())
        )
        db.commit()
        row = db.execute("SELECT * FROM requests WHERE id = ?", (db._last_insert_id,)).fetchone()
        return dict(row)
    finally:
        db.close()

@app.delete("/api/requests/{request_id}")
def delete_request(request_id: int, authorization: Optional[str] = Header(None)):
    """Delete a request (admin only)."""
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = authorization.replace("Bearer ", "")
    user = verify_token(token)
    if not user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admin access required")
    db = get_db()
    try:
        db.execute("DELETE FROM requests WHERE id = ?", (request_id,))
        db.commit()
        return {"message": "Request deleted"}
    finally:
        db.close()

# ============ RANDOM TRAILER ============

@app.get("/api/random-trailer")
def get_random_trailer():
    """Fetch a random trailer from games or movies that have a trailer_url set."""
    db = get_db()
    try:
        import random
        # Get games with trailers
        games = db.execute(
            "SELECT id, title, trailer_url, 'game' as item_type FROM games WHERE trailer_url IS NOT NULL AND trailer_url != ''"
        ).fetchall()
        # Get movies with trailers
        movies = db.execute(
            "SELECT id, title, trailer_url, 'movie' as item_type FROM movies WHERE trailer_url IS NOT NULL AND trailer_url != ''"
        ).fetchall()
        
        all_items = [dict(g) for g in games] + [dict(m) for m in movies]
        
        if not all_items:
            return {"trailer_url": None, "title": None, "item_type": None}
        
        selected = random.choice(all_items)
        return {
            "trailer_url": selected["trailer_url"],
            "title": selected["title"],
            "item_type": selected["item_type"]
        }
    except Exception as e:
        return {"trailer_url": None, "title": None, "item_type": None, "error": str(e)}
    finally:
        db.close()

# ============ SPA CATCH-ALL ============
# Serve index.html for any unmatched route (SPA routing)
@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    # Don't interfere with API routes
    if full_path.startswith("api/") or full_path.startswith("uploads/"):
        raise HTTPException(status_code=404, detail="Not found")
    index_path = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path, media_type="text/html")
    return {"error": "Frontend not built. Run 'npm run build' first."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5050)
