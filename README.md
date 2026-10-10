# Library API - Responsi Modul 1 PPB

REST API pencatatan peminjaman buku perpustakaan yang dibangun menggunakan Node.js, Express.js, dan Supabase PostgreSQL dengan arsitektur Model-Controller.

Dibuat oleh Muhamad Ali Rohman (21120124130071) Kelompok 41_Sehift 6, untuk Responsi Modul 1 Praktikum Pemrograman Perangkat Bergerak.

## Teknologi dan Struktur Proyek

- **Runtime & Framework:** Node.js (CommonJS), Express.js
- **Database:** Supabase PostgreSQL
- **Deployment:** Vercel Serverless Functions

```text
.
├── api/
│   └── index.js         # Handler Serverless Vercel
├── postman/
│   ├── collections/
│   ├── documents/
│   ├── environments/
│   ├── flows/
│   ├── globals/
│   ├── mocks/
│   ├── specs/
│   └── Library-API.postman_collection.json
├── src/
│   ├── config/
│   │   └── supabase.js  # Inisialisasi Supabase client
│   ├── controllers/
│   │   └── loans.js     # Logika pemrosesan HTTP request
│   ├── models/
│   │   ├── index.js     # Factory wrapper model
│   │   └── loan.js      # Kueri database tabel loans
│   ├── routes/
│   │   └── loans.js     # Pemetaan rute REST API
│   ├── validation/
│   │   └── index.js     # Validasi format input
│   ├── app.js           # Konfigurasi middleware Express
│   └── server.js        # Entry point server lokal
├── supabase/
│   └── schema.sql       # DDL schema PostgreSQL
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── vercel.json