document.addEventListener('DOMContentLoaded', () => {

    // --- Elemen Dinamis Baru: Progress Bar & Typewriter ---
    const startDate = new Date("Jul 16, 2025 00:00:00").getTime(); // Tanggal mulai (misal hari ini)
    const eventDate = new Date("Aug 17, 2025 08:00:00").getTime(); // Tanggal acara

    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    function updateProgressBar() {
        const now = new Date().getTime();
        const totalDuration = eventDate - startDate;
        const elapsedDuration = now - startDate;
        
        // Pastikan tidak negatif atau lebih dari 100%
        let progressPercentage = (elapsedDuration / totalDuration) * 100;
        progressPercentage = Math.max(0, Math.min(100, progressPercentage));

        if (progressBar && progressText) {
            progressBar.style.width = progressPercentage + '%';
            progressText.innerText = `Kemajuan: ${progressPercentage.toFixed(2)}%`;
        }
        
        if (now > eventDate) {
             progressBar.style.width = '100%';
             progressText.innerText = "Acara Sedang Berlangsung!";
        }
    }

    // --- Logika Typewriter ---
    const typewriterElement = document.getElementById('typewriter');
    const words = ["Kolaborasi", "Menyusun Strategi", "Team Building", "Merayakan Pencapaian"];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Proses menghapus
            letterIndex--;
        } else {
            // Proses mengetik
            letterIndex++;
        }

        if (typewriterElement) {
            typewriterElement.textContent = currentWord.substring(0, letterIndex);
        }
        
        let typeSpeed = 200;

        if (isDeleting) {
            typeSpeed /= 2; // Lebih cepat saat menghapus
        }

        // Jika kata selesai diketik
        if (!isDeleting && letterIndex === currentWord.length) {
            typeSpeed = 2000; // Jeda sebelum mulai menghapus
            isDeleting = true;
        } 
        // Jika kata selesai dihapus
        else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Pindah ke kata berikutnya
            typeSpeed = 500; // Jeda sebelum mulai mengetik kata baru
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // --- Scroll Animation ---
const animatedSections = document.querySelectorAll('.content-section, .rundown-card');

const revealSection = () => {
    const triggerBottom = window.innerHeight / 5 * 4.5;

    animatedSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        } else {
            // Opsional: hapus kelas jika ingin animasi berulang saat scroll ke atas
            // section.classList.remove('visible');
        }
    });
};

window.addEventListener('scroll', revealSection);
revealSection(); // Tampilkan section yang sudah terlihat saat load
    
    // --- Inisialisasi semua fungsi ---
    updateProgressBar(); // Panggil sekali saat load
    revealSection(); // Panggil sekali saat load
    type(); // Mulai typewriter
    
    // Update progress bar setiap beberapa detik agar lebih akurat
    setInterval(updateProgressBar, 5000); 
});