"""
Add min and high spec columns to games table
"""
import sqlite3
import os

DB_PATH = r'D:\PROJECTS WEBSITES AND SOFTWARES\SOFTWARES\xzy-local-data\xzy.db'

def add_columns():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Add minimum spec columns
    min_columns = [
        'min_os TEXT DEFAULT "Windows 10 64-bit"',
        'min_processor TEXT DEFAULT "Intel Core i3-4160"',
        'min_memory TEXT DEFAULT "8 GB RAM"',
        'min_graphics TEXT DEFAULT "GTX 950 / RX 470"',
        'min_storage TEXT DEFAULT "30 GB available"',
    ]
    
    # Add high spec columns
    high_columns = [
        'high_os TEXT DEFAULT "Windows 11 64-bit"',
        'high_processor TEXT DEFAULT "Intel Core i7-11700K"',
        'high_memory TEXT DEFAULT "16 GB RAM"',
        'high_graphics TEXT DEFAULT "RTX 3080 / RX 6900 XT"',
        'high_storage TEXT DEFAULT "75 GB NVMe SSD"',
    ]
    
    for col_def in min_columns + high_columns:
        col_name = col_def.split()[0]
        try:
            cursor.execute(f'ALTER TABLE games ADD COLUMN {col_def}')
            print(f'[OK] Added column: {col_name}')
        except sqlite3.OperationalError as e:
            if 'duplicate column name' in str(e).lower():
                print(f'[--] Column already exists: {col_name}')
            else:
                raise
    
    conn.commit()
    conn.close()
    print('\n[OK] Database migration complete!')

if __name__ == '__main__':
    add_columns()