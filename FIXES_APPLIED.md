# XZY Games - Local Development Fixes

## Problem Summary
When running the local website, the database content (banners, games, movies, AI settings) was not showing up because the backend couldn't properly connect to the SQLite database.

## Root Causes Identified

1. **Database Path Resolution**: The relative path to `xzy.db` was failing when uvicorn started from a different working directory
2. **No Visibility**: No way to verify if backend was actually running and connecting to database
3. **Silent Failures**: Errors were happening but not being logged or displayed

## Fixes Applied

### 1. Fixed Database Path Resolution (`neo-web/backend/database.py`)
- Changed to use **absolute path** for SQLite database
- Added debug logging to show which database file is being opened
- This ensures the database is found regardless of where uvicorn is started from

```python
# Now uses absolute path
abs_db_path = os.path.abspath(DB_PATH)
print(f"[DB] Connecting to SQLite database: {abs_db_path}")
conn = sqlite3.connect(abs_db_path)
```

### 2. Added Health Check Endpoint (`neo-web/backend/main.py`)
- New endpoint: `GET /api/health`
- Tests database connection on startup
- Returns database type and content counts
- Use this to verify backend is working: http://localhost:5050/api/health

### 3. Enhanced Startup Logging
- Backend now prints clear messages when starting:
  - `[STARTUP] Initializing database...`
  - `[STARTUP] Database initialized successfully!`
  - `[DB] Connecting to SQLite database: /full/path/to/xzy.db`

### 4. Created Diagnostic Tool (`test_backend.py`)
- Run this script to test all major API endpoints
- Shows exactly what's working and what's not
- Usage: `python test_backend.py` (while backend is running)

## How to Use

### Starting the Application

**Option 1: Use the batch file (recommended)**
```bash
neo-web/start.bat
```
This starts both backend (port 5050) and frontend (port 5173).

**Option 2: Manual start**
```bash
# Terminal 1 - Backend
cd neo-web/backend
python -m uvicorn main:app --host 0.0.0.0 --port 5050

# Terminal 2 - Frontend
cd neo-web
npm run dev
```

### Verify Backend is Working

1. **Check health endpoint**: Open http://localhost:5050/api/health in browser
   - Should show: `{"status": "ok", "database": "SQLite", "games_count": 91, ...}`
   - If `games_count` is 91, database is connected!

2. **Run diagnostic script**:
   ```bash
   python test_backend.py
   ```
   All tests should show `[OK]`

3. **Check backend console** for these messages:
   ```
   [STARTUP] Initializing database...
   [DB] Connecting to SQLite database: d:\...\neo-web\backend\xzy.db
   [STARTUP] Database initialized successfully!
   ```

### If Data Still Doesn't Show

1. **Check browser console** (F12 → Console tab)
   - Look for red errors
   - Check if API calls are being made to `http://localhost:5050/api/...`

2. **Verify frontend API config** (`neo-web/src/lib/api.ts`):
   - Development mode uses: `http://localhost:5050`
   - Make sure this matches where backend is running

3. **Check CORS settings** (`.env` file):
   - `ALLOWED_ORIGIN=*` should allow all origins in development

4. **Test API directly in browser**:
   - http://localhost:5050/api/games (should show 91 games)
   - http://localhost:5050/api/movies (should show 6 movies)
   - http://localhost:5050/api/category-banners/Action (should show banner)

## Database Contents (Verified)
- **91 games** with full details (download links, screenshots, system requirements)
- **6 movies** with descriptions and metadata
- **22 category banners** for different genres
- **2 admin users** (DANNY, XZY ADMIN)
- **AI settings** configured with Groq API key

## AI API Fix
The AI chat feature uses the Groq API key from `.env` file:
```
GROQ_API_KEY=<your-groq-api-key-here>
```

This is already configured and should work once backend is running.

## Troubleshooting

### Backend won't start
- Check if port 5050 is already in use
- Verify Python dependencies are installed: `pip install -r requirements.txt`
- Check for error messages in console

### Database not found
- Verify `neo-web/backend/xzy.db` exists
- Check backend console for `[DB] Connecting to SQLite database: ...` message
- Ensure file permissions allow reading

### Frontend shows no data
- Open browser DevTools (F12) → Network tab
- Look for failed API calls (red entries)
- Check if requests are going to `http://localhost:5050/api/...`
- Verify backend health endpoint returns data

### CORS errors
- Check `.env` has `ALLOWED_ORIGIN=*`
- Backend should show CORS middleware in startup logs

## Quick Test

After starting backend, run this in browser console:
```javascript
fetch('http://localhost:5050/api/health')
  .then(r => r.json())
  .then(console.log)
```

Should output:
```javascript
{
  status: "ok",
  database: "SQLite",
  games_count: 91,
  message: "Backend is running and database is accessible"
}
```

If you see this, everything is working! The issue is in the frontend configuration.