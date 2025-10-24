document.addEventListener("DOMContentLoaded", function () {
  // Hamburger Menu
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    // Ganti ikon hamburger menjadi X dan sebaliknya
    const icon = menuBtn.querySelector("i");
    if (mobileMenu.classList.contains("hidden")) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    } else {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      const icon = menuBtn.querySelector("i");
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    });
  });
});
