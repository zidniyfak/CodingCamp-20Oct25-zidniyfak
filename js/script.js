document.addEventListener("DOMContentLoaded", function () {
  // =========================================
  // 1. NAVIGATION & MOBILE MENU
  // =========================================
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuBtn && mobileMenu) {
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
        if (icon) {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      });
    });
  }

  // =========================================
  // 2. CONTACT FORM (AJAX FORMSPREE)
  // =========================================
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phoneNumber = document.getElementById("phone-number").value.trim();
      const message = document.getElementById("message").value.trim();

      let isValid = true;
      let errorMessage = "Please fix the following errors:\n\n";

      // Validasi Sederhana
      if (name === "") {
        isValid = false;
        errorMessage += "• Name is required.\n";
      }
      if (email === "") {
        isValid = false;
        errorMessage += "• Email is required.\n";
      } else if (!validateEmail(email)) {
        isValid = false;
        errorMessage += "• Please enter a valid email address.\n";
      }
      if (phoneNumber === "") {
        isValid = false;
        errorMessage += "• Phone number is required.\n";
      }
      if (message === "") {
        isValid = false;
        errorMessage += "• Message is required.\n";
      }

      if (isValid) {
        // Loading State
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-50", "cursor-not-allowed");

        const data = new FormData(e.target);

        fetch(e.target.action, {
          method: contactForm.method,
          body: data,
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert("🚀 Success! Your message has been sent directly to Zidniy.");
              contactForm.reset();
            } else {
              response.json().then((data) => {
                if (Object.hasOwn(data, "errors")) {
                  alert(data["errors"].map((error) => error["message"]).join(", "));
                } else {
                  alert("Oops! There was a problem submitting your form");
                }
              });
            }
          })
          .catch((error) => {
            alert("Oops! There was a problem sending your message.");
          })
          .finally(() => {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
            submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
          });
      } else {
        alert(errorMessage);
      }
    });
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // =========================================
  // 3. PROJECT DATA (WITH MULTIPLE IMAGES)
  // =========================================
  const projectsData = [
    {
      id: 1,
      title: "MounTrek",
      // Array Gambar: Index 0 akan jadi thumbnail
      images: ["../img/mountrek-1.jpg", "../img/mountrek-2.jpg"],
      shortDesc: "Aplikasi Android navigasi untuk pendaki gunung dengan fitur offline map.",
      fullDesc:
        "MountTrek adalah solusi lengkap bagi para pendaki. Selain fitur navigasi offline, aplikasi ini menyediakan informasi cuaca real-time di pegunungan, estimasi waktu pendakian, dan fitur SOS darurat yang mengirimkan koordinat ke tim penyelamat. Dibangun menggunakan arsitektur MVVM untuk performa maksimal.",
      techStack: ["Kotlin", "Laravel", "MySQL"],
      github: "https://github.com/zidniyfak/MountTrek_v2",
      demo: "#", // Kosongkan atau '#' jika tidak ada live demo
    },
    {
      id: 2,
      title: "Al Quran Ku",
      images: ["../img/alquran-thumbnail-1.jpg", "../img/alquran-thumbnail-2.jpg"],
      shortDesc: "Aplikasi Al-Qur'an digital dengan audio murottal dan mode gelap.",
      fullDesc:
        "Aplikasi ini dirancang untuk memudahkan ibadah harian. Fitur unggulannya meliputi pencarian ayat pintar, bookmark tak terbatas, dan audio player yang bisa berjalan di background. UI dirancang minimalis dengan dukungan Dark Mode penuh.",
      techStack: ["Kotlin", "Retrofit"],
      github: "https://github.com/zidniyfak/AlQuran-Android",
      demo: "#",
    },
    {
      id: 3,
      title: "EMYU Store",
      images: ["../img/emyu-store-thumbnail-1.jpg", "../img/emyu-store-thumbnail-2.png"],
      shortDesc: "Website e-commerce merchandise Manchester United.",
      fullDesc:
        "Platform e-commerce responsif yang dibangun tanpa framework CSS/JS (Pure Native). Memiliki fitur keranjang belanja (cart) menggunakan LocalStorage, filter produk dinamis, dan validasi form checkout.",
      techStack: ["HTML5", "CSS3", "Vanilla JS", "LocalStorage"],
      github: "https://github.com/zidniyfak/emyu-store",
      demo: "#",
    },
  ];

  const itemsPerPage = 3;
  let currentPage = 1;

  const projectContainer = document.getElementById("project-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageIndicator = document.getElementById("page-indicator");

  // =========================================
  // 4. RENDER & PAGINATION LOGIC
  // =========================================
  function renderProjects(page) {
    if (!projectContainer) return;

    projectContainer.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProjects = projectsData.slice(start, end);

    paginatedProjects.forEach((project) => {
      // Mengambil gambar pertama sebagai thumbnail
      const thumbnail = project.images && project.images.length > 0 ? project.images[0] : "";

      const projectCard = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full group">
          <img src="${thumbnail}" alt="${project.title}" class="w-full h-48 object-cover object-top transform transition-transform duration-500 group-hover:scale-110"/>
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
            <p class="text-gray-600 mb-4 flex-grow text-sm line-clamp-3">
              ${project.shortDesc}
            </p>
            <button 
                onclick="openModal(${project.id})" 
                class="text-[#720707] font-semibold hover:underline mt-auto inline-flex items-center w-fit cursor-pointer outline-none">
                View Project <i class="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      `;
      projectContainer.innerHTML += projectCard;
    });

    updatePaginationControls();
  }

  function updatePaginationControls() {
    if (!prevBtn || !nextBtn || !pageIndicator) return;

    const totalPages = Math.ceil(projectsData.length / itemsPerPage);
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    prevBtn.style.opacity = currentPage === 1 ? "0.5" : "1";

    nextBtn.disabled = currentPage === totalPages;
    nextBtn.style.opacity = currentPage === totalPages ? "0.5" : "1";
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderProjects(currentPage);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(projectsData.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        renderProjects(currentPage);
      }
    });
  }

  // =========================================
  // 5. MODAL & CAROUSEL LOGIC (UPDATED)
  // =========================================
  const modal = document.getElementById("project-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  // Elemen di dalam Modal
  const mImage = document.getElementById("modal-image");
  const mTitle = document.getElementById("modal-title");
  const mDesc = document.getElementById("modal-description");
  const mTech = document.getElementById("modal-tech-stack");
  const mLive = document.getElementById("modal-live-link");
  const mGithub = document.getElementById("modal-github-link");

  // Elemen Carousel Baru
  const mPrevImgBtn = document.getElementById("modal-prev-img");
  const mNextImgBtn = document.getElementById("modal-next-img");
  const mImageCounter = document.getElementById("image-counter");

  // State Variables untuk Carousel
  let currentProjectImages = [];
  let currentImageIndex = 0;

  // Fungsi: Update Gambar di Modal
  function updateModalImage() {
    if (currentProjectImages.length > 0) {
      // Efek transisi halus (fade)
      mImage.style.opacity = "0";
      setTimeout(() => {
        mImage.src = currentProjectImages[currentImageIndex];
        mImage.style.opacity = "1";
      }, 150);

      // Update Text Counter (Contoh: 1/3)
      if (mImageCounter) {
        mImageCounter.textContent = `${currentImageIndex + 1}/${currentProjectImages.length}`;
      }
    }
  }

  // Fungsi Global: Buka Modal (Dipanggil dari HTML onclick)
  window.openModal = function (id) {
    const project = projectsData.find((p) => p.id === id);
    if (!project || !modal) return;

    // 1. Reset State
    currentProjectImages = project.images || [];
    currentImageIndex = 0;

    // 2. Isi Konten Teks
    if (mTitle) mTitle.textContent = project.title;
    if (mDesc) mDesc.textContent = project.fullDesc;

    // 3. Setup Gambar Awal
    updateModalImage();

    // 4. Cek Tombol Next/Prev (Sembunyikan jika gambar cuma 1)
    if (currentProjectImages.length > 1) {
      // Kita set display via JS untuk menimpa kondisi 'hidden' awal,
      // namun tetap memanfaatkan class hover dari Tailwind jika diinginkan
      if (mPrevImgBtn) {
        mPrevImgBtn.classList.remove("hidden");
        mPrevImgBtn.style.display = "flex";
      }
      if (mNextImgBtn) {
        mNextImgBtn.classList.remove("hidden");
        mNextImgBtn.style.display = "flex";
      }
      if (mImageCounter) mImageCounter.style.display = "block";
    } else {
      if (mPrevImgBtn) mPrevImgBtn.style.display = "none";
      if (mNextImgBtn) mNextImgBtn.style.display = "none";
      if (mImageCounter) mImageCounter.style.display = "none";
    }

    // 5. Setup Link Buttons
    if (mLive) {
      mLive.href = project.demo;
      if (!project.demo || project.demo === "#") {
        mLive.style.display = "none";
      } else {
        mLive.style.display = "inline-flex";
      }
    }
    if (mGithub) mGithub.href = project.github;

    // 6. Setup Tech Stack Tags
    if (mTech) {
      mTech.innerHTML = project.techStack
        .map(
          (tech) =>
            `<span class="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-300">${tech}</span>`
        )
        .join("");
    }

    // 7. Tampilkan Modal
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Disable scroll body
  };

  // Event Listener: Tombol Next/Prev Carousel
  if (mPrevImgBtn) {
    mPrevImgBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Biar modal gak ketutup pas klik tombol
      if (currentProjectImages.length > 1) {
        currentImageIndex--;
        if (currentImageIndex < 0) {
          currentImageIndex = currentProjectImages.length - 1; // Loop ke belakang
        }
        updateModalImage();
      }
    });
  }

  if (mNextImgBtn) {
    mNextImgBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentProjectImages.length > 1) {
        currentImageIndex++;
        if (currentImageIndex >= currentProjectImages.length) {
          currentImageIndex = 0; // Loop ke depan
        }
        updateModalImage();
      }
    });
  }

  // Fungsi: Tutup Modal
  function closeModal() {
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto"; // Enable scroll body
    }
  }

  // Event Listeners untuk Tutup Modal
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      // Tutup jika klik area gelap (backdrop)
      if (e.target === modal) closeModal();
    });
  }

  // Keyboard Navigation (ESC & Arrows)
  document.addEventListener("keydown", (e) => {
    if (!modal || modal.classList.contains("hidden")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      // Geser kiri pakai keyboard
      if (mPrevImgBtn && mPrevImgBtn.style.display !== "none") {
        mPrevImgBtn.click();
      }
    } else if (e.key === "ArrowRight") {
      // Geser kanan pakai keyboard
      if (mNextImgBtn && mNextImgBtn.style.display !== "none") {
        mNextImgBtn.click();
      }
    }
  });

  // Jalankan Render Pertama Kali
  renderProjects(currentPage);
});
