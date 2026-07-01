"""Seed test Windows OS entries into the operating_systems table."""
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from database import get_db, init_db

# First ensure the table exists
init_db()

db = get_db()
try:
    # Check if we already have data
    existing = db.execute("SELECT COUNT(*) as cnt FROM operating_systems").fetchone()
    if existing and existing["cnt"] > 0:
        print(f"Already have {existing['cnt']} OS entries. Skipping seed.")
        db.close()
        sys.exit(0)

    os_entries = [
        {
            "title": "Windows 11 24H2",
            "version": "24H2",
            "build_info": "Build 26100.1742",
            "genre": "Windows 11",
            "rating": 4.8,
            "downloads": 15420,
            "description": "The latest Windows 11 24H2 update with AI-powered features, improved performance, and enhanced security. Includes Copilot integration, improved File Explorer, and better multitasking with Snap Layouts.",
            "wallpaper_url": "",
            "download_links": "",
            "trailer_url": "",
            "screenshots": "",
            "install_guide_text": "## Windows 11 24H2 Installation Guide\n\n### Requirements:\n- 1 GHz or faster processor\n- 4 GB RAM minimum (8 GB recommended)\n- 64 GB storage\n- UEFI with Secure Boot\n- TPM 2.0\n\n### Installation Steps:\n1. Download the ISO file\n2. Create a bootable USB using Rufus or Media Creation Tool\n3. Boot from the USB drive\n4. Follow the on-screen setup instructions\n5. Enter your product key (if required)\n6. Select your region and keyboard layout\n7. Sign in with Microsoft account or create a local account\n\n### Tips:\n- Back up your data before installing\n- Make sure your PC meets the requirements\n- Check for driver updates after installation",
            "install_video_url": "",
            "color": "#0078d4",
        },
        {
            "title": "Windows 11 23H2",
            "version": "23H2",
            "build_info": "Build 22631.4602",
            "genre": "Windows 11",
            "rating": 4.7,
            "downloads": 28340,
            "description": "Windows 11 23H2 brings new features like Copilot (Preview), enhanced Windows 365, modernized File Explorer, and improved accessibility tools.",
            "wallpaper_url": "",
            "download_links": "",
            "trailer_url": "",
            "screenshots": "",
            "install_guide_text": "## Windows 11 23H2 Installation Guide\n\n### Requirements:\n- 1 GHz or faster processor\n- 4 GB RAM minimum\n- 64 GB storage\n- UEFI with Secure Boot\n- TPM 2.0\n\n### Installation Steps:\n1. Download the ISO\n2. Create bootable media\n3. Install following on-screen instructions",
            "install_video_url": "",
            "color": "#0078d4",
        },
        {
            "title": "Windows 10 22H2",
            "version": "22H2",
            "build_info": "Build 19045.4842",
            "genre": "Windows 10",
            "rating": 4.6,
            "downloads": 45210,
            "description": "The final feature update for Windows 10. Windows 10 22H2 provides a stable and reliable experience with extended security updates until October 2025.",
            "wallpaper_url": "",
            "download_links": "",
            "trailer_url": "",
            "screenshots": "",
            "install_guide_text": "## Windows 10 22H2 Installation Guide\n\n### Requirements:\n- 1 GHz processor\n- 1 GB RAM (32-bit) / 2 GB RAM (64-bit)\n- 16 GB storage (32-bit) / 20 GB (64-bit)\n\n### Installation Steps:\n1. Download Windows 10 22H2 ISO\n2. Create bootable USB\n3. Boot and install",
            "install_video_url": "",
            "color": "#0078d4",
        },
        {
            "title": "Windows 11 22H2",
            "version": "22H2",
            "build_info": "Build 22621.4037",
            "genre": "Windows 11",
            "rating": 4.5,
            "downloads": 18230,
            "description": "Windows 11 22H2 was the first major update to Windows 11, introducing tabs in File Explorer, suggested actions, new touch gestures, and improved Start menu folders.",
            "wallpaper_url": "",
            "download_links": "",
            "trailer_url": "",
            "screenshots": "",
            "install_guide_text": "## Windows 11 22H2 Installation Guide\n\nStandard Windows 11 installation procedure applies.",
            "install_video_url": "",
            "color": "#0078d4",
        },
    ]

    for entry in os_entries:
        db.execute(
            """INSERT INTO operating_systems 
               (title, version, build_info, genre, rating, downloads, description, wallpaper_url, download_links, trailer_url, screenshots, install_guide_text, install_video_url, color)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
            (
                entry["title"],
                entry["version"],
                entry["build_info"],
                entry["genre"],
                entry["rating"],
                entry["downloads"],
                entry["description"],
                entry["wallpaper_url"],
                entry["download_links"],
                entry["trailer_url"],
                entry["screenshots"],
                entry["install_guide_text"],
                entry["install_video_url"],
                entry["color"],
            )
        )

    db.commit()
    print(f"Seeded {len(os_entries)} Windows OS entries successfully!")

except Exception as e:
    print(f"Error seeding OS data: {e}")
finally:
    db.close()