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
// SCROLL ANIMATIONS - TIMELINE
// ============================================
function isElementPartiallyInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    
    return (vertInView && horInView);
}

function checkTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        if (isElementPartiallyInViewport(item)) {
            item.classList.add('visible');
        }
    });
}

// Cek saat scroll
window.addEventListener('scroll', checkTimelineItems);

// Cek saat pertama kali load
window.addEventListener('load', checkTimelineItems);

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// GALLERY INTERACTION & LIGHTBOX
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const caption = this.getAttribute('data-caption') || 'Kenangan Kita';
        
        if (img) {
            openLightbox(img.src, caption);
        }
    });
});

// Fungsi untuk membuka lightbox
function openLightbox(imageSrc, caption) {
    // Cek apakah lightbox sudah ada
    if (document.getElementById('lightbox')) {
        return;
    }
    
    // Buat lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
        flex-direction: column;
        padding: 2rem;
        box-sizing: border-box;
    `;
    
    // Gambar
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0,0,0,0.5);
        animation: zoomIn 0.3s ease;
    `;
    
    // Caption
    const captionDiv = document.createElement('div');
    captionDiv.textContent = caption;
    captionDiv.style.cssText = `
        color: white;
        font-size: 1.5rem;
        margin-top: 1.5rem;
        text-align: center;
        font-family: 'Georgia', serif;
    `;
    
    // Tombol close
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 30px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 2.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    closeBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.3)';
        this.style.transform = 'rotate(90deg)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
        this.style.transform = 'rotate(0deg)';
    });
    
    // Fungsi close
    function closeLightbox() {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            lightbox.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close saat klik background
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close dengan tombol ESC
    document.addEventListener('keydown', function escClose(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', escClose);
        }
    });
    
    // Append semua elemen
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(img);
    lightbox.appendChild(captionDiv);
    document.body.appendChild(lightbox);
    
    // Prevent scroll
    document.body.style.overflow = 'hidden';
}

// Tambahkan animasi CSS
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes zoomIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(lightboxStyle);

// ============================================
// REASON CARDS ANIMATION
// ============================================
const reasonCards = document.querySelectorAll('.reason-card');

reasonCards.forEach((card, index) => {
    // Tambahkan delay pada setiap card saat muncul
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
});

// Animasi saat scroll ke section reasons
function checkReasonCards() {
    const reasonsSection = document.getElementById('reasons');
    if (reasonsSection && isElementPartiallyInViewport(reasonsSection)) {
        reasonCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Remove event listener setelah animasi pertama kali
        window.removeEventListener('scroll', checkReasonCards);
    }
}

window.addEventListener('scroll', checkReasonCards);
window.addEventListener('load', checkReasonCards);

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
console.log('%c💕 Happy Anniversary! 💕', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cDibuat dengan cinta untuk kamu ❤️', 'font-size: 14px; color: #764ba2;');

window.addEventListener("load", () => {
  const music = document.getElementById("bgMusic");

  if (music) {
    music.play().catch(err => {
      console.log("Autoplay dicegah browser:", err);
    });
  }
});
