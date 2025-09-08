document.addEventListener("DOMContentLoaded", () => {
  // ------------------ EMAILJS INIT ------------------
  emailjs.init("DVlpv6WkJuRl2RWLZ");

  function sendEmail(form, modal = null) {
    const submitBtn = form.querySelector("button[type='submit']");
    const originalText = submitBtn.innerText;

    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    emailjs.sendForm("service_grblnof", "template_vw26jo9", form)
      .then(() => {
        alert("✅ Message sent successfully!");
        form.reset();
        if (modal) modal.style.display = "none";
      })
      .catch((error) => {
        console.error("❌ EmailJS Error:", error);
        alert("❌ Failed to send message. Please try again.");
      })
      .finally(() => {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      });
  }

  // ------------------ DROPDOWN MENU ------------------
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach(dropdown => {
    const arrow = dropdown.querySelector(".arrow");
    const menu = dropdown.querySelector(".dropdown-menu");

    dropdown.addEventListener("click", (event) => {
      const isItem = event.target.closest(".dropdown-menu a");
      if (isItem) return;

      event.preventDefault();
      event.stopPropagation();

      menu.classList.toggle("show");
      if (arrow) arrow.textContent = menu.classList.contains("show") ? "▴" : "▾";

      dropdowns.forEach(other => {
        if (other !== dropdown) {
          other.querySelector(".dropdown-menu")?.classList.remove("show");
          other.querySelector(".arrow") && (other.querySelector(".arrow").textContent = "▾");
        }
      });
    });
  });

  document.addEventListener("click", () => {
    dropdowns.forEach(dropdown => {
      dropdown.querySelector(".dropdown-menu")?.classList.remove("show");
      const arrow = dropdown.querySelector(".arrow");
      if (arrow) arrow.textContent = "▾";
    });
  });

  // ------------------ MODAL LOGIC (Shared) ------------------
  const getStartedModal = document.getElementById("getStartedModal");
  const openBtn = document.querySelector(".cta-button");
  const modalContent = getStartedModal.querySelector(".modal-content");
  const originalFormHTML = modalContent.innerHTML;

  // Get Started Button
  openBtn?.addEventListener("click", () => {
    modalContent.innerHTML = originalFormHTML;
    getStartedModal.style.display = "block";

    const getStartedForm = document.getElementById("get-started-form");
    getStartedForm?.addEventListener("submit", function (e) {
      e.preventDefault();
      sendEmail(this, getStartedModal);
    });

    const closeBtn = modalContent.querySelector(".close-button");
    closeBtn?.addEventListener("click", () => {
      getStartedModal.style.display = "none";
    });
  });

  // Close modal by clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === getStartedModal) {
      getStartedModal.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // ------------------ MORE INFO BUTTONS ------------------
  const moreInfoButtons = document.querySelectorAll(".more-info");
  const infoMap = {
    "Software-Engineering": "We specialize in the full lifecycle of software development, from ideation to deployment and maintenance. Our team builds scalable, secure, and high-performing applications tailored to your specific business needs. Whether it’s a custom web app, a cloud-based system, or a complex enterprise solution, we ensure optimal user experience, seamless integration, and future-ready architecture.",
    "System-Testing-&-IT-Support": "Our experts conduct in-depth system testing including functional, integration, performance, and security testing. We identify issues before they affect your operations and provide comprehensive IT support, including troubleshooting, patch management, and proactive system monitoring, guaranteeing minimal downtime and peak system reliability.",
    "Multimedia-Solutions": "We specialize in creating stunning multimedia content that captures attention, communicates your message clearly, and elevates your brand identity. Our services include high-definition motion graphics, 2D/3D animations, explainer videos, brand intro/outro videos, corporate presentations, and visual storytelling for social media. From concept development to final production, we combine creative design, sound engineering, and cutting-edge software to produce immersive and impactful content. Whether you're launching a new product or running a digital campaign, our multimedia solutions ensure your message stands out across all platforms.",
    "Digital-Experience": "We design and develop intuitive, engaging, and mobile-responsive digital experiences, from websites and web apps to customer portals and user dashboards. Our focus is on UI/UX design, accessibility, responsiveness, and user journey optimization, ensuring that users stay engaged, convert more, and come back for more.",
    "Cybersecurity-&-Data-Protection": "We provide comprehensive cybersecurity solutions designed to protect your systems, networks, and sensitive data from cyber threats, breaches, and unauthorized access. Our services include risk assessment, penetration testing, firewall and endpoint security setup, email security, and real-time threat monitoring. We also implement data privacy policies aligned with global standards (such as GDPR, NDPR, and ISO 27001) to ensure compliance and build trust with your customers. From encrypting critical data to educating your team on cyber hygiene, we help you stay resilient in a constantly evolving threat landscape.",
    "AI-&-Robotics": "We develop and integrate AI-powered systems and robotic process solutions to streamline decision-making, predictive analytics, and customer interactions. Whether it’s through chatbots, AI analytics tools, or autonomous workflows, we empower businesses to make smarter decisions, faster.",
    "Training-&-Consultancy": "We offer tailored training programs on IT best practices, cybersecurity, cloud adoption, digital transformation, and emerging technologies like AI and blockchain. Our consulting services help businesses map out their digital roadmap, optimize IT infrastructure, and innovate with confidence.",
    "Enterprise-Solutions": "We deliver end-to-end IT infrastructure and cloud solutions, including system integration, enterprise resource planning (ERP), cybersecurity implementation, and multi-cloud architecture. We help enterprises streamline operations, reduce technical debt, and enhance data security across departments and geographies."
  };

  moreInfoButtons.forEach(button => {
    button.addEventListener("click", () => {
      const infoKey = button.getAttribute("data-info");
      const contentText = infoMap[infoKey] || "No additional information available.";

      modalContent.innerHTML = `
        <span class="close-button">×</span>
        <h2>More Information</h2>
        <p style="line-height: 1.6;">${contentText}</p>
      `;

      getStartedModal.style.display = "block";
      document.body.style.overflow = "hidden";

      const closeBtn = modalContent.querySelector(".close-button");
      closeBtn?.addEventListener("click", () => {
        getStartedModal.style.display = "none";
        document.body.style.overflow = "";
      });
    });
  });

  // ------------------ VIDEO MODAL ------------------
  const videoModal = document.getElementById("videoModal");
  const playBtn = document.getElementById("playVideoBtn");
  const videoClose = document.querySelector(".close");
  const iframe = document.getElementById("videoFrame");

  playBtn?.addEventListener("click", () => {
    iframe.src = "https://www.youtube.com/embed/fZrdlupqQi4?autoplay=1";
    videoModal.style.display = "flex";
  });
  

  videoClose?.addEventListener("click", () => {
    iframe.src = "";
    videoModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === videoModal) {
      iframe.src = "";
      videoModal.style.display = "none";
    }
  });

  // ------------------ MOBILE MENU ------------------
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const closeMenu = document.getElementById("closeMenu");

function updateMenuVisibility() {
  if (window.innerWidth > 1024) {
    mobileMenu.classList.remove("active");
    hamburger.style.display = "none";
  } else {
    hamburger.style.display = "block";
  }
}

hamburger?.addEventListener("click", () => {
  if (window.innerWidth <= 1024) {
    mobileMenu.classList.add("active");
    hamburger.style.display = "none";
  }
});

closeMenu?.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  hamburger.style.display = "block";
});

window.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove("active");
    hamburger.style.display = "block";
  }
});

window.addEventListener("resize", updateMenuVisibility);
updateMenuVisibility(); // Initial call

function updateMenuVisibility() {
  console.log("Width:", window.innerWidth);
  if (window.innerWidth > 1024) {
    mobileMenu.classList.remove("active");
    hamburger.style.display = "none";
    console.log("Desktop mode: Menu hidden");
  } else {
    hamburger.style.display = "block";
    console.log("Mobile mode: Hamburger shown");
  }
}

  const mobileGetStartedBtn = document.getElementById("getStartedBtnMobile");

  mobileGetStartedBtn?.addEventListener("click", () => {
    modalContent.innerHTML = originalFormHTML;
    getStartedModal.style.display = "block";
    mobileMenu.classList.remove("show"); // close mobile menu
    hamburger.style.display = "block";  // show hamburger again

    const getStartedForm = document.getElementById("get-started-form");
    getStartedForm?.addEventListener("submit", function (e) {
      e.preventDefault();
      sendEmail(this, getStartedModal);
    });

    const closeBtn = modalContent.querySelector(".close-button");
    closeBtn?.addEventListener("click", () => {
      getStartedModal.style.display = "none";
    });
  });

  // ------------------ FEEDBACK MODAL (Mobile) ------------------
  const feedbackLinkMobile = document.getElementById("feedback-link-mobile");
  const feedbackModal = document.getElementById("feedbackModal");

  feedbackLinkMobile?.addEventListener("click", (e) => {
    e.preventDefault();
    feedbackModal.style.display = "block";
    mobileMenu.classList.remove("show");
    hamburger.style.display = "block";
  });
});
document.querySelectorAll('.share-icons a').forEach(button => {
  button.addEventListener('click', function(e) {
    const url = encodeURIComponent('https://theqlip.digital'); // Replace with your blog URL
    const text = encodeURIComponent('Check out these awesome services from The Qlip!');
    const platform = this.classList[1]; // Gets platform class (e.g., 'facebook')
    
    let shareUrl;
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com/?url=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'tiktok':
        shareUrl = `https://www.tiktok.com/upload?redirect_url=${url}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }
    this.href = shareUrl; // Update href dynamically
  });
});