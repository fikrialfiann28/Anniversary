// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
    // ===== UBAH TANGGAL DI SINI =====
    // Format: Tahun, Bulan (0-11, jadi 0=Januari, 1=Februari, dst), Hari, Jam, Menit, Detik
    // Contoh: new Date(2026, 2, 1, 0, 0, 0) = 1 Maret 2026 jam 00:00:00
    
    const anniversaryDate = new Date(2026, 0, 28, 0, 0, 0); // 28 Februari 2026
    
    // ATAU gunakan format string (pastikan formatnya benar):
    // const anniversaryDate = new Date('March 1, 2025 00:00:00');
    
    const now = new Date();
    const diff = anniversaryDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Debug: tampilkan info di console
    console.log('Target Date:', anniversaryDate);
    console.log('Current Date:', now);
    console.log('Difference (ms):', diff);

    // Cek apakah elemen ada
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
        console.error('Countdown elements not found!');
        return;
    }

    if (diff > 0) {
        // Masih countdown
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
        
        console.log('Countdown:', days, 'days', hours, 'hours', minutes, 'minutes', seconds, 'seconds');
    } else {
        // Countdown habis
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        
        console.log('Countdown finished! Showing button...');
        
        // Tampilkan tombol
        showOpenButton();
    }
}

// Fungsi untuk menampilkan tombol "Open the Message"
function showOpenButton() {
    const buttonContainer = document.getElementById('button-container');
    
    // Cek apakah tombol sudah ada
    if (document.getElementById('open-btn')) {
        return;
    }
    
    // Buat tombol
    const button = document.createElement('a');
    button.id = 'open-btn';
    button.href = 'message.html';
    button.className = 'open-message-btn';
    button.innerHTML = '💌 Open the Message 💌';
    
    buttonContainer.appendChild(button);
    
    // Animasi muncul
    setTimeout(() => {
        buttonContainer.classList.add('show');
    }, 100);
}

// Update countdown setiap detik
setInterval(updateCountdown, 1000);

// Jalankan saat halaman load
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
});

// ============================================
// FLOATING HEARTS
// ============================================
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random posisi horizontal
    heart.style.left = Math.random() * 100 + '%';
    
    // Random delay untuk animasi
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    // Random durasi animasi
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    const container = document.getElementById('hearts-container');
    if (container) {
        container.appendChild(heart);
    }
    
    // Hapus heart setelah animasi selesai
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Buat hearts secara berkala
setInterval(createHeart, 500);

// Buat beberapa hearts di awal
for (let i = 0; i < 5; i++) {
    setTimeout(createHeart, i * 200);
}

// ============================================
// CUSTOM CURSOR HEARTS
// ============================================
document.addEventListener('click', function(e) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = '20px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'heartPop 1s ease-out forwards';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
});

// CSS untuk animasi heart pop
const style = document.createElement('style');
style.textContent = `
    @keyframes heartPop {
        0% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(2) translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c💕 Countdown to Our Special Day 💕', 'font-size: 20px; color: #667eea; font-weight: bold;');

console.log('%cDibuat dengan cinta untuk kamu ❤️', 'font-size: 14px; color: #764ba2;');
