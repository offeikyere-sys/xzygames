"""
Update the 10 newly added games with 3-tier PC specs
"""
import sqlite3

DB_PATH = r'D:\PROJECTS WEBSITES AND SOFTWARES\SOFTWARES\xzy-local-data\xzy.db'

def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # (id, 
    #  min_os, min_cpu, min_ram, min_gpu, min_storage,
    #  rec_os, rec_cpu, rec_ram, rec_gpu, rec_storage,
    #  high_os, high_cpu, high_ram, high_gpu, high_storage)
    data = [
        (133, # FIFA 19
         "Windows 7 64-bit", "Intel Core i3-2100", "4 GB RAM", "GTX 460 / HD 5850", "50 GB",
         "Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 670 / HD 7970", "50 GB",
         "Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1080 / RX 580", "50 GB SSD"),
        (134, # Bloodborne + ShadPS4
         "Windows 10 64-bit", "Intel Core i5-8400", "8 GB RAM", "GTX 1060 6GB / RX 580", "50 GB",
         "Windows 10 64-bit", "Intel Core i7-8700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "50 GB SSD",
         "Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "50 GB NVMe SSD"),
        (135, # GTA San Andreas Retextured
         "Windows 7 64-bit", "Intel Core i3-2100", "4 GB RAM", "GTX 460 / HD 5850", "30 GB",
         "Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 660 / HD 7870", "30 GB",
         "Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1080 / RX 580", "30 GB SSD"),
        (136, # GTA 5
         "Windows 7 64-bit", "Intel Core i5-3470", "8 GB RAM", "GTX 660 / HD 7870", "72 GB",
         "Windows 10 64-bit", "Intel Core i5-3570K", "8 GB RAM", "GTX 780 / R9 280X", "72 GB",
         "Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "GTX 1080 / RX Vega 64", "72 GB SSD"),
        (137, # Dying Light The Beast
         "Windows 10 64-bit", "Intel Core i5-7500", "8 GB RAM", "GTX 1050 Ti / RX 560", "50 GB",
         "Windows 10 64-bit", "Intel Core i7-8700K", "16 GB RAM", "GTX 1070 / RX 5700", "50 GB",
         "Windows 11 64-bit", "Intel Core i9-10900K", "16 GB RAM", "RTX 3080 / RX 6900 XT", "50 GB NVMe SSD"),
        (138, # WWE 2K26
         "Windows 10 64-bit", "Intel Core i5-6600K", "8 GB RAM", "GTX 1050 Ti / RX 560", "60 GB",
         "Windows 10 64-bit", "Intel Core i7-7700K", "16 GB RAM", "GTX 1070 / RX 5700", "60 GB",
         "Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 3080 / RX 6900 XT", "60 GB NVMe SSD"),
        (139, # The Witcher 3 Wild Hunt
         "Windows 7 64-bit", "Intel Core i5-2500K", "6 GB RAM", "GTX 660 / HD 7870", "35 GB",
         "Windows 10 64-bit", "Intel Core i7-3770K", "8 GB RAM", "GTX 770 / R9 290", "35 GB",
         "Windows 10 64-bit", "Intel Core i7-6700K", "16 GB RAM", "RTX 3080 / RX 6800 XT", "35 GB NVMe SSD"),
        (140, # Directive 8020
         "Windows 10 64-bit", "Intel Core i5-8400", "8 GB RAM", "GTX 1060 6GB / RX 580", "60 GB",
         "Windows 10 64-bit", "Intel Core i7-9700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "60 GB SSD",
         "Windows 11 64-bit", "Intel Core i9-12900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "60 GB NVMe SSD"),
        (141, # Clair Obscur Expedition 33
         "Windows 10 64-bit", "Intel Core i5-8400", "16 GB RAM", "GTX 1060 6GB / RX 580", "80 GB",
         "Windows 11 64-bit", "Intel Core i7-10700K", "16 GB RAM", "RTX 2060 / RX 5700 XT", "80 GB SSD",
         "Windows 11 64-bit", "Intel Core i9-10900K", "32 GB RAM", "RTX 4080 / RX 7900 XTX", "80 GB NVMe SSD"),
        (142, # Call of Duty Vanguard
         "Windows 10 64-bit", "Intel Core i5-2500K", "8 GB RAM", "GTX 960 / RX 470", "80 GB",
         "Windows 10 64-bit", "Intel Core i7-4770K", "16 GB RAM", "GTX 1060 6GB / RX 580", "80 GB",
         "Windows 11 64-bit", "Intel Core i9-9900K", "16 GB RAM", "RTX 2080 / RX 6800 XT", "80 GB NVMe SSD"),
    ]

    for d in data:
        gid = d[0]
        sql = """
            UPDATE games SET
                min_os=?, min_processor=?, min_memory=?, min_graphics=?, min_storage=?,
                os=?, processor=?, memory=?, graphics=?, storage=?,
                high_os=?, high_processor=?, high_memory=?, high_graphics=?, high_storage=?
            WHERE id=?
        """
        values = (*d[1:16], gid)
        cursor.execute(sql, values)
        print(f"[OK] Updated ID {gid}")

    conn.commit()
    conn.close()
    print("\nAll 10 new games updated!")

if __name__ == "__main__":
    main()