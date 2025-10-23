// toggle class active
const navbarNav = document.querySelector(".navbar-nav");

// ketika hamburger menu diklik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// ketika klik di luar sidebar, hilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  // kalau yg diklik bukan tombol hamburger menu atau navbar-nav
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const formContact = document.getElementById("contactForm");

  if (formContact) {
    formContact.addEventListener("submit", function (event) {
      // Cek apakah reCAPTCHA sudah diisi
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        event.preventDefault(); // Hentikan pengiriman form
        alert("Silakan verifikasi reCAPTCHA sebelum mengirim pesan.");
      }

      // 2. Encode inputs to prevent XSS before submitting
      ["name", "email", "message"].forEach((id) => {
        const input = document.getElementById(id);
        input.value = input.value.replace(/[<>"'&]/g, function (c) {
          return {
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "&": "&amp;",
          }[c];
        });
      });

      // 3. Optional confirmation
      alert("Pesan Anda sedang dikirim. Terima kasih!");
    });
  }

  // inisialisasi storage untuk cart jika belum ada
  const cartKey = "cartData";

  // Muat data dari localStorage
  let cart = JSON.parse(localStorage.getItem(cartKey)) || {};

  // Set nilai qty-input sesuai data tersimpan
  document.querySelectorAll(".menu-card").forEach((product) => {
    const id = product.dataset.id;
    const input = product.querySelector(".qty-input");
    if (cart[id]) input.value = cart[id].qty;
  });

  // 🔹 Fungsi untuk menyimpan cart ke localStorage
  function saveCart() {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  // 🔹 Event listener untuk tombol + dan –
  document.body.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn || (!btn.classList.contains('btn-plus') && !btn.classList.contains('btn-minus'))) return;

    e.preventDefault();

    const card = btn.closest('.menu-card');
    const id = card.dataset.id;
    const name = card.dataset.name;
    const input = card.querySelector('.qty-input');

    let qty = parseInt(input.value) || 0;
    if (btn.classList.contains('btn-plus')) qty++;
    else if (btn.classList.contains('btn-minus')) qty = Math.max(0, qty - 1);

    input.value = qty;

    // Simpan ke cart
    cart[id] = { name, qty };
    saveCart();
  });

  // 🔹 Validasi input manual agar hanya angka
  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('input', e => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
      const qty = parseInt(e.target.value) || 0;
      const card = e.target.closest('.menu-card');
      const id = card.dataset.id;
      const name = card.dataset.name;

      cart[id] = { name, qty };
      saveCart();
    });
  });

});
