#!/usr/bin/env python3
"""
Database wrapper that makes SQLite (local) and PostgreSQL (RunSite) work identically.
"""
import os
import sys
from datetime import datetime

# Check if we're running on RunSite (PostgreSQL) or locally (SQLite)
DATABASE_URL = os.environ.get('DATABASE_URL')

if DATABASE_URL:
    # PostgreSQL for production (RunSite)
    import psycopg2
    from psycopg2.extras import DictCursor

    DB_TYPE = "postgresql"
else:
    # SQLite for local development
    import sqlite3
    DB_TYPE = "sqlite"
    _base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    DB_PATH = os.environ.get('LOCAL_DB_PATH', os.path.join(
        _base_dir, 'SOFTWARES', 'xzy-local-data', 'xzy.db'
    ))
    print(f"[DB] Using SQLite database at: {DB_PATH}")


class DBWrapper:
    """Wrapper that makes db.execute() work for both SQLite and PostgreSQL."""
    def __init__(self, conn):
        self.conn = conn
        self._last_cursor = None
    
    def execute(self, query, params=None):
        if DB_TYPE == "postgresql":
            # Quote reserved SQL keywords used as column names in queries FIRST
            # Use lookaround to avoid matching inside compound names like item_type, game_type
            import re
            # 'type' is reserved in PostgreSQL - only match when NOT part of a larger identifier
            query = re.sub(r'(?<![a-zA-Z_])type(?![a-zA-Z_])', '"type"', query)
            # 'action' is reserved in PostgreSQL - only match when NOT part of a larger identifier
            query = re.sub(r'(?<![a-zA-Z_])action(?![a-zA-Z_])', '"action"', query)
            # Parameter placeholder conversion (must happen after reserved word quoting)
            query = query.replace("?", "%s")
            # Date/time function conversion
            query = query.replace("datetime('now')", "CURRENT_TIMESTAMP")
            query = query.replace("date(created_at)", "DATE(created_at)")
            # Case-insensitive search
            query = query.replace(" LIKE ", " ILIKE ")
            # Fix INSERT values for BOOLEAN columns
            # PostgreSQL needs TRUE/FALSE not 1/0 for boolean columns
            if 'INSERT' in query:
                query = query.replace(", 1)", ", TRUE)")
                query = query.replace(", 0)", ", FALSE)")
        cursor = self.conn.cursor()
        self._last_cursor = cursor
        
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        
        # Monkey-patch lastrowid onto cursor for PostgreSQL
        # psycopg2 doesn't have lastrowid, but main.py uses cursor.lastrowid everywhere
        if DB_TYPE == "postgresql":
            try:
                cur = self.conn.cursor()
                cur.execute("SELECT LASTVAL()")
                row = cur.fetchone()
                cursor.lastrowid = row[0] if row else None
            except:
                cursor.lastrowid = None
        
        return cursor
    
    def commit(self):
        self.conn.commit()
    
    def close(self):
        self.conn.close()
    
    def __getattr__(self, name):
        return getattr(self.conn, name)


def get_db():
    """Get database connection based on environment."""
    if DB_TYPE == "postgresql":
        conn = psycopg2.connect(DATABASE_URL)
        conn.cursor_factory = DictCursor
        return DBWrapper(conn)
    else:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return DBWrapper(conn)


def init_db():
    """Initialize database tables."""
    conn = get_db()
    cursor = conn.cursor()

    if DB_TYPE == "postgresql":
        # PostgreSQL table creation
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                avatar_color TEXT DEFAULT '#3b82f6',
                is_admin BOOLEAN DEFAULT FALSE,
                email_verified BOOLEAN DEFAULT FALSE,
                avatar_url TEXT DEFAULT '',
                supabase_id TEXT DEFAULT '',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS games (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                genre TEXT NOT NULL,
                rating REAL DEFAULT 0,
                downloads INTEGER DEFAULT 0,
                description TEXT,
                wallpaper_url TEXT,
                download_url TEXT,
                download_links TEXT DEFAULT '',
                trailer_url TEXT DEFAULT '',
                screenshots TEXT DEFAULT '',
                os TEXT DEFAULT 'Windows 10/11 64-bit',
                processor TEXT DEFAULT 'Intel Core i5-8400',
                memory TEXT DEFAULT '16 GB RAM',
                graphics TEXT DEFAULT 'GTX 1060 / RX 580',
                storage TEXT DEFAULT '45 GB available',
                install_guide TEXT,
                install_guide_text TEXT,
                install_video_url TEXT,
                repack_features TEXT,
                download_manager_name VARCHAR(255),
                download_manager_url TEXT,
                usage_guide TEXT,
                troubleshooting TEXT,
                hypervisor_video_url TEXT,
                color TEXT DEFAULT '#3b82f6',
                is_new INTEGER DEFAULT 0,
                type TEXT DEFAULT 'game',
                developer TEXT DEFAULT '',
                version TEXT DEFAULT '',
                license_type TEXT DEFAULT '',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS movies (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                genre TEXT NOT NULL,
                year INTEGER,
                duration TEXT DEFAULT '',
                rating REAL DEFAULT 0,
                downloads INTEGER DEFAULT 0,
                description TEXT,
                poster_url TEXT,
                backdrop_url TEXT,
                trailer_url TEXT DEFAULT '',
                video_url TEXT DEFAULT '',
                download_links TEXT DEFAULT '',
                screenshots TEXT DEFAULT '',
                director TEXT DEFAULT '',
                cast_name TEXT DEFAULT '',
                series_name TEXT DEFAULT '',
                season INTEGER DEFAULT 0,
                episode INTEGER DEFAULT 0,
                color TEXT DEFAULT '#3b82f6',
                type TEXT DEFAULT 'movie',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                game_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (game_id) REFERENCES games(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tokens (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                token TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS verification_codes (
                id SERIAL PRIMARY KEY,
                email TEXT NOT NULL,
                code TEXT NOT NULL,
                type TEXT NOT NULL CHECK(type IN ('signup', 'reset')),
                expires_at TIMESTAMP NOT NULL,
                used BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS ratings (
                id SERIAL PRIMARY KEY,
                game_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
                UNIQUE(game_id, user_id),
                FOREIGN KEY (game_id) REFERENCES games(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS favorites (
                id SERIAL PRIMARY KEY,
                game_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(game_id, user_id),
                FOREIGN KEY (game_id) REFERENCES games(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS activity_log (
                id SERIAL PRIMARY KEY,
                user_id INTEGER,
                user_name TEXT DEFAULT 'Guest',
                action TEXT NOT NULL CHECK(action IN ('viewed', 'downloaded', 'rated', 'commented')),
                item_type TEXT NOT NULL CHECK(item_type IN ('game', 'software', 'movie', 'series')),
                item_name TEXT NOT NULL,
                item_id INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_badges (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                badge_type TEXT NOT NULL,
                badge_name TEXT NOT NULL,
                earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                UNIQUE(user_id, badge_type)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS weekly_stats (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                week_start TEXT NOT NULL,
                views_count INTEGER DEFAULT 0,
                downloads_count INTEGER DEFAULT 0,
                ratings_count INTEGER DEFAULT 0,
                comments_count INTEGER DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users(id),
                UNIQUE(user_id, week_start)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS category_banners (
                genre TEXT PRIMARY KEY,
                banner_url TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS requests (
                id SERIAL PRIMARY KEY,
                type TEXT NOT NULL CHECK(type IN ('game', 'software', 'movie')),
                title TEXT NOT NULL,
                submitter_name TEXT DEFAULT 'Anonymous',
                description TEXT DEFAULT '',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'games' AND column_name = 'install_guide_text'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE games ADD COLUMN install_guide_text TEXT DEFAULT ''")
            print("Added install_guide_text column to games table")

        cursor.execute("SELECT column_name FROM information_schema.columns WHERE table_name = 'games' AND column_name = 'install_video_url'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE games ADD COLUMN install_video_url TEXT DEFAULT ''")
            print("Added install_video_url column to games table")

    else:
        # SQLite table creation
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                avatar_color TEXT DEFAULT '#3b82f6',
                is_admin INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        try:
            cursor.execute("ALTER TABLE users ADD COLUMN email_verified INTEGER DEFAULT 0")
        except:
            pass

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS games (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                genre TEXT NOT NULL,
                rating REAL DEFAULT 0,
                downloads INTEGER DEFAULT 0,
                description TEXT,
                wallpaper_url TEXT,
                download_url TEXT,
                download_links TEXT DEFAULT '',
                trailer_url TEXT DEFAULT '',
                screenshots TEXT DEFAULT '',
                os TEXT DEFAULT 'Windows 10/11 64-bit',
                processor TEXT DEFAULT 'Intel Core i5-8400',
                memory TEXT DEFAULT '16 GB RAM',
                graphics TEXT DEFAULT 'GTX 1060 / RX 580',
                storage TEXT DEFAULT '45 GB available',
                install_guide TEXT,
                color TEXT DEFAULT '#3b82f6',
                is_new INTEGER DEFAULT 0,
                type TEXT DEFAULT 'game',
                developer TEXT DEFAULT '',
                version TEXT DEFAULT '',
                license_type TEXT DEFAULT '',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                genre TEXT NOT NULL,
                year INTEGER,
                duration TEXT DEFAULT '',
                rating REAL DEFAULT 0,
                downloads INTEGER DEFAULT 0,
                description TEXT,
                poster_url TEXT,
                backdrop_url TEXT,
                trailer_url TEXT DEFAULT '',
                video_url TEXT DEFAULT '',
                download_links TEXT DEFAULT '',
                screenshots TEXT DEFAULT '',
                director TEXT DEFAULT '',
                cast TEXT DEFAULT '',
                series_name TEXT DEFAULT '',
                season INTEGER DEFAULT 0,
                episode INTEGER DEFAULT 0,
                color TEXT DEFAULT '#3b82f6',
                type TEXT DEFAULT 'movie',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (game_id) REFERENCES games(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tokens (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                token TEXT UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS verification_codes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                code TEXT NOT NULL,
                type TEXT NOT NULL CHECK(type IN ('signup', 'reset')),
                expires_at TIMESTAMP NOT NULL,
                used INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS ratings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
                UNIQUE(game_id, user_id),
                FOREIGN KEY (game_id) REFERENCES games(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS favorites (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(game_id, user_id),
                FOREIGN KEY (game_id) REFERENCES games(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS activity_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                user_name TEXT DEFAULT 'Guest',
                action TEXT NOT NULL CHECK(action IN ('viewed', 'downloaded', 'rated', 'commented')),
                item_type TEXT NOT NULL CHECK(item_type IN ('game', 'software', 'movie', 'series')),
                item_name TEXT NOT NULL,
                item_id INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_badges (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                badge_type TEXT NOT NULL,
                badge_name TEXT NOT NULL,
                earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                UNIQUE(user_id, badge_type)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS weekly_stats (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                week_start TEXT NOT NULL,
                views_count INTEGER DEFAULT 0,
                downloads_count INTEGER DEFAULT 0,
                ratings_count INTEGER DEFAULT 0,
                comments_count INTEGER DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users(id),
                UNIQUE(user_id, week_start)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS category_banners (
                genre TEXT PRIMARY KEY,
                banner_url TEXT NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL CHECK(type IN ('game', 'software', 'movie')),
                title TEXT NOT NULL,
                submitter_name TEXT DEFAULT 'Anonymous',
                description TEXT DEFAULT '',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("PRAGMA table_info(users)")
        user_columns = [col[1] for col in cursor.fetchall()]
        if "avatar_url" not in user_columns:
            cursor.execute("ALTER TABLE users ADD COLUMN avatar_url TEXT DEFAULT ''")
            print("Added avatar_url column to users table")
        if "supabase_id" not in user_columns:
            cursor.execute("ALTER TABLE users ADD COLUMN supabase_id TEXT DEFAULT ''")
            print("Added supabase_id column to users table")

        cursor.execute("PRAGMA table_info(games)")
        columns = [col[1] for col in cursor.fetchall()]
        migration_columns = {
            "download_links": "TEXT DEFAULT ''",
            "trailer_url": "TEXT DEFAULT ''",
            "screenshots": "TEXT DEFAULT ''",
            "repack_features": "TEXT DEFAULT ''",
            "download_manager_name": "TEXT DEFAULT ''",
            "download_manager_url": "TEXT DEFAULT ''",
            "usage_guide": "TEXT DEFAULT ''",
            "troubleshooting": "TEXT DEFAULT ''",
            "hypervisor_video_url": "TEXT DEFAULT ''",
            "type": "TEXT DEFAULT 'game'",
            "developer": "TEXT DEFAULT ''",
            "version": "TEXT DEFAULT ''",
            "license_type": "TEXT DEFAULT ''",
            "install_guide_text": "TEXT DEFAULT ''",
            "install_video_url": "TEXT DEFAULT ''",
        }
        for col, col_type in migration_columns.items():
            if col not in columns:
                cursor.execute(f"ALTER TABLE games ADD COLUMN {col} {col_type}")
                print(f"Added {col} column to games table")

    conn.commit()
    conn.close()


if __name__ == "__main__":
    print(f"Database type: {DB_TYPE}")
    init_db()
    print("Database initialized successfully!")