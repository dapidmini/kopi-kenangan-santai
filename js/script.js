// toggle class active
const navbarNav = document.querySelector('.navbar-nav');

// ketika hamburger menu diklik
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
}

// ketika klik di luar sidebar, hilangkan nav
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function(e) {
    // kalau yg diklik bukan tombol hamburger menu atau navbar-nav
    if ( ! hamburger.contains(e.target) && ! navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const formContact = document.getElementById('contactForm');

    if (formContact) {
        formContact.addEventListener('submit', function(event) {
            // Cek apakah reCAPTCHA sudah diisi
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                event.preventDefault(); // Hentikan pengiriman form
                alert('Silakan verifikasi reCAPTCHA sebelum mengirim pesan.');
            }

            // 2. Encode inputs to prevent XSS before submitting
            ['name', 'email', 'message'].forEach(id => {
            const input = document.getElementById(id);
            input.value = input.value.replace(/[<>"'&]/g, function(c) {
                return ({
                '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '&': '&amp;'
                })[c];
            });
            });

            // 3. Optional confirmation
            alert('Pesan Anda sedang dikirim. Terima kasih!');
        });
    }
});