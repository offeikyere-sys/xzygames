import re, os

files = [
    'src/components/layout/NeoGamesLayout.tsx',
    'src/components/games/CategoryPage.tsx',
    'src/components/robot/FloatingRobot.tsx',
    'src/components/ui/SimpleCarousel.tsx',
    'src/components/ui/splite.tsx',
]

for f in files:
    if not os.path.exists(f):
        print(f'MISSING: {f}')
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    # Remove lines that are pure conflict markers
    lines = content.split('\n')
    clean_lines = [l for l in lines if not re.match(r'^<<<<<<< |^=======$|^>>>>>>> ', l)]
    new_content = '\n'.join(clean_lines)
    
    with open(f, 'w', encoding='utf-8') as fh:
        fh.write(new_content)
    print(f'FIXED: {f} ({len(lines)-len(clean_lines)} conflict lines removed)')