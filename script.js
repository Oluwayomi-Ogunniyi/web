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
                arrow.textContent = dropdownMenu.classList.contains("show") ? "▲" : "▼";
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
            if (arrow) arrow.textContent = "▼";
        });
    });

    // GET STARTED MODAL LOGIC
    const getStartedModal = document.getElementById("getStartedModal");
    const openBtn = document.querySelector(".cta-button");
    const closeBtn = getStartedModal?.querySelector(".close-button");

    if (getStartedModal && openBtn && closeBtn) {
        // Open the modal with the Get Started form
        openBtn.addEventListener("click", () => {
            // Ensure we always load the original content of the Get Started form
            const originalForm = document.getElementById("original-modal-form-content");
            const modalContent = document.querySelector(".modal-content");

            if (originalForm && modalContent) {
                // Inject the original form content
                modalContent.innerHTML = originalForm.innerHTML;

                // Rebind the close button event
                modalContent.querySelector(".close-button").addEventListener("click", () => {
                    getStartedModal.style.display = "none";
                });

                // Rebind form submission logic
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

        // Close the modal
        closeBtn.addEventListener("click", () => {
            getStartedModal.style.display = "none";
        });

        // Close modal if click outside
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

                // Inject More Info content
                modalContent.innerHTML = `
                    <span class="close-button">&times;</span>
                    <h2>More Information</h2>
                    <p>${contentText}</p>
                `;

                getStartedModal.style.display = "block";

                // Rebind the close button for More Info modal
                modalContent.querySelector(".close-button").addEventListener("click", () => {
                    getStartedModal.style.display = "none";
                });
            });
        });
    }

    // FORM SUBMISSION (ONLY IF FORM EXISTS)
    const form = document.getElementById("get-started-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            emailjs.sendForm("Service_TQ10021", "template_68bc47f", this)
                .then(() => alert("Message sent successfully! ✅"))
                .catch(error => alert("Oops! Something went wrong... ❌\n" + error.text));
            this.reset();
        });
    }
});

