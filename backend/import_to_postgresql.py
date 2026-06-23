#!/usr/bin/env python3
"""
Import SQL file into PostgreSQL database for RunSite deployment.
This script runs on the server during deployment to import the exported data.
"""
import os
import sys
import psycopg2
from psycopg2.extras import DictCursor

# Database connection from environment variable
DATABASE_URL = os.environ.get('DATABASE_URL')
SQL_FILE = os.path.join(os.path.dirname(__file__), "postgresql_export.sql")

def import_database():
    """Import SQL file into PostgreSQL database."""
    if not DATABASE_URL:
        print("[ERROR] DATABASE_URL environment variable not set")
        print("   Set it to your PostgreSQL connection string")
        sys.exit(1)

    if not os.path.exists(SQL_FILE):
        print(f"[ERROR] SQL file not found: {SQL_FILE}")
        sys.exit(1)

    try:
        # Connect to PostgreSQL
        print("Connecting to PostgreSQL database...")
        conn = psycopg2.connect(DATABASE_URL)
        conn.autocommit = False
        cursor = conn.cursor()

        # Clear existing data using TRUNCATE CASCADE (safer and faster)
        print("Clearing existing data...")
        cursor.execute("TRUNCATE TABLE activity_log, user_badges, weekly_stats, favorites, ratings, comments, tokens, requests, category_banners, movies, games, users CASCADE")
        conn.commit()
        print("Existing data cleared.")

        # Read SQL file
        print(f"Reading SQL file: {SQL_FILE}")
        with open(SQL_FILE, 'r', encoding='utf-8') as f:
            sql_content = f.read()

        # Execute SQL
        print("Executing SQL commands...")
        cursor.execute(sql_content)
        conn.commit()

        # Verify data
        cursor.execute("SELECT COUNT(*) FROM users")
        user_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM games")
        game_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM movies")
        movie_count = cursor.fetchone()[0]

        print("\nDatabase imported successfully!")
        print("Records imported:")
        print(f"   - Users: {user_count}")
        print(f"   - Games: {game_count}")
        print(f"   - Movies: {movie_count}")

        cursor.close()
        conn.close()

    except psycopg2.Error as e:
        print(f"PostgreSQL Error: {e}")
        if conn:
            conn.rollback()
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    import_database()