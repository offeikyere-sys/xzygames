#!/usr/bin/env python3
"""
One-click deployment script for RunSite.
This script:
1. Exports SQLite database to PostgreSQL format
2. Generates postgresql_export.sql
3. Provides instructions for deployment

Usage:
    python deploy_to_runsite.py
"""
import os
import sys

def main():
    print("=" * 60)
    print("[ARROW] XZY Games - RunSite Deployment Tool")
    print("=" * 60)

    # Step 1: Export database
    print("\n[BOX] Step 1: Exporting SQLite database to PostgreSQL format...")
    from export_to_postgresql import export_database
    export_database()

    # Step 2: Verify export file
    sql_file = os.path.join(os.path.dirname(__file__), "postgresql_export.sql")
    if os.path.exists(sql_file):
        size_mb = os.path.getsize(sql_file) / (1024 * 1024)
        print(f"\n[OK] PostgreSQL export file created: {sql_file} ({size_mb:.2f} MB)")
    else:
        print("\n[FAIL] Failed to create export file")
        sys.exit(1)

    # Step 3: Instructions
    print("\n" + "=" * 60)
    print("[LIST] Next Steps for RunSite Deployment:")
    print("=" * 60)
    print("""
1. Push this code to GitHub:
   git add .
   git commit -m "Ready for RunSite deployment"
   git push origin master

2. On RunSite Cloud:
   - Create a new Web Service
   - Connect your GitHub repository
   - Set the following environment variables in RunSite dashboard:
     
     DATABASE_URL = postgresql://xzy_gaming_user:UNvgmaJrj73cPknksHZVihQY@dpg-kgpca7kjly0ylg9yt289.eu-central-postgres.runsite.app/xzy_gaming
     ALLOWED_ORIGIN = *
     
   - The Dockerfile will be auto-detected
   - Build and deploy!

3. The first deploy will:
   - Install all dependencies
   - Build the frontend
   - Start the backend server on port 5050
   - Auto-create all database tables on first run

4. Database Import (first time only):
   After deployment, run on RunSite:
   python backend/import_to_postgresql.py
   
   Or the tables will be empty - your data from postgresql_export.sql
   will need to be imported via RunSite's PostgreSQL admin panel.

5. [CHECKMARK] Your site will be live at: https://your-app.runsite.app
""")

    print("[OK] Deployment preparation complete!")


if __name__ == "__main__":
    main()