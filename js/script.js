document.addEventListener("DOMContentLoaded", function () {
  // Dynamic Name
  const nameElement = document.getElementById("user-name");
  const defaultName = nameElement.textContent;
  const userName = prompt("Please enter your name:", defaultName);

  if (userName) {
    nameElement.textContent = userName;
  } else {
    nameElement.textContent = "Guest";
  }

  // Hamburger Menu
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

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

  // Form Validation & Submission Logic ---
  const contactForm = document.getElementById("contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;
    let errorMessage = "Please fix the following errors:\n\n";

    // a. Validasi Nama
    if (name === "") {
      isValid = false;
      errorMessage += "• Name is required.\n";
    }

    // b. Validasi Email
    if (email === "") {
      isValid = false;
      errorMessage += "• Email is required.\n";
    } else if (!validateEmail(email)) {
      isValid = false;
      errorMessage += "• Please enter a valid email address.\n";
    }

    // c. Validasi Nomor Telepon
    if (phoneNumber === "") {
      isValid = false;
      errorMessage += "• Phone number is required.\n";
    }

    // d. Validasi Pesan
    if (message === "") {
      isValid = false;
      errorMessage += "• Message is required.\n";
    }

    // 3. Tampilkan Hasil
    if (isValid) {
      const submissionMessage = `
            🚀 Form Submitted Successfully! 🚀
            
            Name: ${name}
            Email: ${email}
            Phone Number: ${phoneNumber}
            Message: 
            ${message}
        `;
      alert(submissionMessage);

      contactForm.reset();
    } else {
      alert(errorMessage);
    }
  });

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
