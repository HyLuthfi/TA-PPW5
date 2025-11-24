# Kalkulator Interaktif

Aplikasi kalkulator web interaktif.

## Author

Nama: Luthfi Muthathohirin

NPM: 2315061112

Kelas: PPW-E

Prodi Teknik Informatika, Jurusan Teknik Elektro, Universitas Lampung


## Deskripsi

Proyek ini merupakan tugas akhir dari Percobaan 5: JavaScript Dasar dalam praktikum Pemrograman Web. Kalkulator ini dibuat menggunakan HTML, CSS, dan JavaScript.

## Fitur Utama

### Fungsionalitas Dasar
- Operasi aritmatika dasar (tambah, kurang, kali, bagi)
- Perhitungan berantai dengan prioritas operator (× dan ÷ lebih dulu dari + dan −)
- Input melalui tombol klik dan keyboard
- Display expression lengkap sebelum perhitungan
- Validasi pembagian dengan nol

### Fitur Memory
- Memory Store (MS)
- Memory Add (M+)
- Memory Subtract (M-)
- Memory Recall (MR)
- Memory Clear (MC)

### Fitur Tambahan
- History perhitungan (5 terakhir)
- Toggle Dark/Light Mode
- Sound effects untuk setiap tombol
- Animasi smooth pada button dan hasil
- Keyboard support lengkap

## Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dengan CSS Variables dan animasi
- **JavaScript (Vanilla)** - Logika aplikasi

## Struktur File

```
├── index.html       # Struktur HTML kalkulator
├── style.css        # Styling dan tema
├── script.js        # Logika JavaScript
└── README.md        # Dokumentasi
```

## Konsep JavaScript yang Diterapkan

### 1. DOM Manipulation
```javascript
// Mengakses dan mengubah elemen DOM
const displayElement = document.getElementById('display');
displayElement.innerText = nilaiDisplay;
```

### 2. Event Handling
```javascript
// Event listener untuk keyboard
document.addEventListener('keydown', function(event) {
    // Handle keyboard input
});
```

### 3. Functions
Menggunakan berbagai jenis fungsi untuk modularitas kode:
- Function declaration untuk operasi kalkulator
- Function expression untuk event handling
- Arrow function untuk operasi sederhana

### 4. String Manipulation
```javascript
// Parsing dan evaluasi expression
let tokens = [];
for (let i = 0; i < expr.length; i++) {
    // Parse karakter demi karakter
}
```

### 5. Array Methods
```javascript
// Menggunakan splice untuk manipulasi array
tokens.splice(i-1, 3, hasil);

// Menggunakan unshift dan pop untuk history
riwayat.unshift(itemRiwayat);
```

### 6. Web Audio API
```javascript
// Membuat sound effects sederhana
const audioContext = new AudioContext();
const oscillator = audioContext.createOscillator();
```

### 7. CSS Variables Manipulation
```javascript
// Toggle theme dengan classList
document.body.classList.toggle('light-mode');
```
