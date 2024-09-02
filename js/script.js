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