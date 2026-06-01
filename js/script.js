        // Page Navigation
        function goToPage(pageId) {
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
                window.location.href = pageUrls[pageId] || 'index.html';
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

            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }

            window.scrollTo(0, 0);
        }
        // Hamburger Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
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
        const heroTitles = ['Building Your Dreams', 'Premium Quality', 'Excellence in Service', 'Trusted Partner', 'Your Vision, Our Mission'];
        const heroSubtitles = ['Premium Construction & Property Management Services', 'Delivering world-class construction solutions', 'Over 20 years of experience', 'Join 1200+ satisfied clients', 'Let\'s build something amazing together'];

        function showSlide(index) {
            if (!slides.length) {
                return;
            }

            slides.forEach(slide => slide.classList.remove('active'));
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            slides[index].classList.add('active');
            if (indicators[index]) {
                indicators[index].classList.add('active');
            }
            
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

        // Auto-advance carousel every 3 seconds
        if (slides.length) {
            setInterval(nextSlide, 3000);
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
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalImage').src = image;
            document.getElementById('modalDescription').textContent = description;
            document.getElementById('projectModal').classList.add('active');
        }

        function closeProjectModal() {
            document.getElementById('projectModal').classList.remove('active');
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
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        }

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('projectModal');
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Back to Top Button
        const backToTopBtn = document.querySelector('.back-to-top');

        window.addEventListener('scroll', () => {
            if (backToTopBtn) {
                if (window.scrollY > 300) {
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

        // Form Submission
        function submitForm(e) {
            e.preventDefault();
            const form = document.getElementById('contactForm');
            const formData = new FormData(form);
            
            // Simulate form submission
            console.log('Form submitted:', Object.fromEntries(formData));
            alert('Thank you for your message! We will contact you shortly.');
            form.reset();
        }

        // Newsletter Subscription
        function submitNewsletter(e) {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            e.target.reset();
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize first carousel slide
            showSlide(0);
        });
