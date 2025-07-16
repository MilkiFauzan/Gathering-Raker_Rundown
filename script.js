document.addEventListener('DOMContentLoaded', () => {

    // Fungsi untuk menjalankan semua inisialisasi
    function init() {
        initPreloader();
        initProgressBar();
        initTypewriter();
        initScrollAnimations();
        initParallaxEffect();
    }

    // 1. Logika Preloader
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    // 2. Logika Progress Bar
    function initProgressBar() {
        const eventDate = new Date("Jul 19, 2025 08:00:00").getTime();
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        if (!progressBar || !progressText) return;

        function update() {
            // Kita gunakan tanggal sekarang sebagai awal, agar progress dimulai dari 0 saat ini
            const startDate = new Date("Jul 16, 2025 00:00:00").getTime();
            const now = new Date().getTime();
            const totalDuration = eventDate - startDate;
            const elapsedDuration = now - startDate;

            let percentage = Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100));

            progressBar.style.width = percentage + '%';
            progressText.innerText = `進捗: ${percentage.toFixed(2)}%`;

            if (now > eventDate) {
                progressBar.style.width = '100%';
                progressText.innerText = "イベント開催中！";
            }
        }
        update();
        setInterval(update, 5000);
    }

    // 3. Logika Typewriter
    function initTypewriter() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;

        const words = ["コラボレーション", "戦略立案", "チームビルディング", "成果を祝う"];
        let wordIndex = 0, letterIndex = 0, isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            let typeSpeed = 150;

            if (isDeleting) {
                letterIndex--;
                typeSpeed /= 2;
            } else {
                letterIndex++;
            }

            typewriterElement.textContent = currentWord.substring(0, letterIndex);

            if (!isDeleting && letterIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && letterIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // 4. Logika Animasi saat Scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.content-section, .activity-card, .rundown-card');
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // 5. Logika Efek Parallax
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            let scrollPosition = window.pageYOffset;
            hero.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        });
    }

    // Jalankan semua fungsi
    init();

});