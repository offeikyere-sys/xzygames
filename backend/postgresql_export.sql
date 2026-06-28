-- XZY Games Database Export for PostgreSQL
-- Generated: 2026-06-28 02:53:04
-- Target: RunSite PostgreSQL Database

BEGIN;

-- Export Users
INSERT INTO users (id, name, email, password, avatar_color, is_admin, email_verified, avatar_url, supabase_id, created_at) VALUES (1, 'DANNY', 'offeikyere@gmail.com', '059f6989d610d55f46bd9a235ba098223e5f0054715962995f74037a279cbd79', '#ec4899', TRUE, FALSE, '', '', '2026-06-13 04:48:36') ON CONFLICT (id) DO NOTHING;
INSERT INTO users (id, name, email, password, avatar_color, is_admin, email_verified, avatar_url, supabase_id, created_at) VALUES (2, 'XZY ADMIN', 'danny.exzy@icloud.com', '479ad8ded87e0bfcfcbcae7673d28507b735936586f008213e792925c802e9d6', '#ec4899', TRUE, TRUE, '/uploads/avatar-2-1813d153.png', '', '2026-06-13 05:52:09') ON CONFLICT (id) DO NOTHING;
INSERT INTO users (id, name, email, password, avatar_color, is_admin, email_verified, avatar_url, supabase_id, created_at) VALUES (9, 'vivinash', 'vivinash685@gmail.com', '3ee7eeb33194fff16fedc1f1e42d3d6635f5b05739500cc3bf28f57b1b1bdafa', '#ec4899', FALSE, TRUE, '', '', '2026-06-25 01:45:39') ON CONFLICT (id) DO NOTHING;

-- Export Games
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (17, 'HYPERVISOR  EA SPORTS FC 26', 'Sports, Hypervisor', 5.0, 1, 'Genres/Tags: Sports, Soccer, 3D
Companies: EA Canada, Electronic Arts, EA Romania
Languages: RUS/ENG/MULTI21
Original Size: 74.4 GB
Repack Size: from 49.5 GB', '/uploads/6eda4a3c988c4313ba4fcba1225f41f6.jpg', '', 'https://fuckingfast.co/64k83eckz3ia#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part001.rar
https://fuckingfast.co/vcn5wbjgvcfr#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part002.rar
https://fuckingfast.co/bl815xkuy10e#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part003.rar
https://fuckingfast.co/47rq90s9kb1u#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part004.rar
https://fuckingfast.co/7yrf7ip34p0m#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part006.rar
https://fuckingfast.co/7anc8aiwgitm#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part007.rar
https://fuckingfast.co/e1nnf73tqtz6#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part008.rar https://fuckingfast.co/zecvmtjmh55h#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part009.rar
https://fuckingfast.co/6fj4l4dneys8#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part010.rar
https://fuckingfast.co/p67dqbgetaqo#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part011.rar
https://fuckingfast.co/hfxosivu81cc#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part012.rar
https://fuckingfast.co/lubpumlsrer1#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part013.rar
https://fuckingfast.co/v9ko5ezp8ts7#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part014.rar
https://fuckingfast.co/v0zmm5chvwlb#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part015.rar
https://fuckingfast.co/h9urvuw9ddai#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part016.rar
https://fuckingfast.co/jb1ab80kuoti#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part017.rar
https://fuckingfast.co/mdgg9qyzssc9#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part018.rar
https://fuckingfast.co/9bem2jqbm7or#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part019.rar
https://fuckingfast.co/d29bz6ayy03r#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part020.rar
https://fuckingfast.co/iaa3zjl14jpy#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part021.rar
https://fuckingfast.co/qar44csqf929#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part022.rar
https://fuckingfast.co/9enxvm1uzx3a#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part023.rar
https://fuckingfast.co/7pdwsufw8qxq#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part024.rar
https://fuckingfast.co/to2p4ltzz5ry#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part025.rar
https://fuckingfast.co/tib67kswk6ts#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part026.rar
https://fuckingfast.co/8tvi6lzthree#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part027.rar
https://fuckingfast.co/nnhv8esou7aw#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part028.rar
https://fuckingfast.co/6ejhra5ognvr#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part029.rar
https://fuckingfast.co/sd6u8xu9r00y#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part030.rar
https://fuckingfast.co/4v8u72rv3alm#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part031.rar
https://fuckingfast.co/zmu2zvgdzpyt#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part032.rar
https://fuckingfast.co/kgo9wuji85gf#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part033.rar
https://fuckingfast.co/7ejrzoe7lupk#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part034.rar
https://fuckingfast.co/5dokjubdemzb#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part035.rar
https://fuckingfast.co/vmpiplp3iw8h#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part036.rar
https://fuckingfast.co/vb9a3dtfc2i8#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part037.rar
https://fuckingfast.co/ew3bluz1di0c#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part038.rar
https://fuckingfast.co/jlfs28tk29nl#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part039.rar
https://fuckingfast.co/i61mte9jfmak#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part040.rar
https://fuckingfast.co/d6als19tbety#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part041.rar
https://fuckingfast.co/15stpzmtjk54#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part042.rar
https://fuckingfast.co/fuipmi0t6etm#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part043.rar
https://fuckingfast.co/pfiahn49lcx5#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part044.rar
https://fuckingfast.co/szib0r2mgk5c#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part045.rar
https://fuckingfast.co/lrl4cduegna9#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part046.rar
https://fuckingfast.co/mmld8ksj62eq#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part047.rar
https://fuckingfast.co/s65tsz1nr34n#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part048.rar
https://fuckingfast.co/61vvy9kxqncr#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part049.rar
https://fuckingfast.co/vg2m82b1bs3r#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part050.rar
https://fuckingfast.co/kqoxnfn4gi8q#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part051.rar
https://fuckingfast.co/m4eyfozk6xjt#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part052.rar
https://fuckingfast.co/vh33jt14mu7x#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part053.rar
https://fuckingfast.co/xemwasou8mw3#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part054.rar
https://fuckingfast.co/qcle5pshb7le#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part055.rar
https://fuckingfast.co/y1ru63c5r3ij#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part056.rar
https://fuckingfast.co/9mjpb3ai385t#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part057.rar
https://fuckingfast.co/2gdutybqdbwv#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part058.rar
https://fuckingfast.co/7omkpzh7cium#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part059.rar
https://fuckingfast.co/489ct9ledtim#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part060.rar
https://fuckingfast.co/gfz2c8w9ilyd#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part061.rar
https://fuckingfast.co/qrs3esztriue#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part062.rar
https://fuckingfast.co/7qclmqgr2e6i#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part063.rar
https://fuckingfast.co/hl3p0ueiuzex#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part064.rar
https://fuckingfast.co/91l0qwxbqs2u#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part065.rar
https://fuckingfast.co/nqssbzd3v975#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part066.rar
https://fuckingfast.co/ltxd1rkc0ctx#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part067.rar
https://fuckingfast.co/1qsf845c9ouk#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part068.rar
https://fuckingfast.co/dp85y1qowire#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part069.rar
https://fuckingfast.co/1lmvhdj79suj#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part070.rar
https://fuckingfast.co/bjizlospqneh#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part071.rar
https://fuckingfast.co/865oqygy8d7m#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part072.rar
https://fuckingfast.co/kl1airt3f2m2#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part073.rar
https://fuckingfast.co/wxc6wxkuknwh#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part074.rar https://fuckingfast.co/wy2oz7eie1xd#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part075.rar
https://fuckingfast.co/62fm4ii03b07#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part076.rar
https://fuckingfast.co/iuj8tej4iik6#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part077.rar
https://fuckingfast.co/av9yygktj9r9#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part078.rar
https://fuckingfast.co/gs5l7hlxmb4t#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part079.rar
https://fuckingfast.co/wo6mznqs5zc3#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part080.rar
https://fuckingfast.co/08h4ahsg2927#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part081.rar
https://fuckingfast.co/wt1nsrsymgra#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part082.rar
https://fuckingfast.co/zntn15botp44#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part083.rar
https://fuckingfast.co/teoih23ha0tj#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part084.rar
https://fuckingfast.co/v16re3dwfw0g#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part085.rar
https://fuckingfast.co/7lf4nt88e9oe#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part086.rar
https://fuckingfast.co/m1nn59fp38bo#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part087.rar
https://fuckingfast.co/y4vlgcpyvy80#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part088.rar
https://fuckingfast.co/bgpfeewdup7d#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part089.rar
https://fuckingfast.co/ln4homwx7jdr#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part090.rar
https://fuckingfast.co/281j0gs9t1v6#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part091.rar
https://fuckingfast.co/qumis259o8z0#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part092.rar
https://fuckingfast.co/8mzprhufq4cj#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part093.rar
https://fuckingfast.co/cdp2fz8sy8ux#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part094.rar
https://fuckingfast.co/bj5f9copv4ni#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part095.rar
https://fuckingfast.co/odj7kt2wsbzt#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part096.rar
https://fuckingfast.co/tax4jydp1z4p#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part097.rar
https://fuckingfast.co/czri7ejpn373#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part098.rar
https://fuckingfast.co/kcirdxvnh2qo#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part099.rar
https://fuckingfast.co/q1pjeh7o4xv3#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part100.rar
https://fuckingfast.co/dspkq013orht#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part101.rar
https://fuckingfast.co/dqczlm803dc2#EA_SPORTS_FC_26_--_fitgirl-repacks.site_--_.part102.rar
https://fuckingfast.co/b77paavwfq2p#fg-optional-arabic.bin
https://fuckingfast.co/aa0n7d5xx78d#fg-optional-brazilian.bin
https://fuckingfast.co/0qurmo0p07n5#fg-optional-chinese.bin
https://fuckingfast.co/0qurmo0p07n5#fg-optional-chinese.bin
https://fuckingfast.co/jsa58xr2pzkt#fg-optional-dutch.bin
https://fuckingfast.co/wobt4zdzgrd1#fg-optional-french.bin
https://fuckingfast.co/k3lmevicfp0c#fg-optional-german.bin
https://fuckingfast.co/waveh3lfkcm8#fg-optional-italian.bin
https://fuckingfast.co/s4b2pp0ure62#fg-optional-mexican.bin
https://fuckingfast.co/84cmqlvyktjd#fg-optional-spanish.bin', 'https://youtu.be/TSi0iJYSQ24?si=YxQJ3IA37GxX7G9Z', '/uploads/2052d1301bdb47b9aed2a39146487699.jpg
/uploads/80a2667420024634b085e2f89f5b0ac5.jpg
/uploads/c87553623605468496a014d0562108ac.jpg
/uploads/af40be307422455a996a87bf2c21ff54.jpg
/uploads/bc30b552c7494ba2bc60adadf03bdbf4.jpg
/uploads/572bf2aada9e4fed97a095a04fa05ca5.jpg
/uploads/5f2e4f99d55e4324bd9c31a2c9f87c5c.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-13 13:04:28', 'Repack Features
Based on EA Build v1.0.133.58379 release: 74.4 GB
Hypervisor Bypass (INTEL & AMD) by DenuvOwO + Goldberg emu applied over
Many antiviruses, including Windows Defender are now marking HV files as rootkits, rendering games unplayable. To avoid it either turn off AV completely, or add source/target installation folders to exclusions
VBS.cmd script v1.4 added
Custom launcher added for easier HV steps processing
Game version: v1.5.2; Offline DLCs are included and activated. Since most of DLCs are online-only, this is not an Ultimate Edition, just like every other release out there
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of localization packs you don’t need. Languages w/o their own lang packs are included by default along with English commentaries
Smaller archive size (compressed from 74.4 to 49.5~65.7 GB, depending on selected components)
Installation takes 2-15 minutes (depending on your system and selected components)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 74.4 GB
Language can be changed in “anadius.cfg” file
At least 2 GB of free RAM (inc. virtual) required for installing this repack', 'Internet Download Manager', 'https://www.internetdownloadmanager.com/download.html', 'Make sure you have virtualization tech enabled in your BIOS: VT-x for Intel or AMD-V (SVM) for AMD
Run “VBS.cmd” in the game folder AS ADMINISTRATOR! – you might want to download fresh version here: https://fitgirl-repacks.site/hypervisor-guide/
Press 1 to make necessary changes to the system
Reboot and in the loading menu press F7 to disable DSE
Run “FC26.exe” as admin
Play
Run “VBS.cmd” again and press 3 to revert made changes
Reboot in the normal, secure mode', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (18, '007 First Light v1.0.0', 'Action', 5.0, 0, 'Genres/Tags: Action, Stealth, Third-person, 3D, Spy fiction
Company: IO Interactive
Languages: RUS/ENG/MULTI14
Original Size: 48.4 GB
Repack Size: 35.5 GB', '/uploads/5497073c0c34444fbe676c907c430744.jpg', '', 'https://fuckingfast.co/w5phzauyzvob#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/pond72dvy1en#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/xzvdgn5mvevy#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/q8ola0qdpfi9#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/3e0kjkxgaoh5#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/djhfgg8udjci#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/c1327jwpgoid#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/9ft2wypw9k14#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/moosgsh5azoa#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part09.rar
https://fuckingfast.co/27qjzyq8t2m9#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/27qjzyq8t2m9#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/w7sfvwatp70x#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part12.rar
https://fuckingfast.co/jubh0ccfdz5f#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part13.rar
https://fuckingfast.co/tw0mkjpqde6q#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/jujr6lxc1nxc#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part15.rar
https://fuckingfast.co/q2lb3d4cbhlf#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part16.rar
https://fuckingfast.co/vl3fk1pa269a#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part17.rar
https://fuckingfast.co/8c4un6njnvpo#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part18.rar
https://fuckingfast.co/8a64bd7q9fyo#007_First_Light_CRACKED_--_fitgirl-repacks.site_--_.part19.rar', 'https://youtu.be/nTUoIyTMw0Q?si=AI-5TmaAjF_2L5tV', '/uploads/e4b6f32f1c5f4e36aff2ddef95ce5a95.jpg
/uploads/e3672e630d954bc2ab67ab7a9b131113.jpg
/uploads/500b34088a2b413da430b45a7a69ab86.jpg
/uploads/20f4a25ca9274a81b40945adfa734a47.jpg
/uploads/7d1ea6668d04403c80f265aee74ff8fa.jpg
/uploads/0651b00032bc42abbdaebec7b2596936.png
/uploads/73331b77a0114bb3b429b5f9ca8e8f0b.jpg
/uploads/2b1f1574db85494e8b5387aaf2f1f093.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-2500 or AMD equivalent', '8 GB RAM', 'NVIDIA GeForce GTX 660 or AMD Radeon HD 7870', '53.3 GB', '', '#ca8a04', 0, 'game', '', '', '', '2026-06-13 16:27:18', '', 'Internet Download Manager', 'https://www.internetdownloadmanager.com/download.html', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (19, 'Assassin’s Creed Mirage: Master Assassin Edition v1.1.1 + 13 DLCs*', 'Adventure, RPG', 4.5, 0, 'Genres/Tags: Action, Stealth, Open world, Third-person, 3D
Companies: Ubisoft *, Ubisoft Entertainment
Languages: RUS/ENG/MULTI14
Original Size: 59.9 GB
Repack Size: from 24 GB [Selective Download]', '/uploads/42fd9c8e9ab74c8c82e2efba780e4620.jpg', '', 'https://fuckingfast.co/vv1fyko1f0o5#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/ku8cwyue4hpx#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/rmso4r3j926x#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/xdj0z97mkkof#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/r42sjbtwgezg#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/fpeao1zy5lhx#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/fw4985hf6nfj#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/iy5y2bxfqt05#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/gi37s6o5xpb4#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part09.rar
https://fuckingfast.co/rp2nh7vyb1cu#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/e1l8seakt7hz#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part11.rar
https://fuckingfast.co/hiuok1t09tlm#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part12.rar
https://fuckingfast.co/8h5po4470f00#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part13.rar
https://fuckingfast.co/md367h19ot7s#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/mrlc45hq0912#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part15.rar
https://fuckingfast.co/hv6bcma9948n#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part16.rar
https://fuckingfast.co/m5k6p1kc29yy#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part17.rar
https://fuckingfast.co/lxzyar2npond#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part18.rar
https://fuckingfast.co/dszin3lknd2g#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part19.rar
https://fuckingfast.co/lzx9n9z2h6q2#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part20.rar
https://fuckingfast.co/kd45d2y6m7l7#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part21.rar
https://fuckingfast.co/wlmruax95fhk#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part22.rar
https://fuckingfast.co/5nw2hjmbd2jm#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part23.rar
https://fuckingfast.co/4xb6iqtv5zxf#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part24.rar
https://fuckingfast.co/eehoyo4888il#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part25.rar
https://fuckingfast.co/22awnywaskvf#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part26.rar
https://fuckingfast.co/l8mrofdcmy9x#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part27.rar
https://fuckingfast.co/j00e858j50b0#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part28.rar
https://fuckingfast.co/77fcv6qm895d#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part29.rar
https://fuckingfast.co/al04gf0n0gru#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part30.rar
https://fuckingfast.co/8h3b6zn7my1v#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part31.rar
https://fuckingfast.co/xw01alt63du5#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part32.rar
https://fuckingfast.co/k6mb8xd05y2n#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part33.rar
https://fuckingfast.co/uipnef4eun8z#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part34.rar
https://fuckingfast.co/7xwnq2ry3j5n#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part35.rar
https://fuckingfast.co/uipkxwtexztx#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part36.rar
https://fuckingfast.co/kp7xrqdm1626#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part37.rar
https://fuckingfast.co/r37pg4gpk0fh#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part38.rar
https://fuckingfast.co/rr97a9cldevk#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part39.rar
https://fuckingfast.co/uqw66fbanxgr#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part40.rar
https://fuckingfast.co/840dp7k36abn#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part41.rar
https://fuckingfast.co/jvl2vkhzxsq5#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part42.rar
https://fuckingfast.co/w5hnos4wvxr7#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part44.rar
https://fuckingfast.co/q0125t3q2vpo#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part45.rar
https://fuckingfast.co/70jr8i0hu74t#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part46.rar
https://fuckingfast.co/aiecrwwlqkx2#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part47.rar
https://fuckingfast.co/p5y2iimgtpid#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part48.rar
https://fuckingfast.co/otv11g3wmmn0#Assassins_Creed_Mirage_--_fitgirl-repacks.site_--_.part49.rar
https://fuckingfast.co/76pzbhle8ccy#fg-optional-bonus-content.bin
https://fuckingfast.co/vb8r8f82s27h#fg-selective-english-vo.bin
https://fuckingfast.co/8ar2nf5h2qct#fg-selective-arabic-vo.bin
https://fuckingfast.co/kvp91bfi1xz3#fg-selective-french-vo.bin
https://fuckingfast.co/ezy154zehor0#fg-selective-italian-vo.bin
https://fuckingfast.co/kd11nhdnd1ce#fg-selective-spanish-vo.bin
https://filecrypt.cc/Container/0ADA1A620C.html', 'https://youtu.be/x55lAlFtXmw?si=IZey65wFuQARQTxB', '/uploads/cfc6bb19364f47369bdf82ba9b897c91.jpg
/uploads/2d95debe429244deb704e428fb84f1b3.jpg
/uploads/ad9f3c9bf18143d3bcbedd0f35bd6076.jpg
/uploads/ef21e5c89fbe4319a073d644dcb5caf0.jpg
/uploads/e35192ebf99c4dfea6837036cd298a28.jpg
/uploads/f1c129cc3e7845a99e0e000e95c755d8.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '65.3 GB', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-13 18:06:51', 'Repack Features
Based on P2P Assassins.Creed.Mirage.Valley.of.Memory-voices38 release: voices38.acm.the.valley.of.memory.iso (64,002,250,752 bytes)
Game version: v1.1.1 (the next patch after “Valley of Memory” free update); *13 DLCs are included and activated (Use save unlocker from updates section)
Bonus OST and ArtBook (305 MB) added, thanks to NoeRIη!
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of bonus content & voiceover packs you don’t need
Significantly smaller archive size (compressed from cumulative 59.9 to 24~27.1 GB, depending on selected components)
Installation takes from 25 minutes (on 32-threaded CPU) up to 1 hour 30 minutes (on 8-threaded CPU)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 65.3 GB (up to 73.7 GB during installation)
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 6 GB of free RAM (inc. virtual) required for installing this repack', 'IDM', 'https://www.internetdownloadmanager.com/download.html', 'Make sure you have virtualization tech enabled in your BIOS: VT-x for Intel or AMD-V (SVM) for AMD
Run “VBS.cmd” in the game folder – you might want to download fresh version here: https://fitgirl-repacks.site/hypervisor-guide/
Press 1 to make necessary changes to the system
Reboot and in the loading menu press F7 to disable DSE
Run “”ACOrigins.exe”
Play
Run “VBS.cmd” again and press 3 to revert made changes
Reboot in the normal, secure mode', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (20, 'HYPERVISOR  Assassin’s Creed: Origins – Gold Edition v1.62', 'Adventure, RPG', 4.5, 0, 'Genres/Tags: Action, Open world, Third-person, 3D
Companies: Ubisoft Montreal / Ubisoft Entertainment
Languages: RUS/ENG/MULTI15
Original Size: 74.7 GB
Repack Size: from 28.4 GB [Selective Download]', '/uploads/3588b80051aa4f7a9f11556cb65807e3.jpg', '', 'https://fuckingfast.co/ml9n0gfrwwys#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/pkf1hakpbkm5#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/1nc7bleciom6#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/0uzteugfojt8#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/tja47x1ayuy1#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/3byg8smnhner#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/ni1ki35p0xxq#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/h4eyhe9o1iob#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/h4eyhe9o1iob#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/wtds90x0dv0k#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part09.rar
https://fuckingfast.co/iuyjfk3mm8f4#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/g75vzq6xbxes#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part11.rar
https://fuckingfast.co/muves36mx9ew#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part12.rar
https://fuckingfast.co/b898kp02xwts#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part13.rar
https://fuckingfast.co/e4qhzmtpptrj#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/262c65oteume#Assassins_Creed_Origins_--_fitgirl-repacks.site_--_.part15.rar
https://fuckingfast.co/kogfznmq50g6#fg-optional-bonus-soundtracks.bin
https://fuckingfast.co/t2yks0fqiwyt#fg-optional-spanish-vo.bin
https://fuckingfast.co/1b3scm88nokd#fg-optional-french-vo.bin', 'https://youtu.be/cK4iAjzAoas?si=KSGWKT5xdGn80K0z', '/uploads/c165cefd574c46e9bbe022f4acd7ec53.jpg
/uploads/0ac668b670994c799d10759e7112c040.jpg
/uploads/ed47ab6c9c7e490e94535460090312b8.jpg
/uploads/da82c8236ec84f7fa40c3188ca8d36f1.jpg
/uploads/2ab761fe500747a7b0c3d34ebe0f36b5.jpg
/uploads/cb472495ea704ada9f509ac288239536.jpg
/uploads/17a71c5211a647738554ec7b58016e86.jpg
/uploads/797756dc47b342469f7886c02d25c6c6.png
/uploads/8aef6adcb62046ef9aa82bd258a5ba11.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#ca8a04', 0, 'game', '', '', '', '2026-06-14 03:39:08', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (21, 'Assassin’s Creed Valhalla: Complete Edition v1.7.0 + All DLCs', 'Adventure, RPG', 4.5, 0, 'Genres/Tags: Action, RPG, Action RPG, Open world, Third-person, 3D
Companies: Ubisoft Bucharest, 
Ubisoft Montreal, 
Ubisoft Sofia, 
Ubisoft Chengdu, Ubisoft Singapore, Ubisoft
Languages: RUS/ENG/MULTI14
Original Size: 160.8 GB
Repack Size: from 45.9 GB [Selective Download]', '/uploads/d892469c8d1549c3aff4bb9fbbf39f6c.jpg', '', 'https://ffdl.cybar.to/dagg6u1exbc7
https://ffdl.cybar.to/ng1j21yo3plc
https://ffdl.cybar.to/zse6r3li2onp
https://ffdl.cybar.to/n198b0o2pl1s', 'https://youtu.be/bAxLxRr9OxU?si=0A4UkW47WKlyLMso', '/uploads/938312438cbb415590f71f0d3a264e58.jpg
/uploads/61f14a404e0a49aeb6cffdf77a374e57.jpg
/uploads/8ad9d6995a31450884ba27213de861f6.png
/uploads/ff54474915204f0bbc5d6611d17d618c.jpg
/uploads/8fff3e96045f47ffac1cd20da29afc94.jpg
/uploads/3a5c8ea976c4406080a4cd3a30633b10.jpg
/uploads/7707aa078348419ba7a4bfcb9cd236f1.jpg
/uploads/be6bddcd365e4b5cbd13827df19ce832.jpg
/uploads/482bbc898006423da7de85ca3ca9947b.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#bfdbfe', 0, 'game', '', '', '', '2026-06-14 03:42:04', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (22, 'Assassin’s Creed: Odyssey v1.5.6 + DLCs', 'RPG, Adventure', 4.5, 1, 'Genres/Tags: Action, Action RPG, Open world, Stealth, Third-person, 3D
Companies: Ubisoft Quebec, Ubisoft Entertainment
Languages: RUS/ENG/MULTI15
Original Size: 122.6 GB
Repack Size: from 36.1 GB', '/uploads/f74b18c2114240428d4d580383fcb5fd.jpg', '', 'https://ffdl.cybar.to/kxj05or9shkj
https://ffdl.cybar.to/54ve5gdu9w5c
https://ffdl.cybar.to/3fh7ot1cpl55
https://ffdl.cybar.to/f8cx7x3rr8dp', 'https://youtu.be/GbLFsOq5ipI?si=u-uWJBo9U6-LG-s5', '/uploads/f028231e83474005b601a4fbe8848dd1.jpg
/uploads/b0f3b081d5a345699a68f667461ae260.jpg
/uploads/3365b5f4477447c48425d11dbdc44aeb.jpg
/uploads/a79237cf29d5483e8885ecb5aff1c133.jpg
/uploads/a4f05c9cbc7e477eabed344f9efd144b.jpg
/uploads/eadb9ae95a5d4d2395f261b7c289a0ba.jpg
/uploads/b427e0ff69594bcdac8a827029d50d9e.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#fef08a', 0, 'game', '', '', '', '2026-06-14 03:46:55', 'GAME INFO
Genre: Action, Adventure, RPG
Developer: Ubisoft
Platform: PC
Game Size: 82 GB
Repack By: CPY
Version: v1.5.3 | Updated Version + All DLCs
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (23, 'HYPERVISOR  Assassin’s Creed Shadows v1.1.9 + Claws of Awaji DLC', 'Hypervisor, Adventure, RPG', 4.5, 0, 'Genres/Tags: RPG, Action RPG, Open world, Stealth, Third-person, 3D
Companies: Ubisoft Philippines, Ubisoft Belgrade, Ubisoft Montreal, Ubisoft Osaka, Ubisoft Bordeaux, Ubisoft Shanghai, Ubisoft Chengdu, Ubisoft Montpellier, Ubisoft Sofia, Ubisoft Bucharest & Craiova, Ubisoft Singapore, Ubisoft Entertainment, Ubisoft Quebec, Ubisoft Ukraine
Languages: RUS/ENG/MULTI13
Original Size: 156.6 GB
Repack Size: from 75.3 GB [Selective Download]', '/uploads/fce8549538fa458d860c95f247f9b8b0.jpg', '', 'https://fuckingfast.co/o5xts07jc1dd#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part001.rar
https://fuckingfast.co/1ft64tcdb7c3#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part002.rar
https://fuckingfast.co/mihvsxyfsxd8#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part003.rar
https://fuckingfast.co/05w73h0b7jdc#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part004.rar
https://fuckingfast.co/blu7m7214ktf#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part005.rar
https://fuckingfast.co/zhfprm099v38#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part006.rar
https://fuckingfast.co/on16eqtj9ezk#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part007.rar
https://fuckingfast.co/y8yljuox4ghx#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part008.rar
https://fuckingfast.co/y8yljuox4ghx#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part008.rar
https://fuckingfast.co/vs94z8og3bzv#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part009.rar
https://fuckingfast.co/fnrdl526zoxh#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part010.rar
https://fuckingfast.co/kioxv65l1rb3#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part011.rar
https://fuckingfast.co/8aol4tuc7ybx#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part012.rar
https://fuckingfast.co/6vpgga90xn2n#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part013.rar
https://fuckingfast.co/ubb631le7sp9#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part014.rar
https://fuckingfast.co/5kaiub7re8pp#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part015.rar
https://fuckingfast.co/d6vbn61ulxyh#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part016.rar
https://fuckingfast.co/797tls3z1qeh#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part017.rar
https://fuckingfast.co/8d0wnxme467u#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part018.rar
https://fuckingfast.co/t63b2l9muvdc#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part019.rar
https://fuckingfast.co/sye1939edbif#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part020.rar
https://fuckingfast.co/s94vilbbdiih#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part021.rar
https://fuckingfast.co/qp4tyujyixi9#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part022.rar
https://fuckingfast.co/wq3snd60klzv#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part023.rar
https://fuckingfast.co/x7bpyg9854hp#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part024.rar
https://fuckingfast.co/qou4yngiux65#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part025.rar
https://fuckingfast.co/td96ov9ikt64#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part026.rar
https://fuckingfast.co/9wivm989xnf2#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part027.rar
https://fuckingfast.co/cp3inq1x38ik#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part028.rar
https://fuckingfast.co/cp3inq1x38ik#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part028.rar
https://fuckingfast.co/4pnstvz4lmmo#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part029.rar
https://fuckingfast.co/n5jsachqvcdm#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part030.rar
https://fuckingfast.co/npb51grd2hea#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part031.rar
https://fuckingfast.co/tar90jwcs6f6#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part032.rar
https://fuckingfast.co/ir7mteeb3b6v#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part033.rar
https://fuckingfast.co/63b2drls6q1j#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part034.rar
https://fuckingfast.co/c5rifyvfn6ki#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part035.rar
https://fuckingfast.co/tar90jwcs6f6#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part032.rar
https://fuckingfast.co/ir7mteeb3b6v#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part033.rar
https://fuckingfast.co/63b2drls6q1j#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part034.rar
https://fuckingfast.co/c5rifyvfn6ki#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part035.rar
https://fuckingfast.co/o5vuuhvo1xaw#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part036.rar
https://fuckingfast.co/apvecqjcqx7a#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part037.rar
https://fuckingfast.co/0aczqy0rvila#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part038.rar
https://fuckingfast.co/1jsal8ueyw43#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part039.rar
https://fuckingfast.co/x829p2202kfi#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part040.rar
https://fuckingfast.co/qrh2z3cs8jbo#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part041.rar
https://fuckingfast.co/d0bed2wfh630#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part042.rar
https://fuckingfast.co/v23bcrymflrc#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part043.rar
https://fuckingfast.co/5fby1irkr9we#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part044.rar
https://fuckingfast.co/b22k6ftayvgz#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part045.rar
https://fuckingfast.co/zly2y4sflxhc#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part046.rar
https://fuckingfast.co/40cyfirkrl3w#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part047.rar
https://fuckingfast.co/bgskav80menf#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part048.rar
https://fuckingfast.co/w8xg8lnqtq4o#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part049.rar
https://fuckingfast.co/yybd93vucnbk#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part050.rar
https://fuckingfast.co/c9ne3qswj0k3#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part051.rar
https://fuckingfast.co/sugr569ybjfe#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part052.rar
https://fuckingfast.co/yoaxy80rkbcz#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part053.rar
https://fuckingfast.co/pzgx92fs94kl#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part054.rar
https://fuckingfast.co/8ne6kjog2kas#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part055.rar
https://fuckingfast.co/smtb8cd3axo8#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part056.rar
https://fuckingfast.co/vyi7xuooyyn2#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part057.rar
https://fuckingfast.co/2zw63sxxp25l#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part058.rar
https://fuckingfast.co/rzwe03o09ye5#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part059.rar
https://fuckingfast.co/chgivakbhcbi#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part060.rar
https://fuckingfast.co/if8im8eswok9#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part061.rar
https://fuckingfast.co/4ygs0qr1jmfw#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part062.rar
https://fuckingfast.co/2xuxhy83g73d#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part063.rar
https://fuckingfast.co/59tf1zv23zgw#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part064.rar
https://fuckingfast.co/5usfkp6iyeqy#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part065.rar
https://fuckingfast.co/1tvc3ae5gv03#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part066.rar
https://fuckingfast.co/6fjq2goxmeq9#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part067.rar
https://fuckingfast.co/hcczfizze3qg#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part068.rar
https://fuckingfast.co/8jwyjkjioffr#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part069.rar
https://fuckingfast.co/hv55umeq9xvh#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part070.rar
https://fuckingfast.co/6y69slxmxgpb#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part071.rar
https://fuckingfast.co/ppv0j34nblzj#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part072.rar
https://fuckingfast.co/avroyxmiygik#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part073.rar
https://fuckingfast.co/o8qvtdkkcy0e#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part074.rar
https://fuckingfast.co/uw1o3dnesmki#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part075.rar
https://fuckingfast.co/ea27xyu91l6y#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part077.rar
https://fuckingfast.co/7brgoqtewy3b#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part078.rar
https://fuckingfast.co/25e0o13fsf8z#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part079.rar
https://fuckingfast.co/or2igafk7zr9#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part080.rar
https://fuckingfast.co/jpd8h1jsbk30#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part081.rar
https://fuckingfast.co/gsl3qaqzxhol#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part082.rar
https://fuckingfast.co/pp6ykdv1x40z#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part083.rar
https://fuckingfast.co/xmdk66kn6yir#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part084.rar
https://fuckingfast.co/wr30y0peuhx0#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part085.rar
https://fuckingfast.co/fplctix3nc92#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part086.rar
https://fuckingfast.co/xmdke14pchm5#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part087.rar
https://fuckingfast.co/6arb8jhsptqi#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part088.rar
https://fuckingfast.co/2x3sh9pss20z#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part089.rar
https://fuckingfast.co/t68v15s5lf6u#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part090.rar
https://fuckingfast.co/n8uc9qngfilj#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part091.rar
https://fuckingfast.co/cybzszo8wm38#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part092.rar
https://fuckingfast.co/xlk9hxwv6srb#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part093.rar
https://fuckingfast.co/o1fg3cifvthr#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part094.rar
https://fuckingfast.co/7lm8q7gbuinm#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part095.rar
https://fuckingfast.co/k1rojm6941v8#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part096.rar
https://fuckingfast.co/2i82enbu932q#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part097.rar
https://fuckingfast.co/z1lmntq7b8gw#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part098.rar
https://fuckingfast.co/ifp9vtavoz2u#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part099.rar
https://fuckingfast.co/jr3ixxyll0nm#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part100.rar
https://fuckingfast.co/mfgiiwe9g9qg#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part101.rar
https://fuckingfast.co/7daicgc1huf2#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part102.rar
https://fuckingfast.co/0zmjb0cnkkcc#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part103.rar
https://fuckingfast.co/qft2g87aa25c#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part104.rar
https://fuckingfast.co/03g47ad9kt8e#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part105.rar
https://fuckingfast.co/mqo3oq3zc0m6#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part106.rar
https://fuckingfast.co/lk9i554b6nsb#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part107.rar
https://fuckingfast.co/wbwwlkiqcd0o#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part108.rar
https://fuckingfast.co/m84wrotxoeci#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part109.rar
https://fuckingfast.co/rvspl9uvk1oe#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part110.rar
https://fuckingfast.co/uthi93pejgn6#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part111.rar
https://fuckingfast.co/pfzdqzhut7j0#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part112.rar
https://fuckingfast.co/wsyu84lq7dzt#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part113.rar
https://fuckingfast.co/7p3mgnbw13ey#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part114.rar
https://fuckingfast.co/xhvnwzgxc05y#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part115.rar
https://fuckingfast.co/zlzkk3yn3fjn#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part116.rar
https://fuckingfast.co/4pim4ir4k8jk#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part117.rar
https://fuckingfast.co/49t9yr2776e2#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part118.rar
https://fuckingfast.co/d9jk1qynjsc2#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part119.rar
https://fuckingfast.co/gppf2f23e49k#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part120.rar
https://fuckingfast.co/w5xesj6op214#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part121.rar
https://fuckingfast.co/ajy7y8k8pte9#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part122.rar
https://fuckingfast.co/2xr03ezd39m4#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part123.rar
https://fuckingfast.co/ldlp8j8bthuw#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part124.rar
https://fuckingfast.co/qoamnjnd9hyw#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part125.rar
https://fuckingfast.co/uaxsoc5sn34x#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part126.rar
https://fuckingfast.co/kdlfrtrsjzph#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part127.rar
https://fuckingfast.co/dd4n9xmbamgm#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part129.rar
https://fuckingfast.co/x1hc2pvynbl5#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part130.rar
https://fuckingfast.co/nl2teozw8a14#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part131.rar
https://fuckingfast.co/zro2xnpaxe9k#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part132.rar
https://fuckingfast.co/73hfn6x33v83#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part133.rar
https://fuckingfast.co/6dvjidfmyxcn#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part134.rar
https://fuckingfast.co/1mog5nza36lq#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part135.rar
https://fuckingfast.co/o879w1kz15vx#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part136.rar
https://fuckingfast.co/k3wsxpt5qn57#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part137.rar
https://fuckingfast.co/7xn23a3p4jzl#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part138.rar
https://fuckingfast.co/zy7cyes1vuym#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part139.rar
https://fuckingfast.co/lzc24qpnu35y#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part141.rar
https://fuckingfast.co/ryf7zmchjkk0#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part142.rar
https://fuckingfast.co/p9n2i1les07i#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part143.rar
https://fuckingfast.co/srbu497edddl#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part144.rar
https://fuckingfast.co/q0df24msfgpn#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part145.rar
https://fuckingfast.co/4fyi412ccnq1#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part146.rar
https://fuckingfast.co/f1btextf3yf5#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part147.rar
https://fuckingfast.co/51w4f5p3pwu6#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part148.rar
https://fuckingfast.co/1wr5qub0euqt#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part149.rar
https://fuckingfast.co/ossker8ncj72#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part150.rar
https://fuckingfast.co/5x7vp95o5lll#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part151.rar
https://fuckingfast.co/sibawl152ulu#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part152.rar
https://fuckingfast.co/pi5wa5kc9f5j#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part153.rar
https://fuckingfast.co/aqoqwga1z85c#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part154.rar
https://fuckingfast.co/hidlwnbbxflb#Assassins_Creed_Shadows_--_fitgirl-repacks.site_--_.part155.rar
https://fuckingfast.co/lls1rv0419ti#fg-optional-bonus-soundtracks.bin
https://fuckingfast.co/sk8fs9dacswl#fg-optional-french-vo.bin
https://fuckingfast.co/fb3x5x3g7j6o#fg-optional-spanish-vo.bin', 'https://youtu.be/_JzywR97gUs?si=suljey7wC9Lhao1e', '/uploads/99fa2d71f0274812a55ee89a54ed95ce.jpg
/uploads/80ef34d3ee7341f79352cad9c4327528.jpg
/uploads/7073e1365b4645eda3cbe91988d4e1b4.jpg
/uploads/f53a4dc7cbbf4bc2a9534801a0840a9e.jpg
/uploads/85dd34552eb541f1a49cce44ad2bee3b.jpg
/uploads/943572c85e6f41eda0bfd7a692193e69.jpg
/uploads/1c8c909e79174a4c8a18d6ad55fa78bd.jpg
/uploads/8429ec9453b948bda0f648e51b0a3ea8.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#b91c1c', 0, 'game', '', '', '', '2026-06-14 03:51:54', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (37, 'Internet Download Manager (IDM) 6.42.64', 'Utilities & System', 4.5, 2, 'Internet Download Manager (IDM) Free Download (Latest 2026 Crack)
Free download Internet Download Manager Cracked version lifetime activation + Portable for Windows PC Latest Full version - The fastest download accelerator and video downloader.
Internet Download Manager or IDM is an advanced download manager software that makes it easier to manage your downloaded files with the intelligent system, this program will speed up the downloading of files with its new technology, and according to the manufacturer, It can download up to 5 times faster than usual.

Video downloading from almost all video streaming platforms is the best feature of Internet Download Manager. IDM lets you download videos from websites like YouTube, Daily Motion, Vimeo, etc. The video download button will appear automatically when you watch videos; click on it and quickly grab the video in your required SD or HD quality.', '/uploads/f10c5d30c1a245f5b5aab7a99828c68c.jpg', '', 'https://www.filehorse.com/download/file/sDInoioxV5k9TV2HaV7aWRYLz2uDrQX4glqdrIQixnyc4_X_ntf1pb8PDUNeardAfk_ikojmPShqoyLnIoaQit9iRkIQ5Vj-EvGqAANwRvQ/', '', '/uploads/f38b95d76212446c81b03e42bde777e4.jpg
/uploads/4c04d1b24be342f9a215f888cb7fbaf7.jpg
/uploads/5d3846fc67214c85a7bb0948e263f8bb.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#1d4ed8', 0, 'software', '', '6.42.64', 'Freemium', '2026-06-14 18:48:59', 'Full compatibility with Internet Explorer, Netscape, Google Chrome, AOL, Opera, Mozilla Firefox, Mozilla Firebird, Avant Browser, MyIE2, and other popular browsers.
Download FLV video files from YouTube, Google Video, and MySpaceTV.
Increase download speed up to 5x by Smart File Splitting System
Limiting download speed for specific files
Preview the contents of zip and RAR files before downloading them
Advanced group scheduling and file queuing to suit your needs
The ability to continue downloading to stop and continue downloading at another time without losing downloaded values
Supports Drag & Drop to add links to the queue
Ability to download all contents of a site using Grabber or a specific file format on that site
Supports HTTP, FTP, MMS, and HTTPS protocols
Prevent downloading duplicate files that have already been downloaded
Auto-scan downloaded files with an anti-virus
Specific timing to disconnect from the Internet or turn off the computer when the download is complete
Customize the user interface and support various skins
Get files organized in different formats', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (38, 'Adobe Photoshop 2026 v27.7.0.11', 'Design & 3D', 4.5, 2, 'Photoshop 2026 is a comprehensive image editing software designed for creative professionals, including photographers, graphic designers, digital artists, and content creators. It enables users to edit photos, create digital illustrations, design web graphics, and produce high-quality visual content with precision.

The software offers a wide array of tools such as layer-based editing, advanced selection tools, color correction, retouching, and AI-powered enhancements. Its flexible workflow allows users to work on complex projects with multiple layers and effects while maintaining full control over every detail.

Photoshop integrates seamlessly with other Adobe products, making it a central tool in many creative workflows. Whether used for professional photo retouching, social media graphics, or digital painting, Photoshop 2026 provides a stable and feature-rich environment that adapts to both beginners and advanced users.', '/uploads/ac38f464b3eb48beaba8cc14c5dc6530.png', '', 'https://download2263.mediafire.com/aid0fd68fz4gsyIq3McosgwkoSXWGnjm_gAnPnOtHBgA3Ny957lo4Azkk_EuinoLhbIh-YWXPSG7NgcoofpSkn7caPbceUnZ-bdd45ZdZLWQk2ju8YP54kCKJrCOvCX6NUV7J6TC3D0EQ0bykGQDVmnt1votQ2EHmrnC_PuCZ8Uqt4c/f8bc3yxz3wdqt9j/Adobe+Photoshop+2026+%28v27.7.0.11%29+Multilingual.rar', '', '/uploads/4408377ff8f24134a4e6497f403d49cd.png', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#1d4ed8', 0, 'software', '', 'v27.7.0.11', 'Freemium', '2026-06-14 22:18:04', 'Advanced layer-based editing system
AI-powered tools for smart selections and enhancements
Non-destructive editing workflow
High-quality photo retouching and restoration tools
Support for RAW image processing
Extensive brush library for digital painting
Vector and raster design capabilities
Smart object editing and transformations
Integration with Adobe Creative Cloud services
Customizable workspace and UI
Wide plugin and extension support
Export options for web, print, and social media', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (39, 'WinRAR v7.22 Final', 'Utilities & System', 4.5, 1, 'Winrar Full version is an archiving utility that completely supports RAR and ZIP archives and is able to unpack CAB, ARJ, LZH, TAR, GZ, ACE, UUE, BZ2, JAR, ISO, 7Z, Z archives. It consistently makes smaller archives than the competition, saving disk space and transmission costs. WinRAR offers a graphic interactive interface utilizing mouse and menus as well as the command line interface. WinRAR is easier to use than many other archivers with the inclusion of a special “Wizard” mode which allows instant access to the basic archiving functions through a simple question and answer procedure.

Winrar 7 Full version offers you the benefit of industry strength archive encryption using AES (Advanced Encryption Standard) with a key of 128 bits. It supports files and archives up to 8,589 billion gigabytes in size. It also offers the ability to create selfextracting and multivolume archives. With recovery record and recovery volumes, you can reconstruct even physically damaged archives.', '/uploads/3e5795e407e34230b90422a924cd1ac5.jpg', '', 'https://download2327.mediafire.com/6qyzu1wwrepglRYnqrrx40w-vM4SCjVGJtXf_H0AYaBWZ4oSVDgyrMFjVC_-R--52vs_mIr_3rE8FWOW7z1SXx7z1tRwqvDuPHqfBvY8pDVQlFVWpTRhkWi6yJ8vwnYaKVQArbG8OV0R5E_gqDuvd5bfLUEjAK6G-jr_02aPyFg4ylY/5j5b3orclg5xlz1/WinRAR+v7.22+Final.zip', '', '/uploads/13d5adb18f254d3db312aa1f26d17d1c.png', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#b91c1c', 0, 'software', '', '', '', '2026-06-14 22:45:28', 'Encryption, archive comments, logging, etc.
Creation of self-extracting (sfx) archives
Create, view, extract, and manage archives
Fully supports RAR and ZIP archives
Recovering physically damaged archives
Graphical and command line interface
Highly powerful compression algorithm
Reconstruct missing parts of archives
Shell integration, drag-n-drop and wizard
Supports all 32-bit and 64-bit system
Supports 7Z, ZIP, ACE, CAB, GZ, JAR, etc.
And so much more', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (40, 'Microsoft Office 2021-2024 Professional Plus', 'Productivity & Office', 5.0, 0, 'It is a suite of desktop productivity applications developed by Microsoft for Windows. It includes applications for word processing (Word), spreadsheets (Excel), presentations (PowerPoint), note-taking (OneNote), database management (Access), email (Outlook), and project management (Project). It is available in various editions, including Home & Student, Home & Business, Professional, and Professional Plus.', '/uploads/07062781dd8447dc873f76306386e765.jpg', '', 'https://download2350.mediafire.com/31e0k8ev4gvgaapZ9sqhS9OgX0cl41iyBrZ2fDFKd4kI8CwvvqfLj_4-Tp8bH3aVRMR5iBVI9AposMltNc6R1l9DERXGpdRWOnzzj0qooOsg6V1xxZ_BWgbaLWeCi1fkWhvt3fZ0jOc37mhEjk7RxTif_LT8rwoEu3yZi7TqSqOYipM/o0cduqi1kunkwxa/Microsoft+Office+Professional+Plus+2021-2024+VL+v2604+Build+19929.20136.rar', '', '/uploads/4c44424b7c61417fb89d50b2b95e41d0.jpg
/uploads/dd225939f8414b669726f19d942d0b5c.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#dc2626', 0, 'software', '', '', '', '2026-06-14 22:49:08', 'Real-time collaboration now supports real-time collaboration on Word, Excel, and PowerPoint documents. This means multiple users can work on the same document simultaneously, and their changes will be saved and visible to everyone else in real-time.
AI-powered insights: The software includes several AI-powered insights to help users be more productive. For example, Word can automatically suggest relevant content and images to users as they type, and Excel can automatically identify trends and patterns in data.
Improved performance and stability: It has also been optimized for performance and stability. This means it should run faster and more reliably than previous versions of Office.
Intuitive User Interface
One of the first things users will notice is the refreshed and modernized user interface. Microsoft has focused on simplifying navigation and improving the overall aesthetics. The ribbon interface, a hallmark of Office applications, has undergone a facelift to provide a more intuitive and visually appealing experience.

Enhanced Collaboration Tools
With enhanced co-authoring capabilities, multiple users can work on a document simultaneously, fostering real-time collaboration. This game-changer for teams working remotely or individuals seeking seamless cooperation on projects.

Intelligent Assistance with AI Integration
Microsoft has integrated advanced AI capabilities into Office 2024, providing users intelligent assistance throughout their workflow. From smart suggestions in Word to predictive data trends in Excel, the AI features aim to make work more efficient and informed.

New and Improved Applications
Each application within the Office suite has received updates. Word boasts new formatting options and improved writing assistance, while Excel introduces advanced data analysis tools. PowerPoint sees design and presentation features enhancements, making it easier to create visually stunning slideshows.

Cross-Platform Compatibility
Recognizing the diverse ecosystem of devices today, Microsoft Office 2024 ensures seamless compatibility across Windows PCs, Macs, tablets, and mobile devices. This cross-platform functionality empowers users to switch between devices without compromising their work.

Security and Compliance Features
The software introduces robust security and compliance features in an era where data security is paramount. Enhanced encryption, data loss prevention, and secure collaboration tools create a more secure digital workspace.', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (41, 'Avast Premium Security v26.4.10932 Full version', 'Antivirus & Security', 4.5, 0, 'Avast Premier’s layered approach to security keeps you safer than ever before. Take a peek at all the layers standing between malware and your PC.

Because it blocks all webcam hacking and stops ransomware before it starts, with intelligent cloud-based detection, it protects your PC, home network, and passwords against zero-second threats. It updates your apps automatically and shreds your data permanently when you say so. That’s why you’ve never seen protection like this before.', '/uploads/df222f9415ef4678927a2ccc9f0b7b5b.jpg', '', 'https://download2282.mediafire.com/b6xfgdr0xrggg5n9fhPK_czaSNsRdwLgX_KGaBgcys771vRv6DZdohmKNnMiRbR547S95_KizgJtJ_G-uUaw1XIxyW-rbKXpyaUEjnId1H3EnQk1AgtUql3Pn4NAtZ8PTr6MfxiwKn0QSXO5E9PQN5iPl7wcq6xHVtGWH2m5sT2qFR0/s6gfpw5unyqmnm6/Avast+Premium+Security+26.4.10932+Multilingual.rar', '', '/uploads/ef3b3023cb9246f2bd3c110c337987fe.png', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#d97706', 0, 'software', '', 'v26.4.10932', 'Freemium', '2026-06-14 22:57:41', 'Keep hackers on the other side of the wall with this essential security feature that monitors and controls what goes in and out of your computer.
Dodge spam and other malicious content, so you can focus on the emails that truly matter.
Protect yourself from hackers who attempt to hijack your DNS (Domain Name System) settings, redirect you to fake sites, and steal your banking details.
Automatically detect weaknesses in your home Wi-Fi and strangers piggybacking on your network.
Detect and block viruses, malware, spyware, ransomware, and phishing. We use smart analytics to stop threats before they affect you.
Automatically send suspicious files for analysis in the cloud, and push a cure to all Avast users if it''s a threat.
Spot and block suspicious behavior patterns for zero-second protection against unknown threats and ransomware.
Find all those cracks which allow malware to slip in, from unsafe settings and passwords to suspicious add-ons and out-of-date software.
Block ransomware and other untrusted apps from changing, deleting, or encrypting your photos and files.
Test and play with suspicious files in a safe environment before you let them run on your computer, ensuring they don’t wreak havoc on your PC.
Lock all your accounts with one secure password. We’ll manage the rest so you can log in quickly and securely.
Put notifications on hold automatically to make the most out of your gaming sessions or any other full-screen experience.
Rid your browser of toolbars, add-ons, and other installed extensions without you noticing.', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (42, 'VLC Media Player (64-bit)', 'Multimedia & Audio', 4.5, 1, 'VLC Media Player (64-bit)’s biggest strength lies in its remarkable compatibility. It plays almost any audio or video format imaginable, including MP4, AVI, MKV, FLAC, and even DVDs and Blu-rays, without needing any additional codecs. This eliminates the hassle of searching for the right software to play your files.

While VLC Media Player (64-bit) is known for its powerful capabilities, it’s surprisingly user-friendly. Its interface is beautiful and convenient, focusing on straightforward usability that makes it accessible to both beginners and advanced users. The main playback window is well-designed, with controls placed intuitively for easy access to all the essentials. The clean and uncluttered design reduces complexity, while the ability to customize the interface.', '/uploads/5c3f00a034dd4bc7a162a7958df0a5e9.jpg', '', 'https://vlc-media-player.en.lo4d.com/download/mirror-hs1', '', '/uploads/e11491a9b0704969b2d8468d7387c15d.png
/uploads/59fa57ed5f074aa09e0bd2b6a0234922.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#f97316', 0, 'software', '', '', 'Freemium', '2026-06-14 23:23:57', 'This is much more than a simple player; it’s a full multimedia toolbox. It includes useful features like video and audio filters, subtitle synchronization, and the ability to stream content over a network. However, it''s important to note that advanced options, such as transcoding or applying complex video effects, can be quite resource-intensive on low-end hardware, which could negatively impact overall system performance', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (43, 'Adobe-after-effects', 'Design & 3D', 4.5, 0, 'Adobe After Effects is one of the most advanced and highly praised video editing suites available today that features a number of advanced tools for creating impressive motion graphics and cinematic effects.

When getting started with this compositing and visual effects software, you''re greeted with a very complex user interface that has many different options and layouts for video creators. Thankfully, everything doesn''t have to be visible and you can navigate through the effects and tools that are necessary for the project.

Thankfully when starting the application, you have the option to be given a tour of the Adobe After Effects so that new users can get an idea of what tools are available, how to access them and how to get started creating a video project.', '/uploads/4db89202a3c34385a37982f856c218d9.jpg', '', 'https://adobe-after-effects.en.lo4d.com/download/mirror-ex1', '', '/uploads/09513df0c96b448cb084e7d705cedf71.jpg
/uploads/d7d71418230d43c492ddd47a65a5aea1.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#1d4ed8', 0, 'software', '', 'CC 2025 v25.6', 'Freemium', '2026-06-14 23:52:31', '3D Animation: Create stunning animations with text, shapes and logos.
Animation Presets: Choose from hundreds of animation presets and customize them.
Audio Editing: Adjust and mix music and sound effects.
Character Animation: Animate 2D characters with bones and rigging.
Color Correction: Dramatically improve the look of your footage.
Compositing: Combine multiple layers of video, images and audio.
Expressions: Create dynamic animations with expressions and scripting.
Keyframe Animation: Create smooth, fine-tuned animations with keyframes.
Masking: Quickly mask and remove elements from imagery.
Motion Tracking: Track objects in live footage and apply effects to them.
Output Formats: Choose from multiple file formats for final delivery.
Rotoscoping: Isolate objects in footage and animate them.
Special Effects: Add realistic touches with particle systems, flares and more.
Stabilization: Reduce camera shake and motion blur.
Virtual Reality: Create immersive VR content with 3D and 360 video.', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (44, 'python-3.14.6-amd64', 'Productivity & Office, Development Tools', 4.5, 0, 'Python Programming Language

Python is a high-level, interpreted, general-purpose programming language known for its simple syntax, readability, and versatility. It is widely used by beginners, students, developers, businesses, and researchers for building software, automating tasks, analyzing data, creating websites, developing artificial intelligence systems, and much more.', '/uploads/bfc013576d65461cba3d24478a081e0f.jpg', '', 'https://www.python.org/ftp/python/3.14.6/python-3.14.6-amd64.exe', '', '/uploads/02edd3eda16b4299a6d28b21c243480d.jpg
/uploads/f9075d42b3e8439699a1fac5e718a05a.jpg
/uploads/50708998104f4f21830ac11334dae123.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#eab308', 0, 'software', '', '3.14.6', 'Freemium', '2026-06-15 00:13:50', 'Easy to Learn and Read – Clean and human-friendly syntax makes coding simpler.
Interpreted Language – Runs code without requiring compilation.
Cross-Platform – Works on Windows, Linux, and macOS.
Open Source – Free to use and supported by a large global community.
Object-Oriented – Supports classes, objects, inheritance, and other OOP concepts.
Large Standard Library – Includes built-in modules for networking, file handling, databases, and more.
Extensive Package Ecosystem – Thousands of third-party libraries available through pip.
Database Integration – Supports many database systems including SQL and NoSQL solutions.
Scalable & Flexible – Suitable for small scripts, desktop apps, web services, and enterprise systems.', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (45, 'Stellar Blade Complete Edition v1.4.1', 'Horror, Adventure, Action', 4.5, 0, 'Stellar Blade™ (FitGirl Repack) – Full Game. Architect a high-stakes kinetic offensive in this visceral, post-apocalyptic action-adventure odyssey where professional-grade combat engineering meets the unfiltered weight of human extinction. Master the lethal precision of Eve’s acrobatic repertoire to dominate a landscape of grotesque biological anomalies, orchestrating surgical parries and high-intensity “Beta” energy strikes to dismantle the forces of Earth’s downfall. Navigate the technical hazards of a ruined civilization by utilizing professional-grade aesthetic customization and optimized skill-tree progression, ensuring you maintain a definitive edge while unraveling the twisting mysteries of the global collapse. In this relentless pursuit of terrestrial reclamation, your ability to execute flawless, blistering combat sequences and manage the logistical demands of a fractured world determines if you become the supreme architect of humanity’s rebirth or a permanent casualty of the cosmic void.', '/uploads/a714b505d6f444028b2087df624f271b.jpg', '', 'https://ffdl.cybar.to/qn5e08b8jjyi
https://ffdl.cybar.to/b6vx68scw7xs', 'https://youtu.be/DSznLWimMlU?si=dGtNWY0md1-I0X5p', '/uploads/96ed349ec09e44ccb69a88276b34a9f3.webp
/uploads/b1834b55ec9d4f9992c021ca4773236b.webp
/uploads/a0f78f7def6f4a9786d6cd5eb5f3f210.webp
/uploads/b97dfd8570074ed1abab30e238197d27.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-15 02:02:20', 'Repack Features
Based on Stellar.Blade-voices38 P2P ISO release: voices38-stellar.blade.iso (62,587,643,904 bytes)
voices38 crack with Goldberg emu applied over
Game version: v1.4.1; 7 DLCs are included and activated
4 bonus soundtracks added (1.7 GB), thanks to SittingOnClouds!
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of bonus soundtracks
Significantly smaller archive size (compressed from cumulative 60 to 45.5/46.9 GB)
Installation takes from 55 minutes (on 32-threads CPU) up to 2 hours (on 8-threads CPU)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 61.8 GB
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 2 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (46, 'Black Myth: Wukong – Digital Deluxe Edition v1.0.21.23831', 'RPG, Adventure', 4.5, 0, 'Genres/Tags: RPG, Action RPG, Third-person, 3D
Company: Game Science
Languages: RUS/ENG/MULTI15
Original Size: 140.8 GB
Repack Size: from 94 GB [Selective Download]', '/uploads/a537ac793b834937bc475910693716e5.jpg', '', 'https://fuckingfast.co/tjittnvciyv4#Black_Myth_Wukong_NEW_NON-HV_SETUP_FILES_--_fitgirl-repacks.site_--_.rar


https://fuckingfast.co/ymouzuoekqxm#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part001.rar
https://fuckingfast.co/0rk4qb5upkm4#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part002.rar
https://fuckingfast.co/610s0ujuool0#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part003.rar
https://fuckingfast.co/9frzonljju56#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part004.rar
https://fuckingfast.co/dt50m2kahnxg#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part005.rar
https://fuckingfast.co/vjxge5sylr0c#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part006.rar
https://fuckingfast.co/5ka3kgebzvev#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part007.rar
https://fuckingfast.co/qu8cqzvpfsnr#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part008.rar
https://fuckingfast.co/w51m5pvngs70#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part009.rar
https://fuckingfast.co/dqljkou1end1#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part010.rar
https://fuckingfast.co/modav5zvs16n#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part011.rar
https://fuckingfast.co/modav5zvs16n#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part011.rar
https://fuckingfast.co/acy84fcrvrvz#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part012.rar
https://fuckingfast.co/mjo2qat2ppow#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part013.rar
https://fuckingfast.co/p1t1lnvdd7s8#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part014.rar
https://fuckingfast.co/q5bj08s5j2df#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part015.rar
https://fuckingfast.co/p9r08t71bwwf#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part016.rar
https://fuckingfast.co/nb7av9ggfm8w#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part018.rar
https://fuckingfast.co/g8vhxfplkgad#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part019.rar
https://fuckingfast.co/kqo6behcfwqr#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part020.rar
https://fuckingfast.co/vcqpuy297lnc#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part021.rar
https://fuckingfast.co/4po7h22zewgs#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part022.rar
https://fuckingfast.co/mi500x038ca5#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part023.rar
https://fuckingfast.co/9juhfjnw98qb#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part024.rar
https://fuckingfast.co/6kp6wsqpoz0i#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part025.rar
https://fuckingfast.co/gqjf38ugk12z#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part026.rar
https://fuckingfast.co/u1pbqec3fzgf#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part027.rar
https://fuckingfast.co/it4n6mxyt1xd#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part028.rar
https://fuckingfast.co/4jzuwg491bxr#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part029.rar
https://fuckingfast.co/hkpl55tb922r#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part030.rar
https://fuckingfast.co/d94rmmfr71jw#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part031.rar
https://fuckingfast.co/4nfokhgtt01a#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part032.rar
https://fuckingfast.co/y6h0j1cuk5wn#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part033.rar
https://fuckingfast.co/tbx1vveqnckq#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part034.rar
https://fuckingfast.co/fio3zo8mxkpx#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part035.rar
https://fuckingfast.co/tonu3eju3p4o#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part036.rar
https://fuckingfast.co/68iakq10uiil#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part037.rar
https://fuckingfast.co/02ws9yb08h6r#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part038.rar
https://fuckingfast.co/78q0xl1she2i#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part039.rar
https://fuckingfast.co/93h77nrrbmlx#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part040.rar
https://fuckingfast.co/0fn3m76kh52g#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part041.rar
https://fuckingfast.co/tb2gikn911bw#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part042.rar
https://fuckingfast.co/krn5yrfyk2bk#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part043.rar
https://fuckingfast.co/uhem67ktc5zi#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part044.rar
https://fuckingfast.co/72rogdvbrchm#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part045.rar
https://fuckingfast.co/zce83oh62e6n#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part046.rar
https://fuckingfast.co/dpz7k9onfgzd#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part047.rar
https://fuckingfast.co/94r99mw2hvs7#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part048.rar
https://fuckingfast.co/q65skbuw5p42#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part049.rar
https://fuckingfast.co/nbzd95b12xxk#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part050.rar
https://fuckingfast.co/tgcq1nca6yy9#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part051.rar
https://fuckingfast.co/7eholsd6dolc#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part052.rar
https://fuckingfast.co/aiifmx498g4y#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part053.rar
https://fuckingfast.co/dwf9v0iq567r#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part054.rar
https://fuckingfast.co/dwf9v0iq567r#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part054.rar
https://fuckingfast.co/xkxxoomncjgo#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part056.rar
https://fuckingfast.co/nb5mt5cwu9h2#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part057.rar
https://fuckingfast.co/mnrho8nvtb31#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part058.rar
https://fuckingfast.co/2u9hmdmrwyf4#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part059.rar
https://fuckingfast.co/dif81z3ahm8l#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part060.rar
https://fuckingfast.co/wqxwccup9s9t#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part061.rar
https://fuckingfast.co/anaq7wp03mm9#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part062.rar
https://fuckingfast.co/pxc7h3zxfm1q#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part063.rar
https://fuckingfast.co/qgn64kgy8mgn#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part064.rar
https://fuckingfast.co/ysnacgdm242c#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part065.rar
https://fuckingfast.co/il17tfelgti8#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part066.rar
https://fuckingfast.co/p0k9kaoltxve#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part067.rar
https://fuckingfast.co/dmouhuq3o6co#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part068.rar
https://fuckingfast.co/6ukop8lujvgk#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part069.rar
https://fuckingfast.co/t0zc3t1bugx0#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part070.rar
https://fuckingfast.co/0nzefkot51w0#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part071.rar
https://fuckingfast.co/wgmw6oq8mmxw#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part072.rar
https://fuckingfast.co/guvnhywqtmdj#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part073.rar
https://fuckingfast.co/5z2vedir8ywy#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part074.rar
https://fuckingfast.co/ldwqsc3dn4xy#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part075.rar
https://fuckingfast.co/u6q4r48mem8g#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part076.rar
https://fuckingfast.co/91k2uxec42bm#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part077.rar
https://fuckingfast.co/oqbtm7jca6wa#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part078.rar
https://fuckingfast.co/dst04wm45yay#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part079.rar
https://fuckingfast.co/w1gv3376woy9#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part080.rar
https://fuckingfast.co/x6iid7yhmla2#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part081.rar
https://fuckingfast.co/wtamue1uw3an#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part082.rar
https://fuckingfast.co/mqa6duuub40a#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part083.rar
https://fuckingfast.co/jxtkd8mfnfd9#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part084.rar
https://fuckingfast.co/yugbnb3rpl8x#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part085.rar
https://fuckingfast.co/nwkb9vif0n8x#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part086.rar
https://fuckingfast.co/9lxbglmc14ht#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part087.rar
https://fuckingfast.co/ucj6rezcwtls#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part088.rar
https://fuckingfast.co/8b1egtnqfxs6#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part090.rar
https://fuckingfast.co/8b1egtnqfxs6#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part090.rar
https://fuckingfast.co/4bijso9413fr#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part091.rar
https://fuckingfast.co/kmt1ocfzjd5l#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part092.rar
https://fuckingfast.co/wu0pyigzvhdi#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part093.rar
https://fuckingfast.co/huo1y63cpys0#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part094.rar
https://fuckingfast.co/ja1t4w8vuuc4#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part095.rar
https://fuckingfast.co/c6tqbflb4zju#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part096.rar
https://fuckingfast.co/73dfh3zpnod6#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part097.rar
https://fuckingfast.co/kanr6o148ugm#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part098.rar
https://fuckingfast.co/a8vb47i2qh5v#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part099.rar
https://fuckingfast.co/r8fsgu0avxhl#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part100.rar
https://fuckingfast.co/t3hqd2b4mslj#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part101.rar
https://fuckingfast.co/tfom6q9az111#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part102.rar

https://fuckingfast.co/6mm4ksfzt8oe#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part103.rar
https://fuckingfast.co/6mm4ksfzt8oe#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part103.rar

https://fuckingfast.co/cijgiuvady62#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part104.rar
https://fuckingfast.co/cijgiuvady62#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part104.rar

https://fuckingfast.co/eqlsocbnyx5l#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part105.rar
https://fuckingfast.co/xd4d6jcpaegy#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part106.rar
https://fuckingfast.co/wc4q33qe0dv8#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part107.rar
https://fuckingfast.co/4d5s1hgcuniq#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part108.rar
https://fuckingfast.co/4ffqsq8092q0#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part109.rar
https://fuckingfast.co/e0xruegl7ph4#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part110.rar
https://fuckingfast.co/v4kyz6btf6u0#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part111.rar
https://fuckingfast.co/utbg28kiqgun#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part112.rar
https://fuckingfast.co/vshz6vo5780b#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part113.rar
https://fuckingfast.co/8ksm0bqbj44g#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part114.rar
https://fuckingfast.co/a38sjczvc8lt#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part115.rar
https://fuckingfast.co/qxow7j4p7fdm#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part116.rar
https://fuckingfast.co/n37ekaegdbgh#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part117.rar

https://fuckingfast.co/xjudz35p2ajd#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part118.rar
https://fuckingfast.co/2vij65ag4kjy#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part119.rar
https://fuckingfast.co/hb83w0cfro6x#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part120.rar
https://fuckingfast.co/bnsrdgcwgukw#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part121.rar
https://fuckingfast.co/zhe6lxg6ooor#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part122.rar
https://fuckingfast.co/t03315z39gxv#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part123.rar
https://fuckingfast.co/kddfm6ujo5ze#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part124.rar
https://fuckingfast.co/1ducuhviryl6#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part125.rar
https://fuckingfast.co/6n0x2y5bv3sd#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part126.rar
https://fuckingfast.co/4tlfaq88oawq#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part127.rar
https://fuckingfast.co/20qfvkd9h5an#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part128.rar
https://fuckingfast.co/wpuaitf23h36#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part129.rar
https://fuckingfast.co/ktren30uiyv0#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part130.rar
https://fuckingfast.co/t6uz2inm57a5#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part131.rar
https://fuckingfast.co/moctaapclbo5#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part132.rar
https://fuckingfast.co/qhtd8qvwn9xt#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part133.rar
https://fuckingfast.co/8vc6bzhvqzek#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part134.rar
https://fuckingfast.co/49wpufmdpqba#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part135.rar
https://fuckingfast.co/rm5pb8kkag3h#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part136.rar
https://fuckingfast.co/zcmtbybpq2k8#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part137.rar
https://fuckingfast.co/csxprralnh79#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part138.rar
https://fuckingfast.co/1ixlvn7j8qu3#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part139.rar
https://fuckingfast.co/ybwo820nugg6#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part140.rar

https://fuckingfast.co/8m6fowwcfzql#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part141.rar

https://fuckingfast.co/fmudzqh3d6uf#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part142.rar
https://fuckingfast.co/dncbgzduz4xb#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part143.rar
https://fuckingfast.co/fsv43bjnoo3z#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part144.rar
https://fuckingfast.co/8rqq91sh1zg7#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part146.rar
https://fuckingfast.co/cghcsj7ofjgp#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part147.rar

https://fuckingfast.co/f9w9sn5ofiup#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part148.rar
https://fuckingfast.co/kt8xk0ka4s88#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part149.rar
https://fuckingfast.co/d71pgxuc835c#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part150.rar
https://fuckingfast.co/17ssp2p6psck#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part151.rar
https://fuckingfast.co/rgm4vj5t2slf#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part152.rar
https://fuckingfast.co/uzrlrqob2hxv#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part154.rar
https://fuckingfast.co/8c5rdiwojga4#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part155.rar
https://fuckingfast.co/lkuzewmdwfsl#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part156.rar
https://fuckingfast.co/pib76mi2zvz8#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part157.rar
https://fuckingfast.co/cpmjftik22ov#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part158.rar
https://fuckingfast.co/uet60h6k7cep#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part159.rar
https://fuckingfast.co/3mf8lmkhm22n#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part160.rar
https://fuckingfast.co/g714oa5zwmkz#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part161.rar
https://fuckingfast.co/uxyh8ofxqutf#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part162.rar
https://fuckingfast.co/pfaxoaw6sz1g#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part163.rar
https://fuckingfast.co/im1rrwxry5xa#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part164.rar
https://fuckingfast.co/cuk31bmzk23z#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part165.rar
https://fuckingfast.co/enzbk46sbug7#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part166.rar
https://fuckingfast.co/qwfzl1c9r2m5#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part167.rar
https://fuckingfast.co/zuw64b79aqxe#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part168.rar
https://fuckingfast.co/rmmhcps683hk#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part169.rar
https://fuckingfast.co/19j7ig7wau7c#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part170.rar
https://fuckingfast.co/2an00fqjle08#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part171.rar
https://fuckingfast.co/p1ecskz0khce#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part172.rar
https://fuckingfast.co/3faipu9idzub#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part173.rar
https://fuckingfast.co/1w44dppzosow#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part174.rar
https://fuckingfast.co/qvdab5vwdtg3#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part175.rar
https://fuckingfast.co/cgwnf8av4bz7#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part176.rar
https://fuckingfast.co/u6jypg3zpy3v#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part177.rar
https://fuckingfast.co/dd0inipc9eqd#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part178.rar
https://fuckingfast.co/6a8lt3oi9wk1#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part179.rar

https://fuckingfast.co/uzd9dsq3hx6k#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part180.rar
https://fuckingfast.co/x2brk2ctyllb#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part181.rar
https://fuckingfast.co/fh7g5lftkus0#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part182.rar
https://fuckingfast.co/uxr838x8v70n#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part183.rar
https://fuckingfast.co/c9ina13rmqjo#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part184.rar
https://fuckingfast.co/8bu5zoy7qgo4#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part185.rar
https://fuckingfast.co/q2o630fxt4dh#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part186.rar
https://fuckingfast.co/s50q2f3qmc4u#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part187.rar
https://fuckingfast.co/z0hw2awqhq0e#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part188.rar
https://fuckingfast.co/c994hb2ju29h#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part189.rar
https://fuckingfast.co/35ryc2pcms20#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part191.rar

https://fuckingfast.co/nxbwx4iaefkw#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part192.rar
https://fuckingfast.co/azbyia2ho063#Black_Myth_Wukong_--_fitgirl-repacks.site_--_.part193.rar
https://fuckingfast.co/ac6bjeb5bbrf#fg-optional-bonus-soundtracks.bin', 'https://youtu.be/pnSsgRJmsCc?si=SpGoCX1uuaV8PsJt', '/uploads/43e580f1e34445358089be0a80075fd4.jpg
/uploads/41b9086bc4e04b008437497f43fa3410.jpg
/uploads/f18ec44475164656a52099e5220bd326.jpg
/uploads/6132cc9a1b92451e925616e73a4f21ae.jpg
/uploads/e1cffbde215b40768e31bdd7456cabd2.jpg
/uploads/9924b9e1bd5d4cb089e6a77ae2531dfc.jpg
/uploads/53722cb8149c4425aab25c40ca327af9.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#2563eb', 0, 'game', '', '', '', '2026-06-15 02:06:50', 'Based on Black.Myth.Wukong-voices38 P2P ISO release: voices38-black.myth.wukong.iso (143,660,587,008 bytes)
3 bonus soundtracks (1.1 GB) added, thanks to SittingOnClouds!
Game version: v1.0.21.23831; 4 DLCs/Bonuses are included
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of bonus soundtracks
Significantly smaller archive size (compressed from cumulative 134.9 to 94/94.9 GB)
Installation takes from 45 minutes (on 32-threads CPU) up to 2.5 hours (on 8-threads CPU)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 140.7 GB (160.8 GB during installation)
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 8 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (47, 'Forza Horizon 6 v354.221 + 10 DLCs + Multiplayer', 'Racing', 4.5, 0, 'About
Forza Horizon 6 (FitGirl Repack – PC-Windows) – Full Game. Become a racing legend as you drift through the neon-lit streets of Tokyo and speed past the serene landscapes of rural Japan. Featuring an expansive roster of over 550 real-world vehicles and the series’ largest open world to date, this definitive driving adventure delivers breathtaking visuals and unparalleled automotive freedom across the Land of the Rising Sun.', '/uploads/48f807c05eb944e0b84ca6f6ab9da119.webp', '', 'https://ffdl.cybar.to/zbt9ulaz00rx
https://ffdl.cybar.to/7he95lkuio66
https://ffdl.cybar.to/irozhqkh0es2', 'https://youtu.be/p1wFbZwegpk?si=cw_ti-WBL47JwoFh', '/uploads/e12ec53783354ad48c45720ddead9c36.webp
/uploads/f250327331c04b4f8eb4c418e052734d.webp
/uploads/0b533b5b52384cc4b51c3a21667bfb0f.webp
/uploads/4d29e14736aa47d9a33ae8d3d1a195cf.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#a855f7', 0, 'game', '', '', '', '2026-06-15 02:11:13', 'Repack Features
Based on Forza.Horizon.6-RUNE ISO release: rune-forza.horizon.6.iso (144,479,354,880 bytes)
Steam Online Fix by 0xdeadc0de is available in “NoDVD” folder after installation, allowing multiplayer support via Steam (use fake Steam/Microsoft accounts for that). Check “readme.txt” for instructions.
Game version: v354.221; 10 DLCs are included, but some cars may be locked due to server-checks. Expansions Bundle, Expansion 1, Expansion 2 and Car Pass are either not released or released partially, hence not counted. This is not a Deluxe nor Premium Edition, and it doesn’t matter if other releasers call their packs so, it’s just not truth
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of optional voiceovers (English are included by default) and 2K/4K hires videos pack (w/o it 1920p files will be copied instead)
Significantly smaller archive size (compressed from 134.6 to 89~99.3 GB, depending on selected components)
Installation (w/o optionals) takes from 15 minutes (32-theads CPU + SSD) up to one hour (on 8-threads CPU + HDD)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 155.6 GB
Language can be changed in game settings. The language will change on the next game start
Repack uses XTool library by Razor12911
At least 2 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (48, 'Call of Duty Black Ops Cold War v1.34.1.15931218', 'Action', 4.5, 0, 'Call of Duty®: Black Ops Cold War  – Drop into the depths of the global space race and volatile geopolitical battlegrounds of the early 1980s in this direct narrative sequel to the original fan-favorite Call of Duty®: Black Ops. The gripping single-player campaign forces players face-to-face with historical figures and hard truths as they battle across iconic Cold War locales like East Berlin, Vietnam, Turkey, and Soviet KGB headquarters.

As an elite operative, you will hunt down a shadowy Soviet agent codenamed Perseus, who is on a mission to destabilize the global balance of power and alter the course of history. Beyond the cinematic campaign, players can test their skills in an expansive arsenal of 1980s weaponry across a fast-paced multiplayer suite and the next chapter of the legendary, cooperative Dark Aether Zombies mode.', '/uploads/a7c5f8ddbdaf4ec88899904df9fa386a.webp', '', 'https://ffdl.cybar.to/w1u6el2rer32
https://ffdl.cybar.to/526okk1su1x1

https://ffdl.cybar.to/llicvko8kibs
https://ffdl.cybar.to/75st6digxqr7

https://ffdl.cybar.to/gkjehkm854a3

https://ffdl.cybar.to/089ey4yrzofq', 'https://youtu.be/aTS9n_m7TW0?si=8aVY5ssUWXbutEod', '/uploads/23db74ac1bd44aa49381375b685e4ed7.webp
/uploads/4e08e7191e164124abc7e65924225910.webp
/uploads/0ccc3440668544db97c5f76c48316c66.webp
/uploads/263d0f2dc0754d2192528573a052b4c3.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#ffffff', 0, 'game', '', '', '', '2026-06-15 02:13:50', 'Repack Features
Based on Battle.net v1.34.1.15931218 release: 159.1 GB
.r4v3n+T9 V5 crack applied over. Older V3 & V4 cracks are available in “_Cracks” folder, use them if V5 doesn’t work for you
Bonus OST in MP3 format (276 MB) added
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of bonus OST, zombie/multiplayer files and language files you don’t need. English is included by default
Significantly smaller archive size (compressed from cumulative 159.4 to 60~119.2 GB, depending on selected components)
Installation (SP only) takes from 1.5 hours (on 16-threads CPU) up to 3 hours (on 8-threads CPU)
Installation with ZM/MP files is ~2 times longer
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 159.4 GB
Use REG-files in the “_Language Switcher” folder to switch the game language
Repack uses XTool library by Razor12911
At least 4 GB of free RAM (inc. virtual) required for installing this repack
HD Textures Pack Repack Features
Based on Battle.net v1.34.1.15931218 HD Textures Pack: 69.9 GB
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Significantly smaller archive size (compressed from 69.9 to 43.5 GB)
Installation takes from 1 hour (on 16-threads CPU) up to 2 hours (on 8-threads CPU)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: adds 69.9 GB to existing installation
Repack uses XTool library by Razor12911
At least 4 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (49, 'Call of Duty: Modern Warfare II [v9.7 (Campaign) | v9.40 (Multiplayer]', 'Action', 4.5, 0, 'GAME INFO
Genre: Action
Developer: Infinity Ward, Raven Software, Beenox, Treyarch, High Moon Studios, Sledgehammer Games, Activision Shanghai, Demonware, Toys for Bob
Platform: PC
Game Size: 113 GB
Released By: r4v3n + Mr_Goldberg (alex47exe’s fork) | Ty Fitgirl Repacks
Version: v9.7 (Campaign) / v9.40 (Multiplayer/Co-Op with Bots)
Pre-Installed Game

COD Modern Warfare II drops players into an unprecedented global conflict that features the return of the iconic Operators of Task Force 141. From small-scale, high-stakes infiltration tactical ops to highly classified missions, players will deploy alongside friends in a truly immersive experience. Infinity Ward brings fans state-of-the-art gameplay, with all-new gun handling, advanced AI system, a new Gunsmith and a suite of other gameplay and graphical innovations that elevate the franchise to new heights. Worshippers of Cthulhu

Modern Warfare II launches with a globe-trotting single-player campaign, immersive Multiplayer combat, and a narrative-driven, co-op Special Ops experience. You also get access to Call of Duty: Warzone, the all-new Battle Royale experience.', '/uploads/40a3ab6dd2cd44c084be24bc4bec3c39.jpg', '', 'https://vikingfile.com/d/LKhlwVBxuu/CoDMW2.FR-GameDrive.Org.rar
https://vikingfile.com/d/oLH6yDpxbt/fg-optional-bonus-soundtracks.bin', 'https://youtu.be/ztjfwecrY8E?si=_QJ3NSYR1PBYjP-C', '/uploads/fa38906221d54321b696106b4dd87115.jpg
/uploads/1a07043b7652435dae309d6b052421b6.jpg
/uploads/b42d4850587d473eb1e4d25419f21d4d.jpg
/uploads/9d82dff333ed4510bbe8bc42c41fc376.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#84cc16', 0, 'game', '', '', '', '2026-06-16 00:11:12', 'Repack Features
Based on P2P v9.7.23096551 SP / v9.40.23226476 MP release with all languages and modes: 147.1 GB, thanks to GAMEDRIVE.ORG!
Crack by r4v3n + Goldberg (alex47exe’s fork) applied over
Eight bonus soundtracks (785 MB) added
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of optional language packs (English, Arabic, Simplified & Traditional Chinese support is included by default), multiplayer modes files, DMZ mode files and bonus soundtracks
Be advised that at the moment of releasing of this repack DMZ mode is not properly playable. It may or may not be playable in the future, so that’s why I didn’t rip those files completely but made them optional and isolated from other MP files
Significantly smaller archive size (compressed from cumulative 147.9 to 22.5~92.2 GB, depending on selected components)
Installation takes from 15 minutes (campaign only in English/Arabic/Chinese, 32-threads CPU) up to 2 hours (all components and languages, 8-threads CPU)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 147.9 GB
Language can be changed in “sp22\steam_settings\configs.user.ini” (for campaign) and in “steam_settings\configs.user.ini” (for multiplayer)
Repack uses XTool library by Razor12911
At least 4 GB of free RAM (inc. virtual) required for installing this repack
Run the game from one of the desktop icons creadted by the installer', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (50, 'Cyberpunk 2077    (v2.31)', 'RPG, Sci-Fi', 4.5, 0, 'GAME INFO
Genre: RPG
Developer: CDPROJEKTRED
Platform: PC
Game Size: 89.1 GB
Released By: CODEX emu
Version: v2.31 | Full Version
Pre-Installed Game  

Cryberpunk 2k77 is an open-action-adventure set in Night City, where you play as a cryberpunk mercenary fighting for survival. Improved with all-new free extra content, you can now personalize your character and playstyle as you take on jobs, establish a reputation, and acquire improvements. The relationships you form and the decisions you make will impact both the tale and the world around you. Legends are created here. What will yours be?

Night City seems more alive than ever with the free Update 2.1 Take a trip on the fully functional NCART metro system, listen to music while exploring the city with the Radioport, hang out with your partner at V’s apartment, engage in replayable races, ride new vehicles, experience enhanced bike combat and handling, uncover hidden secrets, and much more

CREATE YOUR OWN CRYBERPUNK
Become an urban criminal with cybernetic upgrades and establish your reputation on the streets of Night City. Night City is jam-packed with activities to do, sights to see, and people to meet. And it is up to you to decide where to go, when to go, and how to get there.', '/uploads/3b7d506cd3ee4416bee66ef4d7085e7f.jpg', '', 'https://vikingfile.com/d/pTenjsJEed/cy2077ii.ER-GameDrive.Org.part1.rar
https://vikingfile.com/d/4WcCinbQSe/cy2077ii.ER-GameDrive.Org.part2.rar', 'https://youtu.be/reABCMNGM3w?si=hvw7QfnL9mhyyoZu', '/uploads/5bcd956e745248759994214fbcfaec4e.jpg
/uploads/a1a2f1867b1546d8ab4f961edf25f644.jpg
/uploads/097434a58eea48ad91095b44da46410d.jpg
/uploads/a97eb7f6bfe44a42b58a5c57084d7684.jpg
/uploads/f563457c67d64b15887389172fddaa9b.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#eab308', 0, 'game', '', '', '', '2026-06-16 00:16:27', 'Repack Features
Based on Steam Build 19260982 from July 17, 2025: 149.1 GB, thanks to AR-81!
CODEX crack/emu applier over
Missing bonus content (3.7 GB) added
Game version is v2.3; Phantom Liberty, Quadra “Vigilante” Pre-Order Bonus and smaller free DLCs and REDmod modding tools are included
100% Lossless & MD5 Perfect: all files are identical to originals after installation (only when installed with credits video!)
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of voiceover packs you don’t need, credits video & bonus content
Significantly smaller archive size (compressed from cumulative 152.8 to 55.7~117.9 GB, depending on selected components)
Installation takes (one language, no credits, no bonus content): ~80 minutes on 16-threads CPU; ~2 hours on 8-threads CPU; ~4 hours on 4-threads CPU
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 152.8 GB
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 4 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (51, 'Dragons Dogma 2 (2024) ALL DLC  HV', 'Adventure, Hypervisor', 4.5, 1, 'Download Dragon’s Dogma 2 (PC) – Full Game. Prepare for a high-stakes journey as the Arisen in this masterfully realized, narrative-driven action-RPG. In a sprawling open world four times larger than its predecessor, you must navigate the complex geopolitical strife between the kingdoms of Vermund and Battahl. Command a customizable party of Pawns—otherworldly AI companions—and master dynamic vocations to overcome colossal monsters in physics-driven combat where every tactical choice and environmental interaction can turn the tide of your epic destiny.', '/uploads/e2ba5cbecec2463a8ee93e89411e9b48.webp', '', 'https://ffdl.cybar.to/6yvfd6yd8hjp
https://ffdl.cybar.to/k7r0nx23fdgz
https://ffdl.cybar.to/kajxy098yppm', 'https://youtu.be/Ob9pYAlIHZM?si=2rDbdJ0hlT6gxcsl', '/uploads/e55fbe0773d64b6c8bf8f8fec601a2fd.webp
/uploads/b09161cd90e545e4b5df7d8a2f84fa31.webp
/uploads/5e7568ecb12b4578ae34220cfe15a403.webp
/uploads/70e258cce84d45dea5d598d7d22e6091.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#ca8a04', 0, 'game', '', '', '', '2026-06-16 00:20:00', 'Repack Features
based On my own Steam Files + DenuvoUwU', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (52, 'Far Cry New Dawn (2019) ALL DLC +  HD Textures Pack [Hypervisor', 'Action, RPG, Hypervisor', 4.5, 3, 'Download Far Cry® New Dawn Hypervisor (PC) – Full Game. Plunge into a high-stakes struggle for dominance in a transformed, “super-bloom” post-apocalyptic Hope County, Montana, seventeen years after the nuclear collapse. As the captain of the security forces, you must lead the resistance against the Highwaymen—a ruthless scavenger faction led by the twin sisters, Mickey and Lou. Architect your home base at Prosperity, master a deep “light RPG” crafting system to forge makeshift weaponry, and launch daring expeditions across the shattered United States to secure the world’s last remaining resources and reclaim a future from the neon-soaked ruins.', '/uploads/19571650123b4413ab6a2a3385f7a54a.jpg', '', 'https://ffdl.cybar.to/a9ra7yl12ifd
https://ffdl.cybar.to/awc8gvmmwhao', 'https://youtu.be/6eLHk2Eug78?si=Y7Nln16dhW3rrgYe', '/uploads/400b9ccb99ff46259f3b1832dc56104a.webp
/uploads/981faccb14fe474c9b65324e317ccb31.webp
/uploads/c22ad9c93d6c45b789c0dfef2cc6bdd7.webp
/uploads/94f3490531b047979c32cde20bbd1621.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-16 00:22:23', 'Repack Features
based On my own Steam Files + DenuvoUwU', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (53, 'Ghost Of Tsushima DIRECTOR’S CUT', 'Adventure, RPG', 4.5, 0, 'In the late 13th century, the Mongol empire has laid waste to entire nations along their campaign to conquer the East. Tsushima Island is all that stands between mainland Japan and a massive Mongol invasion fleet led by the ruthless and cunning general, Khotun Khan.

As the island burns in the wake of the first wave of the Mongol assault, courageous samurai warrior Jin Sakai stands resolute. As one of the last surviving members of his clan, Jin is resolved to do whatever it takes, at any cost, to protect his people and reclaim his home. He must set aside the traditions that have shaped him as a warrior to forge a new path, the path of the Ghost, and wage an unconventional war for the freedom of Tsushima. BRAID
GAME INFO
Genre: Action, Adventure
Developer: Sucker Punch Productions, Nixxes Software
Platform: PC
Game Size: 60 GB
Released By: RUNE
Version: v1053.8.1212.1408 (Build 21164271) + DLC + Bonus Content + Languages
Pre-Installed Game', '/uploads/369fc1b1f957435ba2bd2e2a3970f40d.webp', '', 'https://vikingfile.com/d/jg7gvaaO05/0005445.ER-GameDrive.Org.rar', 'https://youtu.be/A5gVt028Hww?si=G09uCKRefq46IPNe', '/uploads/c04a5288dc664a04b8b96f8d7d1620b9.jpg
/uploads/0ea8ab3c559e4bb389004ffe3df9c599.jpg
/uploads/387b1efc344641799142edc681ebfb77.jpg
/uploads/2517b1ae96934773a8dd4eb5f3e6692a.jpg
/uploads/0048e236f77b41b2a2c0d3e468050f98.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#ffffff', 0, 'game', '', '', '', '2026-06-16 00:27:27', 'Repack Features
Based on Ghost.of.Tsushima.DIRECTORS.CUT.MULTi26-RUNE ISO release: rune-ghost.of.tsushima.directors.cut.multi26.iso (63,415,713,792 bytes)
Game version: v1053.0.0515.2048; Pre-purchase Entitlements DLC is included and activated
Crackpack with TENOKE/CODEX/FLT/ALI213/Goldberg/0xdeadc0de cracks/emus added, thanks to TENOKE, Masquerade & 0xdeadc0de!
Online Fix by 0xdeadc0de allows multiplayer support via PSN and Epic Store, read special section for instructions
Bonus Content (ArtBook in PDF/CBR formats + 3 OSTs in MP3 format, 671 MB) added, thanks to heatfan23 & NoeRIη!
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of voiceover packs you don’t need, bonus content, optional videos (credits + tutorials) and PSN servises installer (useless if you won’t play in multiplayer)
Significantly smaller archive size (compressed from cumulative 59.7 to 31.2~43.9 GB, depending on selected components)
Installation takes from 6 minutes (24-threads CPU + SSD, one language) up to 28 minutes (4-threads CPU + HDD, all languages and components)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 66.4 GB
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 2 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (54, 'God of War 1', 'RPG, Adventure', 4.5, 1, 'Kratos is a father again. As mentor and protector to Atreus, a son determined to earn his respect, he is forced to deal with and control the rage that has long defined him while out in a very dangerous world with his son. From the marble and columns of ornate Olympus to the gritty forests, gow free direct download mountains and caves of pre-Viking Norse lore, this is a distinctly new realm with its own pantheon of creatures, monsters and gods.
GAME INFO
Genre: Action, Adventure, RPG
Developer: Santa Monica Studio
Platform: PC
Game Size: 35.3 GB
Released By: FLT (cs.rin.ru for updates)
Version: v1.0.475.7534 | (Patch v1.0.12) | Full Version
Pre-Installed Game', '/uploads/0dbb23116db047479336dd3150cc7392.jpg', '', 'https://gofile.io/d/XK8MrL', 'https://youtu.be/K0u_kAWLJOA?si=Atkg0k7pVILmIPZM', '/uploads/17f870e041a54892afa06fd542fd8774.jpg
/uploads/db49780f5a5449b8a34164a536dfed41.jpg
/uploads/02ad7a5068e146dc8ee53b39d7f579c3.jpg
/uploads/6bab2955f9bc403893529521ed8ddbb9.jpg
/uploads/a3e33db774a34278ae958f7c97903339.jpg
/uploads/b225b7515d384e72a5cb987d63672b36.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#27272a', 0, 'game', '', '', '', '2026-06-16 00:35:22', 'Features
High Fidelity Graphics
Striking visuals enhanced on PC. Enjoy true 4K resolution, on supported devices, [MU1] with unlocked framerates for peak performance. Dial in your settings via a wide range of graphical presets and options including higher resolution shadows, improved screen space reflections, the addition of GTAO and SSDO, and much more.
NVIDIA DLSS and Reflex Support
Quality meets performance. Harness the AI power of NVIDIA Deep Learning Super Sampling (DLSS) to boost frame rates and generate beautiful, sharp images on select Nvidia GPUs. Utilize NVIDIA Reflex low latency technology allowing you to react quicker and hit harder combos with the responsive gameplay you crave on GeForce GPUs.
Controls Customization
Play your way. With support for the DUALSHOCK 4 and DUALSENSE wireless controllers, a wide range of other gamepads, and fully customizable bindings for mouse and keyboard, you have the power to fine-tune every action to match your playstyle.', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (55, 'God of War Ragnarök Digital Deluxe Edition', 'Adventure, RPG', 4.5, 0, 'From Santa Monica Studio and brought to PC in partnership with Jetpack Interactive comes God of War Ragnarök, an epic and heartfelt journey that follows Kratos and Atreus as they struggle with holding on and letting go. Frostpunk 2

The sequel to the critically acclaimed God of War (2018), God of War Ragnarök picks up with Fimbulwinter well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Odin’s forces in Asgard prepare for a prophesied battle that will end the world.

Along the way, they will explore stunning, mythical landscapes, and face fearsome enemies in the form of Norse gods and monsters. As the threat of Ragnarök grows ever closer, Kratos and Atreus must choose between the safety of their family and the safety of the realms.


GAME INFO
Genre: Action, Adventure, RPG
Developer: Santa Monica Studio, Jetpack Interactive
Platform: PC
Game Size: 94 GB
Released By: RUNE EMU
Version: v1.0.650.7780 (Build 18048593 | Full Version + All DLCs
Pre-Installed Game', '/uploads/2f120ce06ada45ef9979d337b6059df9.jpg', '', 'https://ffdl.cybar.to/q572ldk1o34w
https://ffdl.cybar.to/eacqjgifguen', 'https://youtu.be/hfJ4Km46A-0?si=_5Cunt_xfEtM0hj5', '/uploads/a815f8b09ceb4d978a7c06d5e51161af.jpg
/uploads/a5b2a0fe9ae342eb9100a5e733f8c632.jpg
/uploads/664e6c6dc3c44ac797d76768c22b94c4.jpg
/uploads/f214f257f31440d2a5e9ebe5cbaca4c2.webp
/uploads/01abb7d349fc4dbfb55ae57381d68bb4.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#d4d4d8', 0, 'game', '', '', '', '2026-06-16 00:39:03', 'Repack Features
Based on God.of.War.Ragnarok-RUNE ISO release: rune-god.of.war.ragnarok.iso (121,660,866,560 bytes)
Three Bonus OSTs in MP3 format and original ArtBook in hi-res JPGs (618 MB) added, thanks to NoeRIη! Original mini ArtBook in PDF format is preserved as well
All DLCs and Bonuses are included
6 GB VRAM Bypass is available in “_Bypass 6GB VRAM” folder after installation, thanks to cdozdil! Read “Instructions.txt” first!
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of voiceover packs you don’t need (English VOs are included by default) and bonus content
Significantly smaller archive size (compressed from cumulative 113.9 to 65.1~82 GB, depending on selected components)
Installation takes from 14 minutes (on 24-threads CPU + SSD, English-only) up to one hour (on 4-threads CPU + HDD, all languages and bonus content)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 176 GB
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 2 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (56, 'Grand Theft Auto V Enhanced', 'RPG, Open World', 4.5, 0, 'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld, the U.S. government, and the entertainment industry, they must pull off a series of dangerous heists to survive in a ruthless city in which they can trust nobody — least of all each other. Sonic Unleashed

Current PC players can transfer both GTAV Story Mode progress and GTA Online characters and progression with a one-time migration from the legacy version of GTAV to GTAV Enhanced.

Stunning Visuals
Enhanced levels of fidelity and performance with new graphics modes including ray tracing features such as ambient occlusion and global illumination, ray traced shadows and reflections, support for AMD FSR and NVIDIA DLSS, and more.*

Immersive Controls
Feel new levels of responsiveness with dynamic resistance via the Adaptive Triggers on the DualSense™ wireless controller, from directional damage to weather effects, rough road surfaces to explosions, and much more.*

3D Audio
Enhanced audio with support for Dolby Atmos and improved fidelity of speech, cinematics, and music.* Hear the sounds of the world with pinpoint precision: the throttle of a stolen supercar, the rattle of neighboring gunfire, the roar of a helicopter overhead, and more.

Grand Theft Auto Online
Experience GTA Online, a dynamic and ever-evolving online universe for up to 30 players, where you can rise from street-level hustler to become a kingpin of your own criminal empire.

Enjoy new high-performance vehicle upgrades and improvements like the Career Builder as well as all GTA Online gameplay upgrades, expansions, and content released since launch, ready to enjoy solo or with friends. Pull off daring co-operative Heists, enter adrenaline-fueled Stunt Races, compete in unique Adversary Modes, or hang out in social spaces including nightclubs, arcades, penthouse parties, car meetups, and much more.
GAME INFO
Genre: Action, Adventure, Racing
Developer: Rockstar North
Platform: PC
Game Size: 94.5 GB
Released By: RUNE emu
Version: v1.0.1013.29 | Full Version
Pre-Installed Game', '/uploads/0dd7c5d7133641ada88fb2bf2d1c7064.webp', '', 'https://vikingfile.com/d/J2V67Hs6qB/45gt54g546y.DR-GameDrive.Org.part1.rar
https://vikingfile.com/d/QpgVjmFdkB/45gt54g546y.DR-GameDrive.Org.part2.rar', 'https://youtu.be/NXTlh31ZWZ4?si=MC7WNA2TkHQAw7W8', '/uploads/ba26c59dcba94720928f62d68c4ed43d.jpg
/uploads/fbdceb85e31c417eb6e7b8534596c6a4.jpg
/uploads/f6891fa3538d4f3da2659f2085df0f89.jpg
/uploads/4bdd70bc73dc419583549bbc343604fa.jpg
/uploads/cf569a20a2694d1ea17734ec6d5c3e70.jpg
/uploads/3ee8264395644f14952a07c8b62e8e40.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#c026d3', 0, 'game', '', '', '', '2026-06-16 00:43:28', 'Repack Features
Based on Steam BuildID 21197051 version: 118.8 GB, thanks to thanks to AR-81!
Mr.Goldberg SCE emu applied over
Bonus Content (Brady Guide, Soundtrack/Radio Stations, Satellite Map, Wallpapers & 3 Bonus OSTs (3.2 GB) added, thanks to dremor8484 & ElAmigos!
Game version is v1.0.3725.0/1.72 Online (NO, multiplayer IS NOT available, it’s just a build number!)
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded – ALL MULTIPLAYER & DLC FILES are totally intact, repack is safe for modding
Selective Download feature: you may skip downloading and installing of Bonus Content
Significantly smaller archive size (compressed from cumulative 122.2 to 51.2/53.7 GB, depending on selected components)
Installation takes from ~35 minutes (on 24-threads CPU + SSD) up to 1.5 hours on 8-threads CPU + HDD, depending on selected components
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 122.2 GB (up to 134.3 GB during installation)
Use REG-files in “_Language Switcher” folder to change the game GUI language
Repack uses XTool library by Razor12911
At least 6 GB of free RAM (inc. virtual) required for installing this repack
ALWAYS run the game from desktop icon and with admin rights or from “PlayGTAV.bat” from the game root', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (57, 'inZOI (2025) v0.7.5 + Island Getaway DLC', 'RPG, Simulation', 4.5, 0, 'Download inZOI (PC) – Full Game. Step into a high-stakes life simulation where “every life becomes a story” in stunning, hyper-realistic detail. Harness powerful, intuitive tools to architect the life of your dreams—from deep character customization to intricate home building—as you guide your ‘Zois’ through a complex web of emotions and relationships. Experience the next generation of digital living as you observe and influence a world driven by a profound and detailed simulation where every choice crafts a unique narrative legacy.', '/uploads/27716d7784184c89b7281e9b396bde6c.webp', '', 'https://ffdl.cybar.to/jc1g8bfbj0yg', 'https://youtu.be/LNWBSArTQmg?si=PCh8Cuuz67H9oIBr', '/uploads/69066be2a4f84f818ca8a4d055df07b1.webp
/uploads/f0e70d788c1c4b65bc1d3a6fa9c9572a.webp
/uploads/90dff71c40434b8fb74b6a8c9cc18d79.webp
/uploads/4cfd63b07f39498c8c981fc4aaecae16.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-16 00:47:58', 'Repack Features
based On MY OWN CSF + Goldberg

Island Getaway added', '', '', '', '', '', 'How to Download, Extract & Play inZOI on PC
Download the game and save it to your PC.
Right-click the downloaded file and select “Extract Here” or “Extract to folder” using WinRAR or any similar tool.
Wait for the extraction process to complete.
Once done, open the extracted folder.
Run inZOI.exe to start the game.', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (58, 'Mafia: The Old Country Free Download (Build 20951841)', 'RPG, Adventure', 4.5, 0, 'Uncover the origins of organized crime in Mafia: The Old Country, a gritty mob story set in the brutal underworld of 1900s Sicily. Fight to survive as Enzo Favara and prove your worth to the Family in this immersive third-person action-adventure set during a dangerous, unforgiving era.

Enzo will do anything for a better life. After a brutal childhood of forced labor, he’s ready to risk everything to become a man of honor in the Torrisi crime family.

His oath to the Mafia, with all the power, temptation, and hardship it entails, is a burning reminder of this simple truth: Warhammer 40,000: Mechanicus II
GAME INFO
Genre: Action, Adventure
Developer: Hangar 13
Platform: PC
Game Size: 45.6 GB
Released By: voices38
Version: Build 20951841
Pre-Installed Game', '/uploads/2caec86397e547a2a1b1f63c687be9d7.jpg', '', 'https://ts.bzzhr.to/d/3nwmwjvpsgnq?v=JCgJLgPzvw4XAm_EC3OjMxWUA8vJFAUOq4Zh3cL8D7pccvmJeaAVWyrLay52JARH7ZkjUD5mN71ynVDXAgLbMMj8eito0NV7RAElS-xY7T5KvpkBJWZ53YCvBG_Per3VGWZRAkEOj6SentNSxCaC9gF8zg4bXN2LR4WHGvYo9_AwV0UHMsHJ6HPi4iyxcy53jbnMYKybl9NEmdVuDuF33JbmXxeZMMy95i8oa-vxiHIrumEvWMa0Z38', 'https://youtu.be/AMtLTi0koGE?si=5nUWQ-FL4x14AloM', '/uploads/0d442592115e453a81da442cf9b30b51.jpeg
/uploads/bdf58669d86f4feb9872802483e4fd77.jpg
/uploads/20d2b4669844476cb010be6b8d2a3784.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#991b1b', 0, 'game', '', '', '', '2026-06-16 01:04:22', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (59, 'Marvel’s Spider-Man: Miles Morales', 'RPG, Adventure, Action, Sci-Fi', 4.5, 1, 'Following the events of Marvel’s Spider-Man Remastered, teenager Miles Morales is adjusting to his new home while following in the footsteps of his mentor, Peter Parker, as a new Spider-Man. But when a fierce power struggle threatens to destroy his new home, the aspiring hero realizes that with great power, there must also come great responsibility. To save all of Marvel’s New York, Miles must take up the mantle of Spider-Man and own it. Marvel’s Spider-Man Remastered

The Rise of Miles Morales

Miles Morales discovers explosive powers that set him apart from his mentor, Peter Parker. Master his unique, bio-electric venom blast attacks and covert camouflage power alongside spectacular web-slinging acrobatics, gadgets and skills. The Amazing Spider-Man 2

A War for Power

A war for control of Marvel’s New York has broken out between a devious energy corporation and a high-tech criminal army. With his new home at the heart of the battle, Miles must learn the cost of becoming a hero and decide what he must sacrifice for the greater good.

A Vibrant New Home

Traverse the snowy streets of his new, vibrant, and bustling neighborhood as Miles searches for a sense of belonging. When the lines blur between his personal and crime-fighting lives, he discovers who he can trust, and what it feels like to truly be home.
GAME INFO
Genre: Action, Adventure
Developer: Insomniac Games, Nixxes Software
Platform: PC
Game Size: 37 GB (RAR)
Released By: Mr_GOLDBERG (Ty InsaneRamZes)
Version: v3.617.1.0 | Full Version + DLC
Pre-Installed Game
Miles Morales discovers explosive powers that set him apart from his mentor, Peter Parker. Master his unique, bio-electric venom blast attacks and covert camouflage power alongside spectacular web-slinging acrobatics, gadgets and skills. The Amazing Spider-Man 2

A War for Power

A war for control of Marvel’s New York has broken out between a devious energy corporation and a high-tech criminal army. With his new home at the heart of the battle, Miles must learn the cost of becoming a hero and decide what he must sacrifice for the greater good.

A Vibrant New Home

Traverse the snowy streets of his new, vibrant, and bustling neighborhood as Miles searches for a sense of belonging. When the lines blur between his personal and crime-fighting lives, he discovers who he can trust, and what it feels like to truly be home.', '/uploads/bc30b2c84a174b15be1958f41d6166d0.jpg', '', 'https://ffdl.cybar.to/ser3up07x7pp', 'https://youtu.be/3wHL2VIaFcs?si=0b5nlC9foumjHJbH', '/uploads/832b8fd51ef94af3bcd122df879a9ace.jpg
/uploads/60c5967d94014543ac9465de7b59494c.jpeg
/uploads/12e5df4932744fdabf0a3d2f154d6cd0.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-16 01:07:42', 'Repack Features
Based on Marvels_Spider-Man_Miles_Morales-FLT ISO release: flt-marvels_spider-man_miles_morales.iso (42,008,958,976 bytes)
Game version: v1.1116.0.0; Pre-purchase Entitlements DLC is included and activated
Missing language packs (9.5 GB) added, thanks to CarvingMan!
Bonus Soundtrack (130 MB) added, thanks to NoeRIη!
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of voiceover packs you don’t need. English VOs are included by default
Significantly smaller archive size (compressed from cumulative 48.8 to 27.4~34.4 GB, depending on selected components)
Installation takes 5-15 minutes (depending on your system and selected components)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 57 GB
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 2 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (60, 'PRAGMATA Deluxe Edition + 3 DLCs/Bonuses', 'Action, Sci-Fi', 4.5, 1, 'Download PRAGMATA (FitGirl Repack) – Full Game. Survive a high-stakes sci-fi odyssey in this cinematic action-adventure from Capcom. Navigate a lunar facility overrun by rogue AI as Hugh and the mysterious android Diana, architecting a desperate escape to Earth in a world where gravity, technology, and humanity collide.

How to Download, Extract & Play PRAGMATA on PC
Make sure you have virtualization tech enabled in your BIOS: VT-x for Intel or AMD-V (SVM) for AMD
Run “VBS.cmd” in the game folder – you might want to download fresh version here: https://fitgirl-repacks.site/hypervisor-guide/
Press 1 to make necessary changes to the system
Reboot and in the loading menu press F7 to disable DSE
Run “PRAGMATA.exe”
Play
Run “VBS.cmd” again and press 3 to revert made changes
Reboot in the normal, secure mode', '/uploads/7055a49ca0994d2ea97b332f01574f4e.jpg', '', 'https://ffdl.cybar.to/cwfcoeg3ijnj', 'https://youtu.be/l31ey7o1g9s?si=NMClEoyIN_vVtNVO', '/uploads/4f4af9bad5a1490ba54d97454ee83e04.webp
/uploads/80be0fe88dba4c0faf58de7aa5f644d0.webp
/uploads/58c444f6a4e14525a8d734f4135158d0.webp
/uploads/5478d22698f04d0a8c8844634314e21e.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-16 01:10:21', 'Repack Features
Based on Steam BuildID 22357085 release: 34.7 GB
“The Bounded Soundtrack” added
Hypervisor Bypass (INTEL & AMD) by DenuvOwO + Goldberg emu + SaveFix applied over
Many antiviruses, including Windows Defender are now marking HV files as rootkits, rendering games unplayable. To avoid it either turn off AV completely, or add source/target installation folders to exclusions
VBS.cmd script v1.6 added
Custom launcher added for easier HV steps processing
3 DLCs/Bonuses (Shelter Variety Pack, Outfit Set – Neo Bushido & Neo Kunoichi, The Bounded Soundtrack) are included
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Smaller archive size (compressed from 34.7 to 26.1 GB)
Installation takes from 7 minutes (on 32-threads CPU + SSD) up to 25 minutes (on 8-threads CPU + HDD)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: 34.7 GB
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 4 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (61, 'Red Dead Redemption 2', 'RPG, Adventure, Open World', 4.5, 0, 'Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive. As deepening internal divisions threaten to tear the gang apart, Arthur must make a choice between his own ideals and loyalty to the gang who raised him. Now featuring additional Story Mode content and a fully-featured Photo Mode, Red Dead Redemption 2 also includes free access to the shared living world of Red Dead Online, where players take on an array of roles to carve their own unique path on the frontier as they track wanted criminals as a Bounty Hunter
GAME INFO
Genre: Action, Adventure
Developer: Rockstar Games
Platform: PC
Game Size: 116 GB
Released By: Razor1911
Version: Build 1491.50 | Ultimate Edition + UE Unlocker
Pre-Installed Game', '/uploads/b3e0ac02c83b49908d7bc4ee556b59fd.jpg', '', 'https://ts.bzzhr.to/d/ck7nob6r1bcv?v=hN0pWkx29R7B2Eaj5cXgnbbPCjhN1ZQQmsAlgDkvt7ouuR_AuZpiMQY0P42kGV_u5TbCjiP0zzNJ1w_w-eoz772_LnOvPUu1_mfnaPl44mv-ydU79YAXTJ5nkYODsSalwalJAl6I9E7Mz2FmVNrvMzOC91n4MEhihhQUx4cv', 'https://youtu.be/gmA6MrX81z4?si=koYktEEpmC6Qv0dV', '/uploads/4f665d9289b34a8e9c5400f8f3c8e369.jpg
/uploads/a8ea3977691f40d8b073043f507e3286.jpg
/uploads/cfb760373f284d37846dde5c3bcf3d94.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#dc2626', 0, 'game', '', '', '', '2026-06-16 01:12:54', 'Repack Features
Based on Red_Dead_Redemption_2_Ultimate_Edition-Razor1911 ISO release: rzr-reddeadredemption2.iso (128,253,820,928 bytes)
No-intro Launcher.exe applied over, thanks to machine4578! Original Razor’s one preserved for purists in the root folder
Game version is Build 1491.50
All offline “DLCs” of Ultimate Edition are included, but must be activated with a special unlocking file – check “readme.txt” in the “_Unlocker” after installation
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Significantly smaller archive size (compressed from 119.4 to 68.8 GB)
Installation takes: ~1 hour (24-threads CPU + SSD); ~1 hour 50 minutes (16-threads CPU + HDD); up to 5 hours (4-threads CPU + HDD)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: 119.3 GB
Language is automatically set by detecting your system locale. To force specific language, run one of “Force” language BAT-files in the game root
Use ONLY “Launcher.exe” in the game root to launch the game
Repack uses compression library by Razor12911
At least 3 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (62, 'Resident Evil 4 Remake', 'Horror, Adventure', 4.5, 0, 'GAME INFO
Genre: Action, Adventure
Developer: CAPCOM Co., Ltd.
Platform: PC
Game Size: 68.7 GB
Released By: RUNE emu
Version: Build 22377325 | Full Version + All DLCs
Pre-Installed Game
Survival is just the beginning. Death or Treat Six years have passed since the biological disaster in Raccoon City. Agent Leon S. Kennedy, one of the survivors of the incident, has been sent to rescue the president’s kidnapped daughter. He tracks her to a secluded European village, where there is something terribly wrong with the locals.

And the curtain rises on this story of daring rescue and grueling horror where life and death, terror and catharsis intersect. Featuring modernized gameplay, a reimagined storyline, and vividly detailed graphics, Resident Evil 4 marks the rebirth of an industry juggernaut. Relive the nightmare that revolutionized survival horror.', '/uploads/62394e113ecc4a4c80792c6d95214831.jpg', '', 'https://ts.bzzhr.to/d/f3pa7vkj99er?v=92f5_x-0UV2Np0pu0rMGN5amin32qqIY3gsDhBv44nHfd56Fy8Wb9gcb59kMtu-qC-6HIDuhYZ7vseFxS3lyHTVQTieNZWjk012yDX_fqM9dHYLuKxEOM9vKf_kMtviBcrWRNltI9F_JuPecCbHLrPapK3JfNdYVRUHLhCUC9MwtYUGLmoCn0ow1vnfKgw5E5_wVu4bPlEpKSlVX-V4v0lrj6mzaZ1vWz6F09YkqOgwa', 'https://youtu.be/E69tKrfEQag?si=Pw2njAkINDuo5Zrw', '/uploads/0b99c6c08f274795916e0524dcdca949.jpg
/uploads/c4b44fa22da045cea6ed2c74a67bdffb.webp
/uploads/d2ccec92e5ef477f9de7aa94f6445931.webp
/uploads/ed10e85df54b4858bdcfaef71d9f785f.webp
/uploads/954f3e7a93f8496697b51d16fbcc164e.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#be123c', 0, 'game', '', '', '', '2026-06-16 01:15:28', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (63, 'Marvel’s Spider Man 2', 'RPG, Adventure, Sci-Fi, Open World', 4.5, 0, 'Mask-up for more thrilling web-slinging heroics as Marvel’s SpiderMan 2 swings onto PC Developed by Insomniac Games in collaboration with Marvel, and optimized for PC by Nixxes Software.

A city under siege!

Spider-Men Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask as they fight to save the city, each other and the ones they love, from the monstrous Venom and the dangerous new symbiote threat. Enotria: The Last Song

Traverse an expanded Marvel’s New York

Explore a larger Marvel’s New York than ever before, featuring two new boroughs – Brooklyn and Queens – as well as locations like Coney Island, and more.

Swing, jump, and utilize the new Web Wings to travel across the city, switching between Peter Parker and Miles Morales in open world exploration to experience different stories and epic new powers.

Experience two playable Spider-Men

Wield Peter’s new symbiote abilities and Miles’ explosive bio-electric venom powers, and discover upgradeable, high-tech equipment that enhances the combat experience for extensive gameplay depth and variety.

Battle iconic Marvel Super Villains

Fight against a variety of new and iconic villains, including an original take on the monstrous Venom, the ruthless Kraven the Hunter, the volatile Lizard, and many more!

A more accessible Spider-Man experience

Support for a range of accessibility features strives to create a Marvel’s Spider-Man experience without barriers, that can be enjoyed by more players of different abilities.
GAME INFO
Genre: Action, Adventure
Developer: Insomniac Games, Nixxes Software
Platform: PC
Game Size: 94.6 GB
Released By: RUNE + Fixed exe
Version: v1.526.0.0 | Full Version
Pre-Installed Game', '/uploads/b85c50b8008744aab1fe86e5bde24895.jpg', '', 'https://ffdl.cybar.to/hg3uofzuw9cn
https://ffdl.cybar.to/q6rs90s43je5', '', '/uploads/8be7cb7dddd043aba5a9224131adf4f3.jpg
/uploads/536230058a28419995e77b0ea4fd9b43.jpg
/uploads/3c6208ea8eaa4922bf7a90f6d8f6594a.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#b91c1c', 0, 'game', '', '', '', '2026-06-16 01:17:54', 'Repack Features
Based on Marvels.Spider-Man.2-RUNE ISO release: rune-marvels.spiderman.2.iso (101,088,722,944 bytes)
Marvels.Spider-Man.2.Language.Pack-RUNE (31,765,439,654 GB) applied over
Update to v1.131.0.0 (366 MB) added, thanks to ElAmigos! To use it, copy contents of “_Update to v1.131.0” folder to the game root
Bonus Soundtrack (184 MB) added
PSN Bonus Costumes unlocker added, thanks to ⎝⎝✧GͥOͣDͫ✧⎠⎠! To use it, run the game once, then copy files from “unlock_psn_bonuses” folder to “C:UsersYOUR USERNAMEDocumentsMarvel’s Spider-Man 2DIGITS” folder, where DIGITS folder will have a random name. Unlocking is done via custom save file, so beginning of the story will be skipped with this save
Game version: v1.131.0.0/v1.131.0.0; 2 DLCs (PC Purchase Perks & Digital Deluxe Upgrade) are included
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of bonus soundtrack and voiceover packs you don’t need. English VOs are included by default
Significantly smaller archive size (compressed from cumulative 124.3 to 64.5~87.9 GB, depending on selected components)
Installation takes from 30 minutes (on 32-threads CPU + SSD) up to 2 hours (on 4-threads CPU + HDD)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 137.6 GB
Use “language.changer.exe” in game root to change the game language
Repack uses XTool library by Razor12911
At least 2 GB of free RAM (inc. virtual) required for installing this repa', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (64, 'The Last of Us Part I', 'Adventure, Horror, Action', 4.5, 0, 'Experience the emotional storytelling and unforgettable characters in The Last of Us, winner of over 200 Game of the Year awards. In a ravaged civilization, where infected and hardened survivors run rampant, Joel, a weary protagonist, is hired to smuggle 14-year-old Ellie out of a military quarantine zone. However, what starts as a small job soon transforms into a brutal cross-country journey.

The Last of Us Part one PC release brings with it plenty of PC features to bring Joel and Ellie’s tense and unforgettable journey to life. Through the experiences of Joel and Ellie, PC players can fully immerse themselves in beautiful yet haunting environments in stunning detail with true 4K resolutions From the harsh, oppressive streets of the Boston QZ to the overgrown and abandoned homes of Bill’s Town to so much more, embark on a beautiful journey across the United States of America with Ultra-Wide Monitor Support for both 21:9 Ultrawide and 32:9 Super Ultrawide aspect ratios. Terra Nil

Experience all these locations, stealthily sneaking through abandoned homes and cities (and picking their drawers and cabinets clean looking for supplies) or engage in tense, captivating action with 3D audio support to better hear the rustle of leaves, the crack of glass, or the footfalls of enemies trying to ambush you

Supercharge your framerates and fight for survival as Joel and Ellie with next-level temporal upscaling technology from AMD. FSR 2 uses cutting-edge algorithms to boost your framerates and deliver high-quality, high-resolution game experiences in The Last of Us Part I across a wide range of compatible graphics cards. The Last of Us Part I on PC features DualSense support through a wired connection so players can feel the impact of battle, the rumble of a tank rolling by, and so much more through haptic feedback and dynamic triggers.

With support for the DualShock 4 controller, a wide range of other gamepads, and keyboard and mouse, players can adjust their playstyle to suit their preferences. The PC release includes a number of new control customization options including full control remapping, primary and secondary bindings for keyboard and mouse control, an adaptive mode that allows players to combine keyboard and controller inputs, and more. Part I’s PC launch will also include The Last of Us Part I’s suite of accessibility features so that players can adjust the experience to suit their needs and preferences.
GAME INFO
Genre: Action, Adventure
Developer: Naughty Dog LLC
Platform: PC
Game Size: 80 GB
Released By: Mr_GOLDBERG | Ty Christsnatcher (cs.rin) for updates
Version: v1.1.5.0 | Full Version + Crash/Shaders Fix applied
Pre-Installed Game', '/uploads/5b6e3addd21d4752a6589c25e1d62f64.webp', '', 'https://vikingfile.com/d/lp9BeXGjq8/g5464hhhhh.ER-GameDrive.Org.part1.rar
https://vikingfile.com/d/C1fyFRQ1O5/g5464hhhhh.ER-GameDrive.Org.part2.rar', 'https://youtu.be/WxjeV10H1F0?si=I6t3hZTmv08DkRFa', '/uploads/d7154b7f1b7546d3986d00d14e9e11fa.webp
/uploads/264b7417ab3c4935a20a89c08e346306.webp
/uploads/6c668d4029084b66bd2d0b22eadab17a.jpg
/uploads/ec7ae666e75141ea8d97c9ac14eac02c.jpg
/uploads/ab2eedd34d6640e6bc79b27a8e1768a3.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#f97316', 0, 'game', '', '', '', '2026-06-16 01:20:52', 'Repack Features
Based on Steam BuildID 13777814 release: 78.4 GB, thanks to Ksenia!
Bonus Content (3 soundtracks, ArtBook, Digital Comic, Unofficial Strategy Guide, 769 MB) added, thanks to NoeRIη!
CODEX-RUNE crack/emu applied over
Game version: v1.1.3; 2 DLCs (Pre-purchase Entitlements & Upgrade to Digital Deluxe Edition) are included and activated
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading of credits/”Behind the Scenes” videos pack, bonus content and language packs you don’t need. English is included by default
Significantly smaller archive size (compressed from cumulative 79.2 to 38.8~52.1 GB, depending on selected components)
Installation takes (without optional components) from 8 minutes (on 24-threads CPU + SSD) up to 30 minutes (on 4-threads CPU + HDD)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 79.2 GB
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 2 GB of free RAM (inc. virtual) required for installing this repa', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (65, 'UNCHARTED: Legacy of Thieves Collection', 'Action, Adventure', 4.5, 0, 'GAME INFO
Genre: Adventure, Shooter, Third-person
Developer: Naughty Dog LLC, Iron Galaxy Studios
Platform: PC
Game Size: 80 GB
Released By: CODEX Emu + Steamless (Ty InsaneRamZes)
Version: v1.3.20900.0 (Build 10158704) | Full Version Direct play + Update
Pre-Installed Game

Seek your fortune and leave your mark on the map in the UNCHARTED: Legacy of Thieves Collection. Uncover the thrilling cinematic storytelling and the largest blockbuster action set pieces in the UNCHARTED franchise, packed with all the wit, cunning, and over the top moments of the beloved thieves – Nathan Drake and Chloe Frazer.

In an experience delivered by award winning developer Naughty Dog, the UNCHARTED: Legacy of Thieves Collection includes the two critically-acclaimed, globe-trotting single player adventures from UNCHARTED 4: A Thief’s End and UNCHARTED: The Lost Legacy. Each story is filled with laughs, drama, high octane combat, and a sense of wonder – remastered to be even more immersive.

Discover the breath-taking sights

From thick jungles to snow-capped mountains, exotic islands to rain-soaked streets, explore every inch of stunningly beautiful environments in spectacular detail. Immerse yourself in the cinematic storytelling with super-sharp 4K resolution, and Ultra-Wide Monitor support. Enjoy a host of enhanced graphical adjustment features such as adjustable Texture and Model Quality, Anisotropic Filtering, Shadows, Reflections and Ambient Occlusion.

Feel the thrilling gameplay in your hands

Experience haptic feedback and dynamic trigger effects designed for UNCHARTED: Legacy of Thieves Collection by playing with the DualSense controller through a wired connection to your PC. For those that want to brighten things up even more, try out RGB support for Razer Chroma peripherals and Chroma Link compatible devices, as well as for Logitech models. You can also check previous posted game Potionomics.', '/uploads/28db2ea5145f4f0cb2e2218c3f5054f3.jpg', '', 'https://vikingfile.com/d/81Pif0lZTT/sfdf435.ER-GameDrive.Org.rar', 'https://youtu.be/F3Wl-OiZCO4?si=Gx9lfuxspi3nG6Xh', '/uploads/d4523f7b787342bebd6f148a406a41f6.jpg
/uploads/80a487029029461bac1a75d0b174beba.jpg
/uploads/b87ac30e4a7546448041040d5063e88f.jpg
/uploads/70b826e8d46b432dbe9825e7e8696242.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#eab308', 0, 'game', '', '', '', '2026-06-16 01:24:09', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (66, 'Watch Dogs 2', 'RPG, Sci-Fi, Open World', 4.5, 0, 'Play as Marcus Holloway, a brilliant young hacker living in the birthplace of the tech revolution, the San Francisco Bay Area. Team up with Dedsec, a notorious group of hackers, to execute the biggest hack in history; take down ctOS 2.0, an invasive operating system being used by criminal masterminds to monitor and manipulate citizens on a massive scale. Get the upper hand with Tobii Eye Tracking. Volcanoids', '/uploads/8945d26cff604119bca6f558fee3a720.jpg', '', 'https://fuckingfast.co/g1pdp1kuolm5#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/w7m35s4qeg8h#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/owmc71qpudho#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/j16fnwg7bkdy#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/10pj6ut59hib#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/q0h0ei4f12sz#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/tl9wcfxd1n0u#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/oxqtz4i08vee#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/hei0rfa1yw9w#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part09.rar
https://fuckingfast.co/a0ztlumxjeox#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/1e05h1l9rmf4#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part11.rar
https://fuckingfast.co/12vme2t61d7o#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part12.rar
https://fuckingfast.co/ghcauyznvvx1#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part13.rar
https://fuckingfast.co/ju8u7mjtrqkh#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/ju8u7mjtrqkh#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/jx1f2ya9bun8#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part15.rar
https://fuckingfast.co/iei5x8zwa7bu#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part16.rar
https://fuckingfast.co/1l2hiwjbb8vn#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part17.rar
https://fuckingfast.co/1l2hiwjbb8vn#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part17.rar
https://fuckingfast.co/9y09iog2k5kv#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part18.rar
https://fuckingfast.co/rszrqxijag3i#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part19.rar
https://fuckingfast.co/8pwvutgraj06#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part20.rar
https://fuckingfast.co/dwzs2alusuib#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part21.rar
https://fuckingfast.co/bmoz9hp3k220#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part22.rar
https://fuckingfast.co/9l7laipryrp0#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part23.rar
https://fuckingfast.co/c0y3ebdac2im#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part24.rar
https://fuckingfast.co/yysrmpzvwnie#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part25.rar
https://fuckingfast.co/c4vxhg8j02cy#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part26.rar
https://fuckingfast.co/gaats6lpl49t#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part27.rar
https://fuckingfast.co/b61pt0k0w0rs#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part28.rar
https://fuckingfast.co/p1dpdk4jjzk9#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part29.rar
https://fuckingfast.co/j2p04i3o2tog#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part30.rar
https://fuckingfast.co/wmcqxf2ifyk8#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part31.rar
https://fuckingfast.co/ksuf0zypii0w#Watch_Dogs_2_--_fitgirl-repacks.site_--_.part32.rar', 'https://youtu.be/hh9x4NqW0Dw?si=57NSpkS5dDXd2Knu', '/uploads/d7d3e698f9e64285ae37ec94f5ac6ff4.jpg
/uploads/79faa380e9074c0c86c525d007590a74.webp
/uploads/fa1e413330704277a488cfb402e24785.jpg
/uploads/49ed2d549dac4592910238e50dc9146f.jpg
/uploads/510aef75ba044f84a85da103a3f1367a.jpg
/uploads/b86fff67bb5d4810a3e267090b612419.jpg
/uploads/112aeb0411c04725b76a4852b46e3f7b.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#71717a', 0, 'game', '', '', '', '2026-06-16 01:26:53', 'Repack Features
Based on Watch.Dogs.2.MULTi16-PLAZA ISO release: plaza-watch.dogs.2.iso (43,604,344,832 bytes)
Watch.Dogs.2.MULTi16.Update.v1.17-PLAZA (19.2 GB) and missing Russian files (1.6 GB) added
Bonus content (Soundtrack, Artworks, Wallpapers) added and available as optional download
All released DLCs included and activated
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective download feature: you may skip downloading and installing of speech files, ultra textures and bonus content files
Significantly smaller archive size (compressed from cumulative 61.4 to 16.9~35.3 GB, depending on selected components)
Installation takes (for one language): ~1 hour on 4/8-threads CPU without Ultra Textures; + additional 30 minutes with Ultra Textures selected
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 48 GB (up to ~53 GB during installation)
At least 2 GB of free RAM (inc. virtual) required for installing this repack
Game language can be changed in game settings, speech and texts separately', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (67, '3uTools 9.06.006', 'Utilities & System', 4.5, 1, '3uTools is a program that allows you to manage your iOS device on Windows easily. You can easily manage your photo gallery, videos, audio, installed apps, ringtones, etc. You can even quickly check your device''s status, seeing if it has a jailbreak or a bad battery. All the information you need about your iPhone or iPad is at your fingertips.

Convenient and easy-to-use software
To start using 3uTools, you just need to connect your iOS device to your PC with a USB cable. As soon as you do this, the program will recognize the connected iPhone or iPad model and display a complete summary of all its features. Here, you can see the model, battery level, IMEI, if it has been jailbroken or activated, whether it has an Apple ID Lock, and the number of times it has been charged. You can find out all this information by simply connecting your device.

Advertisement
Remove ads and more with Turbo
An impressive list of services
In addition to displaying all this data, 3uTools boasts a huge list of features. You can easily create backup copies of your iOS device. Of course, you can also restore these backups just as easily. If you''re creative, you can create your own ringtones in just a few seconds by simply importing an audio file. Another interesting feature lets you save memory by deleting all the residual files on your device. You can even view your iOS device screen in the app in real-time.

The best iOS toolbox for Windows
Download 3uTools to get the most out of your iOS device. Thanks to this software, you can easily and securely make the most of your iPhone, many of whose advantages are not accessible by default. The program provides you with many features, so you can manage your Apple devices however you like.

Information about 3uTools 9.06.006

Basic information

Developer
3uTools

Category
Phone Tools

Rating
All ages

Languages
English 47 more
Distribution model

Pricing
Free

License
Owner

Copyright © 2026 3uTools', '/uploads/3c87e254e69c4707b125619ff33b7c0c.jpg', '', 'https://dl.3u.com/update/v900/dl/windows/3uTools_v9.06.006_Setup_x64.exe', '', '/uploads/0432280c742a42009539d42a47882855.webp
/uploads/bbcab8d1ea1e44a0b4f44cefe1182a36.webp
/uploads/a9e5f5862d9048f99a82cab361b467a3.webp
/uploads/26854d200e2c46358def84c73d6635a9.webp
/uploads/76564104e7c6450c8ac110f25bd69c54.webp
/uploads/f84117ced7ee47b9b13807f1989042f7.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#2563eb', 0, 'software', '', '9.06.006', 'Freemium', '2026-06-17 02:57:33', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (68, 'Adobe Acrobat Pro 2025 (v25.1.20630) x64 Multilingual', 'Productivity & Office', 4.5, 0, 'Adobe Acrobat Pro is a complete PDF solution for desktop, mobile and web browsers. The program allows you to view, edit and manage PDF files, as well as convert documents into this format, opened in any application that supports the function of sending to print. In addition, any documents in Microsoft Office format, as well as viewed web pages, can be converted to PDF. In documents, you can use any review tools: edits, notes, footnotes, work with graphics.Adobe Acrobat Pro provides an opportunity for team work on documents, modern cloud solutions are available in it, allowing you to access files from mobile devices. This saves all the progress of the previous editing and even the location of the last view.', '/uploads/e75f625a798244358427df15308fe3d3.webp', '', 'https://vikingfile.com/d/Kl5J2nSWTq/brg56gh565.S-GameDrive.Org.rar', '', '', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#b91c1c', 0, 'software', '', 'v25.1.20630', 'Freemium', '2026-06-17 03:03:06', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (69, 'Adobe Illustrator 2025 (v29.7.1.8) Multilingual', 'Productivity & Office', 4.5, 0, 'Adobe Illustrator is an industry-standard vector graphics application widely used by designers in various fields of digital graphics, illustration and printing, in the development of all kinds of multimedia resources such as printed materials, web content, interactive media, videos and mobile applications.

Create vector graphics in the program that the pros use. Experience everything from web and mobile graphics to logos, icons, illustrations, packaging design and billboards. Enjoy creative freedom with Adobe Illustrator !', '/uploads/03beb07aa533464e96a95cc01199e19a.webp', '', 'https://vikingfile.com/d/vIfOO021Gv/5g56h5.S-GameDrive.Org.rar', '', '', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#f59e0b', 0, 'software', '', 'v29.7.1.8', 'Freemium', '2026-06-17 03:05:12', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (70, 'Adobe Lightroom Classic v14.5.0 Multilingual', 'Productivity & Office', 4.5, 0, 'Sometimes photographs cannot convey all those impressions that overwhelmed you at the time of shooting. Thanks to the tools of Adobe Lightroom Classic, you can edit photos on your computer and convey your emotions. Adobe Lightroom Classic provides powerful editing tools and advanced controls to create amazing photos. Add color, make dim photos bright and vibrant, remove stray objects and correct the skew of images. Easily organize all your photos on your desktop and share them in a variety of ways.', '/uploads/239255cc9feb4282943a70083ccafaa1.webp', '', 'https://vikingfile.com/d/q87xLEDWEw/54g45.S-GameDrive.Org.rar', '', '', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#1d4ed8', 0, 'software', '', 'v14.5.0', 'Freemium', '2026-06-17 03:06:29', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (71, 'Adobe Premiere Pro 2026 (v26.0) Multilingual', 'Productivity & Office', 4.5, 0, 'About
Download Adobe Premiere Pro 2026 (Windows) – free full software with professional video editing tools, advanced timeline controls, AI-powered features, color grading, audio enhancement, motion graphics, and full support for all major video formats for cinematic editing.', '/uploads/81be53188a894b45a4b649bdc7ae6be6.webp', '', '', '', '/uploads/bc6e835c0beb4635b8b1d88cb4bba0e9.png
/uploads/518a0a333c3c48538af3d824230d25d1.png
/uploads/4eb3217fe0bb455bb2f9f46a3a42164c.png', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#1d4ed8', 0, 'software', '', 'v26.0', 'Freemium', '2026-06-17 03:07:38', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (72, 'Anaconda', 'Action', 4.5, 2, 'Anaconda is a free and open source distribution of the programming languages Python and R, designed to simplify the management of packages and environments in data science, machine learning, and data analytics projects. If you''re looking for a robust and easy-to-use Windows platform, this tool has all kinds of features that will make your life easier while working.

Efficient management of packages and environments
Among the many features included with Anaconda, you will find a package and environment manager that makes installing, updating, and managing more than 7,000 open-source packages easy. This tool allows the creation of isolated virtual environments, ensuring compatibility and stability between different projects and their dependencies. In order to manage your options, you can perform searches using the environments tab, which you will find on the left side. From here, you can search for anything you want and add it to the tool in order to work with as many environments as you need.

Advertisement
Remove ads and more with Turbo
Broad support for data science libraries and tools
Anaconda comes pre-installed with over 200 essential packages for data science and machine learning, including NumPy, pandas, scikit-learn, and matplotlib. It also allows the installation of additional packages according to your needs, so you will be able to adapt this tool to whatever project you''re working on.

Integration with development tools and interactive environments
On the other hand, this tool integrates seamlessly with development environments such as Visual Studio Code and offers support for Jupyter Notebook. This compatibility and flexibility allow you to write and execute code in an interactive and collaborative environment. This can improve your productivity and make it much more comfortable to visualize the data and results of your data science projects.

Download Anaconda, a Python-based software, to work on your data science projects with all the features you need on a daily basis.

Information about Anaconda 2025.12-2
Basic information

Developer
Anaconda Inc.

Category
IDE', '/uploads/162c1cb23d0b442cba27ed0b31bf6821.png', '', 'https://repo.anaconda.com/archive/Anaconda3-2025.12-1-Windows-x86_64.exe', '', '/uploads/887bf1a7255e4c5fa9d018255b5c0a18.webp
/uploads/e463e50297724d2494eb50c8c9856aa7.webp
/uploads/7470c356cfa8421ca23bb42129fd9c9b.webp
/uploads/9dceb3e006bf46b8bdacca3a9f6b100d.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'software', '', '', '', '2026-06-17 03:09:04', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (73, 'AutoCAD 2026', 'Design & 3D', 4.5, 2, 'AutoCAD is an advanced computer-aided design (CAD) app that places the most precise tools in your hands to help you create plans, models, and documentation in both 2D and 3D. Used by millions of architects, engineers, designers, and construction professionals, AutoCAD allows you to design and annotate geometry, work with solids, surfaces, mesh objects, and make precise edits thanks to its powerful commands and intelligent functions.

Automation and efficiency
To make your work simpler, AutoCAD allows you to automate repetitive tasks. You can compare drawings, insert objects, create tables, and program custom routines using AutoLISP, APIs, and additional apps. The integrated AI tools can detect and process annotations, identify digital marks, and suggest design blocks, optimizing your time and minimizing errors. AutoCAD features seven tool groups for certain specializations, including architecture, mechanics, electrical design, industrial plants, and topography.

Collaboration and mobility
AutoCAD also includes collaborative options, allowing you to access your projects stored in the cloud from anywhere, whether on your desktop, on the web version, or on the mobile app. This level of connectivity allows you to share designs, review and approve documents, and make real-time modifications with your team, keeping the latest version available for all participants to see.

The utmost precision
The app integrates tools to annotate, dimension, and document every aspect of your models, with advanced controls for reference, layers, line styles, and fonts. With features like Markup Import and Markup Assist, you can import handwritten and digital annotations, and the AI-assisted system will take care of identifying any instructions to update your drawings automatically. Compliance with industry standards and the ability to export to DWG formats make it easier to share and present work to clients and collaborators.

Full customization
AutoCAD allows you to configure the workspace the way you want it: Create custom interfaces, macros, and quick menus, and add extensions from the Autodesk Marketplace to adapt the app to any professional workflow. Advanced users can deploy scripts and add-ons to integrate custom functions, optimizing the experience in larger projects or specialized sectors.

How much does AutoCAD cost?
AutoCAD is a paid tool, but you can use the trial version free for 7 days before deciding whether you want to purchase it or not. Additionally, students and teachers can use it for free for one year to familiarize themselves with the app before using it professionally. When you subscribe, you can install AutoCAD on up to three devices, with just a single user able to access the app at a time.

Download AutoCAD for Windows and create the most precise and advanced designs in both 2D and 3D.', '/uploads/fd6595d8524a48bbacb0d10c1e4628a7.png', '', 'https://www.anrdoezrs.net/links/7579233/type/dlg/https://www.autodesk.com/products/civil-3d/free-trial', '', '/uploads/3c33862385a2431391e2da8bf3b218d8.webp
/uploads/24bd302723aa4bd7bc6383fa90023a52.webp
/uploads/ac3f8dacda684f23be29afe03c313efe.webp
/uploads/77cf1fd1d5d04b4cb61156e33f8d4284.webp
/uploads/43bc955d91b3440bb33fe5a4fcbc1d5c.webp
/uploads/cf321117ce6d419e999bc716c9b79163.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#ef4444', 0, 'software', '', '2026', 'Freemium', '2026-06-17 03:10:56', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (74, 'Blender', 'Design & 3D', 4.5, 1, 'Blender is a free and open-source program that allows you to create 3D graphics and animations. Thanks to its versatility, it is used by film and video game professionals as well as amateur artists.

Modeling
3D modeling is the most important function of Blender. You can create 3D models from basic shapes such as cubes, spheres, or cylinders and then transform them using advanced tools such as surface subdivision, vertex modification, and digital sculpting, adding a range of 3D elements and colors.

Animation
If you''re interested in animation, Blender has an armor and skeletal system that allows you to give movement to any character or element in your scene. Using keyframes, you can animate every part of an object or character and make precise adjustments to achieve smooth, natural movements. You can also create your figures in 2D to easily add them to your 3D creations.

Rendering
Once you have modeled and animated your scene, Blender offers several rendering options to give it a professional finish. Cycles is one of the most popular engines in Blender, which uses ray tracing to generate incredibly realistic images. You can also opt for Eevee, a real-time engine ideal for projects requiring speed without compromising visual quality. The previews of the elements you have on screen are made with less quality to reduce resource consumption. However, when rendering, full simulations are carried out so that the final result has the highest quality and detail.

Simulations and special effects
Blender is also known for its powerful physics simulations, allowing you to create impressive special effects such as fire, smoke, fluids, and collisions. For example, if you want to simulate an explosion or an object falling into the water, you can adjust the physical parameters of your objects and get a realistic result without needing advanced knowledge of physics.

Particle simulation
Particles are essential for creating stunning visual effects. With Blender, you can generate and control particles to simulate natural phenomena such as rain, dust, and sparks or even use them to create complex geometry and structures, such as the foliage of a tree or the fragments of an explosion.

Video editing and compositing
In addition to being a powerful 3D modeling and animation program, Blender also includes video editing tools. If you need to join video clips or add special effects to a movie, you can do so directly in Blender without requiring external software. The video editing interface allows you to cut, merge, and add transitions.

Extensions and community
If you run out of ideas, want to use another project as a base, or want to add new features, you can explore the hundreds of add-ons and content developed by both the community and the official developers. These add-ons allow you to add specific features for disciplines such as architecture and advanced visual effects or create video games. The learning curve is very steep in Blender, but once you have done a few tutorial projects and become familiar with its tools, you''ll be able to achieve spectacular results.

Download Blender if you''re looking for a comprehensive 3D editing program to model, render, texture, light, animate, and produce all kinds of computer-generated 3D scenes.', '/uploads/07222b3cbc79432fa99a1c0bbec4407b.png', '', 'https://dw.uptodown.net/dwn/wUTbxeCeiopxDw4u7v4hQ3PFMW3ZypPHJAD4uO5nIPIN7X1Wst4PqRA6KzgG3djiBC5XdQ127aekZhQpsrbC_u52v-u_LpqOIqzcBsxpL4Fo2lqTQsLTuaEeqb_8dxDO/Fqh8PxIHqGSb-pMOh7B1oXhzvky0HScCNXOSLtn5Leb65S2Xvsjx-Qj-1UzPL8pzITPvTV484ApePtGjYZRpW92rvwAHHpE0LFv-QPMDgu9BGvZZAPGc3OPXG2mMD_fL/hlY5pEGfmhaQpwyUPMflVObaywSNrmyKkVTOT4qJf8J_oJaccAk8-dCuhkN2J3Vu1RKXldFmLqmzCzBPWoRyXA==/blender-5-1-2.msi', '', '/uploads/ba068c2d8e224fc09fa3e72474a93e2e.webp
/uploads/edde41db025b42918d5b2cac8632e260.webp
/uploads/d60631bc0935401e9d9650bef707cff9.webp
/uploads/457628be04d64904ad0cd22bc079cad9.webp
/uploads/85b11ded0f024af9867cf7825b0f5385.webp
/uploads/1df4f0feb3e34e07967cee388c098785.webp
/uploads/ce3ce118e4f248819bbbf4f60b358812.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#eab308', 0, 'software', '', '5.1.2', 'Freemium', '2026-06-17 03:14:32', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (75, 'Canva 1.122.0', 'Design & 3D', 4.5, 0, 'Information about Canva 1.122.0
Basic information

Developer
Canva

Category
Editors

Rating
All ages

Languages
English 47 more
Distribution model

Pricing
Free

License
Owner

Copyright © 2026 Canva



Canva is a very popular image and video creation and editing tool among content creators for social networks. Its multiple functionalities make it possible for you to find all kinds of tools that you can use to create impressive posts and edit your photographs.

Canva for PC has a clean and easy-to-use interface, and the first time you open the app, you''ll see a tutorial that will show you everything it has to offer. Its tools allow you to do everything from creating posts for any social network to editing photos, videos, and even creating a whiteboard where you can place all kinds of GIFs and icons. Canva also has an extensive gallery with tons of filters and other elements, although some require money.', '/uploads/b4047c17d85044b29b5f2b45e9ce84b8.webp', '', 'https://www.canva.com/download/windows/canva-desktop/', '', '/uploads/ffcf51837ef84559b4edafdf5b412ab4.webp
/uploads/a802133fd1a04acebe9792cddff55283.webp
/uploads/05f33cb01c334154bddd2a5e0135c5d0.webp
/uploads/816051efd61c41c1bc39c46ca30b4f6f.webp
/uploads/3edfe580147d4ebcbcbfea8c7a94c62f.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'software', '', '', 'Freemium', '2026-06-17 03:16:42', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (76, 'CapCut v5.7.0 PC (Pre-Activated)', 'Design & 3D', 4.5, 4, 'Download CapCut Pc v5.7.0 Crack (Premium Unlocked) to access all premium features, no watermark, and advanced editing tools for free.', '/uploads/090738eac6f34747a3475e96f98497d4.webp', '', 'https://capcutaffiliateprogram.pxf.io/c/326703/3041199/22474', '', '/uploads/6c9b1447ede548e0a0613e340b035a01.webp
/uploads/4d7d3333686942f082d83f08edc37c6b.webp
/uploads/65e61f93ab63438ead28903462f938fd.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#ffffff', 0, 'software', '', 'v5.7.0', 'Freemium', '2026-06-17 03:18:34', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (77, 'ChatGPT', 'Action', 4.5, 0, 'ChatGPT is the official app of OpenAI''s popular chatbot. With this desktop version, which is completely free to use, you won''t need to open the web browser every time you want to make a query. Instead, you can quickly access it from Windows by simply double-clicking on an executable (or using a keyboard shortcut).

Easy to configure
Installing and configuring ChatGPT is not overly complex, but it does require at least a couple of minutes of your time, depending on the version of Windows you are using. Fortunately, there are detailed tutorials and step-by-step guides that will explain how to do it. As with any other version, you will need to log in with your email or Google account to use all the features of this chatbot.



Choose the language model that best suits your needs
When using ChatGPT, you can find a list of the different language models available at the top of the interface. Choose between GPT-4o, GPT-4 and GPT-3.5. As OpenAI releases updates, the list of models will also be updated. This allows you to choose the language model that offers the best quality-performance ratio for your everyday use. After all, everyone has their own individual needs and the goal of AI is to adapt to them.

More features on desktop
One of ChatGPT''s new features for desktop is that you can share your screen with the app. This unlocks endless possibilities. ChatGPT can analyze your code, take a look at your graphs, or look for similarities in a photo, all in a matter of seconds. You can even control the app using voice commands. If you prefer not to use your PC''s microphone, there is also a keyboard shortcut that opens the client instantly and allows you to make quick queries.

True AI arrives on Windows
Download ChatGPT for Windows and enjoy the benefits of the most powerful chatbot on the market on your PC. Thanks to this app you can save a lot of time when carrying out a number of everyday actions, including Internet searches, text or code reviews, and much more, without having to go through the web browser.', '/uploads/5e003d7e61804890b53cbfd372575499.jpg', '', 'https://get.microsoft.com/installer/download/9nt1r1c2hh7j?hl=en-us&gl=us&referrer=storeforweb', '', '/uploads/85b31def920049f894a48ea9512497a3.webp
/uploads/6eaddcfdaa514d02b7e75e444266bcaf.webp
/uploads/f32cf6751dd241b7bd4c0bd4205c99c2.webp
/uploads/2246ccd1c9d04c26b2fd14c9d93a56eb.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#0ea5e9', 0, 'software', '', '', '', '2026-06-17 03:19:55', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (78, 'Embarcadero Dev-C++', 'Action', 4.5, 0, 'Embarcadero Dev-C++ is a new and improved fork (sponsored by Embarcadero) of Bloodshed Dev-C++ and Orwell Dev-C++. It is a full-featured Integrated Development Environment (IDE) and code editor for the C/C++ programming language. It uses Mingw port of GCC (GNU Compiler Collection) as its compiler. Embarcadero Dev-C++ can also be used in combination with Cygwin or any other GCC based compiler. Embarcadero Dev-C++ is built using the latest version of Embarcadero Delphi. Embarcadero Dev-C++ has a low memory footprint because it is a native Windows application and does not use Electron.', '/uploads/b8040c5abb82438b8623d76aa7db2a69.webp', '', 'https://github.com/Embarcadero/Dev-Cpp/releases/download/v6.3/Embarcadero_Dev-Cpp_6.3_TDM-GCC_9.2_Setup.exe', '', '', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#ef4444', 0, 'software', '', '', '', '2026-06-17 03:21:01', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (79, 'Autodesk Fusion 360', 'Design & 3D', 4.5, 1, 'Fusion 360 is one of the best CAD programs on the market for creating and editing 3D parts and components. With Fusion 360, you can create designs with millimetric precision, then print them in 3D or go directly to manufacturing.

Fusion 360 allows you to choose the material you want to use for manufacturing, such as plastic or metal. You can design circuits and interact with all kinds of objects, as in any CAD software. In addition, you can render your designs in a matter of minutes, making it easy to share images of them outside of the program. You can also share 3D models and make quick annotations or drawings to indicate the modifications that need to be made. Fusion 360 is also connected to the cloud, allowing you to save your designs and make sure you don''t lose them.

When creating designs on Fusion 360, you''ll have a large number of parametric options to choose from. You can create cubes, cylinders, spheres, tubes, and all kinds of other basic shapes to work with. You can also make all kinds of modifications to these shapes, including cutting them, smoothing edges, resizing them, etc.

Fusion 360 supports importing files in .123dx, .3mf, .dxfs, .f3d, .f3z, .fbx, .ige, .iges, .igs, .obj, .ste, .step, and .stp formats. It also supports exporting files in .3mf, .f3d, .f3z, .fbx, .iam, .ipt, .obj, .skp, .smt, .step, .stl, and .stp formats.

In short, if you''re looking for a CAD modeling program that allows you to create, test, and print a 3D design from just one place, don''t hesitate to download Fusion 360.', '/uploads/14eb920191604709ae9c1fcfa86c09e3.webp', '', 'https://www.anrdoezrs.net/links/7579233/type/dlg/https://www.autodesk.com/products/fusion-360/free-trial', '', '/uploads/b918a56cb12943f6b392dded98e043e3.webp
/uploads/c6938afcd82f4dd9980ad471ff283229.webp
/uploads/f698e6744105415f89ef44d2522b1ee0.webp
/uploads/669ed2a6e32e4200a7987c0e2bbea68e.webp
/uploads/c8d52d628a3d4242a9fc556ccfe48b56.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#f97316', 0, 'software', '', '58.2702.1.0', 'Freemium', '2026-06-17 03:22:54', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (80, 'iTunes 12139.10003.61011.0', 'Utilities & System', 4.5, 1, '', '/uploads/f4043a3e2997450cb7c85c1395b83b78.jpg', '', 'https://www.filehorse.com/download/file/qiDZmQvyN3HEdWkiruHACNY9N1I8TfMCD12flh65izCZD0Xz0ziQnh31Pj2Okq7kf1nEXKOxo_Y4L8KeAJp0bIQBDxYpJgiwuiniOxVNyEk/', '', '/uploads/7cafb954c0ca40d1ac9fcbf12746e5f6.webp
/uploads/19e88d9ffd904bb684227634e154c408.webp
/uploads/573767d4d94349f4ac40d6dca86a3878.webp
/uploads/9994124bec834641ba7e502f300a0073.webp
/uploads/ae7a357ddc5d4e91bb5dc03f079cd17b.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#7c3aed', 0, 'software', '', '12139.10003.61011.0', '', '2026-06-17 03:26:18', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (81, 'Java JDK 26', 'Action', 4.5, 2, 'The full form of JDK is Java Development Kit. It is a software development environment used for developing Java applications and applets. The JDK is a core component of the Java platform and includes the Java Runtime Environment (JRE), an interpreter/loader (Java), a compiler (javac), an archiver (jar), a documentation generator (Javadoc), and other tools needed for Java development.

Key Components of JDK

The JDK contains several important components that facilitate Java development:

Java Runtime Environment (JRE): Provides the libraries, Java Virtual Machine (JVM), and other components to run Java applications.

Java Compiler (javac): Converts Java source code into bytecode that can be executed by the JVM.

Java Interpreter/Loader (java): Loads and interprets the compiled Java bytecode.

Java Archiver (jar): Packages related class libraries into a single JAR file.

Documentation Generator (Javadoc): Automatically generates documentation from source', '/uploads/d80bf0a379a7456e96b31fdd554a7ac4.jpg', '', 'https://download.oracle.com/java/26/latest/jdk-26_windows-x64_bin.exe', '', '', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#b91c1c', 0, 'software', '', '', '', '2026-06-17 03:29:15', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (82, 'WhatsApp Desktop', 'Action', 4.5, 0, 'WhatsApp Desktop is the official WhatsApp client for Windows that lets you use this popular instant messaging tool from the comfort of your desktop. Thanks to this app, you can read and type messages comfortably from your PC without having to look at your Android device or your iPhone every time you receive a new notification. At your disposal are exactly the same features and tools as in the mobile apps.

A very simple way to log in
To start using WhatsApp Desktop, you first must log in with your WhatsApp user account. Luckily, this process is quick and easy and can be completed in seconds. All you have to do is use the WhatsApp app on your smartphone and scan the QR code on the PC screen. Once you have completed this first step, simply wait a few seconds for the desktop client and the Android/iOS app to sync your conversations and groups.



All the features you need
One of the most important parts of WhatsApp Desktop is that, as mentioned above, it offers the same features as the mobile version but on PC. This means you can continue any private conversation, send and receive photos, share audio, use GIFs, create group conversations, send links, etc. You''ll notice virtually no difference between using the Windows and Android or iOS clients.

The difference between client and web version
You won''t find many differences between the browser version (the so-called WhatsApp Web) and this Windows client since both have the same interface and login system. The differentiating element is that this version, the client, works independently, so you don''t need to have a browser open. This can be particularly useful on computers with low RAM, which tend to slow down when many tabs are open. Moreover, WhatsApp Desktop consumes very few resources under normal conditions.

Privacy management
Many WhatsApp Desktop users are unaware of the numerous privacy-related options. From the Settings menu, you can choose who you want to see your last seen time or if you want other users to know when you are online. You can also decide who can see your profile pictures and statuses and even lock your user session by setting a special password.

Sending and receiving WhatsApp messages from your PC
Download WhatsApp Desktop if you''re a regular WhatsApp user. Thanks to this app, you can easily keep talking to your friends, even sitting in front of your PC without your smartphone. Here, you''ll find all the features you need to chat normally on WhatsApp.', '/uploads/5cbffc4159b241fc9dd731aa99a51438.webp', '', 'https://get.microsoft.com/installer/download/9nksqgp7f2nh?hl=en-us&gl=us&referrer=storeforweb', '', '/uploads/fdeedaaa164e485bb82bb9fac796e705.webp
/uploads/6fda3ed44ffb4e92950b6782f7fe0581.webp
/uploads/45d02c302ba44736b4ac55272f0659df.webp
/uploads/a01b59d2369546f3b720a610e9aeccc5.webp
/uploads/f389974a842e4e668dfd6949ac56d91c.webp
/uploads/3b01651a341c4bc0a19d54137449f0b7.webp
/uploads/a8fc2680367d4c428150ff4f7c931cd7.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#16a34a', 0, 'software', '', '', '', '2026-06-17 03:31:34', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (83, 'MySQL Workbench', 'Productivity & Office', 4.5, 2, 'formation about MySQL Workbench 8.0.44
Basic information

Developer
Oracle Corporation

Category
Databases

Rating
All ages

Languages
English 1 more
Distribution model

Pricing
Free

License
Owner

Copyright © 2026 Oracle Corporation', '/uploads/d87375c7edd0494bb1e9f6533f6bbacc.png', '', 'https://cdn.mysql.com/Downloads/MySQLGUITools/mysql-workbench-community-8.0.47-winx64.msi', '', '/uploads/2403de98e7c549f89afef00a11bde48e.webp
/uploads/91f199c24f61466db6768d38f5cc9c6b.png
/uploads/015f6cb729b94121915f35e6b6f100f8.png', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#0ea5e9', 0, 'software', '', '', '', '2026-06-17 03:33:02', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (84, 'Apache NetBeans', 'Productivity & Office', 4.5, 1, 'Apache NetBeans is a free and open-source development environment (IDE) that allows you to create professional apps with Java, although it also offers support for other languages such as PHP, JavaScript, HTML5, C, C++ and more. Apache NetBeans allows you to write, debug, compile and run your apps from a single platform.

Advanced Java support and integrated tools
Apache NetBeans is compatible with the most recent versions of the Java JDK. Through it, you can develop anything from console apps to complex enterprise projects with Java EE or Jakarta EE. It also includes tools such as a code editor with syntax highlighting, intelligent auto-completion, safe refactoring and fast navigation between classes, methods and files. You can also create graphical interfaces using its visual GUI Builder designer, known as Matisse. This feature makes it easier to develop desktop apps by allowing you to drag and drop components onto the canvas, while the code is automatically generated in the background.

Remove ads and more with Turbo
Full web development from the same environment
If you work with web technologies, Apache NetBeans also has a lot to offer you. You can develop dynamic sites using HTML, CSS or JavaScript, as well as frameworks such as Angular, React or Vue. It also includes specific tools for programming with PHP, with support for frameworks such as Laravel or Symfony. It also offers integration with servers such as Apache Tomcat, GlassFish and Payara, allowing you to run and test your web apps directly from the IDE. This is ideal for Java EE projects, as you can manage deployments, control databases and debug services without leaving the platform.

Collaboration and version control
Apache NetBeans also allows you to manage your code in a secure and collaborative way. It is compatible with version control systems such as Git, Subversion (SVN) and Mercurial, which means you can clone repositories, make commits, manage branches or resolve conflicts directly from the IDE, without the need to resort to external tools. In addition to this, the integration with platforms such as GitHub or Bitbucket allows you to collaborate with other developers easily. You can view changes in real-time, review the version history or compare files to keep track of every change made to the project.

Extensions, templates and customization
Another noteworthy advantage of Apache NetBeans is its plugin system, which allows you to adapt the tool to your specific needs. You can install add-ons for additional languages, testing tools, static code analyzers, databases or integrations with other platforms. There is also a wide variety of templates to start projects quickly. In addition to this, you can customize keyboard shortcuts, color themes and environment settings to make your workflow as convenient as possible.

Download Apache NetBeans if you''re looking for a powerful and versatile Java development environment, one which is also robustly supported by the Apache Software Foundation.', '/uploads/4a57e46c4634484a8c6f34c391223f36.png', '', 'https://www.filehorse.com/download/file/TEJV8fSu9WTkp3Wbi7JNEpn93Z6VlqWJF-is4_tJQq4n_th-_zA_aL31KfSSSL4O1gyVnYjlYVsEtX_4X5gLI3EreVOR94MG_8A-hiJkDso/', '', '/uploads/07ffabd9b3d34fca99bce5b8b0d72e6e.webp
/uploads/550f485ac5ff427e9c320c59ddef7f60.webp
/uploads/f8e26a0001a142dfb0faf89f47291c97.webp
/uploads/9cf0552d4a5845329f7517d954f965f1.webp
/uploads/0f60a93d55b54e90aa2aa342115316ce.webp
/uploads/4541c1e46e6c45d581748b5bcea25820.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#18181b', 0, 'software', '', '', '', '2026-06-17 03:34:37', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (85, 'Telegram Desktop', 'Multimedia & Audio', 4.5, 0, 'Telegram Desktop is the official Telegram app for Windows operating systems that will allow you to use this popular instant messaging tool from your PC''s desktop. In order to use it, however, you will need to have a registered user account, a process that can be completed easily and in just a few seconds using your phone number.

The first time you launch Telegram Desktop, you will have to wait a few seconds for all your conversations and groups to be synchronized. Once this process is finished, you can continue with any conversation you have started in the mobile app. Similarly, you can access all the files, images, and voice memos you shared using the Android or iOS app. Many users, in fact, use Telegram to conveniently send all kinds of files between their desktop computer and their mobile device.


Another feature that sometimes goes unnoticed, but is very useful, is the creation of surveys. This tool, oriented exclusively to groups, will allow you to create surveys very easily; you can also choose whether you want the votes to be public or anonymous. You can also decide if you want the survey to be multi-response and create the survey in exam mode.

Apart from all its features, Telegram Desktop stands out for the simplicity and versatility of its interface. From the drop-down menu on the left, you can activate and deactivate the night mode with just one click, which is very useful. But even more useful is the option to automate the night mode, which can be found in the configuration options. Here, you will also have more than half a dozen different color palettes to give your desktop client a unique look.

Telegram Desktop is a must-have program for regular Telegram app users. The client is also very light and consumes very few resources, unlike other similar instant messaging apps, which are much more cumbersome. The only thing you need to be careful with if you suddenly notice that you are running out of space on the hard disk is the Telegram downloads folder, as it is possible to fill it up very quickly without hardly noticing it.

Information about Telegram Desktop 6.9.3', '/uploads/cf3b8060c18d453ab642b71fd6432b9f.png', '', 'https://telegram.org/dl/desktop/win', '', '/uploads/8b01429329484c74bddec059900346c5.webp
/uploads/64fb96169ec443a593399cf5f804120c.webp
/uploads/2664f03a1b90470da7cd401b00f9715f.webp
/uploads/becd0c624a384ea882d25b82dc5d2006.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'software', '', '', '', '2026-06-17 03:36:18', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (86, 'TikTok 1.0.5.0', 'Multimedia & Audio', 4.5, 0, 'TikTok is the Windows adaptation of the mobile app for the best short, spontaneous and genuine videos. In this app you can find interesting content about anything you like: from sports, movies, music, cat videos and much, much more.

To be able to use TikTok effectively, you need to create your own user account. Once inside TikTok you can start to enjoy some amazing, very creative and interesting content, although you may find some content that you are not interested in. You can drag the mouse up or down to jump to the next video. If some content does not interest you or you think it does not fit your tastes, you can right-click on it and select the "I am not interested in this type of content" drop-down menu. In this way, the TikTok algorithm learns about your tastes and shows you what it considers most interesting for you.


If you want to be a TikTok content creator you just have to enter the video recording section where you can start creating content thanks to all the tools offered by the application.

If you are a fan of TikTok and want to enjoy this app from your Windows device, download this program.', '/uploads/9054d1c5360943699692efe0425b7ebd.webp', '', 'https://dw.uptodown.net/dwn/wUTbxeCeiopxDw4u7v4hQ3PFMW3ZypPHJAD4uO5nIPL9Z_T_2tikC7KhkIDlOH_UbWzXlu9epHKs_AHYUht3d3zS_CTE4hP50mSCLoQcvJf588C8xZmITF60mIclHW6Q/PUzpn233NRWfPn69reHOYm1S7ZF-1bftNMAw2DQdni8OanaWRfF3Sr86OFihCZmSgyf_i7gpsk0_E6XNDyZ6dnsjFRUbLdvyJq_Lp64haNn4DkDF6oX37_VOf7uTj8RC/vsjhakFFU-QBgO1-Fz3Xko8v98lT6AKvM70tVBqM2BXsWKphwp1x2s4i9MQelj48K6KKABXuMWC9-kSirhZqKg==/tiktok-1-0-5-0.msixbundle', '', '/uploads/ff693ab344694858a683d25691ecb6ac.webp
/uploads/b1747635049a443d8ef9efd40edec9d8.webp
/uploads/f98e79604bc548819b894fe38b5837c2.webp
/uploads/3ae508952cf24e61b86a1f9d0e3ec56f.webp
/uploads/32640f6bdbac457d9e00ea3550ff95e4.webp
/uploads/a03e835cb2ee4a729c2c5be70e5cfb55.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#f4f4f5', 0, 'software', '', '', '', '2026-06-17 03:37:52', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (87, 'uTorrent', 'Action', 4.5, 0, 'uTorrent, also known as µTorrent, is a popular torrent downloader. Launched in 2005, uTorrent stands out for its small size and low resource consumption. Thanks to this BitTorrent client you can download files in .torrent or magnet format. These two formats are the most common in P2P clients.

Customize the settings for each torrent
When you add a file for download, uTorrent allows you to customize various aspects of the download, including where you want it to be downloaded to. What''s more, you can assign tags or choose which files you want to download and which you do not.




Manage uTorrent''s network connection
After adding a file for download, you can pause, resume or adjust its priority level. There is no limit to the number of torrents you can add, but you might eat up all your bandwidth if you start downloading too many. For this reason, you can also customize settings related to the use of network resources in the program settings. For example, you can limit the upload and download speed, as well as restrict the number of connections for each torrent.

Learn more about each torrent
When you add a torrent file, you can see a lot of information about it. You can see the number of seeds, the number of people downloading it, the upload and download speed, the date it was added, the size, the download percentage, etc. All this information can be viewed by clicking on the torrent, or you can also add it to informative tabs to see this information just by opening the program.

Access to torrent download trackers
You can also see information related to the tracker for each torrent. A tracker keeps track of users who are downloading or sharing a file. Thanks to this, both parties can communicate and download the file. File downloads or uploads can be carried out between several users at the same time, so if many people have a torrent downloaded on their devices, you can download different parts simultaneously from each of those users. This increases the speed of the download and helps you get your files as quickly as possible. A torrent can be available on several trackers, which further increases the number of users who can download and share it.

Automatically download content
uTorrent also allows you to add torrent file searches directly into the program. Thanks to this, you can search for content from platforms that you have previously added. You can also synchronize RSS feeds so that content is added automatically. To protect you from malicious files, uTorrent comes equipped with a malware detection system.

Download uTorrent to enjoy one of the best programs for downloading torrents.', '/uploads/2c1f1bfc32a04e4ebf8ff3435227e5ea.png', '', 'https://www.filehorse.com/download/file/WrCLn0RxZL3QJhPyx7XQXOmR6kLfGafZK_rdCj-Tkzx1UYHyDbJsda5juReb50S-KDzvsMuzBaPteOjZnQVsAk1ZGcfTJo-qIc_Xl2pBDx0/', '', '/uploads/d290ecc67ca14af1a2bf38e07edfc575.webp
/uploads/65b1e1c1945a4a3cb44242aac331e234.webp
/uploads/0e0634332ed0416f8583ac75837a2c50.webp
/uploads/82516eabd897466b99f5e33b26027cef.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#16a34a', 0, 'software', '', '', '', '2026-06-17 03:39:24', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (88, 'VirtualDJ', 'Multimedia & Audio', 4.5, 5, 'VirtualDJ is one of the most popular audio and video mixing programs in the world, especially among professional DJs, voice artists, entertainers, and hobbyists of all levels. The tool is highly compatible with hardware drivers, has an advanced audio engine and a wealth of intelligent features that make it a very comprehensive platform for both live sets and studio productions.

All-in-one DJ software
VirtualDJ is not just a song mixing tool: it''s a complete set of tools that allows DJs to play fluid mixes with multiple decks, apply advanced effects, automatically synchronize beats, and even mix with video or real-time visualizations. VirtualDJ''s powerful audio analysis engine detects pitch and BPM with high precision, allowing perfect synchronization between tracks and a coherent listening experience, even with complex transitions.



Automated AI-powered mixing
One of VirtualDJ''s most revolutionary features is Stem Separation, which allows you to split any song into its individual components in real time: vocals, bass, drums, and instruments. This gives users the creative freedom to, for example, do live mashups, remove vocals for impromptu karaoke or remix specific parts of a song without the need for separate tracks. Stem separation is driven by AI algorithms and can be controlled by pads, effects, filters or directly from assigned MIDI controllers.

Plug in all your hardware
VirtualDJ is compatible with virtually any music-making accessory, as you can connect more than three hundred DJ controllers from leading brands like Pioneer, Numark, Hercules, Reloop, Rane, or Denon, among others. As a result, you can customize the assignment of functions and the backlighting of the buttons. It also includes advanced HID support and the possibility of DVS driver integration if you are working with timecode vinyl.

If you are looking for a good mixing deck to make your professional or amateur DJ sets, download VirtualDJ for free.', '/uploads/651c6a2215c04850a9be241a1d7ec762.jpg', '', 'https://virtualdj.com/download/pc', '', '/uploads/99bb87d693874d2ea130c0a5d320ec23.webp
/uploads/f078e41ee80c496996a4eddf48fd4351.webp
/uploads/34ab1d78aecd4b7abbcc984300ab1a50.webp
/uploads/c4812cbdd8544b4c9bea95d9a70e4005.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'software', '', '', '', '2026-06-17 03:40:55', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (89, 'Visual Studio Code', 'Productivity & Office', 4.5, 0, 'Developer
Microsoft

Category
IDE

Rating
All ages

Languages
English 10 more
Distribution model

Pricing
Free

License
Owner

Copyright © 2026 Microsoft

Operating System
Windows
Security and privacy

Required permissions
Not applicable

See security and antivirus report
Download info', '/uploads/5fce4d79cb7943b89b335e9c460a8843.jpg', '', 'https://go.microsoft.com/fwlink/?Linkid=852157', '', '/uploads/435fc77f0dc14a67b6fbb02a2e91e8f1.webp
/uploads/d1c382bcde6d45808fde5493bd0bf64d.webp
/uploads/05abff31a27d4ba9b224688599191e4e.webp
/uploads/4724eec5a1e94bd5b6d101160d08e90b.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'software', '', '', 'Freemium', '2026-06-17 03:46:22', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (90, 'Detroit: Become Human Free', 'Action, Adventure', 4.5, 0, 'Detroit: Become Human, the award-winning video game production from Quantic Dream, is finally available on Steam Featuring world-renowned actors including Jesse Williams (Grey’s Anatomy), Clancy Brown (Carnivale), Lance Henriksen (Aliens), Bryan Dechart (True Blood) and Valorie Curry (Twilight). Detroit 2038. Technology has evolved to a point where human like androids are everywhere. They speak, move and behave like human beings, but they are only machines serving humans.', '/uploads/b1ec293716c64d0c9a24cf2c88a44302.jpg', '', 'https://ts.bzzhr.to/d/jm9rg8ae8koj?v=7FJQoEFTIQt81F8_uKbjcjmgWr5N__C9-XmrEdWT3Y6TyReqp9KJA_rz6_p7Xb1qbAxq6iogPBINAGVQ4WRqExNN-bai9rF5XVOnox7A0coQSFgxJcLzLOXAdOX0x1FlTswUOfqwqBfTSaeiMvnGsOTeK4QjPdkItfH5C2eGm-Y6vW_pNAg7Pal7945aPsffCG2iw5hfFhxCM0091C7n', 'https://youtu.be/8a-EObAhYrg?si=wkkV4F6F7zdqHSKo', '/uploads/60283b849b1b43bb8f39c3a85aa1ec97.jpg
/uploads/eba3d3692aa04aacb57e287b29faddb4.jpg
/uploads/22435f1ab73d4babb0a9efd433011be1.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#0ea5e9', 0, 'game', '', '', '', '2026-06-17 23:07:26', 'GAME INFO
Genre: Action, Adventure
Developer: Quantic Dream
Platform: PC
Game Size rar: 53 GB
Repack By: CODEX
Version: v05.08.2020 | Full version
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (91, 'Marvel’s Spider-Man Remastered', 'Action, Adventure', 4.5, 0, 'Developed by Insomniac Games in collaboration with Marvel, and optimized for PC by Nixxes Software, Marvel’s Spider-Man Remastered on PC introduces an experienced Peter Parker who’s fighting big crime and iconic villains in Marvel’s New York. At the same time, he’s struggling to balance his chaotic personal life and career while the fate of Marvel’s New York rests upon his shoulders. Railroad Corporation

Be Greater
When iconic Marvel villains threaten Marvel’s New York, Peter Parker and Spider-Man’s worlds collide. To save the city and those he loves, he must rise up and be greater.

Feel like Spider-Man
After eight years behind the mask, Peter Parker is a crime-fighting master. Feel the full power of a more experienced Spider-Man with improvisational combat, dynamic acrobatics, fluid urban traversal and environmental interactions.

Worlds collide
The worlds of Peter Parker and Spider-Man collide in an original action-packed story. In this new Spider-Man universe, iconic characters from Peter and Spider-Man’s lives have been reimagined, placing familiar characters in unique roles.

Marvel’s New York is your playground
The Big Apple comes to life in Marvel’s Spider-Man. Swing through vibrant neighborhoods and catch breathtaking views of iconic Marvel and Manhattan landmarks. Use the environment to defeat villains with epic takedowns in true blockbuster action.

Enjoy The City That Never Sleeps complete content
Following the events of the main story of Marvel’s Spider-Man Remastered, experience the continuation of Peter Parker’s journey in Marvel’s Spider-Man: The City That Never Sleeps, three story chapters with additional missions and challenges to discover.', '/uploads/78c9a9dd9b8a4c63842274939847253f.webp', '', 'https://ffdl.cybar.to/hg3uofzuw9cn
https://ffdl.cybar.to/q6rs90s43je5', 'https://youtu.be/q4GdJVvdxss?si=ZRAExlW694R_p2x2', '/uploads/61ddabd354e84a069fd81110e1d96fd3.png
/uploads/fccb3d44c29f416fbd3dab3d192449cc.jpeg
/uploads/7cca621c8c5349d08ec2380808a682ed.jpg
/uploads/dbe20dc96b8c41e1acfaf1d568714b5c.jpg
/uploads/55e05e17cb814e1083a2f91660e74973.jpg
/uploads/730936b70f3f4419a89a38438823bf18.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#b91c1c', 0, 'game', '', '', '', '2026-06-17 23:11:02', 'GAME INFO
Genre: Action, Adventure
Developer: Insomniac Games, Nixxes Software
Platform: PC
Game Size: 53 GB
Released By: FLT/ Mr_GOLDBERG CS / InsaneRamZes Ty
Version: v2.1012.0.0 (Build 12423814) | Full Version + DLC
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (92, 'Far Cry 6 Ultimate Edition Free', 'Action, Adventure, RPG, Strategy', 4.5, 2, 'Welcome to Yara, a tropical paradise frozen in time. As the dictator of Yara, Antón Castillo is intent on restoring his nation back to its former glory by any means, with his son, Incredibox Diego, following in his bloody footsteps. Their oppressive rule has ignited a revolution. Play as Dani Rojas, a local resident, and fight for the rebellious guerrillas to free Yara Take on the Castillo regime in the most extensive Far Cry game to date as you make your way through jungles, beaches and Esperanza, Yara’s capital. Use an arsenal of weapons and gadgets and a diverse fleet of vehicles to overthrow the ruthless Castillo regime.', '/uploads/5010dc60dc634113a35d2a50cf8f280b.jpg', '', 'https://vikingfile.com/d/D9NBKXCeT5/2369390.B11359732.CSF-Games4U.Org.part1.rar
https://vikingfile.com/d/gB523b1Iav/2369390.B11359732.CSF-Games4U.Org.part2.rar
https://vikingfile.com/d/nJgt8kVWYa/2369390.B11359732.CSF-Games4U.Org.part3.rar', 'https://youtu.be/-IJuKT1mHO8?si=wtsZMIit2-0fVu02', '/uploads/2335dd965e0644f7aaa138387fe1e8fc.webp
/uploads/54dec15363b143b3afe950ded655649b.webp
/uploads/c9061217ca7e4573bc878c3a0886121f.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#ef4444', 0, 'game', '', '', '', '2026-06-17 23:18:07', 'GAME INFO
Genre: Action, Adventure, Indie, RPG, Strategy
Developer: Ubisoft Toronto
Platform: PC
Game Size: 130 GB
Released By: EMPRESS/TORRENT (XATAB)
Version: v1.5.0 | Full Version + All DLCs + HD Texture Pack
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (93, 'Need for Speed Heat Deluxe Edition', 'Racing, Action, Adventure', 4.5, 0, 'A thrilling race experience pits you against a city’s rogue police force as you battle your way into street racing’s elite. Hustle by day and risk it all at night in Need for Speed Heat, a white-knuckle street racer, where the lines of the law fade as the sun starts to set. Survival: Fountain of Youth

By day, Palm City hosts the Speedhunter Showdown, a sanctioned competition where you earn Bank to customize and upgrade your high-performance cars. At night, ramp up the intensity in illicit street races that build your reputation, getting you access to bigger races and better parts. But stay ready – cops are waiting and not all of them play fair.', '/uploads/6894d585c4324ac6becb9428d18498a3.jpg', '', 'https://vikingfile.com/d/K8BLYXDVql/f45fg.ER-GameDrive.Org.rar', '', '/uploads/ce58d91217f84b1f9166ec46ee32b3b6.jpg
/uploads/4b9921d2fee1487a86256a6d66502784.jpg
/uploads/1e23908626294743a2288e3b2f1e5bd6.jpg
/uploads/d6b9c08d04cf4a25a5c032ea12ca11d2.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-17 23:23:47', 'GAME INFO
Genre: Action, Adventure, Racing, Sports
Developer: Ghost Games
Platform: PC
Game Size: 29.4 GB
Released By: voices38, Ty anaduis emu
Version: v1.0.60.7040 | Full Version
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (94, 'Elden Ring Deluxe Edition', 'Action, RPG', 4.5, 0, 'The new fantasy action RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. WRATH: Aeon of Ruin

A Vast World Full of Excitement
Vast world where open fields with a variety of situations and huge dungeons with complex and three-dimensional designs are seamlessly connected. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.
In addition to customizing the appearance of your character, you can freely combine the weapons, armor, and magic that you equip. You can develop your character according to your play style, such as increasing your muscle strength to become a strong warrior, or mastering magic.
An Epic Drama Born from a Myth
A multilayered story told in fragments. An epic drama in which the various thoughts of the characters intersect in the Lands Between.
Unique Online Play that Loosely Connects You to Others
In addition to multiplayer, where you can directly connect with other players and travel together, the game supports a unique asynchronous online element that allows you to feel the presence of others.
DLC Added', '/uploads/7efdf670073449c295e5e21e6591312e.jpg', '', 'https://vikingfile.com/d/mo3fqDifna/ERD.ER-GameDrive.Org.part01.rar
https://vikingfile.com/d/XrA4nHGfhP/ERD.ER-GameDrive.Org.part02.rar
https://vikingfile.com/d/KLntKlrOaz/ERD.ER-GameDrive.Org.part03.rar
https://vikingfile.com/d/hQ8KfOAvpG/ERD.ER-GameDrive.Org.part04.rar
https://vikingfile.com/d/EtyxRLf98y/ERD.ER-GameDrive.Org.part05.rar
https://vikingfile.com/d/t5uwQzCfhu/ERD.ER-GameDrive.Org.part06.rar
https://vikingfile.com/d/4yIrjtUpfa/ERD.ER-GameDrive.Org.part07.rar
https://vikingfile.com/d/9EJ6gOLXb4/ERD.ER-GameDrive.Org.part08.rar
https://vikingfile.com/d/1cmIPBJ7yy/ERD.ER-GameDrive.Org.part09.rar
https://vikingfile.com/d/ecJm7Pss4b/ERD.ER-GameDrive.Org.part10.rar
https://vikingfile.com/d/sQpxhNxoMr/ERD.ER-GameDrive.Org.part11.rar
https://vikingfile.com/d/CdxaD9xV7C/ERD.ER-GameDrive.Org.part12.rar
https://vikingfile.com/d/e0mXgSkwd9/ERD.ER-GameDrive.Org.part13.rar
https://vikingfile.com/d/UBrag3UKEn/ERD.ER-GameDrive.Org.part14.rar
https://vikingfile.com/d/Ro0kMLRtE0/ERD.ER-GameDrive.Org.part15.rar
https://vikingfile.com/d/ytqyZMcDSk/ERD.ER-GameDrive.Org.part16.rar
https://vikingfile.com/d/PT5CxFzN4F/ERD.ER-GameDrive.Org.part17.rar', 'https://youtu.be/E3Huy2cdih0?si=aOtyXnMyXr2sz5O-', '/uploads/24626c3368cc4000a09f623021324519.webp
/uploads/c36a0de612ba416a93f7a82f81a2795e.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#f59e0b', 0, 'game', '', '', '', '2026-06-17 23:55:08', 'GAME INFO
Genre: Action, RPG
Developer: FromSoftware Inc
Platform: PC
Game Size: 67 GB
Released By: RUNE/(cs.rin.ru)
Version: v1.16.2 (Build 22984413) | All DLCs (Shadow of the Erdtree) + Bonus Content | Deluxe Edition
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (95, 'The Last of Us Part II Remastered', 'Action, Adventure', 4.5, 0, 'Now experience the critically acclaimed and multi-award-winning narrative of The Last of Us Part II in its ultimate form with the Remastered edition. This version builds upon the original with a suite of technical enhancements, making it the definitive way to immerse yourself in the powerful and emotionally charged story of Ellie and Abby. Discover the winner of over 300 Game of the Year awards, now optimized with features that bring its compelling world and characters to life like never before. Prepare to be captivated by a story that has resonated deeply with players worldwide, now elevated with enhanced fidelity and performance.

Five years have passed since Ellie and Joel’s perilous trek across a ravaged United States. They have found a semblance of peace and stability within a thriving survivor community in Jackson, Wyoming, despite the ever-present dangers of the infected and desperate human factions. However, this fragile tranquility is shattered by a brutal event, propelling Ellie on a relentless quest for justice and a desperate search for closure. Her journey will take her through harrowing landscapes and force her to confront devastating truths, testing the limits of her resilience and morality in a world consumed by loss and violence.

The Last of Us Part II Remastered elevates the original game with a range of enhancements, taking advantage of modern hardware to deliver an unparalleled experience. Enjoy a host of graphical improvements that breathe new life into the game’s beautiful yet perilous environments, with increased detail and visual fidelity. Experience full integration with the PlayStation DualSense controller, utilizing adaptive triggers and haptic feedback to deepen your connection to the gameplay. As you progress through Ellie and Abby’s intertwined stories, earn and collect exciting achievements on Steam, adding another layer of engagement to this unforgettable journey. The game also offers widescreen and Ultrawide support, providing a more expansive and cinematic view of its haunting world. Elroy and the Aliens', '/uploads/0107fb4497b243938a87c97409198b5a.jpg', '', 'https://ffdl.cybar.to/ekjo7dmmqm1h
https://ffdl.cybar.to/l4wleerujihu', 'https://youtu.be/-llaUBqovHw?si=tr_MQ4fHvxHHt7ld', '/uploads/a600d141c2474177b7d291950d825d9d.jpg
/uploads/ae5253370b124f1d8ccd8cd7b11fd8f4.jpg
/uploads/9c3d5dad9cc946e38f67d8fc215e9dec.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#27272a', 0, 'game', '', '', '', '2026-06-18 00:02:00', 'GAME INFO
Genre: Action, Adventure
Developer: Naughty Dog LLC, Nixxes Software, Iron Galaxy Studios
Platform: PC
Game Size: 103 GB
Released By: RUNE
Version: v1.6.10721.105 (Build 19297819 | Full Version
Pre-Installed Gam', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (96, 'Watch Dogs Digital Deluxe', 'Action', 4.5, 0, 'All it takes is the swipe of a finger. We connect with friends. We buy the latest gadgets and gear. We find out what’s happening in the world. But with that same simple swipe, we cast an increasingly expansive shadow. With each connection, we leave a digital trail that tracks our every move and milestone, our every like and dislike. And it’s not just people. Today, all major cities are networked. Urban infrastructures are monitored and controlled by complex operating systems. In Watch_Dogs, this system is called the Central Operating System (CTOS) and it controls almost every piece of the city’s technology and holds key information on all of the city’s residents.', '/uploads/d5e68dd49e974d39b85a037f2c65efcb.jpg', '', 'https://vikingfile.com/d/2QYtT6f0qQ/243470-Games4u.Org.rar', 'https://youtu.be/kPNXE8fdleY?si=xiCFfpgTKnSAe8n2', '/uploads/c1a53b9c653d4fd59f05bfa461dc02cd.jpg
/uploads/485636489c2f4ef898a65c2dab9c30ca.jpg
/uploads/b952d2c74ee147e18252854c9ab90ca4.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#52525b', 0, 'game', '', '', '', '2026-06-18 00:10:05', 'GAME INFO
Genre: Action, Adventure
Developer: Ubisoft
Platform: PC
Game Size: 16.1 GB
Repack By: RELOADED
Version: v1.06.329 (Digital Deluxe Edition) | Full  Version (Latest) + all 16 DLCs
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (97, 'Forza Horizon 5 Premium Edition', 'Racing, Open World', 4.5, 0, 'Your Ultimate Horizon Adventure awaits Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. Lead breathtaking expeditions across the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars. Explore a world of striking contrast and beauty.', '/uploads/52bbd995da7846a5ba36c6aaf37d2803.jpg', '', 'https://vikingfile.com/d/enHeTmFpr8/French.doi
https://vikingfile.com/d/GuYzVOj4Aq/English.doi
https://vikingfile.com/d/4LfOttw4sv/hh5757.DR-GameDrive.Org.part1.rar', '', '/uploads/037d74e8c34143f491c7d33325f39a5f.jpg
/uploads/a1eb878f600d49d0919de2ac0e424ac2.jpg
/uploads/375500d0075247bbb8571ef539b806f6.jpg
/uploads/d983aded5e914c369fc8b334512b31a9.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#7c3aed', 0, 'game', '', '', '', '2026-06-18 23:32:49', 'Features
An endless kaleidoscope of Horizon adventures. Fascinating trips through the incredibly beautiful and distinctive world of Mexico, driving the greatest cars in history, await you.
A world full of colors The world of beauty and contrasts will open before you. You will visit deserts, dense jungles, historic cities, lost ruins, pristine beaches, deep gorges and a high, snow-covered volcano.
A world full of adventure. A massive campaign awaits you with hundreds of challenges for every taste. Meet new characters and go through their storylines to the end.
A world full of changes You will encounter the amazing natural phenomena of Mexico: dust storms and tropical downpours. Along with the change of seasons, the world of the game also changes every week. Each time you will find new competitions, challenges, collectibles, rewards and regions that have not yet been explored. In the world of Forza Horizon, every season is good in its own way              
GAME INFO
Genre: Action, Adventure, Racing, Simulation, Sports
Developer: Playground Games
Platform: PC
Game Size: 171 GB
Multiplayer By: 0xdeadc0de (OFME)
Version: v1.688.109.0 | Full Version | All DLCs + Multiplayer
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (98, 'Call of Duty: Black Ops II', 'Action', 4.5, 0, 'Call of Duty: Black Ops 2 + multiplayer is a traditional first-person shooter that continues the events of the first part. Now you have to continue the war against terrorists, plunge into even more fateful events, and do much, much more The events of the game take place some time after the finale of the first part of “Black Ops”. Well, you will play for David Mason, the son of the protagonist of the previous game, Alex Mason. In his role, you will have to embark on another difficult mission, fight numerous terrorists', '/uploads/5eaea66cb6904f07aec103f63196fcb8.jpg', '', 'https://fuckingfast.co/2gmb42tcs4sd#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/joow5mkn7m1d#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/2fyulkxi8vrv#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/r9o8vufhvida#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/aeg9u98jxv3v#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/ckfk3jn94xm6#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/h3o0y0uslazz#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/4fu7l3jvc3n3#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/rhabdgg7vy3n#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part09.rar
https://fuckingfast.co/ac6vblijbo1c#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/loduwc2tzuiz#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part11.rar
https://fuckingfast.co/00ynj3cohmap#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part12.rar
https://fuckingfast.co/4olbofnaf7ho#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part13.rar
https://fuckingfast.co/7ff1lj57pjid#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/g0ywxau9ee6g#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part15.rar
https://fuckingfast.co/l0vcwq11llyw#Call_of_Duty_-_Black_Ops_2_--_fitgirl-repacks.site_--_.part16.rar
https://fuckingfast.co/vc89w9z1uc68#fg-selective-english.part1.rar
https://fuckingfast.co/wf2u054fc8s0#fg-selective-english.part2.rar
https://fuckingfast.co/83b1f2y35rsp#fg-selective-english.part3.rar', '', '/uploads/dd54cc9b74ad498d813a220ec7876dcc.jpg
/uploads/d14ad91bee6746ea8b184598b336e251.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-18 23:38:09', 'GAME INFO
Genre: Action
Developer: Treyarch
Platform: PC
Game Size: 36.17 GB
Released By: PLAZA
Version: Build 65428 | Full Version
Pre-Installed Game
Password: steamrip.com', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (99, 'Hogwarts Legacy Deluxe Edition', 'Action, Adventure, RPG, Hypervisor', 4.5, 0, 'Hogwarts Legacy is an open-world action RPG set in the world first introduced in the Harry Potter books. Embark on a journey through familiar and new locations as you explore and discover magical beasts, customize your character and craft potions, master spell casting, upgrade talents and become the wizard you want to be. Experience Hogwarts in the 1800s. J.K Rowling pc game hogwarts is here finally.
Your character is a student who holds the key to an ancient secret that threatens to tear the wizarding world apart. Make allies, battle Dark wizards, and ultimately decide the fate of the wizarding world. Your legacy is what you make of it. Live the Unwritten. DIG – Deep In Galaxies', '/uploads/1ed7fd938b304a78b357674e098083f6.jpg', '', 'https://vikingfile.com/d/l4pr63Ki1R/990080.B20773316.CSF-Games4U.Org.part1.rar
https://vikingfile.com/d/beBPGQ0wBi/990080.B20773316.CSF-Games4U.Org.part2.rar', 'https://youtu.be/1O6Qstncpnc?si=A2dgV723bYbgVSF8', '/uploads/bbb4cef8e18748d3b8b481471bd6a945.jpeg
/uploads/a52121d4a45e4f93a068014ad1888b9c.jpg
/uploads/17b54c460faa4bfeb0b2c1d200704afb.jpg
/uploads/9bce99fd70684a64a3b987f6958251cf.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#bfdbfe', 0, 'game', '', '', '', '2026-06-18 23:42:57', 'GAME INFO
Genre: Action, Adventure, RPG
Developer: Avalanche Software
Platform: PC
Game Size: 72 GB
Released By: EMPRESS
Version: v1117238 | Full Version + Digital Deluxe Edition + OST + All DLCs
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (100, 'Baldur’s Gate 3', 'RPG, Adventure, Strategy', 4.5, 0, 'Baldur’s Gate 3 Directly Download
Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power. Mysterious abilities are awakening inside you, drawn from a mind flayer parasite planted in your brain. Resist, and turn darkness against itself. Thronefall

Choose from 12 classes and 11 races from the D&D Player’s Handbook and create your own identity, or play as an Origin hero with a hand-crafted background. Or tangle with your inner corruption as the Dark Urge, a fully customisable Origin hero with its own unique mechanics and story. Whoever you choose to be, adventure, loot, battle and romance your way across the Forgotten Realms and beyond.

Gather your party. Take the adventure online as a party of up to four. Abducted, infected, lost. You are turning into a monster, but as the corruption inside you grows, so does your power. That power may help you to survive, but there will be a price to pay, and more than any ability, the bonds of trust that you build within your party could be your greatest strength. Caught in a conflict between devils, deities, and sinister otherworldly forces, you will determine the fate of the Forgotten Realms together.

Forged with the new Divinity 4.0 engine, Baldur’s Gate 3 gives you unprecedented freedom to explore, experiment, and interact with a thriving world filled with characters, dangers, and deceit. A grand, cinematic narrative brings you closer to your characters than ever before. From shadow-cursed forests, to the magical caverns of the Underdark, to the sprawling city of Baldur’s Gate itself, your actions define the adventure, but your choices define your legacy. You will be remembered.

The Forgotten Realms are a vast, detailed, and diverse world, and there are secrets to be discovered all around you – verticality is a vital part of exploration. Sneak, dip, shove, climb, and jump as you journey from the depths of the Underdark to the glittering rooftops of Baldur’s Gate. Every choice you make drives your story forward, each decision leaving your mark on the world. Define your legacy, nurture relationships and create enemies, and solve problems your way. No two playthroughs will ever be the same.', '/uploads/0599f89132a0473c891925dab99305c8.jpg', '', 'https://ffdl.cybar.to/m0wp2x66dq2a
https://ffdl.cybar.to/urujq9l3j1eo
https://ffdl.cybar.to/wmeecqrh6l00', 'https://youtu.be/1T22wNvoNiU?si=Ntli36jWws55ialW', '/uploads/91db3a2332d4453c9daa7c0d8d859174.webp
/uploads/11e3eeae357a4034aa2b8969a005c8ac.webp
/uploads/533da9210eae42368162f613c05400c1.webp
/uploads/e760cc92ed074614b2cc9d91c4033a49.webp
/uploads/4227793fad5c484c870b2b28e8a13d79.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-18 23:49:26', 'Genre: Adventure, RPG, Strategy
Developer: Larian Studios
Platform: PC
Game Size: 123 GB
Released By: RUNE emu
Version: v4.1.1.6995620 | Full Version
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (101, 'Sekiro: Shadows Die Twice', 'Action, Adventure', 4.5, 0, 'Carve your own clever path to vengeance in the critically acclaimed adventure from developer FromSoftware, creators of the Dark Souls series. In Sekiro: Shadows Die Twice you are the ‘one-armed wolf’, a disgraced and disfigured warrior rescued from the brink of death. Bound to protect a young lord who is the descendant of an ancient bloodline, you become the target of many vicious enemies, including the dangerous Ashina clan.', '/uploads/a155333508ee40eb88da90870530b315.jpg', '', 'https://vikingfile.com/d/HBwtlCZMjL/f34.FR-GameDrive.Org.rar
https://vikingfile.com/d/aCaLMCuzBR/fg-optional-bonus-content.bin
https://vikingfile.com/d/v3CbZxsDhX/fg-selective-english.bin', 'https://youtu.be/rXMX4YJ7Lks?si=j0668sF9SPUrbBvu', '/uploads/334f1f7f14744b56b8c937a8db1fea3b.jpg
/uploads/1984c8ecbf4341a28a93f5c0548d8140.jpg
/uploads/698ee459af944eabbc8c59ecffcc0a21.jpg
/uploads/4bf7f5e3c1464c9a957a7892ed001c59.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#fed7aa', 0, 'game', '', '', '', '2026-06-18 23:53:34', 'GAME INFO
Genre: Action, Adventure
Developer: FromSoftware
Platform: PC
Game Size: 13.2 GB
Repack By: GOG
Version: v1.06 (Game of the Year Edition) | Updated Version + 2 DLC
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (102, 'Red Dead Redemption', 'Action', 4.5, 2, 'Red Dead Redemption Direct Download
It’s a strange time for PC gamers. After a long 14-year wait, Red Dead Redemption finally arrives on PC, only to be met with a hefty price tag. This is particularly odd considering its more recent and expansive sequel, Red Dead Redemption 2, is currently on sale for a significantly lower price.

While both games offer unique Western experiences, the pricing disparity is hard to ignore. It seems counterintuitive to charge nearly as much for an older game, especially when it’s not even bundled with additional content or significant enhancements. The Smurfs – Dreams

This isn’t the first time Rockstar has taken a similar approach with its PC ports. GTA titles, for instance, often have a lengthy wait before their PC releases, and when they do arrive, they’re usually full price. This practice, along with the occasional technical hiccup, can frustrate many PC gamers.

While Red Dead Redemption is undoubtedly a classic, its pricing strategy raises questions about fair value and consumer expectations. As PC gaming continues to grow, it’s crucial for developers and publishers to strike a balance between nostalgia and modern market practices.', '/uploads/167cd1ae4abf48b29590285b47542148.webp', '', 'https://ffdl.cybar.to/7p67cpgwz3tc', 'https://youtu.be/wumxYqok3bQ?si=kTvdiOuhoTXBIFYH', '/uploads/3fae706588c4444b8e056d7f6960de0e.jpg
/uploads/52f2bb9b159e4eee8f5ee7d524624762.jpg
/uploads/20fd3b51d0354577b36c1be4d97d6f5a.webp
/uploads/4bc90dedc7c043509214f9a7a292584c.jpg
/uploads/76134af76a284689bd1637cec7060ed1.jpg
/uploads/b1f2e7c5663f4019b2a5c9fc831e85e2.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#dc2626', 0, 'game', '', '', '', '2026-06-18 23:59:36', 'GAME INFO
Genre: Action
Developer: Rockstar Games, Double Eleven
Platform: PC
Game Size: 8.41 GB
Released By: Razor1911
Version: v1.0.42.46611 | Full Version
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (103, 'FIFA 23 Ultimate Edition', 'Sports', 4.5, 0, 'Experience the pinnacle of women’s international football in EA SPORTS FIFA 23 with the FIFA Women’s World Cup Australia and New Zealand 2023 available on June 27th at no additional cost*. Rep your country’s colors and live the tournament in the most immersive EA SPORTS FIFA Women’s World Cup experience yet, complete with each of the 32 qualified nations, custom stadium dressings, cinematics, match presentations, dedicated commentary, and of course, the authentic trophy to hoist at the end. Don Duality

EA SPORTS FIFA 23 brings The World’s Game to the pitch, with HyperMotion2 Technology that delivers even more gameplay realism, both the men’s and women’s FIFA World Cup coming to the game as post-launch updates, the addition of women’s club teams, cross-play features**, and more. Experience unrivaled authenticity with over 19,000 players, 700+ teams, 100 stadiums, and over 30 leagues in FIFA 23.', '/uploads/b9154bc1ba044eaebf9fed4ee65d691d.webp', '', 'https://fuckingfast.co/fpr2096aojov#FIFA_23_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/am9j48jte45d#FIFA_23_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/o6g8e8r99z04#FIFA_23_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/fayocne3v1hc#FIFA_23_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/p1otwpqndryh#FIFA_23_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/x32y6xakxt20#FIFA_23_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/2uyn7jaturz8#FIFA_23_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/i9kwmctl8clk#FIFA_23_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/mzs1ar7idmvo#FIFA_23_--_fitgirl-repacks.site_--_.part09.rar
https://fuckingfast.co/urhfqnj81fxe#FIFA_23_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/bmrjv2f9xvm4#FIFA_23_--_fitgirl-repacks.site_--_.part11.rar
https://fuckingfast.co/adu39v8pc1nk#FIFA_23_--_fitgirl-repacks.site_--_.part12.rar
https://fuckingfast.co/a2z8mb4ww93f#FIFA_23_--_fitgirl-repacks.site_--_.part13.rar
https://fuckingfast.co/rd0ww6m95uab#FIFA_23_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/vc43dh90mins#FIFA_23_--_fitgirl-repacks.site_--_.part15.rar
https://fuckingfast.co/4ag0cxprw6mo#FIFA_23_--_fitgirl-repacks.site_--_.part16.rar
https://fuckingfast.co/emvcatvjylyw#FIFA_23_--_fitgirl-repacks.site_--_.part17.rar
https://fuckingfast.co/63wqm7m6gzxo#FIFA_23_--_fitgirl-repacks.site_--_.part18.rar
https://fuckingfast.co/naf8qbao7r0n#FIFA_23_--_fitgirl-repacks.site_--_.part19.rar
https://fuckingfast.co/kj93un0xcf3y#FIFA_23_--_fitgirl-repacks.site_--_.part20.rar
https://fuckingfast.co/5lkanzni6fmf#FIFA_23_--_fitgirl-repacks.site_--_.part21.rar
https://fuckingfast.co/npwumpmmrg5l#FIFA_23_--_fitgirl-repacks.site_--_.part22.rar
https://fuckingfast.co/zfof1xb842p8#FIFA_23_--_fitgirl-repacks.site_--_.part23.rar
https://fuckingfast.co/e1jumd9du3dv#FIFA_23_--_fitgirl-repacks.site_--_.part24.rar
https://fuckingfast.co/fdh8u4qfwdqs#FIFA_23_--_fitgirl-repacks.site_--_.part25.rar
https://fuckingfast.co/w8ar0se9qqsz#FIFA_23_--_fitgirl-repacks.site_--_.part26.rar
https://fuckingfast.co/8zm9valetka4#FIFA_23_--_fitgirl-repacks.site_--_.part27.rar
https://fuckingfast.co/ip7enw79bwrz#FIFA_23_--_fitgirl-repacks.site_--_.part28.rar
https://fuckingfast.co/j9zy81js5wxa#FIFA_23_--_fitgirl-repacks.site_--_.part29.rar
https://fuckingfast.co/4e00cbqfn3si#FIFA_23_--_fitgirl-repacks.site_--_.part30.rar
https://fuckingfast.co/3upsy7ugmge3#FIFA_23_--_fitgirl-repacks.site_--_.part31.rar
https://fuckingfast.co/r9kzf0ncgzfh#FIFA_23_--_fitgirl-repacks.site_--_.part32.rar
https://fuckingfast.co/q6ajo981g1fj#FIFA_23_--_fitgirl-repacks.site_--_.part33.rar
https://fuckingfast.co/deovaupy2qti#FIFA_23_--_fitgirl-repacks.site_--_.part34.rar
https://fuckingfast.co/3exvxvkl8xno#FIFA_23_--_fitgirl-repacks.site_--_.part35.rar
https://fuckingfast.co/uclalsz16ywa#FIFA_23_--_fitgirl-repacks.site_--_.part36.rar
https://fuckingfast.co/kufxujebzeug#FIFA_23_--_fitgirl-repacks.site_--_.part37.rar
https://fuckingfast.co/ikbz45152kks#FIFA_23_--_fitgirl-repacks.site_--_.part38.rar
https://fuckingfast.co/lmfo5c4e8j7a#FIFA_23_--_fitgirl-repacks.site_--_.part39.rar
https://fuckingfast.co/r1c62ml0ypfm#FIFA_23_--_fitgirl-repacks.site_--_.part40.rar
https://fuckingfast.co/qlowot5dnmtv#FIFA_23_--_fitgirl-repacks.site_--_.part41.rar
https://fuckingfast.co/bthmn4i5cmkh#FIFA_23_--_fitgirl-repacks.site_--_.part42.rar
https://fuckingfast.co/nv1z5y7yh3sq#FIFA_23_--_fitgirl-repacks.site_--_.part43.rar
https://fuckingfast.co/fvwj21ruypbm#FIFA_23_--_fitgirl-repacks.site_--_.part44.rar
https://fuckingfast.co/5875fqwaaie7#FIFA_23_--_fitgirl-repacks.site_--_.part45.rar
https://fuckingfast.co/5875fqwaaie7#FIFA_23_--_fitgirl-repacks.site_--_.part45.rar
https://fuckingfast.co/oc3w7pxm3nky#FIFA_23_--_fitgirl-repacks.site_--_.part47.rar
https://fuckingfast.co/5urj5kwbpv2s#FIFA_23_--_fitgirl-repacks.site_--_.part48.rar
https://fuckingfast.co/jgiqmm0vxqtb#FIFA_23_--_fitgirl-repacks.site_--_.part49.rar
https://fuckingfast.co/xzvzodvsv4te#FIFA_23_--_fitgirl-repacks.site_--_.part50.rar
https://fuckingfast.co/jn5kcrt9tv60#FIFA_23_--_fitgirl-repacks.site_--_.part51.rar
https://fuckingfast.co/fwxx3wz3z0rz#FIFA_23_--_fitgirl-repacks.site_--_.part52.rar
https://fuckingfast.co/877hqbp024hu#FIFA_23_--_fitgirl-repacks.site_--_.part53.rar
https://fuckingfast.co/8r9yrcrk3r2f#FIFA_23_--_fitgirl-repacks.site_--_.part54.rar
https://fuckingfast.co/pk3vanyq2f6k#FIFA_23_--_fitgirl-repacks.site_--_.part55.rar
https://fuckingfast.co/gjcef57g842k#FIFA_23_--_fitgirl-repacks.site_--_.part56.rar
https://fuckingfast.co/amb8foru4a9h#FIFA_23_--_fitgirl-repacks.site_--_.part57.rar
https://fuckingfast.co/j1ve2p7r9k9j#FIFA_23_--_fitgirl-repacks.site_--_.part58.rar
https://fuckingfast.co/jkhh2vhccn5e#FIFA_23_--_fitgirl-repacks.site_--_.part59.rar
https://fuckingfast.co/bw8im7it81ne#FIFA_23_--_fitgirl-repacks.site_--_.part60.rar
https://fuckingfast.co/pr5ifhzt3n55#FIFA_23_--_fitgirl-repacks.site_--_.part61.rar
https://fuckingfast.co/m3jo8gvl9xt5#FIFA_23_--_fitgirl-repacks.site_--_.part62.rar
https://fuckingfast.co/s5h1r1s6scu1#FIFA_23_--_fitgirl-repacks.site_--_.part63.rar
https://fuckingfast.co/cpuzkvf4xl21#FIFA_23_--_fitgirl-repacks.site_--_.part64.rar
https://fuckingfast.co/bcu8lt7ulxu2#FIFA_23_--_fitgirl-repacks.site_--_.part65.rar
https://fuckingfast.co/doku0lkbxa2o#FIFA_23_--_fitgirl-repacks.site_--_.part66.rar
https://fuckingfast.co/oxssfrtrpmvm#FIFA_23_--_fitgirl-repacks.site_--_.part67.rar
https://fuckingfast.co/fm143irmu0re#FIFA_23_--_fitgirl-repacks.site_--_.part68.rar
https://fuckingfast.co/su2qkk3lgbhy#FIFA_23_--_fitgirl-repacks.site_--_.part69.rar
https://fuckingfast.co/l8s2jkik78ja#FIFA_23_--_fitgirl-repacks.site_--_.part70.rar
https://fuckingfast.co/jvel72nydcvz#FIFA_23_--_fitgirl-repacks.site_--_.part71.rar
https://fuckingfast.co/hpfk43e8izxr#FIFA_23_--_fitgirl-repacks.site_--_.part72.rar
https://fuckingfast.co/ayvprlf5j42q#FIFA_23_--_fitgirl-repacks.site_--_.part73.rar
https://fuckingfast.co/5vsvdl1thmsz#FIFA_23_--_fitgirl-repacks.site_--_.part74.rar
https://fuckingfast.co/9mfc2sblx38v#FIFA_23_--_fitgirl-repacks.site_--_.part75.rar
https://fuckingfast.co/8n2ymqqdph62#FIFA_23_--_fitgirl-repacks.site_--_.part76.rar
https://fuckingfast.co/f7ive2okm6di#FIFA_23_--_fitgirl-repacks.site_--_.part77.rar
https://fuckingfast.co/ryb35bhtrwf7#FIFA_23_--_fitgirl-repacks.site_--_.part78.rar
https://fuckingfast.co/wpnehwp8o7pf#FIFA_23_--_fitgirl-repacks.site_--_.part79.rar
https://fuckingfast.co/e0pgh6pew2yn#fg-optional-bonus-osts.bin', 'https://youtu.be/o3V-GvvzjE4?si=vKxZ-cYDYfIStSU4', '/uploads/e11371bfeaad41c088174c1941c61451.jpg
/uploads/96420c72a2634fa9a4e7ea48056cd5d2.jpg
/uploads/22acda0f23db437abd92eaa51ac80561.jpg
/uploads/0533bd28bfa04489bd22f63223f0971f.webp
/uploads/bb2d4d24ee9e4639a367af91c84c09ca.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#eab308', 0, 'game', '', '', '', '2026-06-19 00:03:47', 'GAME INFO
Genre: Simulation, Sports
Developer: EA Canada & EA Romania
Platform: PC
Game Size: 46 GB
Released By: MKDEV
Version: v1.0.82.43747 | Full Version + All DLCs + World Cup LE
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (104, 'Forza Horizon 4', 'Racing', 4.5, 0, 'Forza Horizon 4 is one of the best racing simulators in our time. You will find a huge open world of Great Britain, an incredible number of licensed tracks, a sea of ​​cars and such gameplay opportunities that have never been in any simulator Dynamic seasons change everything at the world’s greatest automotive festival. Go it alone or team up with others to explore beautiful and historic Britain in a shared open world. Collect, modify and drive over 450 cars. Race, stunt, create and explore – choose your own path to become a Horizon Superstar.
GAL GUN', '/uploads/39efb14966c844d29bb74cd67dc163e9.jpg', '', 'https://vikingfile.com/d/C444ixgUqp/n546.ER-GameDrive.Org.part1.rar
https://vikingfile.com/d/uj7q8XZlDj/n546.ER-GameDrive.Org.part2.rar', 'https://youtu.be/5xy4n73WOMM?si=5CqX-4UOglF2BJdL', '/uploads/2a5d8b24f5f2407089d6032eb8149a2e.jpg
/uploads/61397870ab1c4cfea9168c73de4a229d.webp
/uploads/5cd6b9fc987f4e01ac9359df3cf53593.jpg
/uploads/945d850867664972bde68d50a1504825.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#fed7aa', 0, 'game', '', '', '', '2026-06-19 00:07:54', 'GAME INFO
Genre: Racing
Developer: Playground Games
Platform: PC
Game Size: 94.6 GB
Multiplayer By: 0xdeadc0de
Version: v1.478.564.0 (Ultimate Edition) | Full Version (Latest) + all 61 DLCs
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (105, 'HITMAN 3 Free', 'Action', 4.5, 0, 'Death is waiting. Agent 47 returns in Hitman 3, the spectacular conclusion to the World of Assassins trilogy. From the very beginning, players have access to all locations from the previous two games, and it is also possible to transfer all their progress from the second part, including all items and completed contracts. The third part again offers extensive locations, “sandboxes“, in which the Forty-seventh g seek and eliminate his targets using a variety of methods, while simultaneously trying not to be seen by the guards', '/uploads/3315fe97b094448380fc4c71258aa541.jpg', '', 'https://vikingfile.com/d/7J0haJ3TXH/21432456y5.ER-GameDrive.Org.part1.rar
https://vikingfile.com/d/6ZCPmDQkmC/21432456y5.ER-GameDrive.Org.part2.rar', 'https://youtu.be/avAXhnbs69w?si=lT3x5VrmAK2PXVO5', '/uploads/f829360484aa4791a369f7ba5034e738.webp
/uploads/27fbf7342a9447a7a0dd1dd417df11b5.jpg
/uploads/0c361748b9134abea88fa7fcf316593d.jpg
/uploads/0a1c565516e24028b220e90d15b3fdc1.webp
/uploads/e04c2c4fd49148ad9fbb3af3b4fcaefa.webp
/uploads/7f803340669c4ab996cab8e306a8ca65.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-19 00:12:10', 'Features
In Hitman 3, the ruthless pro Agent 47 returns for the most important contracts of his career, where every kill changes the world. Embark on an exciting adventure in the World of Assassins and find out how the story of Agent 47 will end. Death awaits.
Complete contracts around the world on thoughtful maps with countless possibilities. IOI’s legendary Glacier technology will immerse you in the world of Hitman 3, where the story is completely dependent on the player’s actions, and each playthrough is truly unique.
Hitman 3 is a great excuse to play every part of the World of Assassins trilogy once again. If you already have Hitman 1 and Hitman 2, you can load levels into Hitman 3 from there for free, and your achievements from Hitman 2 will be copied to Hitman 3 immediately after the release of the new part.
GAME INFO
Genre: Action, Shooters, Stealth
Developer: IO Interactive
Platform: PC
Game Size: 73.7 GB
Released By: CODEX Emu + modified Launcher.exe
Version: v3.250.0 | Full Version (+I +II) – HITMAN World of Assassination
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (106, 'ActionAdventureHorrorShootersSurvival Call of Duty: Black Ops III', 'Action', 4.5, 0, 'Call of Duty: Black Ops III Zombies Chronicles Edition includes the full base game and the Zombies Chronicles content expansion. Call of Duty: Black Ops III combines three unique game modes: Campaign, Multiplayer, and Zombies, providing fans with the deepest and most ambitious Call of Duty ever. The Zombies Chronicles content expansion delivers 8 remastered classic Zombies maps from Call of Duty: World at War, Call of Duty: Black Ops and Call of Duty: Black Ops II. Complete maps from the original saga are fully remastered and HD playable within Call of Duty: Black Ops III.

Campaign
Call of Duty: Black Ops III follows up on the events of Call of Duty: Black Ops II, specifically in regards to the drone strikes of 2025 that took place by hands of Raul Menendez near the end of the game. The game is set between 2065 to 2070 and technology is irrevocably embedded on the battlefield. The Campaign mode is only available to the Xbox One, PS4 and PC editions of the game. The player will have access to all missions from the start, and will be able to play them in any order desired without consequences. Reigns Collector’s Edition

After the Drone Strikes of 2025, ground combat is once again the focus of military strategy, with bi-pedal combat robots and drones fighting alongside human infantry. Elite Black Ops soldiers have been embedded with a direct neural interface (DNI) that let them communicate with robotics and net-connected weaponry, in addition to other cybernetic bio-augmentations such as super-powered prosthetic limbs.

Get Free Stea', '/uploads/85b4ab51703f4b6e9e1c43d59284f17d.png', '', 'https://vikingfile.com/d/dFhUmoZGof/04h70175g.FR-GameDrive.Org.rar
https://vikingfile.com/d/Noho9Mh2tR/fg-optional-zombies-selective-english.bin', 'https://youtu.be/qAUYNIDEJ6o?si=oCtkKgonfncR4Ca0', '/uploads/f42c295861f5455199c60caee37395bc.jpg
/uploads/c0dea38b69b74099b32ef92827515053.jpg
/uploads/3af0d8196d334221ac6b36c347ab69f8.webp
/uploads/38d1719c3de54f44835dfd9665f0a103.webp
/uploads/88d84f3871aa4cbeb881529a5b8655c0.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-19 00:16:47', 'Features
20 Vials of Liquid Divinium
2 All-New Whimsical GobbleGums
5 Zombies Pack-A-Punch Weapon Camos
3 Call of Duty: World at War Maps: Nacht der Untoten, Verruckt, and Shi No Numa
4 Call of Duty: Black Ops Maps: Kino Der Toten, Ascension, Shangri-la, and Moon
Call of Duty: Black Ops II Map: Origins
GAME INFO
Genre: Action, Adventure
Developer: Treyarch, Aspyr (Mac)
Platform: PC
Game Size: 121 GB
Repack By: PROPER
Version: v100.2.2.124.0 | Full version + all add-ons + Multiplayer (bots / splitscreen) + Zombie mode
Pre-Installed Game
GOFILE', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (107, 'Devil May Cry 5', 'Action', 4.5, 0, 'The Devil you know returns in this brand new entry in the over-the-top action series available on the PC. Prepare to get downright demonic with this signature blend of high-octane stylized action and otherworldly & original characters the series is known for. Director Hideaki Itsuno and the core team have returned to create the most insane, technically advanced and utterly unmissable action experience of this generation.', '/uploads/e925b180f59d400baec39d7bb78ef40d.jpg', '', 'https://fuckingfast.co/v1klr6jo2jxk#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/6t126rq5j8lq#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/66sgy8de9rqd#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/6mhsj71k8zi6#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/nx9w0ln38s8t#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/4z2afpof89eo#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/6ueln0j1n2qd#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/cil9gvp9o2nd#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/zqedwivvmdlm#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part09.rar
https://fuckingfast.co/3wgpu0cufnyv#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/1xf2juvafg6r#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part11.rar
https://fuckingfast.co/cjt5zqke07gb#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part12.rar
https://fuckingfast.co/r04ywplgfowe#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part13.rar
https://fuckingfast.co/4j1boitv9fjt#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/s8j1a5ivqcg3#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part15.rar
https://fuckingfast.co/f1lkgnznfhnh#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part16.rar
https://fuckingfast.co/z6vyq92nz66d#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part17.rar
https://fuckingfast.co/d679lfodn6dc#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part18.rar
https://fuckingfast.co/i019pge5b6g0#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part19.rar
https://fuckingfast.co/9cen0oo0awkx#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part20.rar
https://fuckingfast.co/dtqxg25fs0z7#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part21.rar
https://fuckingfast.co/3oil09d6vf16#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part22.rar
https://fuckingfast.co/zktj5khlw7vt#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part23.rar
https://fuckingfast.co/ojegi1109ovl#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part24.rar
https://fuckingfast.co/yyir9cogjkpo#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part25.rar
https://fuckingfast.co/bpxv5x6hvjht#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part26.rar
https://fuckingfast.co/fo9mqypwekje#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part27.rar
https://fuckingfast.co/6986tio47jkx#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part28.rar
https://fuckingfast.co/0nfl9ipn0aby#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part29.rar
https://fuckingfast.co/e53zhm8sdjq1#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part30.rar
https://fuckingfast.co/sk3uxjcb306h#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part31.rar
https://fuckingfast.co/ecyl4hnkz1zw#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part32.rar
https://fuckingfast.co/f25wnh3ie1lp#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part33.rar
https://fuckingfast.co/ahsrga3i7h63#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part34.rar
https://fuckingfast.co/58g144jag10d#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part35.rar
https://fuckingfast.co/t70ddfsl3e0o#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part36.rar
https://fuckingfast.co/xoa62d48i0we#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part37.rar
https://fuckingfast.co/tzch1v3uhzv3#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part38.rar
https://fuckingfast.co/1inzf00nahiy#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part39.rar
https://fuckingfast.co/8oney1v1fcnn#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part40.rar
https://fuckingfast.co/5qdrr74l5ran#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part42.rar
https://fuckingfast.co/5qdrr74l5ran#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part42.rar
https://fuckingfast.co/j24tlwi6s5dd#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part44.rar
https://fuckingfast.co/s62lsh7qycc5#Devil_May_Cry_5_--_fitgirl-repacks.site_--_.part45.rar
https://fuckingfast.co/dcr1a7tkzvxf#fg-selective-english.bin
https://fuckingfast.co/q2mtvfqsbzo4#fg-selective-japanese.bin
https://fuckingfast.co/63al48un5a1d#fg-optional-history-video.bin', 'https://youtu.be/KMSGj9Y2T9Q?si=HRJXKtHnhb9UbGCd', '/uploads/9777cdabce4d4fd49f424d97f7e8833c.jpg
/uploads/887b928471c14e01ac730742ba4535bd.jpg
/uploads/b5e994ef76dd48a1836897079b95daf0.jpg
/uploads/cf1f491815554180a63da67872a78e6f.jpg
/uploads/b674db88de5d4ad393511ec1644cf23f.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-19 00:22:03', 'Features
High octane stylized action – Featuring three playable characters each with a radically different stylish combat play style as they take on the city overrun with demons
Groundbreaking graphics – Developed with Capcom’s in-house proprietary RE engine, the series continues to achieve new heights in fidelity with graphics that utilize photorealistic character designs and stunning lighting and environmental effects.
Take down the demonic invasion – Battle against epic bosses in adrenaline fueled fights across the over-run Red Grave City all to the beat of a truly killer soundtrack.
Demon hunter – Nero, one of the series main protagonists and a young demon hunter who has the blood of Sparda, heads to Red Grave City to face the hellish onslaught of demons, with weapons craftswoman and new partner-in-crime, Nico. Nero is also joined by stylish, legendary demon hunter, Dante and the mysterious new character, V.
DLCs Added', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (108, 'ELDEN RING NIGHTREIGN', 'Action, RPG', 4.5, 2, 'ELDEN RING: NIGHTREIGN offers a fresh journey set in the iconic ELDEN RING universe, built as a standalone adventure with a reimagined gameplay approach. Players can team up in three-player co-op to face the encroaching darkness and a host of deadly threats. Each hero comes equipped with unique abilities and traits, adding depth and variety to every encounter. The true strength of the game lies in combining these heroes’ powers to unlock devastating team-based strategies. As you venture into the night, prepare to face evolving dangers that keep every session unpredictable. Tinkerlands', '/uploads/85d826090d294bd1841b4edc264bcd33.jpg', '', 'https://vikingfile.com/d/ocCWFuL65C/f047587g.DR-GameDrive.Org.rar
https://vikingfile.com/d/ULLDJuMd1M/Optional-Bonus-Content.doi', 'https://youtu.be/Djtsw5k_DNc?si=rv2r6yPcpJmRLhIr', '/uploads/29b552e4db27487aa7031d135d690f64.png
/uploads/8c8f9ddaefdf4746b6047c9f32d0b9e0.webp
/uploads/5ddf7b8aabec483fb441287b0eeb38cc.jpg
/uploads/d294b1672ab7422394d904cc65d0b7c3.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#1d4ed8', 0, 'game', '', '', '', '2026-06-19 00:28:29', 'GAME INFO
Genre: Action, RPG
Developer: FromSoftware, Inc.
Platform: PC
Game Size: 26.6 GB
Co-op By: OFME
Version: v1.03.2 + Co-op | Full Version + All DLCs
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (109, 'Call of Duty WWII', 'Action', 4.5, 1, 'Call of Duty returns to its roots with Call of Duty WW2 – a breathtaking experience that redefines World War II for a new gaming generation. Land in Normandy on D-Day and battle across Europe through iconic locations in history’s most monumental war. Soulash

Experience classic Call of Duty combat, the bonds of camaraderie, and the unforgiving nature of war against a global power throwing the world into tyranny. Call of Duty: World War 2 creates the definitive World War II next generation experience across three different game modes: Campaign, Multiplayer, and Co-Operative.', '/uploads/735f3b798ec74c6289219906f0798344.jpg', '', 'https://ffdl.cybar.to/7tjruc7xo6fb
https://ffdl.cybar.to/ckegzfhb6l8c
https://ffdl.cybar.to/1yimpwsa8t1a', 'https://youtu.be/D4Q_XYVescc?si=odRQfW4EQTEzpUk_', '/uploads/dbc933bf323845bdacc7dc320dfb9d56.jpg
/uploads/d156de5bcbe5499498b0d741b332a0ac.webp
/uploads/f2eaea5ee8e0487cb8837e8fd419044f.webp
/uploads/104c4059c4234eadba76c22bcefe6be3.webp
/uploads/e6fd8a902812413b967e1fc837a86635.webp
/uploads/bd368425fdc94c30b5d8de8335ee876c.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#27272a', 0, 'game', '', '', '', '2026-06-19 00:35:53', 'GAME INFO
Genre: Action
Developer: Sledgehammer Games, Raven Software
Platform: PC
Game Size: 115 GB
Released By: Codex
Version: Build 7831931 | Full Version (Latest) +All DLCs + Multiplayer + Zombies
Pre-Installed Gam', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (110, 'SP Football Life 2026', 'Sports', 4.5, 0, 'Football Life 2026 (15.Oct.2025)
current version: update 2.2 (12.May.2026)
season 2025/26
------------------------------------------------

FL26 General features:
- teams updated for season 25/26
- fully functional edit mode
- updated most assets and graphics



SP Football Life is an experimental project that aims to continue the legacy of career modes found in the retired (PES) series
FL26 is updated for season 2025/26, promoted teams has replaced the relegated ones and a new teams selection is included, with updated squads and kits for most teams.

the edit mode is fully functional, there are three fully editable teams in the game for user creation (Ceres Negros, Zalgiris Vilnius, Zamora FC), the database is unlocked for the community, however changing bin files might result in serious errors, and will clash with future database updates.

* database reference can be found Database Reference


Game updates:
we perform periodic scans of the database for squads and attributes changes and import new players from live database, the game will receive frequent updates depending on the urgency and progress, updates also includes more updated graphics that would be ready by then and any small corrections or enhancements discovered while playing.
the game will show update notification if available upon launching the game.
- Commentary v8
FL26 includes the all new English commentary v8, it includes new call names for many players and new commentary dialogues, 
* newer version is available at the SP commentary addon page

- Real Faces
the players/staff faces are available as a separate addon due to the large size, it is highly recommended to download and install the new SP Facepack 26-27 page as it would add a lot of immersion to the game.

- Stadiums
36 stadiums installed by default in the game, more stadiums are available per region in the SP Stadiums addon page.', '/uploads/90bb3a96b98745bc80b78e52c49ffedb.jpg', '', 'https://download2390.mediafire.com/k3umrhbq7ysgLd74r9Lm4uvKcXapQivxTM6YLKMeN9L2I9684vr5-Qdyvr4l7mizZMcpEQNtalUwO7IxaUgkP5RuPVtf7KlqAd-G_NiGqGdAVWN9CKT9M4lotSi_nBtdBKwlsodl6XDj2Boo6cP6Xx31bFCc6InevmRxnBIssqtWwCE/9yyhs3x69yqq71h/SPFL26.part01.rar

https://download2393.mediafire.com/c652lcf2qrogKkjMmKivC8xhUAqMZi5m2Hsx1BWxR7JSbk3hI3UTFfuW48OVt-UFNhiSe7icIoncNHikuo65yr2KFJhDtJV3IZ_QYOCo3bZYFz2BEOYnsBkljNflAUmxHti72T3sa1o1NVteScty7t0L0cUUZUPgQJ8VDTjjj9to2ho/4dez2tvtud2h26u/SPFL26.part02.rar

https://download2446.mediafire.com/cykidhpyys3gBRjKCVoEFrOSlFXyJnvUNkLU8qETzKDr4b6mQ7oXXA1jsfEMd9FYmDKaiyYZXsdR0cL03u_n1K78tKF4Kre480a6yb4cSFlzNWin1P4nla5tZdq-CXVs5hsysw3uOYE0S30iOOYw0ICVRzUgco-c_XvPFYmJ3Ygte60/yvz1qm541xyslsu/SPFL26.part03.rar

https://download2392.mediafire.com/v8u47mzwd5xgrf7lEFE7dOU_Ypex0rewTgLGhEe5bx8Ec9n57_QKVzplGcaqwvHln-nVwlGGVQpFFDLD-yH_ayqUfB3KqIRK8ngfvcdU704aw3PoqEyXRB5oGPcdfzpC2eTNSOzDscge47vMgR8XAMYtR0xUne_9mgEwF83PxdBP4tI/rqlbm98ob8dt3vf/SPFL26.part04.rar
https://download2447.mediafire.com/hj6cm3oursygSHJXACKUCuDboQFjBEo7h7iFRc55HdpnnUAeSwALfeA4IZVAJA8gyw6tF9aamGaQHx4zHTjdbg1LdcactO7lbRvs00Z9sQnYcWl2VhXCxmfE1knB9-gJAz58RmcuxRLyzlOqoQxJj1Gi3l2FJdkgQ7QYhx9BOz6WSEw/ljf8sr3t4r8l623/SPFL26.part05.rar
https://download2353.mediafire.com/eim1e6scznkgMwOrUVCtRHoG3MQesgID_JnuIlhL0NprRyltAjfh8lXH7kwNazuUh2WF6w9qpSCA4WFDrgBi_j-2-lFpTO4LOL70IrhNCFDMtrWjW6RCPXZDhPI5eeyBHXQKrAzglZQegSD-5xZgEGdkbPncj6nFlAB3cg4x8TAH5hw/622a58kodm6lkyj/SPFL26.part06.rar
https://download2435.mediafire.com/tjx2v7k9hmhgmxnZJvTxh1MKum0T6YUniBsN6IyiNUtOfpmyFXEY5mz79gVTJh41jJywD03yX1f_SEdja_feTAcZfhEB6IK4tS_cYY9E2Y0_Qr0xQvf0p4bdF3McmrqoRQpmn52q6rvy9pKG1jU6zKal8hVcmcA1uPm4Pi8EdjPiiY4/p9s1s0jiv1h8vph/SPFL26.part07.rar
https://download2435.mediafire.com/p1o05vxqgflgdhV97CLSYUmzCUpTMZjnRsSH1_n3TGlpo7HG07e9MoauJe4SpPThPjYxa-9LfCs7g7pr0m3POSfHjgGxWfOqbrrwu1wizPxQ-LuVYvMjXNaKWij-BZcksOgop7TEHHRmYAAlSwdheCR-wYz9wMQFf9Bwg0KOFzpbfYc/eq0w58s625t8jzq/SPFL26.part08.rar
https://download2432.mediafire.com/a33o9kyw9jwgU7pwTjmmG8337KHjUEp93CZbLgouPURYqnEeC87HPh_0QDGbQb7jSyVrLis5V2Yx2OFe5K63wQ56r-drDzvUU7B4EEm9c4_162XY51WbujladzK0StDYmGcQ8iLTEdyg4IZo7uF595R0YaxnUZ5Ln2bG3vUZ8Bf7lq4/cmemaycyrvk01hs/SPFL26.part09.rar
https://download2442.mediafire.com/ydrpst4iisrgn4YL3p5yzRSvsFXrRV5QMNSVFhjBlgkPQvEoDV14bun1E19ZgtFYcAbo1aFmSr7HM0cwlXV8ZYE68RstiRAOrdkNGMbkp9FSOJVQHJ-SgkR9b4BSf64rlA_7l9T8sUmuBvcWESt-WgyFQ9Ux5et5gz-Rs2TiT--xHy0/1gs6u6cinr6zqbp/SPFL26.part10.rar
https://download2337.mediafire.com/7qqdyqm5igegDdu218ykW1ZJduTqmaOCKqUI0T29jUJiYzS3plzhi7O0Pk6VJpIFHazJX2ahsYyN8MIuyIesHcl2CTNeYtcAHVL4-2MqQeVzZOAKGExFH1stMoFBxjxHUb4Fuy-Rp08-v1voFnOSKedzWy1iezaBpYCZkPJv3faNT-U/0fghg1a51xsm7uq/SPFL26.part11.rar
https://download2430.mediafire.com/4qhn1and8org6hAS7BUmHhK0zei7-bXqxNSUdf76A1AcIeXfsmR1y15ZxlIhtYlLMVJgx3yRlh9prvlZVVQs2JejWYf4sheG0Hnlc1HpvLm5qU-Kluze5SvY3r1ijRuQXensooHnw-da7eusaxZcXSKQEyDbbcimm2gvEY-4_KbblN4/6irfnpz12gbcxrq/SPFL26_200.rar
https://download2435.mediafire.com/x7xyuewf7x7gHSoRYSDL3vlly0-YHv-9eTMLbgJAdDnnlCLepcHHIPe9z3qE5LpsqzngwIdqljOFhNSDg3WIYboduqOnb1ftl1yKN9DvOT2KBEmddqZprm6JEmuKxPouDldI8zcfDyFmLqavyr7iQhNGId47rBjZKw32TKSpXF8BW80/f00bfbg5d29javy/SPFL26_220.rar', 'https://youtu.be/rakoLSS0Jbk?si=-Adq5sGngnY4e3ff', '/uploads/d47cb609f50a48bb8ddd874997b83982.jpg
/uploads/419dd2d6ddd24b5bbaa5247c2de124c3.webp
/uploads/53e60ac8c46c4b4d95e4a5c35cec2b6e.jpg
/uploads/6453be7c1a4841a895d645952ed07785.webp
/uploads/4c1f215ede534adf928faf9ce8107b04.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#b91c1c', 0, 'game', '', '', '', '2026-06-19 00:51:35', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (111, 'TEKKEN 8', 'Action', 4.5, 0, 'GET READY FOR THE NEXT CHAPTER IN THE LEGENDARY FIGHTING GAME FRANCHISE, TEKKEN 8.

Completely redesigned character visuals. Elaborate, highly-detailed models built from the ground and high-fidelity graphics break the limits of new-generation hardware by adding a new weight and atmosphere to TEKKEN’s signature battles. Vivid environments and destructible stages combine to create an overwhelming sense of immersion, creating the ultimate play experience. Cursorblade

Fist Meets Fate in TEKKEN 8. Holding a record for the longest-running video game storyline, the TEKKEN series begins a new chapter as TEKKEN 8 continues the tragic saga of the Mishima and Kazama bloodlines, and their world-shaking father-and-son grudge matches starting from 6 months after the closure of the last match. The story of Jin Kazama’s growth and determination marks a new chapter in the timeless saga.

The new battle system, Heat, dials up the aggressive nature of battles, while maintaining the play feel and tactics unique to the TEKKEN series. The intensity of battles is greatly enhanced by the destructable stages. Unleashing super move-like Rage Arts is sure to enthrall both players and spectators alike. All of these hard-hitting mechanics come together to make TEKKEN 8 the most exciting installment in the series to date!

In the new single-player mode Arcade Quest, craft your own unique avatar and embark on your new TEKKEN life. Battle your way through a variety of rivals across multiple arcades as the story unfolds, all while mastering the basics and practical skills in TEKKEN 8. Unlock a variety of customization items for characters and avatars as you progress.', '/uploads/f19f1dfe1ff64ba4b8ce231a5ef30f9f.webp', '', 'https://ffdl.cybar.to/956xmnevyy8z
https://ffdl.cybar.to/64nduqv8wiy5
https://ffdl.cybar.to/m9g5go4s5ply', 'https://youtu.be/2hPuRQz6IlM?si=ABwhugio6rKBciFg', '/uploads/d88b2862a66a4056ae11fc991385971b.png
/uploads/aab098be2dc244caaec3eff750b076fd.webp
/uploads/701f8269e5614c9bb060be398b85878c.webp
/uploads/c750ecb2b4f6497093c3cdc2d6fea0a3.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#27272a', 0, 'game', '', '', '', '2026-06-19 01:08:35', 'GAME INFO
Genre: Action
Developer: Bandai Namco Studios Inc.
Platform: PC
Game Size: 115 GB
Released By: RUNE emu
Version: v3.01.01 | Full Version + All DLCs
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (112, 'Call of Duty: Modern Warfare 2019', 'Action', 4.5, 0, 'This game drops you into a realistic, modern-day conflict. You’ll play as a CIA officer working alongside elite British SAS forces. Your mission? To team up with rebels in the fictional country of Urzikstan. Together, you’ll fight back against the Russian Armed Forces who have invaded, and also take on the local terrorist group, Al-Qatala. All of this unfolds while you’re on a critical search for a stolen shipment of chlorine gas.

Beyond the Campaign
Looking for more action after the main story? The Special Ops mode offers cooperative missions that continue the narrative. Vintage Story

Multiplayer Evolution
The multiplayer experience has been significantly updated, with cross-platform play and progression making their debut in the series. Gameplay has been refined to be more tactical, introducing exciting new features:

Realism mode removes the HUD for an even more immersive experience.
Ground War mode now supports massive 64-player battles, similar to Cold War.
Plus, a free-to-play battle royale mode called Warzone was added after launch, which you can also get as a standalone game.', '/uploads/49ebf6919e6a4ea9be07052cee13987f.webp', '', 'https://ffdl.cybar.to/l6t77ufg6rho
https://ffdl.cybar.to/zcuadsgeecn7
https://ffdl.cybar.to/8xu3rr06dofr', 'https://youtu.be/bH1lHCirCGI?si=7hd9KE49bVvP9p_U', '/uploads/8ede6fcaf7f44acf8840cd213d79f031.jpg
/uploads/1b3d499fae1644d2810af91cb4e63514.webp
/uploads/ceee83fae6594045aad127b1d402fd9a.webp
/uploads/90e0770000c14456a66da2aeb3dfe002.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3f3f46', 0, 'game', '', '', '', '2026-06-19 01:31:11', 'GAME INFO
Genre: Action
Developer: Infinity Ward, Beenox, High Moon Studios, Raven Software
Platform: PC
Game Size: 177 GB
Released By: V3 (by .r4v3n) | Ty Ksenia, Fitgirl repacks
Version: v8.67 | Full Version + SinglePlayer Campaign, Multiplayer (with bots), Coop
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (113, 'HYPERVISOR  Judgment', 'Action, Adventure, Hypervisor', 4.5, 0, '', '/uploads/e46248fae0c14d7e973456914083441a.jpg', '', 'https://fuckingfast.co/kk8odd00lxtn#Judgment_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/38gvj3a2pc9b#Judgment_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/4px3ozkyb48z#Judgment_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/pp4livbwk99y#Judgment_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/5ap259kz3dsq#Judgment_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/l0k1c1928yki#Judgment_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/p9om8feeghd3#Judgment_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/6klkpt132p1o#Judgment_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/1m69dqdjdd0q#Judgment_--_fitgirl-repacks.site_--_.part09.rar
https://fuckingfast.co/islurs7oycty#Judgment_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/m7qhwa29fh2f#Judgment_--_fitgirl-repacks.site_--_.part11.rar
https://fuckingfast.co/b4ml69kggczk#Judgment_--_fitgirl-repacks.site_--_.part12.rar
https://fuckingfast.co/7kkw09unsmjr#Judgment_--_fitgirl-repacks.site_--_.part13.rar
https://fuckingfast.co/dl0ad4lgos1e#Judgment_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/54cndoii36xo#Judgment_--_fitgirl-repacks.site_--_.part15.rar
https://fuckingfast.co/s5q0xhf9vesr#Judgment_--_fitgirl-repacks.site_--_.part16.rar
https://fuckingfast.co/pexs2r0fzpuy#Judgment_--_fitgirl-repacks.site_--_.part17.rar
https://fuckingfast.co/a6synbj002pa#Judgment_--_fitgirl-repacks.site_--_.part18.rar
https://fuckingfast.co/tfwnc5hj8dg4#Judgment_--_fitgirl-repacks.site_--_.part19.rar
https://fuckingfast.co/h1htul76fqpp#Judgment_--_fitgirl-repacks.site_--_.part20.rar
https://fuckingfast.co/9bq84m8gtqfs#Judgment_--_fitgirl-repacks.site_--_.part21.rar
https://fuckingfast.co/dcw382j4jvbb#Judgment_--_fitgirl-repacks.site_--_.part22.rar
https://fuckingfast.co/o5x5bizckn2x#Judgment_--_fitgirl-repacks.site_--_.part23.rar
https://fuckingfast.co/b39fz2rmq8pl#Judgment_--_fitgirl-repacks.site_--_.part24.rar
https://fuckingfast.co/yqg1cdbs4h4n#Judgment_--_fitgirl-repacks.site_--_.part25.rar
https://fuckingfast.co/281kt5fdbi7o#Judgment_--_fitgirl-repacks.site_--_.part26.rar
https://fuckingfast.co/1lypspcz8fcu#Judgment_--_fitgirl-repacks.site_--_.part27.rar
https://fuckingfast.co/k9wmwnrco4ft#Judgment_--_fitgirl-repacks.site_--_.part28.rar
https://fuckingfast.co/hptruy08jwv1#Judgment_--_fitgirl-repacks.site_--_.part29.rar
https://fuckingfast.co/bwt19pkm9rs5#Judgment_--_fitgirl-repacks.site_--_.part30.rar
https://fuckingfast.co/pgxa8hl1iovj#Judgment_--_fitgirl-repacks.site_--_.part31.rar
https://fuckingfast.co/5r9czal4il8s#Judgment_--_fitgirl-repacks.site_--_.part32.rar
https://fuckingfast.co/2srnvvowphwk#Judgment_--_fitgirl-repacks.site_--_.part33.rar
https://fuckingfast.co/9jqf7gb461lo#Judgment_--_fitgirl-repacks.site_--_.part34.rar
https://fuckingfast.co/qowkf24kozj3#Judgment_--_fitgirl-repacks.site_--_.part35.rar
https://fuckingfast.co/b9h0ok0a4uq7#Judgment_--_fitgirl-repacks.site_--_.part36.rar
https://fuckingfast.co/kn965a5fxm1z#Judgment_--_fitgirl-repacks.site_--_.part37.rar
https://fuckingfast.co/9j761lx995ob#Judgment_--_fitgirl-repacks.site_--_.part38.rar
https://fuckingfast.co/du4tyz27p6kn#Judgment_--_fitgirl-repacks.site_--_.part39.rar
https://fuckingfast.co/1cxgqzt8ywme#Judgment_--_fitgirl-repacks.site_--_.part40.rar
https://fuckingfast.co/d1jqcjtvaiyd#fg-optional-bonus-soundtracks.bin', 'https://youtu.be/38dK9-y0cbM?si=JdbXDa53T21Ks0DC', '/uploads/71fd029d1fb8450a9ca4aec8a77d33e6.jpg
/uploads/040e223f9618403ea9d297666ed18c90.jpg
/uploads/b402f844a6bb401e94ee2b484700c787.webp
/uploads/d8c8bdda1a874361bf5afa5403c0a58a.jpg
/uploads/316fd0b109eb4509b581ea3cfc82ea7f.jpg
/uploads/f0039d0811d94459ac4eb42ff5fab2e7.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-19 13:04:42', 'Repack Features
Based on Steam BuildID 10792091 release: 35.7 GB
2 Bonus OSTs (JUDGE EYES & LOST JUDGMENT ORIGINAL SOUND TRACK & Original Soundtrack, 560 MB) added, thanks to SittingOnClouds!
Russian localization by “The Miracle” (292 MB) is available in “_Russian_Localization” folder after installation
Hypervisor Bypass (INTEL & AMD) by DenuvOwO + Goldberg emu applied over
Many antiviruses, including Windows Defender are now marking HV files as rootkits, rendering games unplayable. To avoid it either turn off AV completely, or add source/target installation folders to exclusions
VBS.cmd script v1.6.2 added
Custom launcher added for easier HV steps processing
Game version: v1.12
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Selective Download feature: you may skip downloading and installing of bonus OSTs
Significantly smaller archive size (compressed from cumulative 36.6 to 19.2/19.7 GB)
Installation takes 10-35 minutes (depending on your system)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: up to 36.6 GB
Language can be changed in “runtime/media/steam_settings/configs.user.ini” file
Repack uses XTool library by Razor12911
At least 4 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (114, 'Need for Speed Most Wanted Limited Edition', 'Racing', 4.5, 0, 'The open-world action in Need for Speed Most Wanted gives you the freedom to drive your way. Hit jumps and shortcuts, switch cars, lie low, or head for terrain that plays to your vehicle’s unique strengths. Fight your way past cops and rivals using skill, high-end car tech, and tons of nitrous. It’s all about you, your friends, and a wild selection of cars. Let’s see what you can do. Experience nonstop action — No menus, no lobbies, and no restrictions — just intense competition.', '/uploads/fa8fc4eeec494d6aaedaea3256850064.jpg', '', 'https://vikingfile.com/d/WFqbGG1Zp5/rt25797.ER-GameDrive.Org.rar', 'https://youtu.be/L7eHnAS3BDE?si=IGhddRjtkwxeG9_y', '/uploads/89e7b2d90dc140f6b3937e6e3b267068.webp
/uploads/99a961c75dfd468f8b1430999702b7ff.webp
/uploads/c2ef4c3ef50d41bd97434d15842009f3.webp
/uploads/bd3ab842d4434bc79b3ec66a3385db63.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#ffffff', 0, 'game', '', '', '', '2026-06-19 13:25:09', 'GAME INFO
Genre: Action, Adventure, Racing
Developer: Criterion Games
Platform: PC
Game Size: 8.28 GB
Repack By: FITGIRL
Version: v1.5.0.0 (Limited Edition) | Full Version + all add-ons
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (115, 'Mortal Kombat 11', 'Action', 4.5, 0, 'After game installation remove this line from file “Binaries\Retail\steam_emu.ini“, otherwise in-game movies may not be displayed.
1461160=4K Cinematic Pack (Mortal Kombat 11 4K Cinematic Pack)

Mortal Kombat 11 is another part of a fighting game dedicated to a deadly battle. This time, even more epic battles, improved graphics and a well-thought-out story mode await you And first of all, I would like to say that this time the game is based on an advanced improved graphics engine, thanks to which the developers managed to create an simply unimaginable atmosphere. Realistic arenas with environments that will be used in battles, a huge number of new combinations, including final ones, realistic animation of characters and faces, in which you can even see emotions – all this is not a complete list of what awaits you in the new game.', '/uploads/08b92b5e4ede4486a89f10a7ca9bd066.webp', '', 'https://vikingfile.com/d/Sw8WI6HvGz/dfgii.ER-GameDrive.Org.part1.rar
https://vikingfile.com/d/Uu4bCB35Ll/dfgii.ER-GameDrive.Org.part2.rar', 'https://youtu.be/UoTams2yc0s?si=Zuajfi0sSf9jrcJz', '/uploads/707e7ab6ec8d4ca5a2c5cd6cdd3eeddd.jpg
/uploads/8df2405874864ec8855d61b35e156f6c.png
/uploads/7028f1a7861d4ffeae6a687009fdddda.webp
/uploads/e4f91f5b1d8a4183bf6fd37e9a4ed8e2.jpg
/uploads/810e14855fab4b1185058b7b04414459.jpg
/uploads/84cedad05b56431fa82e7addf1808cbf.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-19 13:33:50', 'GAME INFO
Genre: Action
Developer: NetherRealm Studios, QLOC, Shiver
Platform: PC
Game Size: 102 GB
Released By: CODEX
Version: v0.384-34-CL237394 | Build 8418155 + all add-ons
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (116, 'Tomb Raider Definitive Edition', 'Action, Adventure', 4.5, 0, 'Tomb Raider explores the intense and gritty origin story of Lara Croft and her ascent from a young woman to a hardened survivor. Armed only with raw instincts and the ability to push beyond the limits of human endurance, Lara must fight to unravel the dark history of a forgotten island to escape its relentless hold. Download the Turning Point trailer to see the beginning of Lara’s epic adventure. Star Trucker
A Turning Point: Experience Lara Croft’s intense origin story from a young woman to a hardened survivor.
An All-New Raiding Experience: Explore a mysterious island filled with environmental puzzles, visceral combat, and tombs to discover.
Fight to Live: Salvage resources, gain experience, and upgrade Lara’s weapons and tools to survive the island’s hostile inhabitants.
Survive as a Team: Play a variety of multiplayer modes as Lara’s Shipmates or Yamatai’s Scavengers.', '/uploads/24da20f1ddc245caac317504b71a5802.webp', '', 'https://vikingfile.com/d/g0kfw4MWRi/y65uzf.ER-GameDrive.Org.rar', 'https://youtu.be/zF9m91y8Na0?si=2WAzioc3jH3xqZty', '/uploads/0c812e5aecb0413bbab824c28769d965.jpg
/uploads/4a7ad5f4d83c41d2b0301968c3838bac.jpg
/uploads/226b217b63054de4955a5e3215a420df.jpg
/uploads/c4c1858478d8408bb165430fd8d3fb2e.jpg
/uploads/5254b993ed124f4d8e34366293eddccb.jpg
/uploads/e390a3ebf0094d7582af010e97fbced4.jpg
/uploads/8d5c1f0d23474e8a98faade7325208c5.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#52525b', 0, 'game', '', '', '', '2026-06-19 13:39:40', 'GAME INFO
Genre: Action, Adventure
Developer: Crystal Dynamics, Eidos-Montréal, Feral Interactive (Mac), Nixxes
Platform: PC
Game Size: 22.4 GB
Released By: TENOKE
Version: v1.01.0.0 | Full Version
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (117, 'NieR:Automata', 'Action, RPG', 4.5, 0, 'NieR Automata is a cool RPG in which you will fight aliens as a cool, effeminate robot sent by humans to Earth to reclaim it The game takes place many hundreds of years after the original game. The war with aliens was never won, and in the end people were forced to leave Earth and move to the Moon. But no matter how it was, the desire to return back people has not left, and that is why they continue to send detachments of fighters to Earth.', '/uploads/1b8fd7b641714a6f9b6b9a02058bbab8.jpg', '', 'https://vikingfile.com/d/V6j1MbmTkw/54gfgfghg.ER-GameDrive.Org.rar', 'https://youtu.be/wJxNhJ8fjFk?si=3Gttb2U3JOpYRv4L', '/uploads/798cbdea71e64801a3c0df9d2b483abc.jpg
/uploads/4ac3aa11a43b4c82b6d604a1d1e814f2.jpg
/uploads/23ce9d325ed14e9099cbe46d5a3ae643.webp
/uploads/2716e556276a4eb98cb9b2594b7082f8.jpg
/uploads/ed973050e6dc46f29e12e05151220912.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-19 13:45:58', 'GAME INFO
Genre: Action, RPG
Developer: Square Enix
Platform: PC
Game Size: 14.8 GB
Repack By: CPY
Version: v1.0.1787043 (Game of the YoRHa Edition) | Updated Version + All DLC
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (118, 'Sleeping Dogs: Definitive Edition', 'Action, Adventure, Racing', 4.5, 0, 'The Definitive Edition of the critically acclaimed, award winning open-world action adventure, reworked, rebuilt and re-mastered for the new generation. Settlement Survival All 24 previously available DLC extensions have been integrated into the game, including the story-extending episode Year of the Snake and the horror-themed Nightmare in North Point. Alongside a wealth of new technological, audio and visual improvements, Hong Kong has never felt so alive.', '/uploads/5258d4ac8ce74ee3b5aa000884c0f4d6.jpg', '', 'https://ffdl.cybar.to/t8pupc1plu5l', 'https://youtu.be/YjM67H0gP7U?si=ptfizaOZiwJg5kBZ', '/uploads/309c9aab0191462cb0da2e88069fba51.jpg
/uploads/dc4c0b4ebfb740ed83adf0c80d5b5449.jpg
/uploads/6e0e0551188f4c9889d865ad31007708.jpg
/uploads/e16de2a39b684e3f816a7f54541b6975.jpg
/uploads/92f0e46204174537828e5d693218022e.webp
/uploads/28402b6d4d2848c3a62d3a305b5c48d0.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#fed7aa', 0, 'game', '', '', '', '2026-06-19 13:51:06', 'Features
A mature, gritty undercover cop drama where a wrong decision can blow your cover at any time.
Explosive action fuelled by a seamless mix of deadly martial arts, intense gunfights and brutal takedowns.
Epic high-speed thrills: Burn up the streets or tear up the sea in a vast array of exotic cars, superbikes and speedboats.
Hong Kong is your ultimate playground: Enter illegal street races, gamble on cock fights, or kick back with some karaoke. There are countless ways to entertain yourself in Hong Kong’s diverse districts.', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (119, 'Sifu', 'Action', 4.5, 0, 'Sifu is a beat ’em up action-adventure game played from a third-person perspective. The game, which is inspired by Pak Mei kung fu, includes over 150 unique attacks. Basic attack moves can be chained together, though some combos may grant players additional tactical opportunities, such as being able to knock down enemies or stun them. The protagonist and all hostile enemy characters have a “structural gauge”.

When the gauge is completely filled, the guard of these characters will break and they will become vulnerable to finishing attacks. Players can also block strikes, though this will gradually fill their gauge. Alternatively, players can also evade attacks or parry when an enemy is about to land a blow. A successful parry allows the player to stun the enemy or throw them towards a particular direction. The game allows players to take advantage of the environment and improvise new attacks or alter their strategy when facing a stronger opponent.', '/uploads/3ae024aa769843898e5236603caa7c09.jpg', '', 'https://ts.bzzhr.to/d/fx56v77o7kqx?v=MgKdNbDAcu2-M0NVRH9dpfrmNmr01YfOF4eyusT0W8MTYIiR7KspX1M1fPglH222fUmz9GGJRlny5JP5jqMfezgWIWDbsP7r8JtkFl7d4uQS8Fluw7VHXoOp6uXPX84yDJ5IDCImwePZghKkFEl_VH19AiY_2nPzDSCAxmcz', 'https://youtu.be/1FQ1YO3Ks2U?si=EiJEyzldeuLKF33X', '/uploads/456394f8774d408fa093e0ecc6cdacf6.jpg
/uploads/a45754d9a97a459484170068c4bd5e6e.jpg
/uploads/3538e72657234460b78aab456132ebe6.webp
/uploads/328867945c8244aabf1325ede8d57603.png
/uploads/4648cbb2449242498d1c0b62334a513a.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#b91c1c', 0, 'game', '', '', '', '2026-06-19 13:57:00', 'GAME INFO
Genre: Action, Casual, Indie
Developer: Sloclap
Platform: PC
Game Size: 24 GB
Released By: RUNE emu
Version: v1.28_6,720 | Full Version (Latest) + All DLCs/Bonuses
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (120, 'FINAL FANTASY XVI', 'Action', 4.5, 0, 'An epic dark fantasy world where the fate of the land is decided by the mighty Eikons and the Dominants who wield them. This is the tale of Clive Rosfield, a warrior granted the title “First Shield of Rosaria” and sworn to protect his younger brother Joshua, the dominant of the Phoenix. Before long, Clive will be caught up in a great tragedy and swear revenge on the Dark Eikon Ifrit, a mysterious entity that brings calamity in its wake.

Titanic Clashes – When rival Dominants come head to head, epic battles between their Eikons ensue!

Eikonic Action – Clive utilizes the powers of multiple Eikons in breakneck battle!

From Strength to Strength
A plethora of powerful swordplay techniques and Eikonic abilities lie within Clive’s remit—and it is up to you to decide which ones you wish to learn or upgrade. If you’re having trouble choosing, upgrades can be unlocked automatically. Grand Theft Auto V Enhanced

Story-focused mode is recommended for those players who are less comfortable with action games and wish to focus more on the game’s story elements. In this mode, Clive will automatically evade some attacks, and epic Eikonic combos can be triggered with simple button presses. Action-focused mode, where Clive’s every action is controlled by the player, is available for those who are confident in their skill—or want to test it.', '/uploads/be301a0df222426d90d180a1a2c7f001.jpg', '', 'https://fuckingfast.co/twrqdslyd0a4#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/0i12bbqwlnia#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/a3nap6qbl9ik#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/7wuzkg0hpein#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/wdwno4r68egs#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/yo7rolrvlwn5#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/hr11f7hl117e#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/icqfh9llf2nc#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/5fqotkpq3g42#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part09.rar
https://fuckingfast.co/41lv8rjzjsko#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part10.rar
https://fuckingfast.co/tetohh1cx8s1#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part11.rar
https://fuckingfast.co/opzu6j6tlujh#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part12.rar
https://fuckingfast.co/r7km4156hwjx#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part13.rar
https://fuckingfast.co/fsjvjqlz82c9#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part14.rar
https://fuckingfast.co/aoeqr62ei8rf#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part15.rar
https://fuckingfast.co/ntcl7drkfnzc#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part16.rar
https://fuckingfast.co/jn5hv98qelkq#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part17.rar
https://fuckingfast.co/g60e0dn3yr01#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part18.rar
https://fuckingfast.co/j4pm2f8l9hiw#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part19.rar
https://fuckingfast.co/9p7xdwzvh4a8#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part20.rar
https://fuckingfast.co/83d0trq9dqby#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part21.rar
https://fuckingfast.co/83d0trq9dqby#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part21.rar
https://fuckingfast.co/i7nrthyvqrkj#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part22.rar
https://fuckingfast.co/wlx816yxz9xh#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part23.rar
https://fuckingfast.co/krg5olylt8wo#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part24.rar
https://fuckingfast.co/3gfog1rcwo7a#Final_Fantasy_XV_--_fitgirl-repacks.site_--_.part25.rar
https://fuckingfast.co/zkk9m9i6bqiy#fg-optional-bonus-soundtracks.bin
https://fuckingfast.co/51nyaqdn0nnq#fg-optional-multiplayer-files.bin
https://fuckingfast.co/1yris3a1na0h#fg-optional-japanese-videos.part1.rar
https://fuckingfast.co/5uv77lr14ttl#fg-optional-japanese-videos.part2.rar
https://fuckingfast.co/91ftk5mb559d#fg-optional-japanese-videos.part3.rar', 'https://youtu.be/gV5rIW1Qums?si=Q8lGQHJl66bnoxX3', '/uploads/98a29d0cd6144b828bf4c174895b5a13.webp
/uploads/1997ad655e7344bbb16dd415ebc3de8a.png
/uploads/2582334f1e59489295e4eaec554cf15b.jpg
/uploads/ed690712ae0e48059c1f49c42c6ea113.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-19 14:05:31', 'GAME INFO
Genre: Action, RPG
Developer: Square Enix
Platform: PC
Game Size: 153 GB
Released By: RUNE emu
Version: v1.03 | Full Version
Pre-Installed Game', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (121, 'Solo Leveling: ARISE OVERDRIVE', 'Action, Sci-Fi, Fighting', 4.5, 0, 'Genres/Tags: Action, Slasher, Third-person, 3D
Companies: Netmarble Neo, Netmarble Games
Languages: RUS/ENG/MULTI21
Original Size: 38.6 GB
Repack Size: 16.7 GB', '/uploads/557856bb33b24d7f87a02d20291f65ce.webp', '', 'https://fuckingfast.co/5llff94ma9ga#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part01.rar
https://fuckingfast.co/wzpeqn0t2jif#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part02.rar
https://fuckingfast.co/ltmb33l88s93#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part03.rar
https://fuckingfast.co/zc9mhbln2wmk#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part04.rar
https://fuckingfast.co/nbndv0s7e6l2#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part05.rar
https://fuckingfast.co/ph8yn5zo5oww#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part06.rar
https://fuckingfast.co/v6tgqabvnb7g#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/v6tgqabvnb7g#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part07.rar
https://fuckingfast.co/cm7dcrnfr993#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part08.rar
https://fuckingfast.co/evxwakdzpjfw#Solo_Leveling_ARISE_OVERDRIVE_--_fitgirl-repacks.site_--_.part09.rar', 'https://youtu.be/B22MqQQK5eE?si=tlET1s-9fJ1q0pwo', '/uploads/1aa02af0cb944e37b0e01aa74ea51293.webp
/uploads/d4af9f612407428aba25c3c320f67a2b.webp
/uploads/ed87c36c33ec4cf58c9d3aabfb3165f0.webp
/uploads/1c9fca6edfc44cae88fa7fd385967689.jpeg
/uploads/3b5b527fb3c94320980c51c01f87959b.jpg
/uploads/0a00d88f81454c2f9c500fb73b1604fc.jpg
/uploads/5a3183ce066647acb2cacca15d8977d8.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-23 01:33:05', 'Based on Solo.Leveling.ARISE.OVERDRIVE-RUNE ISO release: rune-solo.leveling.arise.overdrive.iso (41,400,958,976 bytes)
Game version: v1.1.89; DLCs are NOT working atm
The game must be installed to a short path, like “D:\SL” to avoid issues related to long filenames
100% Lossless & MD5 Perfect: all files are identical to originals after installation
NOTHING ripped, NOTHING re-encoded
Significantly smaller archive size (compressed from 38.6 to 16.7 GB)
Installation takes 11-50 minutes (depending on your system)
After-install integrity check so you could make sure that everything installed properly
HDD space after installation: 44.9 GB
Language can be changed in game settings
Repack uses XTool library by Razor12911
At least 2 GB of free RAM (inc. virtual) required for installing this repack', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (122, 'Watch Dogs Legion', 'Action, RPG, Open World', 4.5, 0, 'Watch Dogs®: Legion (PC-Windows) – Welcome to the Resistance! Plunge into a breathtaking, near-future London on the absolute brink of its downfall. The city has been seized by opportunistic authoritarians: a corrupt private military corporation controls the streets, a ruthless crime syndicate preys on the vulnerable, and a terrifying cyber-terrorist group has framed the hacker collective DedSec for a city-wide catastrophe. It is up to you to recruit, infiltrate, and fight back to liberate the city.

Breaking completely free from traditional open-world design, Watch Dogs: Legion introduces a groundbreaking “Play as Anyone” mechanic. Every single person you see walking through the fully realized, open-world streets of London—from an MI6 spy with a silenced pistol and a stealthy drone expert, to a street-racing getaway driver or even a seemingly harmless sweet old grandmother—has a unique backstory, personality, and specialized skill set.

You can recruit absolutely anyone into your DedSec cell by completing personalized missions to win their loyalty. Once they join, you can seamlessly switch between your operatives to tackle missions your way. Hijack commercial delivery drones, deploy invisible spider-bots, hack the city’s massive security infrastructure, and unleash non-lethal gadgets or lethal firepower depending on your playstyle. But choose your tactics wisely—with the permanent death option turned on, when an operative falls, they are gone for good. Grab your high-speed direct download or get the magnet file via torrent to build your crew, hack the system, and take back London!

How to Download, Extract & Play Watch Dogs Legion on PC
Download the game and save it to your PC.
Right-click the downloaded file and select “Extract Here” or “Extract to folder” using WinRAR or any similar tool.
Wait for the extraction process to complete.
Once done, open the extracted folder.
Run bin\WatchDogsLegion.exe to start the game.', '/uploads/31d4a6df99ff49afb499dd523b458559.jpg', '', 'https://vikingfile.com/d/u4jm9I1a2S/2239550.B10340675-GameDrive.Org.part1.rar
https://vikingfile.com/d/Rlo0b7Fmlm/2239550.B10340675-GameDrive.Org.part2.rar', 'https://youtu.be/srXrGKGAU20?si=vJo_7-rM5KS2-ejj', '/uploads/98d7a151f6f043f4851ce12f4c105c4c.webp
/uploads/7579b68cb8cd4441a1a0e1045fb47375.jpg
/uploads/63536d701333454a93f97f9374a43d6b.jpg
/uploads/bf2677fc53344ce3900ec5cea2710d09.jpg
/uploads/396ce46247974adb8df11cacc82282f9.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#0ea5e9', 0, 'game', '', '', '', '2026-06-23 01:39:10', 'ased On my own Steam Files + Electrical_Exit + Alex ASSR + skystar

Steam Version

DLCs:

Watch Dogs: Legion Ubisoft Activation
Watch Dogs: Legion DLC Bloodline (Watch Dogs Legion : Bloodline)
Watch Dogs: Legion DLC Bloodline Ubisoft Activation
Watch Dogs: Legion Season Pass
Watch Dogs: Legion Season Pass Ubisoft Activation
Watch Dogs: Legion Ultimate Edition Ubisoft Activation
Watch Dogs: Legion Deluxe Edition Ubisoft Activation
Watch Dogs: Legion Gold Edition Ubisoft Activation', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (123, 'Need for Speed Unbound', 'Racing, Hypervisor', 4.5, 0, 'Download Need for Speed Unbound (PC) – free full game. Experience the ultimate street racing saga in the complete ElAmigos repack, updated with all Vol. 1-9 content and 2026 performance patches. Use the direct download to outsmart the cops, customize your dream garage with every DLC car pack, and dominate The Grand with precision-tuned rides and signature street style.', '/uploads/95d2f9bebe2b43fbb5e236eac36a6849.webp', '', 'https://vikingfile.com/d/wultxYJO0o/1846380.B16690907.CSF-Games4U.Org.rar
https://akirabox.com/RMKGJwpn1m1o/file', 'https://youtu.be/H2Y8XCe7F9E?si=5j-hHctP5h-BYofv', '/uploads/23b907a28d0b4c14bfea7d83afd7e854.jpg
/uploads/15bb4a1d1aaf4140922600fd977cee48.jpg
/uploads/a7537190dacb45b684d5bdb40c2c857f.jpg
/uploads/0fa93c2a1c6a4a28963bf9881fc9a309.webp
/uploads/7291778a365f4a1c8cd3a3a8a4744b97.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#84cc16', 0, 'game', '', '', '', '2026-06-23 01:48:35', 'Repack Features
Updated to version 1.0.8.2549 (12.12.2024).

Upload size / to download: 30680MB
ISO image size: 30680MB
Number of compressions: only one
Data recovery: none
Languages: English, French, Italian, German, Spanish, Polish, Portuguese-Brazil, Arabic, Korean, Japanese, Simplified Chinese, Traditional Chinese
Dubbing/Audio: English, French, Italian, German, Spanish, Polish, Japanese', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (124, 'Resident Evil Requiem', 'Horror, Action', 4.5, 0, 'Download Resident Evil Requiem (PC) – free full game. Face the ultimate survival horror challenge in the definitive 2026 entry of the series. Use the direct download to master dual combat and stealth styles as Leon Kennedy and Grace Ashcroft. Uncover the secrets of the American Midwest and the RPD ruins in this high-fidelity Unreal Engine 5 nightmare, featuring all launch content and the latest performance optimizations.

Table of Contents
VBS (Easiest – RECOMMENDED)
Step 1: Run the Script
Step 2: After Restart – Blue Screen & Press F7
Step 3: Launch the Game
How to Revert & Clean Your System
Before You Start: Apply the Crack
You must download and apply the crack before following the bypass steps below.

Download the crack from: https://gamedrive.org/resident-evil-requiem-deluxe-edition-2026-all-dlc-v2-01/
Extract the crack files.
Copy all files from the crack and navigate to your game installation folder: Resident Evil Requiem\
Paste the files into the folder. When prompted, click Replace / Yes to All.', '/uploads/71a6387a01fb4962b500d273ef3e59e4.webp', '', 'https://ffdl.cybar.to/9htmb3j0bfsz
https://ffdl.cybar.to/2d6u8xnwcaqx
https://akirabox.com/gXeGOBvnNzAa/file', 'https://youtu.be/POz1-EmLsTY?si=FjgiD2a0H6MQpzqu', '/uploads/7bc129bd6dc14949b4145f8480d35bd6.webp
/uploads/b74c2eefd77044e39ccf4ee7e6577a9b.webp
/uploads/732a67add579491e9f0bee5228d4f40e.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-28 00:18:01', '', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (125, 'DEATH STRANDING 2', 'Action, Adventure', 4.5, 0, 'Download Death Stranding 2: On the Beach (PC) – free full game. Join Sam, Fragile, and a new cast of companions on an epic mission to save humanity. Use the direct download from the ElAmigos repack to explore massive open worlds in Australia and Mexico, featuring visceral combat, advanced infrastructure building, and the complete 2026 PC features including DualSense support and enhanced performance.', '/uploads/0c234afce87c402ebc3a88d49daaff26.webp', '', 'https://vikingfile.com/d/aua0CdxxXO/DC2.ER-GameDrive.Org.part1.rar
https://vikingfile.com/d/TY10qpswHY/DC2.ER-GameDrive.Org.part2.rar', 'https://youtu.be/etOOO9Sq7u8?si=oDtooQzfuYz49mVm', '/uploads/8a38f416d0a449efb1366ecac9b47b86.webp
/uploads/abc7ce05e4054f72918c53a7bc0015b3.jpg
/uploads/b9ef90ea9eba4cb6a70c45d01225eee5.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#a5f3fc', 0, 'game', '', '', '', '2026-06-28 00:23:49', 'Repack Features
game is already cracked after installation (crack by Codex/Rune). Updated to version 1.0.48 (19.03.2026).
DLC: Digital Deluxe Edition, Pre-Purchase Bonus Content, Soundtrack.

Upload size / to download: 85385MB
ISO image size: 85385MB
Number of compressions: only one
Data recovery: none
Languages: English, French, Italian, German, Spanish, Spanish (Mexico), Polish, Russian, Portuguese, Portuguese-Brazil, Czech, Dutch, Greek, Arabic, Japanese, Korean, Chinese Simplified, Chinese Traditional
Dubbing/Audio: English, French, German, Spanish, Polish', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (126, 'Resident Evil Village Deluxe Edition', 'Horror, Action, Adventure', 4.5, 0, 'Experience survival horror like never before in the eighth major installment in the storied Resident Evil franchise – Resident Evil Village.

Set a few years after the horrifying events in the critically acclaimed Resident Evil 7 biohazard, the all-new storyline begins with Ethan Winters and his wife Mia living peacefully in a new location, free from their past nightmares. Just as they are building their new life together, tragedy befalls them once again.', '/uploads/2f5f36db4c57417885969f589e0a7740.jpg', '', 'https://vikingfile.com/d/ClOE16StBA/5645gfh36fgd.ER-GameDrive.Org.rar', 'https://youtu.be/CNpIfP4vtrE?si=Ovytz1FxzP1WZ7aH', '/uploads/391b1ed030c148ee9c72e2af76c2b4f4.jpg
/uploads/d6ac706d1b124633ac46fb26347fc4cd.webp
/uploads/f4a60026a85e4bb0bb3cc6ff935640ab.jpg
/uploads/79a657bf081848d8b21a22c4f9e8329e.webp
/uploads/0c372bc6dbab49e7acd10433e73ff69a.jpg
/uploads/c584551cdeea4a088dd21853f448fdb5.jpg
/uploads/f1795ca359f9404b8dbde88fb7edb308.jpg', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#18181b', 0, 'game', '', '', '', '2026-06-28 00:28:02', 'Repack Features
game is already cracked after installation (crack by Codex/Rune or FLT). Updated till 10.04.2023;
included DLC: Winters Expansion, Street Wolf Outfit, Survival Resources Pack, Mr. Raccoon Weapon Charm, Extra Content Shop All Access Voucher, Trauma Pack, Soundtrack (mp3).
Upload size / to download: 24717MB
ISO image size: 24717MB (37598MB after installation)
Number of compressions: only one
Data recovery: none
Languages: English, French, Italian, German, Spanish, Polish (unofficial), Portuguese-Brazil, Russian, Arabic, Thai, Japanese, Korean, Simplified Chinese, Traditional Chinese
Dubbing/Audio: English, French, Italian, German, Spanish, Japanese, Portuguese-Brazil, Russian, Simplified Chinese', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (127, 'https://youtu.be/CJf3dQ4ZQLY?si=Qksb4IzzrLQMPwwY', 'Adventure, RPG', 4.5, 0, 'Download Nioh 3 Elamigos Repack In the third game in the dark samurai action RPG series Nioh, you will need to use both Samurai and Ninja combat styles in your battles against formidable yokai as you explore a thrilling open field.', '/uploads/2e516d3412e84ea58a27e1cdb935fa6f.webp', '', 'https://vikingfile.com/d/AArfQml0IO/3681010.ER-GameDrive.Org.part1.rar
https://vikingfile.com/d/cFMBqnmRxO/3681010.ER-GameDrive.Org.part2.rar', 'https://youtu.be/CJf3dQ4ZQLY?si=Qksb4IzzrLQMPwwY', '/uploads/17023e6ce9fe4d73add073d2a4bc7e2e.webp
/uploads/44f82ef198e0402383b419db1c291124.webp
/uploads/483a11c9b6a240b6b4b017834e38bbd4.webp
/uploads/6b32cfe274ac4b548c8ce5d8ab7dee8b.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#3b82f6', 0, 'game', '', '', '', '2026-06-28 00:31:33', 'Repack Features
game is already cracked after installation (crack by Codex/Rune or Tenoke). Updated to version 1.03 (06.02.2026).
DLC: Hellfire Equipment Set, Scampuss Furball Netsuke Charm, Hellfrost Equipment Set, Infernal Weapons Set, Kodama Netsuke Charm, Season Pass, Chijiko Netsuke Charm, Kusanagi Netsuke Charm, Youngblood Armor, Lone Wolf’s Armor.

Upload size / to download: 58901MB
ISO image size: 58901MB (116444MB after installation)
Number of compressions: only one
Data recovery: none
Languages: English, French, Italian, German, Spanish, Portuguese-Brazil, Russian, Arabic, Japanese, Korean, Simplified Chinese, Traditional Chinese
Dubbing/Audio: English, Japanese', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;
INSERT INTO games (id, title, genre, rating, downloads, description, wallpaper_url, download_url, download_links, trailer_url, screenshots, os, processor, memory, graphics, storage, install_guide, color, is_new, type, developer, version, license_type, created_at, repack_features, download_manager_name, download_manager_url, usage_guide, troubleshooting, hypervisor_video_url, install_guide_text, install_video_url) VALUES (128, 'Samson', 'Action', 4.5, 0, 'Download Samson Elamigos Repack (PC) – free full game. Return to the gritty, unforgiving streets of Tyndalston in this high-stakes narrative action game where every decision carries a heavy price. Use the direct download to step into the boots of Samson as he navigates a city designed to break him, earning every escape through brutal combat and desperate maneuvers. With dangerous debt collectors holding his sister’s life in the balance, you must outrun the clock and outfight the underworld, proving that the only way out is to tear through the very people trying to keep you down in this intense story of survival and sacrifice.', '/uploads/7eace31d724c44de98d20b75ba5cebbe.webp', '', 'https://ffdl.cybar.to/a6ljwwgh64u3', 'https://youtu.be/Qh1qeHWYrbo?si=EEmAiX0RB3YgCVp8', '/uploads/a45cd86cbf864342a66950ef5804da1a.webp
/uploads/e96713d1d433444299f2c860aa630573.jpg
/uploads/7312a479fa2147a3b31a65aafcca8b5b.png
/uploads/2fe0a3fb7d5049d0a7f24075932e8002.webp', 'Windows 10/11 64-bit', 'Intel Core i5-8400', '16 GB RAM', 'GTX 1060 / RX 580', '45 GB available', '', '#09090b', 0, 'game', '', '', '', '2026-06-28 00:35:22', 'game is already cracked after installation (crack by Codex/Rune). Updated till 06.05.2026.

Upload size / to download: 10953MB
ISO image size: 10953MB
Number of compressions: only one
Data recovery: none
Languages: English, French, Italian, German, Spanish, Turkish
Dubbing/Audio: English', '', '', '', '', '', '', '') ON CONFLICT (id) DO NOTHING;

-- Export Movies
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (9, 'Michael 2026', 'Drama, Musical, History, Documentary', 2026, '2hrs 7mins', 4.5, 0, 'The early life of musician Michael Jackson, from the discovery of his talent as the lead of the Jackson Five to the artist whose creative ambition fueled a pursuit to become the biggest ente..', '/uploads/301ac68c78664438b1cac176d4ca161b.png', '', 'https://youtu.be/3zOLzsbOleM?si=mN73n6U6ttOhy4os', '', 'https://file-eu-par-2.gofile.io/download/web/6cccaade-d29a-4207-a788-1be24b4a0a8f/Michael.2026.1080p.WEBRip.x264.AAC5.1-YIFY.rar', '', '', 'Stars: Jaafar Jackson, Nia Long, Colman Domingo', '', 0, 0, '#f59e0b', 'movie', '2026-06-17 18:48:29') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (10, 'Mortal Kombat II 2026', 'Action, Adventure, Sci-Fi', 2026, '1hr 56mins', 4.6, 0, 'The fan favorite champions — now joined by Johnny Cage himself — are pitted against one another in the ultimate battle to defeat the dark rule of Shao Kahn that threatens the very existenc…', '/uploads/56388c3ff24049398b5845c715ecd546.jpg', '', 'https://youtu.be/o7mTgt8Cb80?si=jFYb7xQYosdSYDva', '', 'https://file-na-phx-1.gofile.io/download/web/702a9bd3-be00-4351-910d-48485dd0806b/Mortal.Kombat.II.2026.1080p.WEBRip.x264.AAC-YIFY.rar', '', '', 'Stars: Adeline Rudolph, Karl Urban, Martyn Ford', '', 0, 0, '#09090b', 'movie', '2026-06-17 19:15:19') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (11, 'Saccharine 2026', 'Drama, Horror, Sci-Fi', 2026, '1hr 53mins', 4.5, 0, 'Hana, a lovelorn medical student, becomes terrorized by a sinister force after taking part in an obscure weight loss craze: eating human ashes.', '/uploads/bb3c226a65d64de0abd7a60320a20738.webp', '', 'https://youtu.be/uIY13LD3RUY?si=IQRg_bcxLZ36uR8G', '', 'https://gofile.io/d/F9GLOb', '', '', 'Stars: Midori Francis, Danielle Macdonald, Madeleine Madden', '', 0, 0, '#db2777', 'movie', '2026-06-28 00:57:04') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (12, 'Tokyo Taxi 2025', 'Drama', 2025, '1hr 43mins', 4.5, 0, 'Japanese drama about a taxi driver and an 85-year-old woman on a day-long journey through Tokyo that changes their lives as she tells him about her past. This is a remake of the 2022 French ..', '/uploads/d9a2b58e88ae4fabbb5b2f1e7b50bae0.jpg', '', 'https://youtu.be/vYECkW7Xlow?si=oPqQ8t9GwQQXdEBk', '', 'https://gofile.io/d/M4o6vB', '', '', 'Stars: Chieko Baisho, Takuya Kimura, Lee Jun-young', '', 0, 0, '#ec4899', 'movie', '2026-06-28 00:59:34') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (13, 'Baahubali – Collection', 'Action, Drama', NULL, '', 4.5, 0, 'A legendary warrior emerges from humble beginnings to challenge powerful forces threatening his homeland, as ancient prophecies and family bonds shape his journey.', '/uploads/9ddeda9ff3464a978f26764e3bb66c74.jpg', '', 'https://youtu.be/22oYiWnAcKM?si=l85ETcXhIOGeUcV-', '', 'https://loadedfiles.org/1737e84421d543ce   
https://loadedfiles.org/d368ef20b58fbfa5    
https://loadedfiles.org/96f66ce470e64953/Baahubali.The.Epic.2025.1080.540p.x265.AAC.[9jaRocks.Com].mkv', '', '', 'Stars: Prabhas, Rana Daggubati, Anushka Shetty', '', 0, 0, '#18181b', 'movie', '2026-06-28 01:02:26') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (14, 'Citizen Vigilante 2026', 'Action', 2026, '1hr 29mins', 4.5, 0, 'A man takes justice into his own hands, hunting down criminals. His vigilante crusade makes him a social media star but puts him at odds with the local police chief.', '/uploads/e82b0804ba7a468ea18305010d8e7c4b.webp', '', 'https://youtu.be/gdIkevHmAb8?si=FPu3SHBayUWhc7aV', '', 'https://gofile.io/d/ThL8Uz', '', '', 'Stars: Armie Hammer, Costas Mandylor, Desiree Giogetti', '', 0, 0, '#dc2626', 'movie', '2026-06-28 01:05:02') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (15, 'Blades of the Guardians 2026', 'Action, Adventure', 2026, '2hrs 6mins', 4.5, 0, 'Dao Ma, a bounty hunter, takes a job to protect a man on the long road to the city of Chang’an. However, he discovers the person he is protecting is the empire’s most wanted bounty, Zhi Shi …', '/uploads/77c912fe74c84cbbacb6876af0c7239b.webp', '', 'https://youtu.be/pqaJDmeihoA?si=zVXPnf-bBS5jjoBc', '', 'https://cdn1.movieland.af/movies/2026/blades-of-the-guardians/blades-of-the-guardians-movieland.af.mp4', '', '', 'Stars: Jing Wu, Nicholas Tse, Yosh Yu', '', 0, 0, '#f97316', 'movie', '2026-06-28 01:07:10') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (16, 'I Love Boosters 2026', 'Comedy, Adventure, Crime, Drama', 2026, '1hr 53mins', 4.5, 0, 'A group of shoplifters take aim at a cutthroat fashion maven by stealing her clothes and reselling them at a lower price, what they call “fashion-forward philanthropy.”', '/uploads/11c3b0d1f4144e55a3b1745199ee12a8.webp', '', 'https://youtu.be/cO3MrHffZDA?si=IrubGaDTypoNvrM_', '', 'https://gofile.io/d/xxVR1u', '', '', '', '', 0, 0, '#c026d3', 'movie', '2026-06-28 01:09:33') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (17, 'Carolina Caroline 2025', 'Crime, Drama, Romance', 2025, '1hr 47mins', 4.5, 0, 'A young woman joins a charming con man on the run, leaving a trail of crime and passion as they hustle through the Southeast in search of her estranged mother.', '/uploads/20a3886d4c624242a7e05c6032c91836.webp', '', 'https://youtu.be/fNdC6SJ-TxY?si=T_iJMw3QxSqpcyno', '', 'https://gofile.io/d/r0Qvwn', '', '', 'Stars: Samara Weaving, Kyle Gallner, Kyra Sedgwick', '', 0, 0, '#eab308', 'movie', '2026-06-28 01:19:43') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (18, 'Deep Water 2026', 'Action, Drama, Horror', 2026, '1hr 46mins', 4.5, 0, 'A group of international passengers en route from Los Angeles to Shanghai are forced to make an emergency landing in shark-infested waters. Now they must work together in hopes to overcome t…', '/uploads/4ea3e12f2d444a4985fd012f82811d1b.webp', '', 'https://youtu.be/yHIV7BO1dkk?si=pwrH4_VaTH1Lms3w', '', 'https://gofile.io/d/bVT8WW', '', '', 'Stars: Aaron Eckhart, Ben Kingsley, Angus Sampson', '', 0, 0, '#3b82f6', 'movie', '2026-06-28 01:22:52') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (19, 'Your Fault London 2026', 'Drama, Romance', 2026, '2hrs 3mins', 4.5, 0, 'A forbidden love story between 18-year-old Noah and stepbrother Nick faces challenges as they pursue different paths – him in business, her at Oxford – while dealing with new relationships a…', '/uploads/0268f0fe47af4ec39f60ebafabc63c3f.webp', '', 'https://youtu.be/PWP_agMvKVw?si=x-6tMu1MhwQxJUjb', '', 'https://gofile.io/d/jHBOoy', '', '', 'Stars: Asha Banks, Matthew Broome, Ray Fearon', '', 0, 0, '#eab308', 'movie', '2026-06-28 01:24:40') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (20, 'Avengers Collection', 'Action, Sci-Fi', NULL, '', 4.5, 0, 'Earth’s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.', '/uploads/477151a6ca464cd5912e58a50edc4b17.webp', '', 'https://youtu.be/eOrNdBpGMv8?si=cr-tXPb0gWeN8Ew_', '', 'https://cinema-tika.com/pages/dln/3680ee73dd7be8c6fecf7ca51e4caf55/The.Avengers.2012.1080p.BrRip.cinematika.mkv


https://cinema-tika.com/pages/dln/62ade8df0f5c2bf0630863cca5394d54/Avengers_Age_of_Ultron_2015_1080p_BrRip_cinematika.mkv
https://cinema-tika.com/pages/dln/bc2e8363d9e2a244bd8b0e2b59a6381f/Avengers_Infinity_War_2018_1080p_BrRip_cinematika.mkv

https://cinema-tika.com/pages/dln/b9bf53b90342435136fe8e7f9c7a87b9/Avengers_Endgame_2019_720p_BrRip_cinematika.mkv', '', '', '', '', 0, 0, '#3b82f6', 'movie', '2026-06-28 01:26:43') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (21, 'Spider Man Collection', 'Action', NULL, '', 4.5, 0, 'Spider-Man** — Tobey Maguire, Andrew Garfield, Tom Holland
The live-action Spider-Man movies follow Peter Parker, a bright but ordinary teenager who gains incredible spider-like abilities after being bitten by a genetically engineered (or radioactive, depending on the series) spider. As Spider-Man, he struggles to balance school, friendships, family, and love while protecting New York City from dangerous villains.

Across the three live-action franchises, Peter learns that being a hero comes with sacrifice, responsibility, and difficult choices. The stories explore themes of courage, loss, identity, and doing the right thing even when it comes at a personal cost.

The series includes:  Spider-Man
Spider-Man 2
Spider-Man 3
The Amazing Spider-Man
The Amazing Spider-Man 2
Spider-Man: Homecoming
Spider-Man: Far From Home
Spider-Man: No Way Home', '/uploads/26f938b3471e4681929a588dc9981aa4.webp', '', 'https://youtu.be/rk-dF1lIbIg?si=0XzuRW_Yp_-PbOOm', '', 'https://cinema-tika.com/pages/dln/4036745895c7064f9fb027affc05cb09/Spider.Man.2002.REMASTERED.1080p.BluRay.mkv
https://cinema-tika.com/pages/dln/dbebf3fc55666b56ded0fccab331e530/Spider.Man.2.2004.1080p.BluRay.Proper.mkv
https://cinema-tika.com/pages/dln/33826da2792c5bb0c99b03312ba47587/Spider.Man.3.2007.1080p.BrRip.cinematika.mkv
https://cinema-tika.com/pages/dln/671692d7ba8c0184fc89c5ae38b05eab/The.Amazing.Spider.Man.2012.1080p.BrRip.cinematika.mkv
https://cinema-tika.com/pages/dln/e426cbbf52ff0dcf31dcec81adbf6373/The.Amazing.Spider.Man.2.2014.1080p.BrRip.cinematika.mkv
https://cinema-tika.com/pages/dln/c3a45751d376c0cfafb836e890e70913/Spider_Man_Homecoming_2017_1080p_BrRip_6CH_cinematika.mkv
https://cinema-tika.com/pages/dln/97c0725757420587dc46add2e9367886/Spider_Man_Far_From_Home_2019_720p_BrRip_cinematika.mkv
https://cinema-tika.com/pages/dln/6266842782b9eb26c5466660af8465e3/Spider.Man.No.Way.Home.2021.1080p.BrRip.cinematika.mkv', '', '', '', '', 0, 0, '#dc2626', 'movie', '2026-06-28 01:32:19') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (22, 'Thor collection', 'Action, Fantasy', NULL, '', 4.5, 0, 'The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders.', '/uploads/ddec1fffcbf24d408b7b11ac66292997.webp', '', 'https://youtu.be/Go8nTmfrQd8?si=CbjDC-7XygvPJGbw', '', 'https://cinema-tika.com/pages/dln/cb195560d55077dc98d9062da6edba0f/Thor.2011.1080p.BrRip.cinematika.mkv
https://cinema-tika.com/pages/dln/ffdd676fc185ed9ae7ef440b22f3e44f/Thor_The_Dark_World_2013_1080p_BrRip_cinematika.mkv
https://cinema-tika.com/pages/dln/8a474b18ba131bd238ebfc086d67c41e/Thor_Ragnarok_2017_1080p_BrRip_cinematika.mkv
https://cinema-tika.com/pages/dln/d290dc12e6033e970bf3f0a99a90d190/Thor.Love.and.Thunder.2022.IMAX.1080p.WEB-DL.cinematika.mkv', '', '', 'Stars: Chris Hemsworth, Anthony Hopkins, Natalie Portman', '', 0, 0, '#84cc16', 'movie', '2026-06-28 01:34:58') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (23, 'Iron Man Collection', 'Action, Sci-Fi, Adventure', NULL, '', 4.5, 0, 'After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.', '/uploads/22104951caae4ab5a0a9179d1bb10893.webp', '', 'https://youtu.be/t86sKsR4pnk?si=1qHivMdpIeoDhLrd', '', 'https://cinema-tika.com/pages/dln/fbfeb90e020749f4d0632d006295d2c3/Iron.Man.2008.1080p.BluRay.mkv
https://cinema-tika.com/pages/dln/37a27516196b6109b2085114ef5d950e/Iron.Man.2.2010.1080p.Ganool.mkv
https://cinema-tika.com/pages/dln/bd380acb9f7f8709d287ba9131e9aa4d/Iron.Man.3.2013.1080p.BrRip.cinematika.mkv', '', '', 'Stars: Robert Downey Jr., Guy Pierce, Gwyneth Paltrow', '', 0, 0, '#ef4444', 'movie', '2026-06-28 01:37:18') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (24, 'hulk collection', 'Action, Sci-Fi', NULL, '', 4.5, 0, 'Bruce Banner, a genetics researcher with a tragic past, suffers a lab accident that makes him transform into a raging, giant green monster when angered, making him a target of forces seeking to abuse his power.', '/uploads/f5218660423c4084b3c92995de0f4041.jpg', '', 'https://youtu.be/xbqNb2PFKKA?si=OkEYs53frMnoJ9gm', '', 'https://cinema-tika.com/pages/dln/9bb620af0d45e10107af25ed43871243/Hulk.2003.1080p.BrRip.cinematika.mkv
https://cinema-tika.com/pages/dln/99275f08cb4b335783ae22a7c9356899/The.Incredible.Hulk.2008.1080p.BluRay.mkv', '', '', '', '', 0, 0, '#16a34a', 'movie', '2026-06-28 01:39:35') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (25, 'Black Panther 2018', 'Action, Adventure, Sci-Fi', 2018, '2hrs 14mins', 4.5, 0, 'T’Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country’s past.', '/uploads/22bf340a84a74b09ac62f9fdbeca7077.jpg', '', 'https://youtu.be/Hg4h_f4Hj4k?si=IAee2xbwrwNLWEm6', '', 'https://cinema-tika.com/pages/dln/9c57bc30cc5791281c811a32b7ae7160/Black.Panther.2018.1080p.BrRip.cinematika.mkv', '', '', 'Stars: Chadwick Boseman, Michael B. Jordan, Lupita Nyong’o', '', 0, 0, '#06b6d4', 'movie', '2026-06-28 01:41:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (26, 'Black Panther Wakanda Forever 2022', 'Action, Adventure, Sci-Fi', 2022, '2hrs 41mins', 4.5, 0, 'The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T’Challa.', '/uploads/0eea35bd452d4f87bb39c61e7b77e6c6.webp', '', 'https://youtu.be/_Z3QKkl1WyM?si=qxSEXG8on4-hzavb', '', 'https://cinema-tika.com/pages/dln/7af4f9232c6fec7860e80d71c69969df/Black_Panther_Wakanda_Forever_2022_IMAX_1080p_WEB-DL_cinematika.mkv', '', '', 'Stars: Leticia Wright, Lupita Nyong’o, Danai Gurira', '', 0, 0, '#3b82f6', 'movie', '2026-06-28 01:44:04') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (27, 'Kraven the Hunter 2024', 'Action, Thriller', 2024, '2hrs 7 mins', 4.5, 0, 'Kraven’s complex relationship with his ruthless father, Nikolai Kravinoff, starts him down a path of vengeance with brutal consequences, motivating him to become not only the greatest hunter in the world, but also one of its most feared.', '/uploads/6c023d9fad384f8abfeabfb24d6ce001.jpg', '', 'https://youtu.be/rze8QYwWGMs?si=Yxmr5aRpytcxHOD6', '', 'https://ds16.30namachi66.click/movies/2024/Kraven.The.Hunter.2024/Kraven.The.Hunter.2024.1080p.WEBRip.1400MB.DD5.1.x264-GalaxyRG.mkv', '', '', 'Stars: Aaron Taylor-Johnson, Ariana DeBose, Fred Hechinger', '', 0, 0, '#f59e0b', 'movie', '2026-06-28 01:46:18') ON CONFLICT (id) DO NOTHING;
INSERT INTO movies (id, title, genre, year, duration, rating, downloads, description, poster_url, backdrop_url, trailer_url, video_url, download_links, screenshots, director, cast_name, series_name, season, episode, color, type, created_at) VALUES (28, 'Mufasa The Lion King 2024', 'Adventure, Animation', 2024, '1hr 58mins', 4.5, 0, 'Mufasa, a cub lost and alone, meets a sympathetic lion named Taka, the heir to a royal bloodline. The chance meeting sets in motion an expansive journey of a group of misfits searching for their destiny.', '/uploads/b4d33fe7f52945baafb601884f8c0bcb.webp', '', 'https://youtu.be/o17MF9vnabg?si=SbAjMhIAAhkWI84z', '', 'https://dl1.dl-bcmovie1.xyz/movie/2024/tt13186482/Mufasa.The.Lion.King.2024.1080p.WEB-DL.6CH.YIFY.BcMovie.mkv', '', '', 'Stars: Aaron Pierre, Kelvin Harrison Jr., Tiffany Boone', '', 0, 0, '#f97316', 'movie', '2026-06-28 01:49:10') ON CONFLICT (id) DO NOTHING;

-- Export Comments
INSERT INTO comments (id, game_id, user_id, text, created_at) VALUES (1, 18, 2, 'wow', '2026-06-17 19:00:37') ON CONFLICT (id) DO NOTHING;
INSERT INTO comments (id, game_id, user_id, text, created_at) VALUES (3, 38, 2, 'WOW', '2026-06-23 01:58:01') ON CONFLICT (id) DO NOTHING;
-- Skipped 1 comments referencing non-existent games

-- Export Ratings
-- Skipped 0 ratings referencing non-existent games

-- Export Favorites
-- Skipped 0 favorites referencing non-existent games

-- Export Tokens
INSERT INTO tokens (id, user_id, token, created_at) VALUES (9, 1, 'db0d0965f3b0f148f44138f25910cc7dfb92f9f4d2f2ecdde170e7c663569689', '2026-06-16 14:31:32') ON CONFLICT (id) DO NOTHING;
INSERT INTO tokens (id, user_id, token, created_at) VALUES (22, 9, 'd0abd6bd54d8cc212369e4880b401fdb85d257460a7e20b284f627c2fc26b660', '2026-06-25 01:45:39') ON CONFLICT (id) DO NOTHING;
INSERT INTO tokens (id, user_id, token, created_at) VALUES (23, 2, 'ef4d1dbb34626c369bb485243c0e2cb3e2a94d3a321263dd957ba3a8c716c1fc', '2026-06-25 01:45:56') ON CONFLICT (id) DO NOTHING;
INSERT INTO tokens (id, user_id, token, created_at) VALUES (24, 10, '26e06bf63f2ab8da96c409997b3a1cb12cabb4eb9f0b8c75d7de5bdc4729e343', '2026-06-25 09:24:06') ON CONFLICT (id) DO NOTHING;

-- Export Activity Log
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (1, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man: Miles Morales', 59, '2026-06-21 22:05:20') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (2, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man: Miles Morales', 59, '2026-06-21 22:05:20') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (3, NULL, 'Guest', 'viewed', 'movie', 'Ocean''s Quest', 3, '2026-06-21 22:10:42') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (4, NULL, 'Guest', 'viewed', 'movie', 'Ocean''s Quest', 3, '2026-06-21 22:10:42') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (5, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-21 22:12:37') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (6, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-21 22:12:37') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (7, NULL, 'Guest', 'viewed', 'movie', 'Michael 2026', 9, '2026-06-21 22:48:38') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (8, NULL, 'Guest', 'viewed', 'movie', 'Michael 2026', 9, '2026-06-21 22:48:38') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (9, NULL, 'Guest', 'viewed', 'game', 'Assassin’s Creed Valhalla: Complete Edition v1.7.0 + All DLCs', 21, '2026-06-23 00:45:05') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (10, NULL, 'Guest', 'viewed', 'game', 'Assassin’s Creed Valhalla: Complete Edition v1.7.0 + All DLCs', 21, '2026-06-23 00:45:05') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (11, NULL, 'Guest', 'viewed', 'game', 'Assassin’s Creed Valhalla: Complete Edition v1.7.0 + All DLCs', 21, '2026-06-23 00:45:42') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (12, NULL, 'Guest', 'viewed', 'game', 'Assassin’s Creed: Odyssey v1.5.6 + DLCs', 22, '2026-06-23 00:48:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (13, NULL, 'Guest', 'viewed', 'game', 'Assassin’s Creed: Odyssey v1.5.6 + DLCs', 22, '2026-06-23 00:48:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (14, NULL, 'Guest', 'viewed', 'game', 'Assassin’s Creed: Odyssey v1.5.6 + DLCs', 22, '2026-06-23 00:49:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (15, NULL, 'Guest', 'viewed', 'game', 'Assassin’s Creed: Odyssey v1.5.6 + DLCs', 22, '2026-06-23 00:49:31') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (16, NULL, 'Guest', 'viewed', 'game', 'Assassin’s Creed: Odyssey v1.5.6 + DLCs', 22, '2026-06-23 00:49:32') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (17, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 22, '2026-06-23 00:49:35') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (18, NULL, 'Guest', 'viewed', 'game', 'God of War Ragnarök Digital Deluxe Edition', 55, '2026-06-23 00:50:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (19, NULL, 'Guest', 'viewed', 'game', 'God of War Ragnarök Digital Deluxe Edition', 55, '2026-06-23 00:50:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (20, NULL, 'Guest', 'viewed', 'game', 'God of War Ragnarök Digital Deluxe Edition', 55, '2026-06-23 00:50:36') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (21, NULL, 'Guest', 'viewed', 'game', 'Grand Theft Auto V Enhanced', 56, '2026-06-23 00:51:13') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (22, NULL, 'Guest', 'viewed', 'game', 'Grand Theft Auto V Enhanced', 56, '2026-06-23 00:51:13') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (23, NULL, 'Guest', 'viewed', 'game', 'Grand Theft Auto V Enhanced', 56, '2026-06-23 00:51:26') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (24, NULL, 'Guest', 'viewed', 'game', 'Cyberpunk 2077    (v2.31)', 50, '2026-06-23 00:52:40') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (25, NULL, 'Guest', 'viewed', 'game', 'Cyberpunk 2077    (v2.31)', 50, '2026-06-23 00:52:40') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (26, NULL, 'Guest', 'viewed', 'game', 'Cyberpunk 2077    (v2.31)', 50, '2026-06-23 00:52:53') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (27, NULL, 'Guest', 'viewed', 'game', 'Dragons Dogma 2 (2024) ALL DLC  HV', 51, '2026-06-23 00:53:38') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (28, NULL, 'Guest', 'viewed', 'game', 'Dragons Dogma 2 (2024) ALL DLC  HV', 51, '2026-06-23 00:53:38') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (29, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 51, '2026-06-23 00:53:45') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (30, NULL, 'Guest', 'viewed', 'game', 'God of War 1', 54, '2026-06-23 00:54:09') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (31, NULL, 'Guest', 'viewed', 'game', 'God of War 1', 54, '2026-06-23 00:54:09') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (32, NULL, 'Guest', 'viewed', 'game', 'God of War 1', 54, '2026-06-23 00:54:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (33, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 54, '2026-06-23 00:54:25') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (34, NULL, 'Guest', 'viewed', 'game', 'Ghost Of Tsushima DIRECTOR’S CUT', 53, '2026-06-23 00:54:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (35, NULL, 'Guest', 'viewed', 'game', 'Ghost Of Tsushima DIRECTOR’S CUT', 53, '2026-06-23 00:54:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (36, NULL, 'Guest', 'viewed', 'game', 'Ghost Of Tsushima DIRECTOR’S CUT', 53, '2026-06-23 00:55:03') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (37, NULL, 'Guest', 'viewed', 'game', 'Far Cry New Dawn (2019) ALL DLC +  HD Textures Pack [Hypervisor', 52, '2026-06-23 00:55:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (38, NULL, 'Guest', 'viewed', 'game', 'Far Cry New Dawn (2019) ALL DLC +  HD Textures Pack [Hypervisor', 52, '2026-06-23 00:55:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (39, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 52, '2026-06-23 00:57:16') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (40, NULL, 'Guest', 'viewed', 'game', 'Far Cry 6 Ultimate Edition Free', 92, '2026-06-23 00:57:28') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (41, NULL, 'Guest', 'viewed', 'game', 'Far Cry 6 Ultimate Edition Free', 92, '2026-06-23 00:57:28') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (42, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 92, '2026-06-23 00:57:32') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (43, NULL, 'Guest', 'viewed', 'game', 'Far Cry 6 Ultimate Edition Free', 92, '2026-06-23 00:58:04') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (44, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 92, '2026-06-23 00:58:07') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (45, NULL, 'Guest', 'viewed', 'game', 'Far Cry New Dawn (2019) ALL DLC +  HD Textures Pack [Hypervisor', 52, '2026-06-23 00:58:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (46, NULL, 'Guest', 'viewed', 'game', 'Far Cry New Dawn (2019) ALL DLC +  HD Textures Pack [Hypervisor', 52, '2026-06-23 00:58:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (47, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 52, '2026-06-23 00:58:28') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (48, NULL, 'Guest', 'viewed', 'game', 'Watch Dogs Digital Deluxe', 96, '2026-06-23 00:59:16') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (49, NULL, 'Guest', 'viewed', 'game', 'Watch Dogs Digital Deluxe', 96, '2026-06-23 00:59:16') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (50, NULL, 'Guest', 'viewed', 'game', 'Watch Dogs Digital Deluxe', 96, '2026-06-23 00:59:29') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (51, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man Remastered', 91, '2026-06-23 00:59:54') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (52, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man Remastered', 91, '2026-06-23 00:59:54') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (53, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man Remastered', 91, '2026-06-23 01:02:10') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (54, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man Remastered', 91, '2026-06-23 01:02:10') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (55, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man Remastered', 91, '2026-06-23 01:02:25') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (56, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man: Miles Morales', 59, '2026-06-23 01:02:42') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (57, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man: Miles Morales', 59, '2026-06-23 01:02:42') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (58, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider-Man: Miles Morales', 59, '2026-06-23 01:02:53') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (59, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider Man 2', 63, '2026-06-23 01:03:38') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (60, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider Man 2', 63, '2026-06-23 01:03:38') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (61, NULL, 'Guest', 'viewed', 'game', 'Marvel’s Spider Man 2', 63, '2026-06-23 01:03:52') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (62, NULL, 'Guest', 'viewed', 'game', 'The Last of Us Part I', 64, '2026-06-23 01:04:10') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (63, NULL, 'Guest', 'viewed', 'game', 'The Last of Us Part I', 64, '2026-06-23 01:04:10') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (64, NULL, 'Guest', 'viewed', 'game', 'The Last of Us Part I', 64, '2026-06-23 01:04:25') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (65, NULL, 'Guest', 'viewed', 'game', 'The Last of Us Part II Remastered', 95, '2026-06-23 01:04:43') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (66, NULL, 'Guest', 'viewed', 'game', 'The Last of Us Part II Remastered', 95, '2026-06-23 01:04:43') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (67, NULL, 'Guest', 'viewed', 'game', 'The Last of Us Part II Remastered', 95, '2026-06-23 01:04:55') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (68, NULL, 'Guest', 'viewed', 'game', 'UNCHARTED: Legacy of Thieves Collection', 65, '2026-06-23 01:05:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (69, NULL, 'Guest', 'viewed', 'game', 'UNCHARTED: Legacy of Thieves Collection', 65, '2026-06-23 01:05:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (70, NULL, 'Guest', 'viewed', 'game', 'UNCHARTED: Legacy of Thieves Collection', 65, '2026-06-23 01:06:56') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (71, NULL, 'Guest', 'viewed', 'game', 'UNCHARTED: Legacy of Thieves Collection', 65, '2026-06-23 01:06:56') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (72, NULL, 'Guest', 'viewed', 'game', 'HYPERVISOR  EA SPORTS FC 26', 17, '2026-06-23 01:07:02') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (73, NULL, 'Guest', 'viewed', 'game', 'HYPERVISOR  EA SPORTS FC 26', 17, '2026-06-23 01:07:03') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (74, NULL, 'Guest', 'viewed', 'game', 'UNCHARTED: Legacy of Thieves Collection', 65, '2026-06-23 01:07:27') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (75, NULL, 'Guest', 'viewed', 'game', 'UNCHARTED: Legacy of Thieves Collection', 65, '2026-06-23 01:07:27') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (76, NULL, 'Guest', 'viewed', 'game', 'UNCHARTED: Legacy of Thieves Collection', 65, '2026-06-23 01:07:42') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (77, NULL, 'Guest', 'viewed', 'game', 'Need for Speed Heat Deluxe Edition', 93, '2026-06-23 01:08:09') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (78, NULL, 'Guest', 'viewed', 'game', 'Need for Speed Heat Deluxe Edition', 93, '2026-06-23 01:08:09') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (79, NULL, 'Guest', 'viewed', 'game', 'Need for Speed Heat Deluxe Edition', 93, '2026-06-23 01:08:25') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (80, NULL, 'Guest', 'viewed', 'game', 'Elden Ring Deluxe Edition', 94, '2026-06-23 01:08:46') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (81, NULL, 'Guest', 'viewed', 'game', 'Elden Ring Deluxe Edition', 94, '2026-06-23 01:08:46') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (82, NULL, 'Guest', 'viewed', 'game', 'Elden Ring Deluxe Edition', 94, '2026-06-23 01:09:01') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (83, NULL, 'Guest', 'viewed', 'game', 'Forza Horizon 5 Premium Edition', 97, '2026-06-23 01:09:35') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (84, NULL, 'Guest', 'viewed', 'game', 'Forza Horizon 5 Premium Edition', 97, '2026-06-23 01:09:35') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (85, NULL, 'Guest', 'viewed', 'game', 'Forza Horizon 5 Premium Edition', 97, '2026-06-23 01:09:48') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (86, NULL, 'Guest', 'viewed', 'game', 'Forza Horizon 6 v354.221 + 10 DLCs + Multiplayer', 47, '2026-06-23 01:10:00') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (87, NULL, 'Guest', 'viewed', 'game', 'Forza Horizon 6 v354.221 + 10 DLCs + Multiplayer', 47, '2026-06-23 01:10:00') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (88, NULL, 'Guest', 'viewed', 'game', 'Hogwarts Legacy Deluxe Edition', 99, '2026-06-23 01:10:20') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (89, NULL, 'Guest', 'viewed', 'game', 'Hogwarts Legacy Deluxe Edition', 99, '2026-06-23 01:10:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (90, NULL, 'Guest', 'viewed', 'game', 'Hogwarts Legacy Deluxe Edition', 99, '2026-06-23 01:10:50') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (91, NULL, 'Guest', 'viewed', 'game', 'Baldur’s Gate 3', 100, '2026-06-23 01:11:05') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (92, NULL, 'Guest', 'viewed', 'game', 'Baldur’s Gate 3', 100, '2026-06-23 01:11:05') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (93, NULL, 'Guest', 'viewed', 'game', 'Baldur’s Gate 3', 100, '2026-06-23 01:11:16') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (94, NULL, 'Guest', 'viewed', 'game', 'Sekiro: Shadows Die Twice', 101, '2026-06-23 01:11:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (95, NULL, 'Guest', 'viewed', 'game', 'Sekiro: Shadows Die Twice', 101, '2026-06-23 01:11:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (96, NULL, 'Guest', 'viewed', 'game', 'Sekiro: Shadows Die Twice', 101, '2026-06-23 01:11:51') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (97, NULL, 'Guest', 'viewed', 'game', 'Red Dead Redemption', 102, '2026-06-23 01:12:09') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (98, NULL, 'Guest', 'viewed', 'game', 'Red Dead Redemption', 102, '2026-06-23 01:12:09') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (99, NULL, 'Guest', 'viewed', 'game', 'Red Dead Redemption', 102, '2026-06-23 01:12:19') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (100, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 102, '2026-06-23 01:12:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (101, NULL, 'Guest', 'viewed', 'game', 'Forza Horizon 4', 104, '2026-06-23 01:12:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (102, NULL, 'Guest', 'viewed', 'game', 'Forza Horizon 4', 104, '2026-06-23 01:12:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (103, NULL, 'Guest', 'viewed', 'game', 'Forza Horizon 4', 104, '2026-06-23 01:12:58') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (104, NULL, 'Guest', 'viewed', 'game', 'HITMAN 3 Free', 105, '2026-06-23 01:13:13') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (105, NULL, 'Guest', 'viewed', 'game', 'HITMAN 3 Free', 105, '2026-06-23 01:13:13') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (106, NULL, 'Guest', 'viewed', 'game', 'HITMAN 3 Free', 105, '2026-06-23 01:13:22') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (107, NULL, 'Guest', 'viewed', 'game', 'HITMAN 3 Free', 105, '2026-06-23 01:13:50') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (108, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Black Ops II', 98, '2026-06-23 01:14:07') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (109, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Black Ops II', 98, '2026-06-23 01:14:07') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (110, NULL, 'Guest', 'viewed', 'game', 'ActionAdventureHorrorShootersSurvival Call of Duty: Black Ops III', 106, '2026-06-23 01:14:34') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (111, NULL, 'Guest', 'viewed', 'game', 'ActionAdventureHorrorShootersSurvival Call of Duty: Black Ops III', 106, '2026-06-23 01:14:34') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (112, NULL, 'Guest', 'viewed', 'game', 'ActionAdventureHorrorShootersSurvival Call of Duty: Black Ops III', 106, '2026-06-23 01:14:43') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (113, NULL, 'Guest', 'viewed', 'game', 'ELDEN RING NIGHTREIGN', 108, '2026-06-23 01:14:59') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (114, NULL, 'Guest', 'viewed', 'game', 'ELDEN RING NIGHTREIGN', 108, '2026-06-23 01:14:59') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (115, NULL, 'Guest', 'viewed', 'game', 'ELDEN RING NIGHTREIGN', 108, '2026-06-23 01:15:14') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (116, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 108, '2026-06-23 01:15:16') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (117, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 108, '2026-06-23 01:15:27') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (118, NULL, 'Guest', 'viewed', 'game', 'Call of Duty WWII', 109, '2026-06-23 01:15:50') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (119, NULL, 'Guest', 'viewed', 'game', 'Call of Duty WWII', 109, '2026-06-23 01:15:50') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (120, NULL, 'Guest', 'viewed', 'game', 'Call of Duty WWII', 109, '2026-06-23 01:16:00') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (121, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 109, '2026-06-23 01:16:03') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (122, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Modern Warfare 2019', 112, '2026-06-23 01:16:51') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (123, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Modern Warfare 2019', 112, '2026-06-23 01:16:51') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (124, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Modern Warfare 2019', 112, '2026-06-23 01:17:07') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (125, NULL, 'Guest', 'viewed', 'game', 'TEKKEN 8', 111, '2026-06-23 01:17:20') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (126, NULL, 'Guest', 'viewed', 'game', 'TEKKEN 8', 111, '2026-06-23 01:17:20') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (127, NULL, 'Guest', 'viewed', 'game', 'TEKKEN 8', 111, '2026-06-23 01:17:28') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (128, NULL, 'Guest', 'viewed', 'game', 'Need for Speed Most Wanted Limited Edition', 114, '2026-06-23 01:17:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (129, NULL, 'Guest', 'viewed', 'game', 'Need for Speed Most Wanted Limited Edition', 114, '2026-06-23 01:17:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (130, NULL, 'Guest', 'viewed', 'game', 'Need for Speed Most Wanted Limited Edition', 114, '2026-06-23 01:17:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (131, NULL, 'Guest', 'viewed', 'game', 'Mortal Kombat 11', 115, '2026-06-23 01:18:01') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (132, NULL, 'Guest', 'viewed', 'game', 'Mortal Kombat 11', 115, '2026-06-23 01:18:01') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (133, NULL, 'Guest', 'viewed', 'game', 'Mortal Kombat 11', 115, '2026-06-23 01:19:05') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (134, NULL, 'Guest', 'viewed', 'game', 'Tomb Raider Definitive Edition', 116, '2026-06-23 01:19:33') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (135, NULL, 'Guest', 'viewed', 'game', 'Tomb Raider Definitive Edition', 116, '2026-06-23 01:19:33') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (136, NULL, 'Guest', 'viewed', 'game', 'Tomb Raider Definitive Edition', 116, '2026-06-23 01:19:42') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (137, NULL, 'Guest', 'viewed', 'game', 'NieR:Automata', 117, '2026-06-23 01:19:56') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (138, NULL, 'Guest', 'viewed', 'game', 'NieR:Automata', 117, '2026-06-23 01:19:57') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (139, NULL, 'Guest', 'viewed', 'game', 'NieR:Automata', 117, '2026-06-23 01:20:07') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (140, NULL, 'Guest', 'viewed', 'game', 'Sleeping Dogs: Definitive Edition', 118, '2026-06-23 01:20:26') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (141, NULL, 'Guest', 'viewed', 'game', 'Sleeping Dogs: Definitive Edition', 118, '2026-06-23 01:20:26') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (142, NULL, 'Guest', 'viewed', 'game', 'Sleeping Dogs: Definitive Edition', 118, '2026-06-23 01:20:35') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (143, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Modern Warfare II [v9.7 (Campaign) | v9.40 (Multiplayer]', 49, '2026-06-23 01:20:58') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (144, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Modern Warfare II [v9.7 (Campaign) | v9.40 (Multiplayer]', 49, '2026-06-23 01:20:58') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (145, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Modern Warfare II [v9.7 (Campaign) | v9.40 (Multiplayer]', 49, '2026-06-23 01:21:08') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (146, NULL, 'Guest', 'viewed', 'game', 'FINAL FANTASY XVI', 120, '2026-06-23 01:21:31') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (147, NULL, 'Guest', 'viewed', 'game', 'FINAL FANTASY XVI', 120, '2026-06-23 01:21:31') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (148, NULL, 'Guest', 'viewed', 'game', 'FINAL FANTASY XVI', 120, '2026-06-23 01:22:10') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (149, NULL, 'Guest', 'viewed', 'game', 'FINAL FANTASY XVI', 120, '2026-06-23 01:22:10') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (150, NULL, 'Guest', 'viewed', 'game', 'FINAL FANTASY XVI', 120, '2026-06-23 01:22:25') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (151, NULL, 'Guest', 'viewed', 'game', 'FIFA 23 Ultimate Edition', 103, '2026-06-23 01:22:46') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (152, NULL, 'Guest', 'viewed', 'game', 'FIFA 23 Ultimate Edition', 103, '2026-06-23 01:22:46') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (153, NULL, 'Guest', 'viewed', 'game', 'FIFA 23 Ultimate Edition', 103, '2026-06-23 01:23:07') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (154, NULL, 'Guest', 'viewed', 'game', 'Watch Dogs 2', 66, '2026-06-23 01:23:33') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (155, NULL, 'Guest', 'viewed', 'game', 'Watch Dogs 2', 66, '2026-06-23 01:23:33') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (156, NULL, 'Guest', 'viewed', 'game', 'Watch Dogs 2', 66, '2026-06-23 01:23:48') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (157, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Black Ops II', 98, '2026-06-23 01:24:05') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (158, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Black Ops II', 98, '2026-06-23 01:24:05') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (159, NULL, 'Guest', 'viewed', 'game', 'Call of Duty: Black Ops II', 98, '2026-06-23 01:24:13') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (160, NULL, 'Guest', 'viewed', 'game', 'Devil May Cry 5', 107, '2026-06-23 01:24:28') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (161, NULL, 'Guest', 'viewed', 'game', 'Devil May Cry 5', 107, '2026-06-23 01:24:28') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (162, NULL, 'Guest', 'viewed', 'game', 'Devil May Cry 5', 107, '2026-06-23 01:24:36') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (163, NULL, 'Guest', 'viewed', 'movie', 'Michael 2026', 9, '2026-06-23 01:57:29') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (164, NULL, 'Guest', 'viewed', 'movie', 'Michael 2026', 9, '2026-06-23 01:57:29') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (165, NULL, 'Guest', 'viewed', 'game', 'Adobe Photoshop 2026 v27.7.0.11', 38, '2026-06-23 01:57:53') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (166, NULL, 'Guest', 'viewed', 'game', 'Adobe Photoshop 2026 v27.7.0.11', 38, '2026-06-23 01:57:54') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (167, NULL, 'Guest', 'viewed', 'game', 'Adobe Photoshop 2026 v27.7.0.11', 38, '2026-06-23 01:58:01') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (168, NULL, 'Guest', 'viewed', 'game', 'VLC Media Player (64-bit)', 42, '2026-06-23 10:40:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (169, NULL, 'Guest', 'viewed', 'game', 'VLC Media Player (64-bit)', 42, '2026-06-23 10:40:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (170, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 42, '2026-06-23 10:40:28') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (171, NULL, 'Guest', 'viewed', 'game', 'VirtualDJ', 88, '2026-06-23 10:40:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (172, NULL, 'Guest', 'viewed', 'game', 'VirtualDJ', 88, '2026-06-23 10:40:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (173, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 88, '2026-06-23 10:40:57') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (174, NULL, 'Guest', 'viewed', 'game', 'Java JDK 26', 81, '2026-06-23 10:41:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (175, NULL, 'Guest', 'viewed', 'game', 'Java JDK 26', 81, '2026-06-23 10:41:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (176, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 81, '2026-06-23 10:41:28') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (177, NULL, 'Guest', 'viewed', 'game', 'Java JDK 26', 81, '2026-06-23 10:41:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (178, NULL, 'Guest', 'viewed', 'game', 'MySQL Workbench', 83, '2026-06-23 10:42:12') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (179, NULL, 'Guest', 'viewed', 'game', 'MySQL Workbench', 83, '2026-06-23 10:42:12') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (180, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 83, '2026-06-23 10:42:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (181, NULL, 'Guest', 'viewed', 'game', 'WinRAR v7.22 Final', 39, '2026-06-23 11:34:58') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (182, NULL, 'Guest', 'viewed', 'game', 'WinRAR v7.22 Final', 39, '2026-06-23 11:34:58') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (183, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 39, '2026-06-23 11:35:04') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (184, NULL, 'Guest', 'viewed', 'game', 'VirtualDJ', 88, '2026-06-23 12:53:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (185, NULL, 'Guest', 'viewed', 'game', 'VirtualDJ', 88, '2026-06-23 12:53:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (186, NULL, 'Guest', 'viewed', 'game', 'VirtualDJ', 88, '2026-06-23 12:53:59') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (187, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 88, '2026-06-23 12:54:01') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (188, NULL, 'Guest', 'viewed', 'game', 'MySQL Workbench', 83, '2026-06-23 13:08:06') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (189, NULL, 'Guest', 'viewed', 'game', 'MySQL Workbench', 83, '2026-06-23 13:08:06') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (190, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 83, '2026-06-23 13:08:16') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (191, NULL, 'Guest', 'viewed', 'game', 'MySQL Workbench', 83, '2026-06-23 13:08:25') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (192, NULL, 'Guest', 'viewed', 'game', 'MySQL Workbench', 83, '2026-06-23 13:08:33') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (193, NULL, 'Guest', 'viewed', 'game', 'VirtualDJ', 88, '2026-06-23 13:09:20') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (194, NULL, 'Guest', 'viewed', 'game', 'VirtualDJ', 88, '2026-06-23 13:09:20') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (195, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 88, '2026-06-23 13:09:23') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (196, NULL, 'Guest', 'viewed', 'game', 'Java JDK 26', 81, '2026-06-23 13:09:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (197, NULL, 'Guest', 'viewed', 'game', 'Java JDK 26', 81, '2026-06-23 13:09:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (198, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 81, '2026-06-23 13:09:53') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (199, NULL, 'Guest', 'viewed', 'game', '3uTools 9.06.006', 67, '2026-06-23 13:10:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (200, NULL, 'Guest', 'viewed', 'game', '3uTools 9.06.006', 67, '2026-06-23 13:10:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (201, NULL, 'Guest', 'viewed', 'game', '3uTools 9.06.006', 67, '2026-06-23 13:11:01') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (202, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 67, '2026-06-23 13:11:05') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (203, NULL, 'Guest', 'viewed', 'game', 'Anaconda', 72, '2026-06-23 13:11:34') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (204, NULL, 'Guest', 'viewed', 'game', 'Anaconda', 72, '2026-06-23 13:11:34') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (205, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 72, '2026-06-23 13:11:44') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (206, NULL, 'Guest', 'viewed', 'game', 'Anaconda', 72, '2026-06-23 13:12:31') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (207, NULL, 'Guest', 'viewed', 'game', 'Anaconda', 72, '2026-06-23 13:12:38') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (208, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 72, '2026-06-23 13:12:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (209, NULL, 'Guest', 'viewed', 'game', 'Canva 1.122.0', 75, '2026-06-23 13:15:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (210, NULL, 'Guest', 'viewed', 'game', 'Canva 1.122.0', 75, '2026-06-23 13:15:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (211, NULL, 'Guest', 'viewed', 'game', 'Canva 1.122.0', 75, '2026-06-23 13:16:14') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (212, NULL, 'Guest', 'viewed', 'game', 'Canva 1.122.0', 75, '2026-06-23 13:16:43') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (213, NULL, 'Guest', 'viewed', 'game', 'Blender', 74, '2026-06-23 13:17:45') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (214, NULL, 'Guest', 'viewed', 'game', 'Blender', 74, '2026-06-23 13:17:45') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (215, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 74, '2026-06-23 13:17:49') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (216, NULL, 'Guest', 'viewed', 'game', 'AutoCAD 2026', 73, '2026-06-23 13:19:16') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (217, NULL, 'Guest', 'viewed', 'game', 'AutoCAD 2026', 73, '2026-06-23 13:19:16') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (218, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 73, '2026-06-23 13:20:26') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (219, NULL, 'Guest', 'viewed', 'game', 'AutoCAD 2026', 73, '2026-06-23 13:20:42') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (220, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 73, '2026-06-23 13:21:14') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (221, NULL, 'Guest', 'viewed', 'game', 'CapCut v5.7.0 PC (Pre-Activated)', 76, '2026-06-23 13:23:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (222, NULL, 'Guest', 'viewed', 'game', 'CapCut v5.7.0 PC (Pre-Activated)', 76, '2026-06-23 13:23:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (223, NULL, 'Guest', 'viewed', 'game', 'CapCut v5.7.0 PC (Pre-Activated)', 76, '2026-06-23 13:23:33') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (224, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 76, '2026-06-23 13:24:25') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (225, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 76, '2026-06-23 13:24:51') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (226, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 76, '2026-06-23 13:25:05') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (227, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 76, '2026-06-23 13:25:06') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (228, NULL, 'Guest', 'viewed', 'game', 'CapCut v5.7.0 PC (Pre-Activated)', 76, '2026-06-23 13:25:35') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (229, NULL, 'Guest', 'viewed', 'game', 'ChatGPT', 77, '2026-06-23 13:26:52') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (230, NULL, 'Guest', 'viewed', 'game', 'ChatGPT', 77, '2026-06-23 13:26:52') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (231, NULL, 'Guest', 'viewed', 'game', 'ChatGPT', 77, '2026-06-23 13:27:39') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (232, NULL, 'Guest', 'viewed', 'game', 'ChatGPT', 77, '2026-06-23 13:27:46') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (233, NULL, 'Guest', 'viewed', 'game', 'Embarcadero Dev-C++', 78, '2026-06-23 13:28:10') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (234, NULL, 'Guest', 'viewed', 'game', 'Embarcadero Dev-C++', 78, '2026-06-23 13:28:11') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (235, NULL, 'Guest', 'viewed', 'game', 'Autodesk Fusion 360', 79, '2026-06-23 13:28:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (236, NULL, 'Guest', 'viewed', 'game', 'Autodesk Fusion 360', 79, '2026-06-23 13:28:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (237, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 79, '2026-06-23 13:28:51') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (238, NULL, 'Guest', 'viewed', 'game', 'Autodesk Fusion 360', 79, '2026-06-23 13:30:26') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (239, NULL, 'Guest', 'viewed', 'game', 'iTunes 12139.10003.61011.0', 80, '2026-06-23 13:31:04') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (240, NULL, 'Guest', 'viewed', 'game', 'iTunes 12139.10003.61011.0', 80, '2026-06-23 13:31:04') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (241, NULL, 'Guest', 'viewed', 'game', 'iTunes 12139.10003.61011.0', 80, '2026-06-23 13:32:18') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (242, NULL, 'Guest', 'viewed', 'game', 'WhatsApp Desktop', 82, '2026-06-23 13:32:44') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (243, NULL, 'Guest', 'viewed', 'game', 'WhatsApp Desktop', 82, '2026-06-23 13:32:44') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (244, NULL, 'Guest', 'viewed', 'game', 'WhatsApp Desktop', 82, '2026-06-23 13:33:29') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (245, NULL, 'Guest', 'viewed', 'game', 'iTunes 12139.10003.61011.0', 80, '2026-06-23 13:33:57') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (246, NULL, 'Guest', 'viewed', 'game', 'iTunes 12139.10003.61011.0', 80, '2026-06-23 13:33:57') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (247, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 80, '2026-06-23 13:34:00') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (248, NULL, 'Guest', 'viewed', 'game', 'Apache NetBeans', 84, '2026-06-23 13:35:12') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (249, NULL, 'Guest', 'viewed', 'game', 'Apache NetBeans', 84, '2026-06-23 13:35:12') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (250, NULL, 'Guest', 'viewed', 'game', 'Apache NetBeans', 84, '2026-06-23 13:35:58') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (251, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 84, '2026-06-23 13:36:04') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (252, NULL, 'Guest', 'viewed', 'game', 'Telegram Desktop', 85, '2026-06-23 13:40:37') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (253, NULL, 'Guest', 'viewed', 'game', 'Telegram Desktop', 85, '2026-06-23 13:40:37') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (254, NULL, 'Guest', 'viewed', 'game', 'Telegram Desktop', 85, '2026-06-23 13:41:52') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (255, NULL, 'Guest', 'viewed', 'game', 'TikTok 1.0.5.0', 86, '2026-06-23 13:42:11') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (256, NULL, 'Guest', 'viewed', 'game', 'TikTok 1.0.5.0', 86, '2026-06-23 13:42:11') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (257, NULL, 'Guest', 'viewed', 'game', 'Visual Studio Code', 89, '2026-06-23 13:44:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (258, NULL, 'Guest', 'viewed', 'game', 'Visual Studio Code', 89, '2026-06-23 13:44:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (259, NULL, 'Guest', 'viewed', 'game', 'Visual Studio Code', 89, '2026-06-23 13:45:43') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (260, NULL, 'Guest', 'viewed', 'game', 'uTorrent', 87, '2026-06-23 13:46:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (261, NULL, 'Guest', 'viewed', 'game', 'uTorrent', 87, '2026-06-23 13:46:21') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (262, NULL, 'Guest', 'viewed', 'game', 'uTorrent', 87, '2026-06-23 13:47:13') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (263, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-23 14:30:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (264, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-23 14:30:41') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (265, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 37, '2026-06-23 14:30:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (266, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-23 15:06:36') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (267, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-23 15:06:36') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (268, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-23 15:08:02') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (269, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 37, '2026-06-23 15:10:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (270, NULL, 'Guest', 'viewed', 'game', 'Far Cry New Dawn (2019) ALL DLC +  HD Textures Pack [Hypervisor', 52, '2026-06-23 15:12:40') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (271, NULL, 'Guest', 'viewed', 'game', 'Far Cry New Dawn (2019) ALL DLC +  HD Textures Pack [Hypervisor', 52, '2026-06-23 15:12:40') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (272, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 52, '2026-06-23 15:12:47') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (273, NULL, 'Guest', 'viewed', 'game', 'Red Dead Redemption', 102, '2026-06-23 15:13:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (274, NULL, 'Guest', 'viewed', 'game', 'Red Dead Redemption', 102, '2026-06-23 15:13:24') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (275, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 102, '2026-06-23 15:13:34') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (276, NULL, 'Guest', 'viewed', 'game', 'PRAGMATA Deluxe Edition + 3 DLCs/Bonuses', 60, '2026-06-23 15:26:19') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (277, NULL, 'Guest', 'viewed', 'game', 'PRAGMATA Deluxe Edition + 3 DLCs/Bonuses', 60, '2026-06-23 15:26:19') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (278, NULL, 'Guest', 'downloaded', 'game', 'Unknown', 60, '2026-06-23 15:26:25') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (279, NULL, 'Guest', 'viewed', 'game', 'SP Football Life 2026', 110, '2026-06-24 23:06:53') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (280, NULL, 'Guest', 'viewed', 'game', 'SP Football Life 2026', 110, '2026-06-24 23:06:54') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (281, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-25 09:29:40') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (282, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-25 09:29:40') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (283, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-25 09:29:57') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (284, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-27 17:35:20') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (285, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-27 17:35:20') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (286, NULL, 'Guest', 'viewed', 'game', 'Internet Download Manager (IDM) 6.42.64', 37, '2026-06-27 17:35:56') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (287, NULL, 'Guest', 'viewed', 'movie', 'Carolina Caroline 2025', 17, '2026-06-28 01:20:14') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (288, NULL, 'Guest', 'viewed', 'movie', 'Carolina Caroline 2025', 17, '2026-06-28 01:20:14') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (289, NULL, 'Guest', 'viewed', 'movie', 'Avengers Collection', 20, '2026-06-28 01:26:51') ON CONFLICT (id) DO NOTHING;
INSERT INTO activity_log (id, user_id, user_name, action, item_type, item_name, item_id, created_at) VALUES (290, NULL, 'Guest', 'viewed', 'movie', 'Avengers Collection', 20, '2026-06-28 01:26:51') ON CONFLICT (id) DO NOTHING;

-- Export User Badges

-- Export Weekly Stats

-- Export Category Banners
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Action', '/uploads/04296a67a9ba49d5892473dc48c265ec.jpg', '2026-06-13 17:20:06') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Racing', '/uploads/f5b3e8c744154cf592ab049797297604.jpg', '2026-06-13 17:21:30') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Adventure', '/uploads/68816b90ac0e4231ab0771fd2b98b242.jpg', '2026-06-13 17:21:43') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Horror', '/uploads/b0c7fac19dd0483e9467fc3cedcf5250.jpg', '2026-06-13 17:21:55') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Sports', '/uploads/ba62f949e6b446aebad5d377accb823a.jpg', '2026-06-13 17:22:09') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Home', '/uploads/fd0e8b66003f4ce39cdbbad0dc572029.png', '2026-06-23 10:25:19') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Hypervisor', '/uploads/d1dd54f23b25484a98e8f8b0a8f58bd9.png', '2026-06-14 03:56:25') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Strategy', '/uploads/4cfc18da0b2641faab976e515b084d71.jpg', '2026-06-14 03:58:45') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('RPG', '/uploads/d92cce07dea7434da4a8451040c5660f.jpg', '2026-06-14 04:00:45') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('GamesPad', '/uploads/4f0a442a8d6a4109b6dcbd3ed9eac51a.png', '2026-06-14 20:12:27') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('SoftwarePad', '/uploads/87dbfea1e68f4210ad13cc9982caacef.png', '2026-06-14 20:13:26') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('SoftwareHero', '/uploads/3fef47777b334f9890f086c15ca686ca.png', '2026-06-14 20:13:48') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Antivirus & Security', '/uploads/c1d028da65ed477f914f8e86a4791602.png', '2026-06-14 20:56:20') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Browsers', '/uploads/5c38ac9560e64e3189b7abf6debb99a5.png', '2026-06-14 20:56:41') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Design & 3D', '/uploads/8947f9e3b74b4e25942a12df4826fcc4.png', '2026-06-14 21:11:57') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Development Tools', '/uploads/7aa6d61a69b947c98d31ca2863f6c369.png', '2026-06-14 21:12:16') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Multimedia & Audio', '/uploads/fb5cde11585748d0989ea3850a6f4675.png', '2026-06-14 21:12:33') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Productivity & Office', '/uploads/ab1ab910f40d48a3b57388c2481cdd23.png', '2026-06-14 21:12:47') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('Utilities & System', '/uploads/1c695c50d0e54b349cafed4f214431c4.png', '2026-06-14 21:13:44') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('MoviesPad', '/uploads/a969093bbe3248928fe8e9e206060d97.png', '2026-06-17 22:41:38') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('MovieHero', '/uploads/0e675169afc04824aab2b0f0d25b9145.png', '2026-06-17 22:12:55') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('admin-users', '/uploads/06d58b002601450bbf247bf91b0618a9.jpg', '2026-06-19 12:38:21') ON CONFLICT (genre) DO NOTHING;
INSERT INTO category_banners (genre, banner_url, updated_at) VALUES ('GamesHero', '/uploads/fd57249cac2347a7a062cc92805dc079.png', '2026-06-22 15:39:51') ON CONFLICT (genre) DO NOTHING;

-- Export Requests

COMMIT;
