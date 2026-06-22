import sqlite3
import os

# Use environment variable or default to path OUTSIDE git repo to prevent data loss
_base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DB_PATH = os.environ.get('LOCAL_DB_PATH', os.path.join(
    _base_dir, 'SOFTWARES', 'xzy-local-data', 'xzy.db'
))


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def migrate():
    """Add download_links column to games table if it doesn't exist"""
    conn = get_db()
    cursor = conn.cursor()

    # Check if column exists
    cursor.execute("PRAGMA table_info(games)")
    columns = [col[1] for col in cursor.fetchall()]

    if "download_links" not in columns:
        cursor.execute("ALTER TABLE games ADD COLUMN download_links TEXT DEFAULT ''")
        print("Added download_links column to games table")

    if "trailer_url" not in columns:
        cursor.execute("ALTER TABLE games ADD COLUMN trailer_url TEXT DEFAULT ''")
        print("Added trailer_url column to games table")

    if "screenshots" not in columns:
        cursor.execute("ALTER TABLE games ADD COLUMN screenshots TEXT DEFAULT ''")
        print("Added screenshots column to games table")

    conn.commit()
    conn.close()
    print("Migration complete!")


if __name__ == "__main__":
    migrate()