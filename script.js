const hiddenUrl = "https://taphoalive.com/sellsatarbotbyphong/login.do";
const LOGIN_KEY = "isLoggedIn";
const EXPIRY_KEY = "loginExpiry";

// Fungsi untuk menyimpan status login ke localStorage
function saveLoginStatus() {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1); // Tetapkan waktu kadaluarsa untuk 1 hari
    localStorage.setItem(LOGIN_KEY, "true");
    localStorage.setItem(EXPIRY_KEY, expiryDate.toISOString());
}

// Fungsi untuk mengecek status login
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem(LOGIN_KEY) === "true";
    const expiryDate = new Date(localStorage.getItem(EXPIRY_KEY));
    const now = new Date();

    if (isLoggedIn && now < expiryDate) {
        // Jika masih login dan belum kadaluarsa, redirect ke URL tersembunyi
        window.location.href = hiddenUrl;
    } else {
        // Hapus status login jika sudah kadaluarsa
        localStorage.removeItem(LOGIN_KEY);
        localStorage.removeItem(EXPIRY_KEY);
    }
}

// Cek status login saat halaman dimuat
document.addEventListener("DOMContentLoaded", checkLoginStatus);

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah reload halaman

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "password123") {
        // Simpan status login
        saveLoginStatus();

        // Sembunyikan halaman login dan tampilkan halaman jumpscare
        document.getElementById("loginPage").style.display = "none";
        const jumpscarePage = document.getElementById("jumpscarePage");
        jumpscarePage.style.display = "flex";

        const video = document.getElementById("jumpscareVideo");
        video.play(); // Putar video

        // Tunggu hingga video selesai, lalu redirect
        video.addEventListener("ended", () => {
            window.location.href = hiddenUrl;
        });
    } else {
        // Tampilkan pesan error
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "Nama pengguna atau kata sandi salah tolol!";
    }
});
