// Portfolio Application - Uses config.js for all data
// PDF generation is now in separate file (pdfGenerator.js)

class PortfolioApp {
    constructor() {
        this.config = portfolioConfig;
        this.pdfGenerator = null;
        this.init();
    }

    init() {
        // Wait for DOM to load
        document.addEventListener("DOMContentLoaded", () => {
            this.loadSEO();
            this.loadPersonalInfo();
            this.loadSocialLinks();
            this.loadSkills();
            this.loadProjects();
            this.loadExperience();
            this.loadEducation();
            this.loadContactInfo();
            this.setupEventListeners();
            this.setupThemeToggle();
            this.setCurrentYear();

            console.log("Portfolio loaded successfully!");
        });
    }

    // ============ LOAD DATA FROM CONFIG ============

    loadSEO() {
        document.title = this.config.seo.title;
        const metaDescription = document.getElementById("meta-description");
        const metaKeywords = document.getElementById("meta-keywords");
        const metaAuthor = document.getElementById("meta-author");

        if (metaDescription) metaDescription.content = this.config.seo.description;
        if (metaKeywords) metaKeywords.content = this.config.seo.keywords;
        if (metaAuthor) metaAuthor.content = this.config.seo.author;
    }

    loadPersonalInfo() {
        const personal = this.config.personal;

        // Name
        const firstName = document.getElementById("first-name");
        const lastName = document.getElementById("last-name");
        const footerName = document.getElementById("footer-name");

        if (firstName) firstName.textContent = personal.firstName;
        if (lastName) lastName.textContent = personal.lastName;
        if (footerName) footerName.textContent = `${personal.firstName} ${personal.lastName}`;

        // Title and Bio
        const heroTitle = document.getElementById("hero-title");
        const heroBio = document.getElementById("hero-bio");
        const aboutBio = document.getElementById("about-bio");

        if (heroTitle) heroTitle.textContent = personal.title;
        if (heroBio) heroBio.textContent = personal.bio;
        if (aboutBio) aboutBio.textContent = personal.bio;

        // Profile Image
        const profileImg = document.getElementById("profile-image");
        if (profileImg) {
            profileImg.src = personal.profileImage;
            profileImg.alt = `${personal.firstName} ${personal.lastName}`;
            profileImg.onerror = () => {
                profileImg.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
            };
        }

        // About Image
        const aboutImg = document.getElementById("about-image");
        if (aboutImg) {
            aboutImg.src = personal.aboutImage;
            aboutImg.onerror = () => {
                aboutImg.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
            };
        }

        // Logo
        const logoText = document.getElementById("logo-text");
        const footerLogo = document.getElementById("footer-logo");

        if (logoText) logoText.textContent = `${personal.firstName}'s Portfolio`;
        if (footerLogo) footerLogo.textContent = `${personal.firstName}'s Portfolio`;
    }

    loadSocialLinks() {
        const social = this.config.social;
        const socialContainer = document.getElementById("social-icons");
        const contactSocialContainer = document.getElementById("contact-social");
        const footerSocialContainer = document.getElementById("footer-social");

        const socialIcons = {
            github: "fab fa-github",
            linkedin: "fab fa-linkedin",
            twitter: "fab fa-twitter",
            instagram: "fab fa-instagram",
            facebook: "fab fa-facebook",
        };

        // Clear containers
        if (socialContainer) socialContainer.innerHTML = "";
        if (contactSocialContainer) contactSocialContainer.innerHTML = "";
        if (footerSocialContainer) footerSocialContainer.innerHTML = "";

        // Add social links
        Object.entries(social).forEach(([platform, url]) => {
            if (url && socialIcons[platform]) {
                // Hero section social icons
                if (socialContainer) {
                    const link = document.createElement("a");
                    link.href = url;
                    link.target = "_blank";
                    link.className = "text-gray-600 hover:text-blue-600 text-xl transition";
                    link.innerHTML = `<i class="${socialIcons[platform]}"></i>`;
                    socialContainer.appendChild(link);
                }

                // Contact section social icons
                if (contactSocialContainer) {
                    const contactLink = document.createElement("a");
                    contactLink.href = url;
                    contactLink.target = "_blank";
                    contactLink.className = "bg-white/20 p-3 rounded-lg hover:bg-white/30 transition";
                    contactLink.innerHTML = `<i class="${socialIcons[platform]}"></i>`;
                    contactSocialContainer.appendChild(contactLink);
                }

                // Footer social icons
                if (footerSocialContainer) {
                    const footerLink = document.createElement("a");
                    footerLink.href = url;
                    footerLink.target = "_blank";
                    footerLink.className = "text-gray-400 hover:text-white";
                    footerLink.innerHTML = `<i class="${socialIcons[platform]}"></i>`;
                    footerSocialContainer.appendChild(footerLink);
                }
            }
        });
    }

    loadSkills() {
        const skillsContainer = document.getElementById("skills-container");
        const technicalSkillsContainer = document.getElementById("technical-skills");

        // Clear containers
        if (skillsContainer) skillsContainer.innerHTML = "";
        if (technicalSkillsContainer) technicalSkillsContainer.innerHTML = "";

        // Color mapping for skills
        const colorClasses = {
            blue: {
                bg: "bg-blue-100",
                text: "text-blue-600",
                progress: "bg-blue-600",
            },
            green: {
                bg: "bg-green-100",
                text: "text-green-600",
                progress: "bg-green-600",
            },
            purple: {
                bg: "bg-purple-100",
                text: "text-purple-600",
                progress: "bg-purple-600",
            },
            yellow: {
                bg: "bg-yellow-100",
                text: "text-yellow-600",
                progress: "bg-yellow-600",
            },
            orange: {
                bg: "bg-orange-100",
                text: "text-orange-600",
                progress: "bg-orange-600",
            },
            red: { bg: "bg-red-100", text: "text-red-600", progress: "bg-red-600" },
        };

        // Load skill cards
        if (skillsContainer) {
            this.config.skills.forEach((skill) => {
                const color = colorClasses[skill.color] || colorClasses.blue;

                const skillCard = `
                    <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition text-center enhanced-card">
                        <div class="${color.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="${skill.icon} ${color.text} text-2xl"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">${skill.name}</h3>
                        <p class="text-gray-600">${skill.description}</p>
                        <div class="mt-4">
                            <div class="flex justify-between mb-2 text-sm">
                                <span>Proficiency</span>
                                <span>${skill.level}%</span>
                            </div>
                            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div class="h-full ${color.progress} rounded-full progress-bar" style="width: ${skill.level}%"></div>
                            </div>
                        </div>
                    </div>
                `;

                skillsContainer.innerHTML += skillCard;
            });
        }

        // Load technical skills (progress bars)
        if (technicalSkillsContainer) {
            this.config.technicalSkills.forEach((skill) => {
                const color = colorClasses[skill.color] || colorClasses.blue;

                const skillBar = `
                    <div>
                        <div class="flex justify-between mb-2">
                            <span class="font-medium">${skill.name}</span>
                            <span class="text-gray-600">${skill.level}%</span>
                        </div>
                        <div class="h-2 bg-gray-300 rounded-full overflow-hidden">
                            <div class="h-full ${color.progress} rounded-full progress-bar" style="width: ${skill.level}%"></div>
                        </div>
                    </div>
                `;

                technicalSkillsContainer.innerHTML += skillBar;
            });
        }
    }

    loadProjects() {
        const projectsContainer = document.getElementById("projects-container");
        if (!projectsContainer) return;

        projectsContainer.innerHTML = "";

        // Only show featured projects
        const featuredProjects = this.config.projects.filter(
            (project) => project.featured
        );

        featuredProjects.forEach((project) => {
            // Create tags HTML
            const tagsHtml = project.tags
                .map(
                    (tag) =>
                        `<span class="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mr-2 mb-2 inline-block">${tag}</span>`
                )
                .join("");

            const projectCard = `
                <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 group enhanced-card">
                    <div class="h-48 overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500">
                    </div>
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h3 class="text-xl font-bold">${project.title}</h3>
                        </div>
                        <p class="text-gray-600 mb-4">${project.description}</p>
                        <div class="mb-6">
                            ${tagsHtml}
                        </div>
                        <div class="flex justify-between items-center">
                            <div class="flex space-x-4">
                                ${project.githubUrl ?
                                    `<a href="${project.githubUrl}" target="_blank" class="text-gray-400 hover:text-blue-600">
                                        <i class="fab fa-github"></i>
                                    </a>` : ""
                                }
                                ${project.liveUrl ?
                                    `<a href="${project.liveUrl}" target="_blank" class="text-gray-400 hover:text-blue-600">
                                        <i class="fas fa-external-link-alt"></i>
                                    </a>` : ""
                                }
                            </div>
                            <button onclick="portfolioApp.showProjectDetails(${project.id})" class="text-blue-600 font-medium hover:text-blue-800">
                                View Details <i class="fas fa-arrow-right ml-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            projectsContainer.innerHTML += projectCard;
        });
    }

    loadExperience() {
        const experienceContainer = document.getElementById("experience-container");
        if (!experienceContainer) return;

        experienceContainer.innerHTML = "";

        this.config.experience.forEach((exp) => {
            const expItem = `
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                            <i class="${exp.icon} text-blue-600"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <h4 class="text-lg font-bold">${exp.position}</h4>
                        <p class="text-blue-600 font-medium">${exp.company}</p>
                        <p class="text-gray-500 text-sm mb-2">${exp.period}</p>
                        <p class="text-gray-600">${exp.description}</p>
                    </div>
                </div>
            `;

            experienceContainer.innerHTML += expItem;
        });
    }

    loadEducation() {
        const educationContainer = document.getElementById("education-container");
        if (!educationContainer) return;

        educationContainer.innerHTML = "";

        this.config.education.forEach((edu) => {
            const eduItem = `
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                            <i class="${edu.icon} text-green-600"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <h4 class="text-lg font-bold">${edu.degree}</h4>
                        <p class="text-green-600 font-medium">${edu.institution}</p>
                        <p class="text-gray-500 text-sm mb-2">${edu.period}</p>
                        <p class="text-gray-600">${edu.description}</p>
                    </div>
                </div>
            `;

            educationContainer.innerHTML += eduItem;
        });
    }

    loadContactInfo() {
        const personal = this.config.personal;
        const contactDetails = document.getElementById("contact-details");
        const contactMessage = document.getElementById("contact-message");
        const aboutHighlights = document.getElementById("about-highlights");

        // Contact message
        if (contactMessage) {
            contactMessage.textContent =
                "Have a project in mind? Feel free to reach out. I'm always open to discussing new opportunities.";
        }

        // Contact details
        if (contactDetails) {
            contactDetails.innerHTML = `
                <div class="flex items-center">
                    <div class="bg-white/20 p-3 rounded-lg mr-4">
                        <i class="fas fa-envelope"></i>
                    </div>
                    <div>
                        <h4 class="font-bold">Email</h4>
                        <p class="text-blue-100">${personal.email}</p>
                    </div>
                </div>

                <div class="flex items-center">
                    <div class="bg-white/20 p-3 rounded-lg mr-4">
                        <i class="fas fa-phone"></i>
                    </div>
                    <div>
                        <h4 class="font-bold">Phone</h4>
                        <p class="text-blue-100">${personal.phone}</p>
                    </div>
                </div>

                <div class="flex items-center">
                    <div class="bg-white/20 p-3 rounded-lg mr-4">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                        <h4 class="font-bold">Location</h4>
                        <p class="text-blue-100">${personal.location}</p>
                    </div>
                </div>
            `;
        }

        // About highlights
        if (aboutHighlights) {
            aboutHighlights.innerHTML = `
                <div class="flex items-center enhanced-card p-4 rounded-lg">
                    <div class="bg-blue-100 p-3 rounded-lg mr-4">
                        <i class="fas fa-code text-blue-600"></i>
                    </div>
                    <div>
                        <h4 class="font-bold">Web Development</h4>
                        <p class="text-sm text-gray-500">Full stack solutions</p>
                    </div>
                </div>

                <div class="flex items-center enhanced-card p-4 rounded-lg">
                    <div class="bg-green-100 p-3 rounded-lg mr-4">
                        <i class="fas fa-file-excel text-green-600"></i>
                    </div>
                    <div>
                        <h4 class="font-bold">Microsoft Excel</h4>
                        <p class="text-sm text-gray-500">Data analysis & automation</p>
                    </div>
                </div>

                <div class="flex items-center enhanced-card p-4 rounded-lg">
                    <div class="bg-purple-100 p-3 rounded-lg mr-4">
                        <i class="fas fa-database text-purple-600"></i>
                    </div>
                    <div>
                        <h4 class="font-bold">PostgreSQL</h4>
                        <p class="text-sm text-gray-500">Database management</p>
                    </div>
                </div>

                <div class="flex items-center enhanced-card p-4 rounded-lg">
                    <div class="bg-yellow-100 p-3 rounded-lg mr-4">
                        <i class="fas fa-paint-brush text-yellow-600"></i>
                    </div>
                    <div>
                        <h4 class="font-bold">UI/UX Design</h4>
                        <p class="text-sm text-gray-500">User-centered design</p>
                    </div>
                </div>
            `;
        }
    }

    // ============ PDF GENERATION ============

    // PDF generation function in your main script
// PDF generation function in your main script.js
async generatePDF() {
    try {
        // Show loading message
        this.showToast('Generating professional CV...', 'info');

        // Initialize PDF generator
        const pdfGenerator = new PDFGenerator(this.config);

        // Generate PDF
        await pdfGenerator.generatePDF();

        // Show success message
        this.showToast('Professional CV downloaded successfully!', 'success');

    } catch (error) {
        console.error('Error generating PDF:', error);
        this.showToast('Error generating PDF. Please try again.', 'error');
    }
}    // ============ HELPER FUNCTIONS ============

    setCurrentYear() {
        const currentYearElement = document.getElementById("current-year");
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }
    }

    showProjectDetails(projectId) {
        const project = this.config.projects.find((p) => p.id === projectId);

        if (project) {
            // Remove existing modal if any
            const existingModal = document.querySelector('.modal-project-details');
            if (existingModal) existingModal.remove();

            const modalHtml = `
                <div class="modal-project-details fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div class="p-6">
                            <div class="flex justify-between items-start mb-6">
                                <h3 class="text-2xl font-bold">${project.title}</h3>
                                <button onclick="this.closest('.modal-project-details').remove()" class="text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-times text-xl"></i>
                                </button>
                            </div>

                            <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-6">

                            <div class="mb-6">
                                <h4 class="font-bold mb-2">Description</h4>
                                <p class="text-gray-600">${project.longDescription}</p>
                            </div>

                            <div class="mb-6">
                                <h4 class="font-bold mb-2">Technologies Used</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${project.tags
                                        .map(
                                            (tag) =>
                                                `<span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">${tag}</span>`
                                        )
                                        .join("")}
                                </div>
                            </div>

                            <div class="flex space-x-4">
                                ${project.githubUrl ?
                                    `<a href="${project.githubUrl}" target="_blank" class="flex-1 bg-gray-900 text-white py-3 rounded-lg text-center hover:bg-black transition">
                                        <i class="fab fa-github mr-2"></i> View Code
                                    </a>` : ""
                                }

                                ${project.liveUrl ?
                                    `<a href="${project.liveUrl}" target="_blank" class="flex-1 bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700 transition">
                                        <i class="fas fa-external-link-alt mr-2"></i> Live Demo
                                    </a>` : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML("beforeend", modalHtml);
        }
    }

    // Dark Mode Setup in your script.js
setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const htmlElement = document.documentElement;

    // Check for saved theme or prefer-color-scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.classList.add('dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.classList.remove('dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');

        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            this.showToast('Dark mode activated', 'info');
        } else {
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            this.showToast('Light mode activated', 'info');
        }
    });
}
    showToast(message, type = 'info') {
        // Remove existing toast
        const existingToast = document.querySelector('.custom-toast');
        if (existingToast) existingToast.remove();

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `custom-toast fixed top-24 right-6 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
            type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' :
            'bg-blue-100 text-blue-800 border border-blue-300'
        }`;
        toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' :
                    'fa-info-circle'
                } mr-3"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ============ EVENT LISTENERS ============

    setupEventListeners() {
        // Mobile menu toggle
        const menuBtn = document.getElementById("menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener("click", () => {
                mobileMenu.classList.toggle("hidden");
                const icon = menuBtn.querySelector("i");
                if (mobileMenu.classList.contains("hidden")) {
                    icon.classList.remove("fa-times");
                    icon.classList.add("fa-bars");
                } else {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-times");
                }
            });
        }

        // Close mobile menu when clicking a link
        document.querySelectorAll("#mobile-menu a").forEach((link) => {
            link.addEventListener("click", () => {
                if (mobileMenu) {
                    mobileMenu.classList.add("hidden");
                    const menuIcon = menuBtn.querySelector("i");
                    if (menuIcon) {
                        menuIcon.classList.remove("fa-times");
                        menuIcon.classList.add("fa-bars");
                    }
                }
            });
        });

        // Back to top button
        const backToTopBtn = document.getElementById("back-to-top");

        if (backToTopBtn) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.remove("hidden");
                } else {
                    backToTopBtn.classList.add("hidden");
                }
            });

            backToTopBtn.addEventListener("click", () => {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            });
        }

        // Contact form submission with Formspree
        const contactForm = document.getElementById("contact-form");

        if (contactForm) {
            contactForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                const name = document.getElementById("name-input").value;
                const email = document.getElementById("email-input").value;
                const message = document.getElementById("message-input").value;

                // Simple validation
                if (!name || !email || !message) {
                    this.showToast('Please fill in all fields', 'error');
                    return;
                }

                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
                submitBtn.disabled = true;

                try {
                    // Prepare form data for Formspree
                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("email", email);
                    formData.append("message", message);

                    // Send to Formspree
                    const response = await fetch(this.config.contact.formspreeId, {
                        method: "POST",
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        // Reset form
                        contactForm.reset();

                        // Show success message
                        this.showToast(this.config.contact.successMessage, 'success');
                    } else {
                        this.showToast(this.config.contact.errorMessage, 'error');
                    }
                } catch (error) {
                    this.showToast("Network error. Please try again later.", 'error');
                } finally {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
        }

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener("click", function (e) {
                const targetId = this.getAttribute("href");
                if (targetId === "#") return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();

                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                        mobileMenu.classList.add("hidden");
                        if (menuBtn) {
                            const menuIcon = menuBtn.querySelector("i");
                            if (menuIcon) {
                                menuIcon.classList.remove("fa-times");
                                menuIcon.classList.add("fa-bars");
                            }
                        }
                    }

                    // Calculate offset for fixed navbar
                    const navbar = document.querySelector("nav");
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth",
                    });
                }
            });
        });

        // Handle resume download
        const resumeBtn = document.getElementById("resume-btn");
        const resumeBtnMobile = document.getElementById("resume-btn-mobile");

        if (resumeBtn) {
            resumeBtn.addEventListener("click", (e) => {
                e.preventDefault();
                this.generatePDF();
            });
        }

        if (resumeBtnMobile) {
            resumeBtnMobile.addEventListener("click", (e) => {
                e.preventDefault();
                this.generatePDF();
            });
        }
    }
}

// Initialize the portfolio app
const portfolioApp = new PortfolioApp();