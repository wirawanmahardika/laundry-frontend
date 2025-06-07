# 🧺 MVP: Laundry SaaS

## 🎯 Tujuan MVP

> Membangun platform sederhana yang membantu pemilik laundry mencatat pesanan, pelanggan, dan status pembayaran — agar operasional harian menjadi lebih efisien.

---

## 🔑 Fitur Inti (Core Features)

### 1. 👤 Manajemen Pelanggan
- Tambah / edit / hapus pelanggan
- Informasi:
  - Nama
  - Nomor HP
  - Alamat
  - Catatan
- (Opsional) Fitur pencarian

### 2. 📦 Pencatatan Pesanan Laundry
- Tambah pesanan baru untuk pelanggan
- Input:
  - Tanggal masuk dan target selesai
  - Berat / jumlah item
  - Jenis layanan (Cuci Kering, Setrika, Ekspres, dll)
  - Harga otomatis berdasarkan tarif
- Status pesanan:
  - `Masuk`
  - `Diproses`
  - `Selesai`
  - `Diambil`

### 3. 💰 Manajemen Pembayaran
- Tambah catatan pembayaran:
  - Total tagihan
  - Jumlah dibayar
  - Metode pembayaran
  - Status: Lunas / Belum lunas
- Histori pembayaran dan rekap

### 4. 🗂️ Riwayat Pesanan
- Tampilkan daftar semua pesanan
- Filter berdasarkan:
  - Status
  - Tanggal
  - Pelanggan
- Lihat detail dan histori pembayaran

### 5. 📱 Tampilan Mobile-friendly
- Optimalkan UI untuk HP & tablet
- Gunakan framework responsif (Tailwind)

---

## 🧰 Teknologi yang Direkomendasikan

| Layer        | Teknologi                        |
|--------------|----------------------------------|
| Frontend     | React + TypeScript + Tailwind    |
| UI Framework | shadcn/ui atau Radix UI          |
| Backend      | Node.js (Express) atau Go Fiber  |
| Database     | PostgreSQL / Supabase            |
| Auth         | Clerk / Supabase Auth / NextAuth |
| Hosting      | Vercel / Railway / Render        |

Alternatif:
- Fullstack: Next.js + Prisma
- Simpel & cepat: Supabase + React

---

## 📦 Struktur Database Sederhana

### `customers`
- `id`: UUID
- `name`: string
- `phone`: string
- `address`: string

### `orders`
- `id`: UUID
- `customer_id`: FK → customers.id
- `date_in`: date
- `date_out`: date
- `service_type`: enum
- `weight`: number
- `price_total`: number
- `status`: enum (`Masuk`, `Diproses`, `Selesai`, `Diambil`)

### `payments`
- `id`: UUID
- `order_id`: FK → orders.id
- `amount_paid`: number
- `paid_at`: datetime
- `payment_method`: string

---

## 🌱 Fitur Opsional untuk Iterasi Selanjutnya

- 🧾 Cetak nota digital (PDF / Bluetooth)
- 🔔 Notifikasi WhatsApp/SMS otomatis
- 🧑‍🤝‍🧑 Akses multi user (owner dan kasir)
- 📈 Dashboard statistik
- 📍 Multi-cabang / multi-outlet
- 💳 Pembayaran digital (QRIS, Midtrans)
- 📤 Export data (CSV)

---

## 🧠 Strategi MVP

- Fokus pada **fungsi penting** yang menyelesaikan masalah nyata.
- Tidak perlu fitur kompleks dulu (misal integrasi payment).
- Bangun fondasi teknis yang memungkinkan pengembangan ke depan (multi-tenant, UI fleksibel, API modular).
- Uji ke 5–10 pemilik laundry langsung.

---

## 💡 Opini & Saran

> MVP terbaik adalah yang bisa dipakai langsung oleh target pengguna dan membantu pekerjaan mereka. Laundry SaaS tidak butuh AI atau machine learning dulu. Bangun dari alur operasional harian: **masuk – proses – selesai – dibayar**.

---

## ⏱️ Mau Mulai?

Kamu bisa mulai dari:
- ✨ UI desain sederhana (Tailwind)
- 🔧 API backend (Node.js / Go)
- 🧠 Skema database (PostgreSQL)
- 🧪 Testing ide ke calon user

Saya siap bantu bagian mana dulu: frontend, backend, database, atau business model.

