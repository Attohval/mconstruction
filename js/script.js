// Page Navigation
function selectContactSubject(subject) {
    const subjectField = document.getElementById('subject');
    if (subjectField && Array.from(subjectField.options).some(option => option.value === subject)) {
        subjectField.value = subject;
    }
}

function goToPage(pageId, subject) {
            const pageUrls = {
                home: 'index.html',
                about: 'about.html',
                services: 'services.html',
                projects: 'projects.html',
                team: 'team.html',
                // testimonials: 'testimonials.html',
                contact: 'contact.html',
                blog: 'blog.html'
            };

            const targetPage = document.getElementById(pageId);
            const currentPage = document.querySelector('.page.active');

            if (!targetPage || (currentPage && currentPage.id !== pageId)) {
                const targetUrl = new URL(pageUrls[pageId] || 'index.html', window.location.href);
                if (pageId === 'contact' && subject) {
                    targetUrl.searchParams.set('subject', subject);
                }
                window.location.href = targetUrl.href;
                return;
            }

            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            targetPage.classList.add('active');

            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`[data-page="${pageId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }

            if (pageId === 'contact' && subject) {
                selectContactSubject(subject);
            }

            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open navigation menu');
            }

            window.scrollTo(0, 0);
        }
        // Hamburger Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                hamburger.classList.toggle('active', !isExpanded);
                navMenu.classList.toggle('active', !isExpanded);
                hamburger.setAttribute('aria-expanded', String(!isExpanded));
                hamburger.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
            });
        }

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    hamburger.setAttribute('aria-label', 'Open navigation menu');
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Carousel
        let currentSlideIndex = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const heroTitles = ['Construction That Holds Up', 'Property Management Made Simple', 'Residential Developments', 'Roads & Infrastructure', 'Interior Fit-Outs'];
        const heroSubtitles = ['Reliable building delivery from site prep to handover', 'Commercial assets maintained, leased, and managed with care', 'Modern housing projects planned for comfort and long-term value', 'Durable civil works built for movement, access, and growth', 'Functional interiors finished with precision and project discipline'];

        function showSlide(index) {
            if (!slides.length) {
                return;
            }

            index = (index + slides.length) % slides.length;
            currentSlideIndex = index;
            slides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === index;
                slide.classList.toggle('active', isActive);
                slide.setAttribute('aria-hidden', String(!isActive));
            });
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, indicatorIndex) => {
                const isActive = indicatorIndex === index;
                indicator.classList.toggle('active', isActive);
                indicator.setAttribute('aria-pressed', String(isActive));
            });
            
            slides[index].classList.add('active');
            
            // Update hero text
            const heroTitle = document.getElementById('heroTitle');
            const heroSubtitle = document.getElementById('heroSubtitle');
            if (heroTitle) {
                heroTitle.textContent = heroTitles[index];
            }
            if (heroSubtitle) {
                heroSubtitle.textContent = heroSubtitles[index];
            }
        }

        function nextSlide() {
            if (!slides.length) {
                return;
            }

            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(currentSlideIndex);
        }

        function currentSlide(index) {
            currentSlideIndex = index;
            showSlide(currentSlideIndex);
        }

        // Avoid automatic motion when the visitor requests reduced motion.
        if (slides.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setInterval(nextSlide, 5000);
        }

        // Scroll Reveal Animation
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const windowTop = window.scrollY;
                const windowBottom = windowTop + window.innerHeight;
                const elementTop = element.getBoundingClientRect().top + window.scrollY;
                const elementBottom = elementTop + element.clientHeight;

                if (elementTop < windowBottom - 100 && elementBottom > windowTop + 100) {
                    element.classList.add('show');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Run on page load

        // Counter Animation
        const counters = document.querySelectorAll('.counter');

        const startCounter = () => {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const increment = target / 50;

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.floor(count);
                        setTimeout(updateCount, 30);
                    } else {
                        counter.textContent = target;
                    }
                };

                const counterTop = counter.getBoundingClientRect().top + window.scrollY;
                if (window.scrollY + window.innerHeight > counterTop) {
                    if (!counter.classList.contains('started')) {
                        counter.classList.add('started');
                        updateCount();
                    }
                }
            });
        };

        window.addEventListener('scroll', startCounter);
        startCounter();

        // Project Modal
        function openProjectModal(title, image, description) {
            const modal = document.getElementById('projectModal');
            const closeButton = modal.querySelector('.modal-close');
            modalReturnFocus = document.activeElement;
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalImage').src = image;
            document.getElementById('modalImage').alt = title;
            document.getElementById('modalDescription').textContent = description;
            modal.classList.add('active');
            closeButton.focus();
        }

        let modalReturnFocus = null;

        function closeProjectModal() {
            const modal = document.getElementById('projectModal');
            if (!modal.classList.contains('active')) {
                return;
            }

            modal.classList.remove('active');
            if (modalReturnFocus instanceof HTMLElement) {
                modalReturnFocus.focus();
            }
        }

        // Filter Projects
        function filterProjects(category) {
            const projects = document.querySelectorAll('.project-item');
            const filterButtons = document.querySelectorAll('.filter-btn');
            const clickedButton = window.event ? window.event.target : null;

            filterButtons.forEach(btn => btn.classList.remove('active'));
            if (clickedButton) {
                clickedButton.classList.add('active');
            }

            projects.forEach(project => {
                if (category === 'all' || project.getAttribute('data-category') === category) {
                    project.style.display = 'block';
                    setTimeout(() => project.style.opacity = '1', 10);
                } else {
                    project.style.opacity = '0';
                    setTimeout(() => project.style.display = 'none', 300);
                }
            });
        }

        // FAQ Toggle
        function toggleFaq(element) {
            const item = element.parentElement;
            const allItems = document.querySelectorAll('.faq-item');
            
            allItems.forEach(faqItem => {
                const question = faqItem.querySelector('.faq-question');
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                    if (question) {
                        question.setAttribute('aria-expanded', 'false');
                    }
                    const answer = faqItem.querySelector('.faq-answer');
                    if (answer) {
                        answer.setAttribute('aria-hidden', 'true');
                    }
                }
            });
            
            const isExpanded = item.classList.toggle('active');
            element.setAttribute('aria-expanded', String(isExpanded));
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.setAttribute('aria-hidden', String(!isExpanded));
            }
        }

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('projectModal');
            if (e.target === modal) {
                closeProjectModal();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeProjectModal();
            }
        });

        // Back to Top Button
        const backToTopBtn = document.querySelector('.back-to-top');

        window.addEventListener('scroll', () => {
            if (backToTopBtn) {
                if (window.scrollY > 1200) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
            }
        });

        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('[data-current-year]').forEach((year) => {
                year.textContent = String(new Date().getFullYear());
            });

            const subject = new URLSearchParams(window.location.search).get('subject');
            if (subject) {
                selectContactSubject(subject);
            }

            // Initialize first carousel slide
            showSlide(0);
        });
