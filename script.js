
document.addEventListener("DOMContentLoaded", () => {
    // DROPDOWN LOGIC
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector("a");
        const arrow = link?.querySelector(".arrow");
        const dropdownMenu = dropdown.querySelector(".dropdown-menu");

        dropdown.addEventListener("click", (event) => {
            const isLink = event.target.closest("a[href]");
            const isDropdownItem = event.target.closest(".dropdown-menu a");
            if (isDropdownItem) return;

            event.preventDefault();
            event.stopPropagation();

            dropdownMenu.classList.toggle("show");
            if (arrow) {
                arrow.textContent = dropdownMenu.classList.contains("show") ? "▴" : "▾";
            }

            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.querySelector(".dropdown-menu")?.classList.remove("show");
                    otherDropdown.querySelector(".arrow") && (otherDropdown.querySelector(".arrow").textContent = "▼");
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

    // GET STARTED MODAL LOGIC
    const getStartedModal = document.getElementById("getStartedModal");
    const openBtn = document.querySelector(".cta-button");
    const closeBtn = getStartedModal?.querySelector(".close-button");

    if (getStartedModal && openBtn && closeBtn) {
        openBtn.addEventListener("click", () => {
            const originalForm = document.getElementById("original-modal-form-content");
            const modalContent = document.querySelector(".modal-content");

            if (originalForm && modalContent) {
                modalContent.innerHTML = originalForm.innerHTML;

                modalContent.querySelector(".close-button").addEventListener("click", () => {
                    getStartedModal.style.display = "none";
                });

                const form = modalContent.querySelector("#get-started-form");
                if (form) {
                    form.addEventListener("submit", function (e) {
                        e.preventDefault();
                        emailjs.sendForm("Service_TQ10021", "template_68bc47f", this)
                            .then(() => alert("Message sent successfully! ✅"))
                            .catch(error => alert("Oops! Something went wrong... ❌\n" + error.text));
                        this.reset();
                    });
                }
            }

            getStartedModal.style.display = "block";
        });

        closeBtn.addEventListener("click", () => {
            getStartedModal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === getStartedModal) {
                getStartedModal.style.display = "none";
            }
        });
    }

    // MORE INFO MODAL LOGIC
    const moreInfoButtons = document.querySelectorAll(".more-info");
    const modalContent = document.querySelector(".modal-content");

    const infoMap = {
        "Software-Engineering": "Software engineering involves the systematic design, development, deployment, and maintenance of software solutions tailored to meet business needs...",
        "System-Testing-&-IT-Support": "This service ensures the reliability, functionality, and security of software systems...",
        "Business-Automation": "Business automation focuses on replacing manual, time-consuming tasks with digital solutions...",
        "Digital-Experience": "Digital experience focuses on enhancing user interactions with digital platforms...",
        "Content-&-Information-Services": "Content services involve managing, organizing, and distributing digital content efficiently...",
        "AI-&-Robotics": "AI and robotics focus on leveraging artificial intelligence and robotic systems...",
        "Training-&-Consultancy": "This service involves providing expert guidance and skill development programs...",
        "Enterprise-Solutions": "Enterprise solutions involve integrating IT systems, cloud computing, and cybersecurity..."
    };

    if (moreInfoButtons.length && modalContent && getStartedModal) {
        moreInfoButtons.forEach(button => {
            button.addEventListener("click", () => {
                const infoKey = button.getAttribute("data-info");
                const contentText = infoMap[infoKey] || "No additional information available.";

                modalContent.innerHTML = `
                    <span class="close-button">&times;</span>
                    <h2>More Information</h2>
                    <p>${contentText}</p>
                `;

                getStartedModal.style.display = "block";

                modalContent.querySelector(".close-button").addEventListener("click", () => {
                    getStartedModal.style.display = "none";
                });
            });
        });
    }

    // HAMBURGER MENU LOGIC
    const hamburger = document.getElementById("hamburger");
    const closeIcon = document.getElementById("closeIcon"); // Make sure your HTML includes this
    const mobileMenu = document.getElementById("mobileMenu");
    const dropdownToggles = mobileMenu.querySelectorAll('.dropdown-toggle');
    const getStartedBtnMobile = document.getElementById('getStartedBtnMobile');
    const feedbackLinkMobile = document.getElementById('feedback-link-mobile');
    const feedbackModal = document.getElementById('feedbackModal');

    function openMobileMenu() {
        mobileMenu.classList.add('open');
        hamburger.style.display = 'none';
        if (closeIcon) closeIcon.style.display = 'block';
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        hamburger.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';

        // Close any open dropdowns inside menu
        mobileMenu.querySelectorAll('.dropdown').forEach(dropdown => dropdown.classList.remove('open'));
    }

    hamburger.addEventListener('click', openMobileMenu);
    if (closeIcon) {
        closeIcon.addEventListener('click', closeMobileMenu);
    }

    // Close menus when clicking outside
    document.addEventListener('click', function (e) {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && (!closeIcon || !closeIcon.contains(e.target))) {
            closeMobileMenu();
        }
    });

    // Toggle dropdowns inside mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('open');
        });
    });

    // Get Started Modal (Mobile)
    getStartedBtnMobile.addEventListener('click', function () {
        getStartedModal.style.display = 'block';
    });

    // Feedback Modal (Mobile)
    feedbackLinkMobile.addEventListener('click', function (e) {
        e.preventDefault();
        feedbackModal.style.display = 'block';
    });

    // Close modals on click outside
    window.addEventListener('click', function (e) {
        if (e.target === getStartedModal) getStartedModal.style.display = 'none';
        if (e.target === feedbackModal) feedbackModal.style.display = 'none';
    });
});

