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

      // Validasi
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
  // 3. PROJECT DATA & PAGINATION
  // =========================================
  const projectsData = [
    {
      id: 1,
      title: "MounTrek",
      image:
        "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=387",
      shortDesc: "Aplikasi Android navigasi untuk pendaki gunung dengan fitur offline map.",
      fullDesc:
        "MountTrek adalah solusi lengkap bagi para pendaki. Selain fitur navigasi offline, aplikasi ini menyediakan informasi cuaca real-time di pegunungan, estimasi waktu pendakian, dan fitur SOS darurat yang mengirimkan koordinat ke tim penyelamat. Dibangun menggunakan arsitektur MVVM untuk performa maksimal.",
      techStack: ["Kotlin", "Laravel", "MySQL"],
      github: "https://github.com/zidniyfak/MountTrek_v2",
      demo: "#", // Sembunyi
    },
    {
      id: 2,
      title: "Al Quran Android",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=870",
      shortDesc: "Aplikasi Al-Qur'an digital dengan audio murottal dan mode gelap.",
      fullDesc:
        "Aplikasi ini dirancang untuk memudahkan ibadah harian. Fitur unggulannya meliputi pencarian ayat pintar, bookmark tak terbatas, dan audio player yang bisa berjalan di background. UI dirancang minimalis dengan dukungan Dark Mode penuh.",
      techStack: ["Kotlin", "Retrofit"],
      github: "https://github.com/zidniyfak/AlQuran-Android",
      demo: "#", // Sembunyi
    },
    {
      id: 3,
      title: "EMYU Store",
      image:
        "https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=727",
      shortDesc: "Website e-commerce merchandise Manchester United.",
      fullDesc:
        "Platform e-commerce responsif yang dibangun tanpa framework CSS/JS (Pure Native). Memiliki fitur keranjang belanja (cart) menggunakan LocalStorage, filter produk dinamis, dan validasi form checkout.",
      techStack: ["HTML5", "CSS3", "Vanilla JS", "LocalStorage"],
      github: "https://github.com/zidniyfak/emyu-store",
      demo: "#",
    },
    // {
    //   id: 4,
    //   title: "Task App (Dummy)",
    //   image:
    //     "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=872",
    //   shortDesc: "Manajemen tugas sederhana dengan React.",
    //   fullDesc: "Aplikasi Todo List modern dengan fitur Drag and Drop.",
    //   techStack: ["React", "Tailwind", "Vite"],
    //   github: "#",
    //   demo: "#", // Sembunyi
    // },
  ];

  const itemsPerPage = 3;
  let currentPage = 1;

  const projectContainer = document.getElementById("project-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageIndicator = document.getElementById("page-indicator");

  // --- FUNGSI RENDER ---
  function renderProjects(page) {
    if (!projectContainer) return;

    projectContainer.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProjects = projectsData.slice(start, end);

    paginatedProjects.forEach((project) => {
      const projectCard = `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full">
          <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover"/>
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
            <p class="text-gray-600 mb-4 flex-grow text-sm line-clamp-3">
              ${project.shortDesc}
            </p>
            <button 
                onclick="openModal(${project.id})" 
                class="text-[#720707] font-semibold hover:underline mt-auto inline-flex items-center w-fit cursor-pointer">
                View Project <i class="fa-solid fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      `;
      projectContainer.innerHTML += projectCard;
    });

    // Panggil update kontrol setiap kali render
    updatePaginationControls();
  }

  // --- FUNGSI UPDATE BUTTON & INDICATOR ---
  function updatePaginationControls() {
    if (!prevBtn || !nextBtn || !pageIndicator) return;

    const totalPages = Math.ceil(projectsData.length / itemsPerPage);
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;

    // Logic Tombol Prev
    prevBtn.disabled = currentPage === 1;
    prevBtn.style.opacity = currentPage === 1 ? "0.5" : "1";

    // Logic Tombol Next
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.style.opacity = currentPage === totalPages ? "0.5" : "1";
  }

  // --- EVENT LISTENERS PAGINATION ---
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
  // 4. MODAL FUNCTIONS
  // =========================================
  const modal = document.getElementById("project-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const mImage = document.getElementById("modal-image");
  const mTitle = document.getElementById("modal-title");
  const mDesc = document.getElementById("modal-description");
  const mTech = document.getElementById("modal-tech-stack");
  const mLive = document.getElementById("modal-live-link");
  const mGithub = document.getElementById("modal-github-link");

  // Fungsi Global untuk Buka Modal
  window.openModal = function (id) {
    const project = projectsData.find((p) => p.id === id);
    if (!project || !modal) return;

    // Isi konten modal
    if (mImage) mImage.src = project.image;
    if (mTitle) mTitle.textContent = project.title;
    if (mDesc) mDesc.textContent = project.fullDesc;

    // Logic Hide Tombol Live Demo
    if (mLive) {
      mLive.href = project.demo;
      if (!project.demo || project.demo === "#") {
        mLive.style.display = "none"; // Hide paksa
      } else {
        mLive.style.display = "inline-flex"; // Tampilkan kembali
      }
    }

    if (mGithub) mGithub.href = project.github;

    // Render Tech Stack
    if (mTech) {
      mTech.innerHTML = project.techStack
        .map(
          (tech) =>
            `<span class="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded border border-gray-300">${tech}</span>`
        )
        .join("");
    }

    // Munculkan Modal
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  // Fungsi Tutup Modal
  function closeModal() {
    if (modal) {
      modal.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Render Pertama Kali
  renderProjects(currentPage);
});
