import os
import json
import hashlib
import secrets
import shutil
import uuid
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends, Header, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
from database import get_db, init_db, DB_TYPE

# ---------- CONFIGURATION ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
API_KEYS_FILE = os.path.join(BASE_DIR, "api_keys.json")

def _get_config(key: str, default: str = ""):
    env_key = key.upper()
    val = os.environ.get(env_key)
    if val:
        return val
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
PUBLIC_URL = os.environ.get("PUBLIC_URL", "")

app = FastAPI(title="XZY Games API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN] if ALLOWED_ORIGIN != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
print(f"[UPLOADS] Directory: {UPLOAD_DIR}")

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

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
    row = db.execute(
        "SELECT * FROM verification_codes WHERE email = ? AND code = ? AND type = ? AND used = 0 AND expires_at > datetime('now') ORDER BY created_at DESC LIMIT 1",
        (email, code, code_type)
    ).fetchone()
    if not row:
        return False
    db.execute("UPDATE verification_codes SET used = 1 WHERE id = ?", (row["id"],))
    db.commit()
    return True

@app.post("/api/auth/send-verification")
def send_verification(req: SendVerificationRequest):
    db = get_db()
    try:
        existing = db.execute("SELECT id FROM users WHERE email = ?", (req.email,)).fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        code = create_verification_code(req.email, "signup", db)
        send_verification_code(req.email, code, "signup")
        return {"message": "Verification code sent to your email"}
    finally:
        db.close()

@app.post("/api/auth/verify-signup")
def verify_signup(req: VerifySignupRequest):
    db = get_db()
    try:
        existing = db.execute("SELECT id FROM users WHERE email = ?", (req.email,)).fetchone()
        if existing:
            raise HTTPException(status_code=400, detail="Email already registered")
        if not verify_code(req.email, req.code, "signup", db):
            raise HTTPException(status_code=400, detail="Invalid or expired verification code")
        colors = ["#3b82f6", "#a855f7", "#10b981", "#ef4444", "#f59e0b", "#ec4899"]
        color = colors[hash(req.email) % len(colors)]
        user_count = db.execute("SELECT COUNT(*) as cnt FROM users").fetchone()["cnt"]
        is_admin = 1 if user_count == 0 else 0
        cursor = db.execute(
            "INSERT INTO users (name, email, password, avatar_color, is_admin, email_verified) VALUES (?, ?, ?, ?, ?, ?)",
            (req.name, req.email, hash_password(req.password), color, is_admin, 1)
        )
        db.commit()
        user_id = cursor.lastrowid
        token = create_session_token(user_id, db)
        return {"id": user_id, "name": req.name, "email": req.email, "token": token, "is_admin": is_admin}
    finally:
        db.close()

@app.post("/api/auth/send-reset-code")
def send_reset_code(req: SendResetCodeRequest):
    db = get_db()
    try:
        user = db.execute("SELECT id FROM users WHERE email = ?", (req.email,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="No account found with this email")
        code = create_verification_code(req.email, "reset", db)
        sent = send_verification_code(req.email, code, "reset")
        if not sent:
            raise HTTPException(status_code=500, detail="Failed to send verification email")
        return {"message": "Reset code sent to your email"}
    finally:
        db.close()

@app.post("/api/auth/verify-reset")
def verify_reset(req: VerifyResetRequest):
    db = get_db()
    try:
        user = db.execute("SELECT id FROM users WHERE email = ?", (req.email,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="No account found with this email")
        if not verify_code(req.email, req.code, "reset", db):
            raise HTTPException(status_code=400, detail="Invalid or expired verification code")
        db.execute("UPDATE users SET password = ? WHERE id = ?", (hash_password(req.password), user["id"]))
        db.commit()
        return {"message": "Password reset successfully"}
    finally:
        db.close()

def calculate_bayesian_rating(game_id: int, db) -> float:
    game = db.execute("SELECT rating, type FROM games WHERE id = ?", (game_id,)).fetchone()
    movie = None
    if not game:
        movie = db.execute("SELECT rating FROM movies WHERE id = ?", (game_id,)).fetchone()
    baseline = 4.0
    if game:
        baseline = game["rating"] or 4.0
    elif movie:
        baseline = movie["rating"] or 4.0
    result = db.execute(
        "SELECT AVG(rating) as avg_rating, COUNT(*) as total FROM ratings WHERE game_id = ?",
        (game_id,)
    ).fetchone()
    user_avg = result["avg_rating"]
    num_ratings = result["total"]
    smoothing = 5
    if num_ratings and num_ratings > 0 and user_avg:
        bayesian = (user_avg * num_ratings + baseline * smoothing) / (num_ratings + smoothing)
        bayesian = max(1.0, min(5.0, round(bayesian, 1)))
        return bayesian
    return baseline

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def generate_token() -> str:
    return secrets.token_hex(32)

def verify_token(token: str):
    db = get_db()
    try:
        row = db.execute("""
            SELECT u.* FROM users u
            JOIN tokens t ON u.id = t.user_id
            WHERE t.token = ?
        """, (token,)).fetchone()
        if row:
            return dict(row)
        try:
            user_id = int(token)
            legacy_user = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
            if legacy_user:
                legacy_dict = dict(legacy_user)
                db.execute("DELETE FROM tokens WHERE user_id = ?", (user_id,))
                new_token = generate_token()
                db.execute("INSERT INTO tokens (user_id, token) VALUES (?, ?)", (user_id, new_token))
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
    db.execute("DELETE FROM tokens WHERE user_id = ?", (user_id,))
    token = generate_token()
    db.execute("INSERT INTO tokens (user_id, token) VALUES (?, ?)", (user_id, token))
    db.commit()
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
        user_count = db.execute("SELECT COUNT(*) as cnt FROM users").fetchone()["cnt"]
        is_admin = 1 if user_count == 0 else 0
        cursor = db.execute(
            "INSERT INTO users (name, email, password, avatar_color, is_admin, email_verified) VALUES (?, ?, ?, ?, ?, ?)",
            (user.name, user.email, hash_password(user.password), color, is_admin, 1)
        )
        db.commit()
        user_id = cursor.lastrowid
        token = create_session_token(user_id, db)
        return {"id": user_id, "name": user.name, "email": user.email, "token": token, "is_admin": is_admin, "email_verified": 1}
    finally:
        db.close()

@app.post("/api/auth/login")
def login(user: UserLogin):
    db = get_db()
    try:
        row = db.execute("SELECT * FROM users WHERE email = ?", (user.email,)).fetchone()
        if not row:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        u = dict(row)
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

# ============ PASSWORD RESET ============

class PasswordReset(BaseModel):
    email: str
    password: str
    code: str

@app.post("/api/auth/reset-password")
def reset_password(reset: PasswordReset):
    db = get_db()
    try:
        user = db.execute("SELECT id, is_admin FROM users WHERE email = ?", (reset.email,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="No account found with this email")
        if not verify_code(reset.email, reset.code, "reset", db):
            raise HTTPException(status_code=400, detail="Invalid or expired verification code")
        db.execute("UPDATE users SET password = ? WHERE id = ?", (hash_password(reset.password), user["id"]))
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

# ============ ACTIVITY LOG ============

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
        activities = db.execute("SELECT * FROM activity_log ORDER BY created_at DESC LIMIT ?", (limit,)).fetchall()
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

# ============ BADGES & LEADERBOARD ============

@app.get("/api/badges/{user_id}")
def get_user_badges(user_id: int):
    db = get_db()
    try:
        badges = db.execute("SELECT * FROM user_badges WHERE user_id = ? ORDER BY earned_at DESC", (user_id,)).fetchall()
        return [dict(b) for b in badges]
    finally:
        db.close()

@app.get("/api/badges/all")
def get_all_badges():
    db = get_db()
    try:
        badges = db.execute("SELECT ub.badge_type, ub.badge_name, COUNT(*) as count FROM user_badges ub GROUP BY ub.badge_type, ub.badge_name ORDER BY count DESC").fetchall()
        return [dict(b) for b in badges]
    finally:
        db.close()

@app.get("/api/leaderboard")
def get_leaderboard():
    db = get_db()
    try:
        from datetime import datetime, timedelta
        week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%d %H:%M:%S")
        leaders = db.execute("""
            SELECT user_id, user_name, COUNT(*) as activity_count,
                      SUM(CASE WHEN action = 'viewed' THEN 1 ELSE 0 END) as views,
                      SUM(CASE WHEN action = 'downloaded' THEN 1 ELSE 0 END) as downloads,
                      SUM(CASE WHEN action = 'rated' THEN 1 ELSE 0 END) as ratings,
                      SUM(CASE WHEN action = 'commented' THEN 1 ELSE 0 END) as comments
               FROM activity_log
               WHERE user_id IS NOT NULL AND created_at >= ?
               GROUP BY user_id
               ORDER BY activity_count DESC
               LIMIT 20""", (week_ago,)).fetchall()
        return [dict(l) for l in leaders]
    finally:
        db.close()

@app.get("/api/trending")
def get_trending():
    db = get_db()
    try:
        from datetime import datetime, timedelta
        week_ago = (datetime.utcnow() - timedelta(days=7)).strftime("%Y-%m-%d %H:%M:%S")
        trending = db.execute("""
            SELECT item_name, item_type, item_id, COUNT(*) as activity_count,
                      SUM(CASE WHEN action = 'viewed' THEN 1 ELSE 0 END) as views,
                      SUM(CASE WHEN action = 'downloaded' THEN 1 ELSE 0 END) as downloads
               FROM activity_log
               WHERE created_at >= ?
               GROUP BY item_name, item_type
               ORDER BY activity_count DESC
               LIMIT 20""", (week_ago,)).fetchall()
        return [dict(t) for t in trending]
    finally:
        db.close()

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
        downloads_today = db.execute("SELECT COUNT(*) as cnt FROM activity_log WHERE action = 'downloaded' AND date(created_at) = ?", (today,)).fetchone()["cnt"]
        most_viewed = db.execute("SELECT item_name, item_type, COUNT(*) as cnt FROM activity_log WHERE action = 'viewed' GROUP BY item_name, item_type ORDER BY cnt DESC LIMIT 10").fetchall()
        activity_by_day = db.execute("SELECT date(created_at) as day, COUNT(*) as cnt FROM activity_log WHERE created_at >= ? GROUP BY date(created_at) ORDER BY day DESC", (week_ago,)).fetchall()
        return {
            "total_users": total_users, "total_games": total_games, "total_software": total_software,
            "total_movies": total_movies, "total_ratings": total_ratings, "total_comments": total_comments,
            "total_activities": total_activities, "new_users_week": new_users_week, "activities_week": activities_week,
            "downloads_today": downloads_today, "most_viewed": [dict(m) for m in most_viewed],
            "activity_by_day": [dict(a) for a in activity_by_day],
        }
    finally:
        db.close()

@app.get("/api/games/search")
def search_games(q: str = ""):
    db = get_db()
    try:
        if q:
            words = q.strip().split()
            conditions = []
            params = []
            for word in words:
                conditions.append("(title LIKE ? OR genre LIKE ?)")
                params.extend([f"%{word}%", f"%{word}%"])
            games = db.execute(f"SELECT * FROM games WHERE {' AND '.join(conditions)} ORDER BY downloads DESC", params).fetchall()
        else:
            games = db.execute("SELECT * FROM games ORDER BY downloads DESC").fetchall()
        return [dict(g) for g in games]
    finally:
        db.close()

@app.get("/api/movies/search")
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
            movies = db.execute(f"SELECT * FROM movies WHERE {' AND '.join(conditions)} ORDER BY downloads DESC", params).fetchall()
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
        comments = db.execute("SELECT c.id, c.text, c.created_at, u.name, u.avatar_color FROM comments c JOIN users u ON c.user_id = u.id WHERE c.game_id = ? ORDER BY c.created_at DESC", (game_id,)).fetchall()
        result = dict(game)
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
            "INSERT INTO games (title, genre, rating, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, color, os, processor, memory, graphics, storage, install_guide, install_guide_text, install_video_url, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, type, developer, version, license_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (game.title or "New Game", game.genre or "Action", game.rating or 0, game.description, game.wallpaper_url, game.download_url, game.download_links or "", game.trailer_url or "", game.screenshots or "", game.color or "#3b82f6", game.os, game.processor, game.memory, game.graphics, game.storage, game.install_guide, game.install_guide_text, game.install_video_url, game.repack_features, game.download_manager_name, game.download_manager_url, game.usage_guide, game.troubleshooting, game.hypervisor_video_url, game.type, game.developer, game.version, game.license_type)
        )
        db.commit()
        return {"id": cursor.lastrowid, "message": "Game created"}
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
        comments = db.execute("SELECT c.id, c.text, c.created_at, u.name, u.avatar_color FROM comments c JOIN users u ON c.user_id = u.id WHERE c.game_id = ? ORDER BY c.created_at DESC", (movie_id,)).fetchall()
        result = dict(movie)
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
            "INSERT INTO movies (title, genre, year, duration, rating, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, color, director, cast_name, series_name, season, episode, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (movie.title or "New Movie", movie.genre or "Action", movie.year, movie.duration or "", movie.rating or 0, movie.description, movie.poster_url, movie.backdrop_url, movie.trailer_url or "", movie.video_url or "", movie.download_links or "", movie.screenshots or "", movie.color or "#3b82f6", movie.director or "", movie.cast_name or "", movie.series_name or "", movie.season or 0, movie.episode or 0, movie.type or "movie")
        )
        db.commit()
        return {"id": cursor.lastrowid, "message": "Movie created"}
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

# ============ EMAIL VERIFY LATER ============

class VerifyEmailLaterRequest(BaseModel):
    code: str

@app.post("/api/auth/verify-email")
def verify_email_later(req: VerifyEmailLaterRequest, user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        user = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        if user.get("email_verified"):
            return {"message": "Email already verified"}
        if not verify_code(user["email"], req.code, "signup", db):
            raise HTTPException(status_code=400, detail="Invalid or expired verification code")
        db.execute("UPDATE users SET email_verified = 1 WHERE id = ?", (user_id,))
        db.commit()
        return {"message": "Email verified successfully"}
    finally:
        db.close()

@app.post("/api/auth/send-verify-email")
def send_verify_email(user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        user = db.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        if user.get("email_verified"):
            return {"message": "Email already verified"}
        code = create_verification_code(user["email"], "signup", db)
        sent = send_verification_code(user["email"], code, "signup")
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
        cursor = db.execute("INSERT INTO comments (game_id, user_id, text) VALUES (?, ?, ?)", (comment.game_id, user_id, comment.text))
        db.commit()
        return {"id": cursor.lastrowid, "message": "Comment added"}
    finally:
        db.close()

@app.get("/api/comments/{game_id}")
def get_comments(game_id: int):
    db = get_db()
    try:
        comments = db.execute("SELECT c.id, c.text, c.created_at, c.user_id, u.name, u.avatar_color FROM comments c JOIN users u ON c.user_id = u.id WHERE c.game_id = ? ORDER BY c.created_at DESC", (game_id,)).fetchall()
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
        existing = db.execute("SELECT id FROM ratings WHERE game_id = ? AND user_id = ?", (rating.game_id, user_id)).fetchone()
        if existing:
            db.execute("UPDATE ratings SET rating = ? WHERE id = ?", (rating.rating, existing["id"]))
        else:
            db.execute("INSERT INTO ratings (game_id, user_id, rating) VALUES (?, ?, ?)", (rating.game_id, user_id, rating.rating))
        db.commit()
        bayesian_rating = calculate_bayesian_rating(rating.game_id, db)
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
        existing = db.execute("SELECT id FROM favorites WHERE game_id = ? AND user_id = ?", (game_id, user_id)).fetchone()
        if existing:
            db.execute("DELETE FROM favorites WHERE id = ?", (existing["id"],))
            db.commit()
            return {"favorited": False}
        else:
            db.execute("INSERT INTO favorites (game_id, user_id) VALUES (?, ?)", (game_id, user_id))
            db.commit()
            return {"favorited": True}
    finally:
        db.close()

@app.get("/api/favorites")
def get_favorites(user_id: int = Depends(get_user_id)):
    db = get_db()
    try:
        games = db.execute("SELECT g.* FROM games g JOIN favorites f ON g.id = f.game_id WHERE f.user_id = ? ORDER BY f.created_at DESC", (user_id,)).fetchall()
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
                items = db.execute(f"SELECT title, genre, type, downloads FROM games WHERE {' AND '.join(conditions)} ORDER BY downloads DESC LIMIT 10", params).fetchall()
            if not items:
                items = db.execute("SELECT title, genre, type, downloads FROM games ORDER BY downloads DESC LIMIT 10").fetchall()
        finally:
            db.close()
        if items:
            item_lines = [f"- {r['title']} ({r['type'] or 'game'}, {r['genre']}, {r['downloads']} downloads)" for r in items]
            items_context = "ACTUAL ITEMS:\n" + "\n".join(item_lines)
        else:
            items_context = "No items in database."
        enriched_message = f"{request.message}\n\n[AVAILABLE ITEMS]\n{items_context}\n\nOnly say items are available if they appear in the list above."
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

# ============ FILE UPLOAD ============

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".webm", ".mov", ".avi", ".mkv", ".ogg"}

@app.post("/api/auth/upload-avatar")
async def upload_avatar(file: UploadFile = File(...), user_id: int = Depends(get_user_id)):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in {".jpg", ".jpeg", ".png", ".gif", ".webp"}:
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed")
    filename = f"avatar-{user_id}-{uuid.uuid4().hex[:8]}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    base_url = PUBLIC_URL if PUBLIC_URL else "/uploads"
    url = f"{base_url}/{filename}"
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
        raise HTTPException(status_code=400, detail=f"File type {ext} not allowed")
    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    base_url = PUBLIC_URL if PUBLIC_URL else "/uploads"
    url = f"{base_url}/{filename}"
    return {"url": url, "filename": filename}

@app.post("/api/auth/supabase-sync")
def supabase_sync(req: dict, authorization: Optional[str] = Header(None)):
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
        if not email:
            raise HTTPException(status_code=400, detail="Email required")
        existing = db.execute("SELECT * FROM users WHERE supabase_id = ? OR email = ?", (supabase_id, email)).fetchone()
        if existing:
            db.execute("UPDATE users SET supabase_id = ?, name = ?, avatar_url = ? WHERE id = ?", (supabase_id, name, avatar_url, existing["id"]))
            db.commit()
            user_id = existing["id"]
        else:
            colors = ["#3b82f6", "#a855f7", "#10b981", "#ef4444", "#f59e0b", "#ec4899"]
            color = colors[hash(email) % len(colors)]
            cursor = db.execute("INSERT INTO users (name, email, password, avatar_color, is_admin, email_verified, supabase_id, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (name, email, "", color, 0, 1, supabase_id, avatar_url))
            db.commit()
            user_id = cursor.lastrowid
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
        db.execute("DELETE FROM comments WHERE user_id = ?", (user_id,))
        db.execute("DELETE FROM favorites WHERE user_id = ?", (user_id,))
        db.execute("DELETE FROM ratings WHERE user_id = ?", (user_id,))
        db.execute("DELETE FROM tokens WHERE user_id = ?", (user_id,))
        db.execute("DELETE FROM users WHERE id = ?", (user_id,))
        db.commit()
        return {"message": "User deleted successfully"}
    finally:
        db.close()

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
            # DDL needs autocommit in PostgreSQL
            db.conn.autocommit = True
            db.execute("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
            db.conn.autocommit = False
        else:
            tables = db.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
            for table in tables:
                db.execute(f"DROP TABLE IF EXISTS {table['name']}")
        db.commit()
        init_db()
        return {"message": "Database reset successfully! All tables dropped and recreated."}
    except Exception as e:
        try:
            db.rollback()
        except:
            pass
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()

# ============ ONE-TIME DATABASE SEED ============

@app.get("/api/seed-database")
def seed_database():
    """One-time import of postgresql_export.sql into PostgreSQL."""
    import os
    sql_file = os.path.join(os.path.dirname(__file__), "postgresql_export.sql")
    if not os.path.exists(sql_file):
        raise HTTPException(status_code=404, detail="SQL file not found")
    db = get_db()
    try:
        user_count = db.execute("SELECT COUNT(*) as cnt FROM users").fetchone()["cnt"]
        if user_count > 0:
            return {"message": "Database already has data. Import skipped.", "users_found": user_count}
        
        if DB_TYPE == "postgresql":
            db.conn.autocommit = True
            missing_columns = [
                "repack_features TEXT", "download_manager_name VARCHAR(255)",
                "download_manager_url TEXT", "usage_guide TEXT", "troubleshooting TEXT",
                "hypervisor_video_url TEXT", "install_guide_text TEXT", "install_video_url TEXT"
            ]
            for col in missing_columns:
                col_name = col.split()[0]
                try:
                    db.execute(f"ALTER TABLE games ADD COLUMN IF NOT EXISTS {col}")
                except Exception as e:
                    if "already exists" not in str(e).lower():
                        print(f"[SEED] Column warning {col_name}: {e}")
            db.conn.autocommit = False
        
        fk_constraints_dropped = []
        if DB_TYPE == "postgresql":
            db.conn.autocommit = True
            fk_defs = [
                ("comments", "comments_game_id_fkey", "FOREIGN KEY (game_id) REFERENCES games(id)"),
                ("comments", "comments_user_id_fkey", "FOREIGN KEY (user_id) REFERENCES users(id)"),
                ("ratings", "ratings_game_id_fkey", "FOREIGN KEY (game_id) REFERENCES games(id)"),
                ("ratings", "ratings_user_id_fkey", "FOREIGN KEY (user_id) REFERENCES users(id)"),
                ("favorites", "favorites_game_id_fkey", "FOREIGN KEY (game_id) REFERENCES games(id)"),
                ("favorites", "favorites_user_id_fkey", "FOREIGN KEY (user_id) REFERENCES users(id)"),
                ("tokens", "tokens_user_id_fkey", "FOREIGN KEY (user_id) REFERENCES users(id)"),
            ]
            for table_name, constraint_name, fk_def in fk_defs:
                try:
                    db.execute(f"ALTER TABLE {table_name} DROP CONSTRAINT IF EXISTS {constraint_name}")
                    fk_constraints_dropped.append((table_name, constraint_name, fk_def))
                except Exception as e:
                    print(f"[SEED] Could not drop {constraint_name}: {e}")
            db.conn.autocommit = False
        
        with open(sql_file, 'r', encoding='utf-8') as f:
            sql_content = f.read()
        
        sql_content_clean = sql_content.replace('BEGIN;', '').replace('COMMIT;', '')
        statements = []
        for chunk in sql_content_clean.split(';\n'):
            lines = [line for line in chunk.split('\n') if not line.strip().startswith('--') and line.strip()]
            if lines:
                statements.append('\n'.join(lines))
        
        executed = 0
        errors = []
        for stmt in statements:
            if stmt:
                try:
                    db.execute(stmt)
                    executed += 1
                except Exception as e:
                    errors.append(str(e))
        
        db.commit()
        
        if DB_TYPE == "postgresql" and fk_constraints_dropped:
            db.execute("DELETE FROM comments WHERE game_id NOT IN (SELECT id FROM games)")
            db.execute("DELETE FROM comments WHERE user_id NOT IN (SELECT id FROM users)")
            db.execute("DELETE FROM ratings WHERE game_id NOT IN (SELECT id FROM games)")
            db.execute("DELETE FROM ratings WHERE user_id NOT IN (SELECT id FROM users)")
            db.execute("DELETE FROM favorites WHERE game_id NOT IN (SELECT id FROM games)")
            db.execute("DELETE FROM favorites WHERE user_id NOT IN (SELECT id FROM users)")
            db.execute("DELETE FROM tokens WHERE user_id NOT IN (SELECT id FROM users)")
            db.commit()
            for table_name, constraint_name, fk_def in fk_constraints_dropped:
                try:
                    db.execute(f"ALTER TABLE {table_name} ADD CONSTRAINT {constraint_name} {fk_def}")
                except Exception as e:
                    print(f"[SEED] Could not re-add {constraint_name}: {e}")
            db.commit()
        
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

# ============ PUBLIC REQUESTS ============

class RequestCreate(BaseModel):
    type: str = "game"
    title: str
    submitter_name: str = "Anonymous"
    description: str = ""

@app.get("/api/requests")
def get_requests():
    db = get_db()
    try:
        rows = db.execute("SELECT * FROM requests ORDER BY created_at DESC").fetchall()
        return [dict(r) for r in rows]
    finally:
        db.close()

@app.post("/api/requests")
def create_request(req: RequestCreate):
    if not req.title.strip():
        raise HTTPException(status_code=400, detail="Title is required")
    req_type = req.type if req.type in ("game", "software", "movie") else "game"
    db = get_db()
    try:
        cursor = db.execute("INSERT INTO requests (type, title, submitter_name, description) VALUES (?, ?, ?, ?)", (req_type, req.title.strip(), req.submitter_name.strip() or "Anonymous", req.description.strip()))
        db.commit()
        row = db.execute("SELECT * FROM requests WHERE id = ?", (cursor.lastrowid,)).fetchone()
        return dict(row)
    finally:
        db.close()

@app.delete("/api/requests/{request_id}")
def delete_request(request_id: int, authorization: Optional[str] = Header(None)):
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

# ============ SPA CATCH-ALL ============

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    if full_path.startswith("api/") or full_path.startswith("uploads/"):
        raise HTTPException(status_code=404, detail="Not found")
    index_path = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path, media_type="text/html")
    return {"error": "Frontend not built. Run 'npm run build' first."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5050)