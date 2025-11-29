// script.js

const quotes = [
    "Selamat! Anda baru saja menyelesaikan tantangan besar bernama UTS. Momen ini adalah panggung untuk mengakui semua usaha keras, waktu tidur yang dikorbankan, dan ketekunan yang Anda curahkan. Lihatlah diri Anda, Anda berhasil melalui satu minggu ini yang penuh dengan tekanan. Ini bukan hanya tentang nilai, ini tentang kapasitas Anda untuk bertahan. Anda adalah pemenang, tangguh, dan sangat layak mendapatkan waktu istirahat penuh kelegaan ini. Angkat dagu Anda, nikmati jeda, dan bawa semangat kebanggaan ini untuk menaklukkan sisa perjalanan akademik Anda. Anda sudah melakukan yang terbaik, dan itu luar biasa!"
];

// Fungsi untuk menampilkan teks dengan efek mengetik
function typeWriter(text, i, quoteDisplayElement, callback) {
    if (i < text.length) {
        // Ambil karakter selanjutnya
        let char = text.charAt(i);
        // Periksa apakah karakter selanjutnya adalah awal dari tag HTML
        if (char === '<') {
            let endIndex = text.indexOf('>', i);
            if (endIndex !== -1) {
                // Jika ya, tambahkan seluruh tag HTML sekaligus
                quoteDisplayElement.innerHTML += text.substring(i, endIndex + 1);
                i = endIndex + 1; // Pindah indeks setelah tag
            } else {
                // Jika tag tidak lengkap, tetap tambahkan karakter satu per satu
                quoteDisplayElement.innerHTML += char;
                i++;
            }
        } else {
            // Jika bukan tag HTML, tambahkan karakter satu per satu
            quoteDisplayElement.innerHTML += char;
            i++;
        }

        setTimeout(() => typeWriter(text, i, quoteDisplayElement, callback), 40); // Kecepatan mengetik
    } else if (callback) {
        callback(); // Panggil callback jika ada setelah pengetikan selesai
    }
}


function displayRandomQuote() {
    const quoteDisplay = document.getElementById('quote-display');
    const fullQuote = quotes[0]; // Ambil paragraf tunggal

    // Kosongkan dulu elemen display dan set opasitas ke 1 sebelum mengetik
    quoteDisplay.innerHTML = '';
    quoteDisplay.style.opacity = 1; // Pastikan terlihat saat mengetik

    // Panggil fungsi typeWriter untuk menampilkan paragraf dengan efek mengetik
    // Bungkus teks penuh dalam tag <p> agar formatting tetap rapi
    typeWriter(`<p>${fullQuote}</p>`, 0, quoteDisplay, null);
}

// Panggil fungsi displayRandomQuote saat halaman dimuat
window.onload = displayRandomQuote;

// --- BARU DITAMBAHKAN UNTUK ANIMASI BUNGA & HATI ---

const elements = ['🌸', '💖', '🌼', '❤️', '🌷']; // Simbol bunga dan hati

function createAnimatedElement() {
    const element = document.createElement('div');
    element.className = 'animated-element';
    
    // Pilih simbol acak
    const randomSymbol = elements[Math.floor(Math.random() * elements.length)];
    element.innerHTML = randomSymbol;

    // Tambahkan kelas spesifik untuk styling
    if (randomSymbol.includes('🌸') || randomSymbol.includes('🌼') || randomSymbol.includes('🌷')) {
        element.classList.add('flower');
    } else {
        element.classList.add('heart');
    }

    // Posisi awal acak di lebar layar
    const startX = Math.random() * window.innerWidth;
    element.style.left = `${startX}px`;
    
    // Variasi rotasi dan posisi akhir untuk efek alami
    const endX = startX + (Math.random() - 0.5) * 200; // Bergeser sedikit ke kiri/kanan
    const endRotate = Math.random() * 720 - 360; // Rotasi acak 0-720 derajat

    element.style.setProperty('--end-x', `${endX}px`);
    element.style.setProperty('--end-rotate', `${endRotate}deg`);


    document.body.appendChild(element);

    // Hapus elemen setelah animasinya selesai
    element.addEventListener('animationend', () => {
        element.remove();
    });
}

// Panggil fungsi createAnimatedElement secara berulang setelah halaman dimuat
window.onload = function() {
    displayRandomQuote(); // Tetap tampilkan quote saat onload
    // Buat elemen animasi setiap 300ms, tapi hanya selama beberapa detik awal atau saat di halaman cover/index
    const animationInterval = setInterval(createAnimatedElement, 300); 

    // Hentikan animasi setelah 10-15 detik agar tidak terlalu ramai (opsional)
    setTimeout(() => {
        clearInterval(animationInterval);
    }, 50000); // Hentikan setelah 15 detik
};