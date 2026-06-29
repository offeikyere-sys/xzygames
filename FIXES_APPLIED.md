# FIXES_APPLIED

## 2026-06-28 — Fix: /api/movies POST crash on SQLite missing columns

### Symptom
Backend crashed with:
`sqlite3.OperationalError: table movies has no column named cast_name`
when adding movies in the admin UI.

### Root cause
Some local SQLite DBs were created/seeded with an older `movies` schema that lacked `cast_name` and/or `series_name` columns.

### Fixes
1. **SQLite auto-migration**: `neo-web/backend/database.py` now checks for missing `movies` columns on startup and adds them if needed (`director`, `cast_name`, `series_name`, `season`, `episode`).
2. **Robust movie insert**: `neo-web/backend/main.py` now builds the `INSERT INTO movies (...)` statement dynamically using only columns that exist in the current SQLite schema, so older DBs can’t crash the endpoint.

### Result
`POST /api/movies` no longer 500-crashes due to missing `cast_name` / `series_name`.

