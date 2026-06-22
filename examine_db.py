import sqlite3
import os
import sys
import io

# Fix Unicode encoding for Windows console
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

db_path = os.path.join('neo-web', 'backend', 'xzy.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Get all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = cursor.fetchall()

print('=== SQLITE DATABASE: xzy.db ===\n')
print(f'Location: {os.path.abspath(db_path)}\n')
print('=' * 60)

for table in tables:
    table_name = table[0]
    print(f'\nTABLE: {table_name}')
    print('-' * 60)
    
    # Get columns
    cursor.execute(f'PRAGMA table_info({table_name})')
    columns = cursor.fetchall()
    print(f'Columns: {[col[1] for col in columns]}')
    
    # Get row count
    cursor.execute(f'SELECT COUNT(*) FROM {table_name}')
    count = cursor.fetchone()[0]
    print(f'Total rows: {count}')
    
    # Get sample data (first 3 rows)
    if count > 0:
        cursor.execute(f'SELECT * FROM {table_name} LIMIT 3')
        rows = cursor.fetchall()
        print('Sample data:')
        for row in rows:
            print(f'  {row}')
    print()

conn.close()