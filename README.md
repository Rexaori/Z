# chatbot whit spreadsheet

Script bot wa input data ke google spreadsheet

**Cara menggunakan**

Di sini saya asumsikan kalian sudah memiliki akun google atau google yang aktif



1. Buat spreadsheet yang ingin disambungkan dengan bot;
2. Simpan id dari spreadsheet tsb;
3. Login di cloud.google.com kemudian masuk ke console;
4. Pilih project dan buat project baru kasih nama dan tekan create;
5. Kemudian pilih project yang dibuat;
6. Ke dashboard project kemudian ke apis & services;
7. Klick **+enable apis & services;**
8. Ketik sheet pada pencarian dan pilih **Google Sheet API;**
9. Klick **enable;**
10. Pada sidebar klick **Credentials;**
11. klick **CREATE CREDENTIALS ** di tengah atas dan pilih service account isi nama dan id nya sampai selesai;
12. Copy email yang ada kemudian klick;
13. Ke tab **key** dan **add key -> create new key -> json;**
14. Proses 13 akan mendownload file json simpan baik-baik filenya;
15. Kemudian buka file **spreadsheet** yang dibuat tadi kemudian **share;**
16. Tambahkan **email** yang di **copy** dan buat role nya sebagai editor klick **share;**

**Menjalankan script bot nya**



1. Download scriptnya;
2. Extract ke **HOME termux;**
3. Pindahkan **file json** yang didownload ke dalam **folder bot;**
4. Buka file config/config.json isi **id spreadsheet** dan **nama file keys credential;**
5. Masuk ke folder bot dan jalankan perintah **npm install**;
6. Untuk menjalankan botnya jalankan perintah **npm run bot;**
7. Scan barcode yang muncul dengan **nomor/akun WA** yang ingin dijadikan **BOT;**
8. Bot siap digunakan

**Fitur - fitur**



1. Pesan default untuk melihat command / key pesan dan fungsinya;
2. Membuat template pesan autorespon (key dan balasan yang diinginkan);
3. Input data ke spreadsheet;
4. Bisa memilih sheet;
5. Data yang ingin di input bebas (sesuai dengan kebutuhan

**Cara input data**



1. Buat key dan template folmulir;
2. Untuk value data awali dengan titik dua (:)