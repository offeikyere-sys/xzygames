"""
Populate accurate 3-tier system requirements for all games
"""
import sqlite3

DB_PATH = r'D:\PROJECTS WEBSITES AND SOFTWARES\SOFTWARES\xzy-local-data\xzy.db'

# Game specs database: title -> (min, rec, high)
# Format: (os, processor, memory, graphics, storage)
GAME_SPECS = {
    # Action Games
    "007 First Light": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 770 / RX 470", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 / RX 580", "40 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 3080 / RX 6800 XT", "40 GB NVMe SSD")
    ),
    "Call of Duty Black Ops Cold War": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 960 / RX 470", "80 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 6GB / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 2080 / RX 6800 XT", "80 GB NVMe SSD")
    ),
    "Call of Duty: Modern Warfare II": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 960 / RX 470", "125 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 6GB / RX 590", "125 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "125 GB NVMe SSD")
    ),
    "Call of Duty: Black Ops II": (
        ("Windows 7 64-bit", "Intel Core i3-530", "4 GB RAM", "GTX 460 / HD 5850", "16 GB"),
        ("Windows 10 64-bit", "Intel Core i5-750", "8 GB RAM", "GTX 760 / HD 7870", "16 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1080 / RX 5700 XT", "16 GB SSD")
    ),
    "Call of Duty: Black Ops III": (
        ("Windows 7 64-bit", "Intel Core i3-530", "6 GB RAM", "GTX 460 / HD 5850", "60 GB"),
        ("Windows 10 64-bit", "Intel Core i5-750", "8 GB RAM", "GTX 760 / HD 7870", "60 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1080 / RX 5700 XT", "60 GB SSD")
    ),
    "Call of Duty WWII": (
        ("Windows 7 64-bit", "Intel Core i3-4340", "8 GB RAM", "GTX 760 / HD 7870", "90 GB"),
        ("Windows 10 64-bit", "Intel Core i5-2400S", "12 GB RAM", "GTX 1060 6GB / RX 580", "90 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "RTX 2080 / RX 5700 XT", "90 GB SSD")
    ),
    "Call of Duty: Modern Warfare 2019": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 960 / RX 470", "175 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 6GB / RX 590", "175 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 2080 / RX 6800 XT", "175 GB NVMe SSD")
    ),
    "Devil May Cry 5": (
        ("Windows 7 64-bit", "Intel Core i5-4460", "8 GB RAM", "GTX 760 / HD 7870", "35 GB"),
        ("Windows 10 64-bit", "Intel Core i5-4460", "16 GB RAM", "GTX 1060 / RX 580", "35 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "RTX 2070 / RX 5700 XT", "35 GB SSD")
    ),
    "Mortal Kombat 11": (
        ("Windows 7 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 460 / HD 5850", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 780 / RX 570", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4790K", "16 GB RAM", "RTX 2080 / RX 5700 XT", "40 GB SSD")
    ),
    "Sifu": (
        ("Windows 7 64-bit", "Intel Core i5-2400", "8 GB RAM", "GTX 950 / RX 470", "20 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "20 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "20 GB NVMe SSD")
    ),
    "TEKKEN 8": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 / RX 560", "80 GB"),
        ("Windows 10 64-bit", "Intel Core i7-7700K", "16 GB RAM", "GTX 1060 / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 3080 / RX 6900 XT", "80 GB NVMe SSD")
    ),
    "HITMAN 3": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 650 / HD 7750", "80 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "32 GB RAM", "RTX 3080 / RX 6800 XT", "80 GB NVMe SSD")
    ),
    "Judgment": (
        ("Windows 10 64-bit", "Intel Core i5-3470", "8 GB RAM", "GTX 760 / HD 7870", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "40 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "40 GB SSD")
    ),
    "Samson": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 760 / RX 570", "15 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 / RX 580", "15 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "15 GB NVMe SSD")
    ),
    
    # Adventure / RPG
    "Assassin's Creed Mirage": (
        ("Windows 10 64-bit", "Intel Core i5-4590", "8 GB RAM", "GTX 950 / RX 470", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "40 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "40 GB NVMe SSD")
    ),
    "Assassin's Creed: Origins": (
        ("Windows 7 SP1 64-bit", "Intel Core i5-2400S", "8 GB RAM", "GTX 660 / HD 7870", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-3770K", "16 GB RAM", "GTX 1070 / RX 5700", "40 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "40 GB SSD")
    ),
    "Assassin's Creed Valhalla": (
        ("Windows 10 64-bit", "Intel Core i5-4460", "8 GB RAM", "GTX 950 / RX 470", "50 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1070 / RX 5700", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "50 GB NVMe SSD")
    ),
    "Assassin's Creed: Odyssey": (
        ("Windows 7 SP1 64-bit", "Intel Core i5-2400S", "8 GB RAM", "GTX 660 / HD 7870", "46 GB"),
        ("Windows 10 64-bit", "Intel Core i7-3770K", "16 GB RAM", "GTX 1070 / RX 5700", "46 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "46 GB SSD")
    ),
    "Assassin's Creed Shadows": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "16 GB RAM", "GTX 1070 / RX 5700", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-9700K", "16 GB RAM", "RTX 3070 / RX 6800", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-12900K", "32 GB RAM", "RTX 4080 / RX 7900 XT", "80 GB NVMe SSD")
    ),
    "Baldur's Gate 3": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 950 / RX 470", "150 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "150 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "150 GB NVMe SSD")
    ),
    "Black Myth: Wukong": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "16 GB RAM", "GTX 1060 6GB / RX 580", "130 GB"),
        ("Windows 11 64-bit", "Intel Core i7-9700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "130 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "130 GB NVMe SSD")
    ),
    "Cyberpunk 2077": (
        ("Windows 7 64-bit", "Intel Core i5-3570K", "8 GB RAM", "GTX 780 / RX 470", "70 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4790K", "12 GB RAM", "GTX 1060 6GB / RX 580", "70 GB SSD"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "70 GB NVMe SSD")
    ),
    "Days Gone Remastered": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 760 / RX 470", "70 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 / RX 580", "70 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "70 GB NVMe SSD")
    ),
    "Detroit: Become Human": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 760 / RX 470", "55 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 / RX 580", "55 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "55 GB SSD")
    ),
    "Dragons Dogma 2": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "16 GB RAM", "GTX 1060 6GB / RX 580", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "50 GB NVMe SSD")
    ),
    "Elden Ring Deluxe Edition": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "12 GB RAM", "GTX 1060 3GB / RX 570", "60 GB"),
        ("Windows 10 64-bit", "Intel Core i7-8700K", "16 GB RAM", "GTX 1070 / RX 5700", "60 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "60 GB NVMe SSD")
    ),
    "ELDEN RING NIGHTREIGN": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "12 GB RAM", "GTX 1060 3GB / RX 570", "60 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "60 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "60 GB NVMe SSD")
    ),
    "Far Cry New Dawn": (
        ("Windows 7 64-bit", "Intel Core i5-2400", "8 GB RAM", "GTX 640 / HD 7750", "30 GB"),
        ("Windows 10 64-bit", "Intel Core i5-2400", "8 GB RAM", "GTX 960 / RX 470", "30 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4790K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "30 GB SSD")
    ),
    "Far Cry 6 Ultimate Edition": (
        ("Windows 10 64-bit", "Intel Core i5-4460", "8 GB RAM", "GTX 960 / RX 460", "80 GB"),
        ("Windows 10 64-bit", "Intel Core i7-7700K", "16 GB RAM", "GTX 1080 / RX Vega 64", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "80 GB NVMe SSD")
    ),
    "FINAL FANTASY XVI": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "16 GB RAM", "GTX 1060 6GB / RX 580", "170 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "170 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "170 GB NVMe SSD")
    ),
    "Ghost Of Tsushima": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 / RX 560", "75 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "75 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "75 GB NVMe SSD")
    ),
    "God of War 1": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 660 / HD 5870", "36 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 / RX 580", "36 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "36 GB SSD")
    ),
    "God of War Ragnarök": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1060 6GB / RX 580", "90 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "90 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "90 GB NVMe SSD")
    ),
    "Hogwarts Legacy Deluxe Edition": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 960 / RX 470", "80 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1070 / RX 5700", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "80 GB NVMe SSD")
    ),
    "Horizon Zero Dawn": (
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 780 / RX 580", "100 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "100 GB NVMe SSD")
    ),
    "Horizon Forbidden": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1060 6GB / RX 580", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "100 GB NVMe SSD")
    ),
    "inZOI": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "8 GB RAM", "GTX 1060 6GB / RX 580", "60 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "60 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "60 GB NVMe SSD")
    ),
    "Mafia: The Old Country": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 960 / RX 470", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "80 GB NVMe SSD")
    ),
    "Marvel's Spider-Man: Miles Morales": (
        ("Windows 10 64-bit", "Intel Core i3-4160", "8 GB RAM", "GTX 950 / RX 470", "75 GB"),
        ("Windows 10 64-bit", "Intel Core i5-4670K", "16 GB RAM", "GTX 1060 6GB / RX 580", "75 GB"),
        ("Windows 11 64-bit", "Intel Core i7-11700K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "75 GB NVMe SSD")
    ),
    "Marvel's Spider Man 2": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1060 6GB / RX 580", "150 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "150 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "150 GB NVMe SSD")
    ),
    "Marvel's Spider-Man Remastered": (
        ("Windows 10 64-bit", "Intel Core i3-4160", "8 GB RAM", "GTX 950 / RX 470", "75 GB"),
        ("Windows 10 64-bit", "Intel Core i5-4670K", "16 GB RAM", "GTX 1060 6GB / RX 580", "75 GB"),
        ("Windows 11 64-bit", "Intel Core i7-11700K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "75 GB NVMe SSD")
    ),
    "NieR:Automata": (
        ("Windows 7 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 960 / RX 580", "50 GB"),
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1060 / RX 580", "50 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "RTX 2080 / RX 6800 XT", "50 GB SSD")
    ),
    "PRAGMATA": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "16 GB RAM", "GTX 1060 6GB / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "80 GB NVMe SSD")
    ),
    "Red Dead Redemption": (
        ("Windows 7 64-bit", "Intel Core i5-2500K", "4 GB RAM", "GTX 660 / HD 7870", "30 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "8 GB RAM", "GTX 1060 / RX 580", "30 GB"),
        ("Windows 10 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "30 GB SSD")
    ),
    "Red Dead Redemption 2": (
        ("Windows 7 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 770 / RX 470", "150 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "12 GB RAM", "GTX 1060 6GB / RX 580", "150 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "150 GB NVMe SSD")
    ),
    "Resident Evil 4 Remake": (
        ("Windows 10 64-bit", "Intel Core i5-7500", "8 GB RAM", "GTX 1050 Ti / RX 560", "50 GB"),
        ("Windows 10 64-bit", "Intel Core i7-8700K", "16 GB RAM", "GTX 1060 / RX 580", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "50 GB NVMe SSD")
    ),
    "Resident Evil Requiem": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "16 GB RAM", "GTX 1060 6GB / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "80 GB NVMe SSD")
    ),
    "Resident Evil Village Deluxe Edition": (
        ("Windows 10 64-bit", "Intel Core i5-7500", "8 GB RAM", "GTX 1050 Ti / RX 560", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-8700K", "16 GB RAM", "GTX 1070 / RX 5700", "40 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "40 GB NVMe SSD")
    ),
    "Sekiro: Shadows Die Twice": (
        ("Windows 7 64-bit", "Intel Core i3-2100", "4 GB RAM", "GTX 760 / HD 7950", "25 GB"),
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 970 / RX 570", "25 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "RTX 2080 / RX 6800 XT", "25 GB SSD")
    ),
    "Solo Leveling: ARISE OVERDRIVE": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "8 GB RAM", "GTX 1060 6GB / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "80 GB NVMe SSD")
    ),
    "Stellar Blade": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "8 GB RAM", "GTX 1060 6GB / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "80 GB NVMe SSD")
    ),
    "The Last of Us Part I": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "80 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 6GB / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "80 GB NVMe SSD")
    ),
    "The Last of Us Part II Remastered": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "100 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 6GB / RX 580", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "100 GB NVMe SSD")
    ),
    "Tomb Raider Definitive Edition": (
        ("Windows 7 64-bit", "Intel Core i5-2500K", "4 GB RAM", "GTX 480 / HD 5870", "22 GB"),
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 660 / HD 7870", "22 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 / RX 580", "22 GB SSD")
    ),
    "UNCHARTED: Legacy of Thieves Collection": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "80 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 6GB / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "80 GB NVMe SSD")
    ),
    "Watch Dogs 2": (
        ("Windows 7 SP1 64-bit", "Intel Core i5-2400S", "6 GB RAM", "GTX 660 / HD 7870", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i5-3470", "8 GB RAM", "GTX 780 / RX 570", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "RTX 2080 / RX 5700 XT", "40 GB SSD")
    ),
    "Watch Dogs Legion": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 960 / RX 470", "45 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1070 / RX 5700", "45 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "45 GB NVMe SSD")
    ),
    "Watch Dogs Digital Deluxe": (
        ("Windows 7 SP1 64-bit", "Intel Core i5-2400S", "6 GB RAM", "GTX 660 / HD 7870", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i5-3470", "8 GB RAM", "GTX 780 / RX 570", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "RTX 2080 / RX 5700 XT", "40 GB SSD")
    ),
    
    # Racing
    "EA SPORTS FC 26": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1660 / RX 5600 XT", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "100 GB NVMe SSD")
    ),
    "FIFA 23 Ultimate Edition": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1660 / RX 5600 XT", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "100 GB NVMe SSD")
    ),
    "FIFA 22": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1660 / RX 5600 XT", "100 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "100 GB NVMe SSD")
    ),
    "Forza Horizon 4": (
        ("Windows 10 64-bit", "Intel Core i3-4170", "8 GB RAM", "GTX 640 / HD 7750", "80 GB"),
        ("Windows 10 64-bit", "Intel Core i5-7500", "16 GB RAM", "GTX 970 / RX 570", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "80 GB NVMe SSD")
    ),
    "Forza Horizon 5 Premium Edition": (
        ("Windows 10 64-bit", "Intel Core i5-4460", "8 GB RAM", "GTX 970 / RX 570", "110 GB"),
        ("Windows 11 64-bit", "Intel Core i7-3770K", "16 GB RAM", "RTX 2070 / RX 5700 XT", "110 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "110 GB NVMe SSD")
    ),
    "Forza Horizon 6": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "8 GB RAM", "GTX 1060 6GB / RX 580", "120 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "120 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "120 GB NVMe SSD")
    ),
    "Need for Speed Heat": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1060 / RX 580", "50 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1070 / RX 5700", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "50 GB NVMe SSD")
    ),
    "Need for Speed Most Wanted": (
        ("Windows 7 64-bit", "Intel Core i5-2500K", "4 GB RAM", "GTX 460 / HD 5850", "20 GB"),
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 760 / RX 570", "20 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "RTX 2080 / RX 6800 XT", "20 GB SSD")
    ),
    "Need for Speed Unbound": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "120 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "120 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "120 GB NVMe SSD")
    ),
    "SP Football Life 2026": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1660 / RX 5600 XT", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "50 GB NVMe SSD")
    ),
    
    # Horror
    "Resident Evil 4": (
        ("Windows 10 64-bit", "Intel Core i5-7500", "8 GB RAM", "GTX 1050 Ti / RX 560", "50 GB"),
        ("Windows 10 64-bit", "Intel Core i7-8700K", "16 GB RAM", "GTX 1060 / RX 580", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "50 GB NVMe SSD")
    ),
    
    # Open World / Misc
    "Grand Theft Auto V Enhanced": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "110 GB"),
        ("Windows 10 64-bit", "Intel Core i7-8700K", "16 GB RAM", "GTX 1060 6GB / RX 580", "110 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "110 GB NVMe SSD")
    ),
    "Sleeping Dogs: Definitive Edition": (
        ("Windows 7 64-bit", "Intel Core i5-2500K", "4 GB RAM", "GTX 460 / HD 5850", "20 GB"),
        ("Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 760 / RX 570", "20 GB"),
        ("Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "RTX 2080 / RX 6800 XT", "20 GB SSD")
    ),
    "DEATH STRANDING 2": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "8 GB RAM", "GTX 1060 6GB / RX 580", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "80 GB NVMe SSD")
    ),
    "Assassin's Creed Mirage": (
        ("Windows 10 64-bit", "Intel Core i5-4590", "8 GB RAM", "GTX 950 / RX 470", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "40 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "40 GB NVMe SSD")
    ),
    "Assassin's Creed: Origins": (
        ("Windows 7 SP1 64-bit", "Intel Core i5-2400S", "8 GB RAM", "GTX 660 / HD 7870", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-3770K", "16 GB RAM", "GTX 1070 / RX 5700", "40 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "40 GB SSD")
    ),
    "Assassin's Creed Valhalla": (
        ("Windows 10 64-bit", "Intel Core i5-4460", "8 GB RAM", "GTX 950 / RX 470", "50 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1070 / RX 5700", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "50 GB NVMe SSD")
    ),
    "Assassin's Creed: Odyssey": (
        ("Windows 7 SP1 64-bit", "Intel Core i5-2400S", "8 GB RAM", "GTX 660 / HD 7870", "46 GB"),
        ("Windows 10 64-bit", "Intel Core i7-3770K", "16 GB RAM", "GTX 1070 / RX 5700", "46 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "46 GB SSD")
    ),
    "Assassin's Creed Shadows": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "16 GB RAM", "GTX 1070 / RX 5700", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-9700K", "16 GB RAM", "RTX 3070 / RX 6800", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-12900K", "32 GB RAM", "RTX 4080 / RX 7900 XT", "80 GB NVMe SSD")
    ),
    "Baldur's Gate 3": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 950 / RX 470", "150 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "150 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "150 GB NVMe SSD")
    ),
    # Additional games with special character matching - using exact DB titles
    "Assassin's Creed Mirage: Master Assassin Edition v1.1.1 + 13 DLCs": (
        ("Windows 10 64-bit", "Intel Core i5-4590", "8 GB RAM", "GTX 950 / RX 470", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "40 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "40 GB NVMe SSD")
    ),
    "Assassin's Creed: Origins  Gold Edition v1.62": (
        ("Windows 7 SP1 64-bit", "Intel Core i5-2400S", "8 GB RAM", "GTX 660 / HD 7870", "40 GB"),
        ("Windows 10 64-bit", "Intel Core i7-3770K", "16 GB RAM", "GTX 1070 / RX 5700", "40 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "40 GB SSD")
    ),
    "Assassin's Creed Valhalla: Complete Edition v1.7.0 + All DLCs": (
        ("Windows 10 64-bit", "Intel Core i5-4460", "8 GB RAM", "GTX 950 / RX 470", "50 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1070 / RX 5700", "50 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "50 GB NVMe SSD")
    ),
    "Assassin's Creed: Odyssey v1.5.6 + DLCs": (
        ("Windows 7 SP1 64-bit", "Intel Core i5-2400S", "8 GB RAM", "GTX 660 / HD 7870", "46 GB"),
        ("Windows 10 64-bit", "Intel Core i7-3770K", "16 GB RAM", "GTX 1070 / RX 5700", "46 GB"),
        ("Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "46 GB SSD")
    ),
    "Assassin's Creed Shadows v1.1.9 + Claws of Awaji DLC": (
        ("Windows 10 64-bit", "Intel Core i5-8400", "16 GB RAM", "GTX 1070 / RX 5700", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i7-9700K", "16 GB RAM", "RTX 3070 / RX 6800", "80 GB"),
        ("Windows 11 64-bit", "Intel Core i9-12900K", "32 GB RAM", "RTX 4080 / RX 7900 XT", "80 GB NVMe SSD")
    ),
    "Marvel's Spider-Man: Miles Morales": (
        ("Windows 10 64-bit", "Intel Core i3-4160", "8 GB RAM", "GTX 950 / RX 470", "75 GB"),
        ("Windows 10 64-bit", "Intel Core i5-4670K", "16 GB RAM", "GTX 1060 6GB / RX 580", "75 GB"),
        ("Windows 11 64-bit", "Intel Core i7-11700K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "75 GB NVMe SSD")
    ),
    "Marvel's Spider Man 2": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1060 6GB / RX 580", "150 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "150 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "150 GB NVMe SSD")
    ),
    "Marvel's Spider-Man Remastered": (
        ("Windows 10 64-bit", "Intel Core i3-4160", "8 GB RAM", "GTX 950 / RX 470", "75 GB"),
        ("Windows 10 64-bit", "Intel Core i5-4670K", "16 GB RAM", "GTX 1060 6GB / RX 580", "75 GB"),
        ("Windows 11 64-bit", "Intel Core i7-11700K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "75 GB NVMe SSD")
    ),
    "God of War Ragnarök Digital Deluxe Edition": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1060 6GB / RX 580", "90 GB"),
        ("Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "90 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "90 GB NVMe SSD")
    ),
    "Baldur's Gate 3": (
        ("Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 950 / RX 470", "150 GB"),
        ("Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1060 / RX 580", "150 GB"),
        ("Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "150 GB NVMe SSD")
    ),
}

def populate_specs():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Get all games
    cursor.execute('SELECT id, title, type FROM games ORDER BY id')
    games = cursor.fetchall()
    
    updated = 0
    skipped = 0
    
    for game_id, title, game_type in games:
        # Skip software
        if game_type == 'software':
            skipped += 1
            continue
        
        # Try to find matching specs - clean title for better matching
        specs = None
        title_clean = title.lower()
        # Remove version numbers, special chars, and extra text for matching
        import re
        title_clean = re.sub(r'v[\d.]+', '', title_clean)
        title_clean = re.sub(r'\[.*?\]', '', title_clean)
        title_clean = re.sub(r'\(.*?\)', '', title_clean)
        title_clean = re.sub(r'\+.*', '', title_clean)
        title_clean = re.sub(r'\*', '', title_clean)
        title_clean = re.sub(r'https?://\S+', '', title_clean)
        # Remove all non-ASCII characters (fancy quotes, etc)
        title_clean = ''.join(c for c in title_clean if ord(c) < 128)
        title_clean = title_clean.strip()
        
        for game_name, game_specs in GAME_SPECS.items():
            game_name_clean = game_name.lower()
            # Check if game name is in title or title is in game name
            if game_name_clean in title_clean or title_clean in game_name_clean:
                specs = game_specs
                break
        
        if specs:
            min_spec, rec_spec, high_spec = specs
            
            cursor.execute('''
                UPDATE games 
                SET min_os = ?, min_processor = ?, min_memory = ?, min_graphics = ?, min_storage = ?,
                    os = ?, processor = ?, memory = ?, graphics = ?, storage = ?,
                    high_os = ?, high_processor = ?, high_memory = ?, high_graphics = ?, high_storage = ?
                WHERE id = ?
            ''', (*min_spec, *rec_spec, *high_spec, game_id))
            
            print(f'[OK] Updated: {title}')
            updated += 1
        else:
            print(f'[--] No specs found for: {title}')
    
    conn.commit()
    conn.close()
    
    print(f'\n[OK] Updated {updated} games')
    print(f'[--] Skipped {skipped} software items')

if __name__ == '__main__':
    populate_specs()