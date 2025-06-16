document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.classList.contains('stagger-item')) {
                    entry.target.classList.add('revealed');
                }
                if (entry.target.classList.contains('text-reveal')) {
                    entry.target.classList.add('revealed');
                }
                if (entry.target.classList.contains('section-transition')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.scroll-fade, .stagger-item, .text-reveal, .section-transition').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-element');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const offset = scrolled * speed;
            element.style.setProperty('--parallax-offset', `${offset}px`);
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.getElementById(targetId.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add loading animation class to elements
    document.querySelectorAll('.loading-animation').forEach(element => {
        element.style.animationDelay = `${element.dataset.delay || 0}s`;
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.getElementById(targetId.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    // Close mobile menu after clicking
                    if (nav.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        nav.classList.remove('active');
                    }
                }
            }
        });
    });

    // Add click event to the Hungry button
    const hungryBtn = document.querySelector('.hungry-btn');
    if (hungryBtn) {
        hungryBtn.addEventListener('click', function() {
            window.location.href = 'menudesio.html';
        });
    }

    // Add click event to the address link
    const addressLink = document.querySelector('.address');
    if (addressLink) {
        addressLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://www.google.com/maps/place/Herestraat+82,+9711LL+Groningen', '_blank');
        });
    }

    // Cover Page Functionality
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedDesio');
    
    if (!hasVisited) {
        // First visit - show loading overlay
        if (loadingOverlay) {
            // Set visited flag
            localStorage.setItem('hasVisitedDesio', 'true');
            
            // Show loading overlay
            loadingOverlay.style.display = 'flex';
            
            // Hide after animation
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 1000);
        }
    } else {
        // Not first visit - hide overlay immediately
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }

    // Initialize Swiper
    const heroSwiper = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Scroll Animations
    const revealElements = document.querySelectorAll('.reveal-text, .reveal-image, .reveal-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
        } else if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Mobile Menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    const navClone = document.querySelector('.main-nav').cloneNode(true);
    const headerCta = document.querySelector('.header-cta').cloneNode(true);
    
    mobileMenu.appendChild(navClone);
    mobileMenu.appendChild(headerCta);
    document.body.appendChild(mobileMenu);
}); 