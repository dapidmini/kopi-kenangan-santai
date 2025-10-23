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

  // ==== Inisialisasi Cart ====
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  function updateCartStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ==== Event Handling untuk tombol + dan - ====
  document.querySelectorAll(".menu-card").forEach((product) => {
    const id = product.dataset.id;
    const name = product.dataset.name;
    const harga = parseInt(product.dataset.harga);
    console.log("Inisialisasi produk:", id, name, harga);
    const minusBtn = product.querySelector(".btn-minus");
    const plusBtn = product.querySelector(".btn-plus");
    const qtyInput = product.querySelector(".qty-input");

    // Load qty awal dari localStorage
    if (cart[id]) qtyInput.value = cart[id].qty;

    plusBtn.addEventListener("click", () => {
      const newQty = parseInt(qtyInput.value) + 1;
      qtyInput.value = newQty;
      console.log("Menambah qty produk:", id, newQty);
      cart[id] = { name, harga, qty: newQty };
      updateCartStorage();
    });

    minusBtn.addEventListener("click", () => {
      let newQty = parseInt(qtyInput.value) - 1;
      if (newQty < 0) newQty = 0;
      qtyInput.value = newQty;

      if (newQty === 0) delete cart[id];
      else cart[id] = { name, harga, qty: newQty };

      updateCartStorage();
    });
  });

  // ==== Menampilkan isi Cart ====
  const viewCartBtn = document.getElementById("viewCartBtn");
  const cartPanel = document.getElementById("cartPanel");
  const closeCart = document.getElementById("closeCart");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    Object.keys(cart).forEach((id) => {
      const item = cart[id];
      const subtotal = item.harga * item.qty;
      total += subtotal;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      console.log("Cart item:", item);
      div.innerHTML = `
      <strong>${item.name}</strong><br>
      Qty: ${
        item.qty
      } × Rp${item.harga.toLocaleString()} = <b>Rp${subtotal.toLocaleString()}</b>
    `;
      cartItems.appendChild(div);
    });

    console.log("Total cart value:", total, cartTotal);

    cartTotal.textContent =
      total > 0 ? "Total: Rp" + total.toLocaleString() : "Keranjang kosong";
  }

  viewCartBtn.addEventListener("click", () => {
    console.log("Klik tombol view cart");
    renderCart();
    cartPanel.classList.add("active");
  });

  closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
  });
});
