#!/usr/bin/env python3
"""
Export SQLite database to PostgreSQL format for RunSite deployment.
This script reads xzy.db and generates SQL INSERT statements compatible with PostgreSQL.
"""
import sqlite3
import json
import os
from datetime import datetime

# Use environment variable or default to path OUTSIDE git repo to prevent data loss
# __file__ is at: d:\PROJECTS WEBSITES AND SOFTWARES\neo-web\backend\export_to_postgresql.py
# We go up 3 levels to get to: d:\PROJECTS WEBSITES AND SOFTWARES
_base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DB_PATH = os.environ.get('LOCAL_DB_PATH', os.path.join(
    _base_dir, 'SOFTWARES', 'xzy-local-data', 'xzy.db'
))
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "postgresql_export.sql")

def fix_url(value):
    """Fix URLs for cross-server compatibility:
    - http://localhost:5050/uploads/... -> /uploads/...
    - Local file paths (D:\, C:\, etc.)  -> '' (empty, so fallback shows)
    - Already valid URLs or empty -> unchanged
    """
    if not value:
        return ''
    # Convert localhost URLs to relative paths
    value = value.replace('http://localhost:5050/uploads/', '/uploads/')
    value = value.replace('http://localhost:3000/uploads/', '/uploads/')
    # If it's a local file path (not a valid URL), clear it — the frontend will show gradient fallback
    if value.startswith(('D:\\', 'd:\\', 'C:\\', 'c:\\', '/PICTURES', '/software', '/movies', '/AND', '\\')):
        return ''
    return value

def export_database():
    """Export SQLite database to PostgreSQL-compatible SQL file."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write("-- XZY Games Database Export for PostgreSQL\n")
        f.write(f"-- Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("-- Target: RunSite PostgreSQL Database\n\n")
        
        f.write("BEGIN;\n\n")

        # Export users
        f.write("-- Export Users\n")
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        for user in users:
            user_dict = dict(user)
            # Convert boolean integers to PostgreSQL boolean
            email_verified = 'TRUE' if user_dict.get('email_verified', 0) == 1 else 'FALSE'
            is_admin = 'TRUE' if user_dict.get('is_admin', 0) == 1 else 'FALSE'
            
            f.write(f"INSERT INTO users (id, name, email, password, avatar_color, is_admin, email_verified, avatar_url, supabase_id, created_at) VALUES ")
            f.write(f"({user_dict['id']}, '{user_dict['name'].replace(chr(39), chr(39)+chr(39))}', '{user_dict['email']}', '{user_dict['password']}', ")
            f.write(f"'{user_dict.get('avatar_color', '#3b82f6')}', {is_admin}, {email_verified}, ")
            f.write(f"'{fix_url(user_dict.get('avatar_url', ''))}', '{user_dict.get('supabase_id', '')}', ")
            f.write(f"'{user_dict.get('created_at', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))}');\n")
        f.write("\n")

        # Export games
        f.write("-- Export Games\n")
        cursor.execute("SELECT * FROM games")
        games = cursor.fetchall()
        for game in games:
            game_dict = dict(game)
            # Handle None values
            values = {
                'id': game_dict['id'],
                'title': game_dict['title'].replace("'", "''"),
                'genre': game_dict['genre'].replace("'", "''"),
                'rating': game_dict.get('rating', 0) or 0,
                'downloads': game_dict.get('downloads', 0) or 0,
                'description': (game_dict.get('description') or '').replace("'", "''"),
                'wallpaper_url': fix_url((game_dict.get('wallpaper_url') or '').replace("'", "''")),
                'download_url': fix_url((game_dict.get('download_url') or '').replace("'", "''")),
                'download_links': fix_url((game_dict.get('download_links') or '').replace("'", "''")),
                'trailer_url': fix_url((game_dict.get('trailer_url') or '').replace("'", "''")),
                'screenshots': fix_url((game_dict.get('screenshots') or '').replace("'", "''")),
                'os': (game_dict.get('os') or 'Windows 10/11 64-bit').replace("'", "''"),
                'processor': (game_dict.get('processor') or 'Intel Core i5-8400').replace("'", "''"),
                'memory': (game_dict.get('memory') or '16 GB RAM').replace("'", "''"),
                'graphics': (game_dict.get('graphics') or 'GTX 1060 / RX 580').replace("'", "''"),
                'storage': (game_dict.get('storage') or '45 GB available').replace("'", "''"),
                'install_guide': (game_dict.get('install_guide') or '').replace("'", "''"),
                'color': game_dict.get('color', '#3b82f6'),
                'is_new': game_dict.get('is_new', 0) or 0,
                'type': game_dict.get('type', 'game').replace("'", "''"),
                'developer': (game_dict.get('developer') or '').replace("'", "''"),
                'version': (game_dict.get('version') or '').replace("'", "''"),
                'license_type': (game_dict.get('license_type') or '').replace("'", "''"),
                'created_at': game_dict.get('created_at', datetime.now().strftime('%Y-%m-%d %H:%M:%S')),
                'repack_features': (game_dict.get('repack_features') or '').replace("'", "''"),
                'download_manager_name': (game_dict.get('download_manager_name') or '').replace("'", "''"),
                'download_manager_url': fix_url((game_dict.get('download_manager_url') or '').replace("'", "''")),
                'usage_guide': (game_dict.get('usage_guide') or '').replace("'", "''"),
                'troubleshooting': (game_dict.get('troubleshooting') or '').replace("'", "''"),
                'hypervisor_video_url': fix_url((game_dict.get('hypervisor_video_url') or '').replace("'", "''")),
                'install_guide_text': (game_dict.get('install_guide_text') or '').replace("'", "''"),
                'install_video_url': fix_url((game_dict.get('install_video_url') or '').replace("'", "''")),
            }
            
            f.write(f"INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES ")
            f.write(f"({values['id']}, '{values['title']}', '{values['genre']}', {values['rating']}, {values['downloads']}, ")
            f.write(f"'{values['description']}', '{values['wallpaper_url']}', '{values['download_url']}', '{values['download_links']}', ")
            f.write(f"'{values['trailer_url']}', '{values['screenshots']}', '{values['os']}', '{values['processor']}', ")
            f.write(f"'{values['memory']}', '{values['graphics']}', '{values['storage']}', '{values['install_guide']}', ")
            f.write(f"'{values['color']}', {values['is_new']}, '{values['type']}', '{values['developer']}', ")
            f.write(f"'{values['version']}', '{values['license_type']}', '{values['created_at']}', ")
            f.write(f"'{values['repack_features']}', '{values['download_manager_name']}', '{values['download_manager_url']}', ")
            f.write(f"'{values['usage_guide']}', '{values['troubleshooting']}', '{values['hypervisor_video_url']}', ")
            f.write(f"'{values['install_guide_text']}', '{values['install_video_url']}');\n")
        f.write("\n")

        # Export movies
        f.write("-- Export Movies\n")
        cursor.execute("SELECT * FROM movies")
        movies = cursor.fetchall()
        for movie in movies:
            movie_dict = dict(movie)
            values = {
                'id': movie_dict['id'],
                'title': movie_dict['title'].replace("'", "''"),
                'genre': movie_dict['genre'].replace("'", "''"),
                'year': movie_dict.get('year'),
                'duration': (movie_dict.get('duration') or '').replace("'", "''"),
                'rating': movie_dict.get('rating', 0) or 0,
                'downloads': movie_dict.get('downloads', 0) or 0,
                'description': (movie_dict.get('description') or '').replace("'", "''"),
                'poster_url': fix_url((movie_dict.get('poster_url') or '').replace("'", "''")),
                'backdrop_url': fix_url((movie_dict.get('backdrop_url') or '').replace("'", "''")),
                'trailer_url': fix_url((movie_dict.get('trailer_url') or '').replace("'", "''")),
                'video_url': fix_url((movie_dict.get('video_url') or '').replace("'", "''")),
                'download_links': fix_url((movie_dict.get('download_links') or '').replace("'", "''")),
                'screenshots': fix_url((movie_dict.get('screenshots') or '').replace("'", "''")),
                'director': (movie_dict.get('director') or '').replace("'", "''"),
                'cast_name': (movie_dict.get('cast_name') or '').replace("'", "''"),
                'series_name': (movie_dict.get('series_name') or '').replace("'", "''"),
                'season': movie_dict.get('season', 0) or 0,
                'episode': movie_dict.get('episode', 0) or 0,
                'color': movie_dict.get('color', '#3b82f6'),
                'type': movie_dict.get('type', 'movie').replace("'", "''"),
                'created_at': movie_dict.get('created_at', datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            }
            
            f.write(f"INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES ")
            f.write(f"({values['id']}, '{values['title']}', '{values['genre']}', {values['year']}, '{values['duration']}', ")
            f.write(f"{values['rating']}, {values['downloads']}, '{values['description']}', '{values['poster_url']}', ")
            f.write(f"'{values['backdrop_url']}', '{values['trailer_url']}', '{values['video_url']}', ")
            f.write(f"'{values['download_links']}', '{values['screenshots']}', '{values['director']}', ")
            f.write(f"'{values['cast_name']}', '{values['series_name']}', {values['season']}, {values['episode']}, ")
            f.write(f"'{values['color']}', '{values['type']}', '{values['created_at']}');\n")
        f.write("\n")

        # Export comments
        f.write("-- Export Comments\n")
        cursor.execute("SELECT * FROM comments")
        comments = cursor.fetchall()
        for comment in comments:
            comment_dict = dict(comment)
            f.write(f"INSERT INTO comments (id, game_id, user_id, text, created_at) VALUES ")
            f.write(f"({comment_dict['id']}, {comment_dict['game_id']}, {comment_dict['user_id']}, ")
            f.write(f"'{comment_dict['text'].replace(chr(39), chr(39)+chr(39))}', '{comment_dict['created_at']}');\n")
        f.write("\n")

        # Export ratings
        f.write("-- Export Ratings\n")
        cursor.execute("SELECT * FROM ratings")
        ratings = cursor.fetchall()
        for rating in ratings:
            rating_dict = dict(rating)
            f.write(f"INSERT INTO ratings (id, game_id, user_id, rating) VALUES ")
            f.write(f"({rating_dict['id']}, {rating_dict['game_id']}, {rating_dict['user_id']}, {rating_dict['rating']});\n")
        f.write("\n")

        # Export favorites
        f.write("-- Export Favorites\n")
        cursor.execute("SELECT * FROM favorites")
        favorites = cursor.fetchall()
        for fav in favorites:
            fav_dict = dict(fav)
            f.write(f"INSERT INTO favorites (id, game_id, user_id, created_at) VALUES ")
            f.write(f"({fav_dict['id']}, {fav_dict['game_id']}, {fav_dict['user_id']}, '{fav_dict['created_at']}');\n")
        f.write("\n")

        # Export tokens
        f.write("-- Export Tokens\n")
        cursor.execute("SELECT * FROM tokens")
        tokens = cursor.fetchall()
        for token in tokens:
            token_dict = dict(token)
            f.write(f"INSERT INTO tokens (id, user_id, token, created_at) VALUES ")
            f.write(f"({token_dict['id']}, {token_dict['user_id']}, '{token_dict['token']}', '{token_dict['created_at']}');\n")
        f.write("\n")

        # Export activity_log
        f.write("-- Export Activity Log\n")
        cursor.execute("SELECT * FROM activity_log")
        activities = cursor.fetchall()
        for activity in activities:
            act_dict = dict(activity)
            user_id = act_dict.get('user_id') or 'NULL'
            f.write(f"INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES ")
            f.write(f"({act_dict['id']}, {user_id}, '{act_dict['user_name'].replace(chr(39), chr(39)+chr(39))}', ")
            f.write(f"'{act_dict['action']}', '{act_dict['item_type']}', '{act_dict['item_name'].replace(chr(39), chr(39)+chr(39))}', ")
            f.write(f"{act_dict.get('item_id') or 'NULL'}, '{act_dict['created_at']}');\n")
        f.write("\n")

        # Export user_badges
        f.write("-- Export User Badges\n")
        cursor.execute("SELECT * FROM user_badges")
        badges = cursor.fetchall()
        for badge in badges:
            badge_dict = dict(badge)
            f.write(f"INSERT INTO user_badges (id, user_id, badge_type, badge_name, earned_at) VALUES ")
            f.write(f"({badge_dict['id']}, {badge_dict['user_id']}, '{badge_dict['badge_type'].replace(chr(39), chr(39)+chr(39))}', ")
            f.write(f"'{badge_dict['badge_name'].replace(chr(39), chr(39)+chr(39))}', '{badge_dict['earned_at']}');\n")
        f.write("\n")

        # Export weekly_stats
        f.write("-- Export Weekly Stats\n")
        cursor.execute("SELECT * FROM weekly_stats")
        stats = cursor.fetchall()
        for stat in stats:
            stat_dict = dict(stat)
            f.write(f"INSERT INTO weekly_stats (id, user_id, week_start, views_count, downloads_count, ratings_count, comments_count) VALUES ")
            f.write(f"({stat_dict['id']}, {stat_dict['user_id']}, '{stat_dict['week_start']}', ")
            f.write(f"{stat_dict['views_count']}, {stat_dict['downloads_count']}, {stat_dict['ratings_count']}, {stat_dict['comments_count']});\n")
        f.write("\n")

        # Export category_banners
        f.write("-- Export Category Banners\n")
        cursor.execute("SELECT * FROM category_banners")
        banners = cursor.fetchall()
        for banner in banners:
            banner_dict = dict(banner)
            f.write(f"INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ")
            f.write(f"('{banner_dict['genre'].replace(chr(39), chr(39)+chr(39))}', '{fix_url(banner_dict['banner_url'].replace(chr(39), chr(39)+chr(39)))}', '{banner_dict['updated_at']}');\n")
        f.write("\n")

        # Export requests
        f.write("-- Export Requests\n")
        cursor.execute("SELECT * FROM requests")
        requests = cursor.fetchall()
        for req in requests:
            req_dict = dict(req)
            f.write(f"INSERT INTO requests (id, type, title, submitter_name, description, created_at) VALUES ")
            f.write(f"({req_dict['id']}, '{req_dict['type']}', '{req_dict['title'].replace(chr(39), chr(39)+chr(39))}', ")
            f.write(f"'{req_dict['submitter_name'].replace(chr(39), chr(39)+chr(39))}', '{req_dict['description'].replace(chr(39), chr(39)+chr(39))}', ")
            f.write(f"'{req_dict['created_at']}');\n")
        f.write("\n")

        f.write("COMMIT;\n")

    conn.close()
    print(f"[OK] Database exported successfully to: {OUTPUT_FILE}")
    print(f"[STATS] Total records exported:")
    print(f"   - Users: {len(users)}")
    print(f"   - Games: {len(games)}")
    print(f"   - Movies: {len(movies)}")
    print(f"   - Comments: {len(comments)}")
    print(f"   - Ratings: {len(ratings)}")
    print(f"   - Favorites: {len(favorites)}")
    print(f"   - Tokens: {len(tokens)}")
    print(f"   - Activities: {len(activities)}")
    print(f"   - Badges: {len(badges)}")
    print(f"   - Weekly Stats: {len(stats)}")
    print(f"   - Category Banners: {len(banners)}")
    print(f"   - Requests: {len(requests)}")

if __name__ == "__main__":
    export_database()