// Enhanced Desìo Website JavaScript
// Optimized for performance, accessibility, and mobile-first experience

document.addEventListener('DOMContentLoaded', function() {
    // Performance monitoring
    const startTime = performance.now();

    // Utility functions for better performance
    const utils = {
        // Debounce function for performance optimization
        debounce: function(func, wait, immediate) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func(...args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func(...args);
            };
        },

        // Throttle function for scroll events
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Check if element is in viewport
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Safe query selector with error handling
        safeQuery: function(selector, context = document) {
            try {
                return context.querySelector(selector);
            } catch (e) {
                console.warn(`Selector "${selector}" not found`);
                return null;
            }
        },

        // Safe query selector all with error handling
        safeQueryAll: function(selector, context = document) {
            try {
                return Array.from(context.querySelectorAll(selector));
            } catch (e) {
                console.warn(`Selector "${selector}" not found`);
                return [];
            }
        }
    };

    // Initialize Swiper with enhanced lazy loading and performance optimizations
    function initHeroSlider() {
        const heroSliderElement = utils.safeQuery('.hero-slider');
        if (!heroSliderElement || typeof Swiper === 'undefined') return;

    const heroSlider = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
                pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
                dynamicBullets: true,
        },
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 1,
                loadOnTransitionStart: true,
        },
        preloadImages: false,
        watchSlidesProgress: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
            grabCursor: true,
            // Enhanced mobile optimization
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                    autoplay: {
                        delay: 4000,
                    }
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 0,
                    autoplay: {
                        delay: 5000,
                    }
                }
            },
            // Accessibility improvements
            a11y: {
                enabled: true,
                prevSlideMessage: 'Previous slide',
                nextSlideMessage: 'Next slide',
                firstSlideMessage: 'This is the first slide',
                lastSlideMessage: 'This is the last slide',
            }
        });

        return heroSlider;
    }

    // Enhanced scroll animations with better performance
    function initScrollAnimations() {
        const animatedElements = utils.safeQueryAll('.animate-on-scroll, .story-section, .featured-dishes, .atmosphere-section, .visit-section, .services-section, .catering-cta, .social-proof');

        if (animatedElements.length === 0) return;

        // Use passive scroll listener for better performance
        const scrollHandler = utils.throttle(() => {
            animatedElements.forEach(element => {
                if (utils.isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');

                    // Add staggered animation for child elements
                    const children = element.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animated');
                        }, index * 100);
                    });
                }
            });
        }, 100);

        window.addEventListener('scroll', scrollHandler, { passive: true });

        // Initial check
        scrollHandler();
    }

    // Enhanced Leaflet Map with better error handling and performance
    function initLocationMap() {
        const mapElement = utils.safeQuery('#map');
        if (!mapElement) return;

        // Check if Leaflet is available with timeout
        let mapInitialized = false;

        const initMapWithTimeout = setTimeout(() => {
            if (!mapInitialized) {
                createMapFallback(mapElement);
            }
        }, 3000);

        // Try to initialize Leaflet map
        if (typeof L !== 'undefined') {
            try {
            const map = L.map('map', {
                scrollWheelZoom: false,
                    zoomControl: false,
                    fadeAnimation: true,
                    zoomAnimation: true,
                    markerZoomAnimation: true
            }).setView([53.21495, 6.56885], 16);

                // Add optimized tile layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                    maxZoom: 19,
                    errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
            }).addTo(map);

                // Create enhanced custom marker
            const customMarker = L.icon({
                iconUrl: 'assets/images/map_marker.png',
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50],
                    className: 'custom-map-marker'
                });

                // Enhanced popup content
                const popupContent = `
                    <div class="map-popup">
                        <h3>📍 Desìo</h3>
                    </div>
                `;

                // Add marker with enhanced popup
                L.marker([53.21495, 6.56885], { icon: customMarker })
                    .addTo(map)
                    .bindPopup(popupContent, {
                        closeButton: true,
                        autoPan: true,
                        keepInView: true
                    })
                .openPopup();

                // Enhanced mobile optimization
                if (window.innerWidth <= 768) {
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
                    map.setZoom(15);
                }

                mapInitialized = true;
                clearTimeout(initMapWithTimeout);

                // Add loading state removal
                mapElement.classList.add('map-loaded');

            } catch (error) {
                console.error('Map initialization error:', error);
                createMapFallback(mapElement);
            }
        } else {
            createMapFallback(mapElement);
        }

        function createMapFallback(container) {
            container.innerHTML = `
                <div class="map-fallback">
                    <div class="fallback-content">
                        <div class="fallback-icon">📍</div>
                        <h3>Find Desìo</h3>
                        <p><strong>Herestraat 82, Groningen</strong></p>
                        <p>Open daily 12:00 - 21:00</p>
                                <a href="https://maps.app.goo.gl/jsGu7BLtxVCqFXnn9" 
                                   target="_blank" 
                           class="btn btn-primary">
                            View on Google Maps
                                </a>
                        </div>
                    </div>
                `;
            }
        }

    // Enhanced Reviews Carousel with improved touch support and performance
    class ReviewsCarousel {
        constructor() {
            this.currentIndex = 0;
            this.startX = 0;
            this.currentX = 0;
            this.isDragging = false;
            this.autoAdvanceInterval = null;
            this.isPaused = false;

            this.init();
        }

        init() {
            this.reviews = utils.safeQueryAll('.review-card');
            this.dots = utils.safeQueryAll('.dot');
            this.prevBtn = utils.safeQuery('.prev-btn');
            this.nextBtn = utils.safeQuery('.next-btn');
            this.carousel = utils.safeQuery('.reviews-carousel');

            if (this.reviews.length === 0) return;

            this.bindEvents();
            this.showReview(0);
            this.startAutoAdvance();
        }

        bindEvents() {
            // Navigation buttons
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.prevReview();
                });
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.nextReview();
                });
            }

            // Dots navigation
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => this.showReview(index));
            });

            // Touch/Swipe events with enhanced performance
            if (this.carousel) {
                this.carousel.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
                this.carousel.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
                this.carousel.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });

                // Pause on hover/touch for better UX
                this.carousel.addEventListener('mouseenter', () => this.pauseAutoAdvance());
                this.carousel.addEventListener('mouseleave', () => this.resumeAutoAdvance());
                this.carousel.addEventListener('touchstart', () => this.pauseAutoAdvance(), { passive: true });
                this.carousel.addEventListener('touchend', () => this.resumeAutoAdvance(), { passive: true });
            }

            // Keyboard navigation
            document.addEventListener('keydown', this.handleKeydown.bind(this));
        }

        showReview(index) {
            // Remove active classes
            this.reviews.forEach(review => review.classList.remove('active'));
            this.dots.forEach(dot => dot.classList.remove('active'));

            // Add active classes with bounds checking
            if (this.reviews[index]) {
                this.reviews[index].classList.add('active');
            }
            if (this.dots[index]) {
                this.dots[index].classList.add('active');
            }

            this.currentIndex = index;
        }

        nextReview() {
            const nextIndex = (this.currentIndex + 1) % this.reviews.length;
            this.showReview(nextIndex);
        }

        prevReview() {
            const prevIndex = (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
            this.showReview(prevIndex);
        }

        handleTouchStart(e) {
            this.startX = e.touches[0].clientX;
            this.isDragging = true;

            // Enhanced visual feedback
            const activeReview = utils.safeQuery('.review-card.active');
      if (activeReview) {
        activeReview.style.transition = 'none';
      }
    }

        handleTouchMove(e) {
            if (!this.isDragging) return;
      
            e.preventDefault(); // Prevent scrolling during swipe
            this.currentX = e.touches[0].clientX;
            const diffX = this.currentX - this.startX;
      
            // Enhanced visual feedback during swipe
            const activeReview = utils.safeQuery('.review-card.active');
      if (activeReview && Math.abs(diffX) > 10) {
                const transformValue = `translateX(${diffX * 0.3}px)`;
                activeReview.style.transform = transformValue;
            }
        }

        handleTouchEnd() {
            if (!this.isDragging) return;

            this.isDragging = false;
            const diffX = this.currentX - this.startX;
            const threshold = 50;

            // Reset transform with smooth transition
            const activeReview = utils.safeQuery('.review-card.active');
      if (activeReview) {
                activeReview.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        activeReview.style.transform = 'translateX(0)';
      }
      
            // Navigate based on swipe direction
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
                    this.prevReview();
        } else {
                    this.nextReview();
                }
            }
        }

        handleKeydown(e) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevReview();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextReview();
            }
        }

        startAutoAdvance() {
            if (this.autoAdvanceInterval || this.reviews.length <= 1) return;

            this.autoAdvanceInterval = setInterval(() => {
                if (!this.isPaused) {
                    this.nextReview();
                }
            }, 5000);
        }

        pauseAutoAdvance() {
            this.isPaused = true;
        }

        resumeAutoAdvance() {
            this.isPaused = false;
        }

        destroy() {
            if (this.autoAdvanceInterval) {
                clearInterval(this.autoAdvanceInterval);
            }
        }
    }

    // Initialize enhanced reviews carousel
    function initReviewsCarousel() {
        // Use the new class-based carousel if reviews exist
        const reviewsCarousel = new ReviewsCarousel();
        return reviewsCarousel;
    }

    // Initialize the reviews carousel
    const reviewsCarousel = initReviewsCarousel();

    // Enhanced Gallery with better performance and mobile optimization
    function initGallery() {
        const galleryGrid = utils.safeQuery('.gallery-grid, .atmosphere-grid, .dishes-grid');
        if (!galleryGrid) return;

        const galleryItems = utils.safeQueryAll('.gallery-item, .atmosphere-card, .dish-card');

        // Enhanced loading animation with staggered effect
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('gallery-item-animate');

            // Add intersection observer for better performance
            const itemObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        itemObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            itemObserver.observe(item);
        });

        // Enhanced responsive layout optimization
        const updateGalleryLayout = utils.debounce(() => {
            const isMobile = window.innerWidth <= 768;
            const isTablet = window.innerWidth <= 1024;

                galleryItems.forEach(item => {
                if (isMobile) {
                    // Optimize for mobile - single column, better spacing
                    item.style.gridRow = 'span 1';
                    item.style.marginBottom = '1rem';
                } else if (isTablet) {
                    // Optimize for tablet
                    item.style.marginBottom = '1.5rem';
                } else {
                    // Desktop - maintain masonry-like layout
                    item.style.marginBottom = '2rem';
                }
            });

            // Update CSS custom properties for responsive design
            document.documentElement.style.setProperty('--gallery-gap', isMobile ? '1rem' : '2rem');
        }, 250);

        window.addEventListener('resize', updateGalleryLayout, { passive: true });
        updateGalleryLayout();
    }

    // Initialize enhanced gallery
    initGallery();

    // Enhanced Mobile Menu with better performance and accessibility
    class MobileMenu {
        constructor() {
            this.isOpen = false;
            this.toggleButton = utils.safeQuery('#mobile-menu-toggle');
            this.mobileMenu = utils.safeQuery('#mobile-menu');
            this.closeButton = utils.safeQuery('#mobile-menu-close');
            this.menuLinks = utils.safeQueryAll('.mobile-menu-link');
            this.body = document.body;

            this.init();
        }

        init() {
            if (!this.toggleButton || !this.mobileMenu || !this.closeButton) {
                console.warn('Mobile menu elements not found');
                return;
            }

            this.bindEvents();
            this.setupAccessibility();

            console.log('Enhanced mobile menu initialized successfully');
        }

        bindEvents() {
            // Toggle button with enhanced event handling
            this.toggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
                this.toggle();
        });

            // Close button
            this.closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
                this.close();
            });

            // Menu links - close menu when clicked
            this.menuLinks.forEach(link => {
                link.addEventListener('click', () => this.close());
            });

            // Enhanced keyboard support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });

            // Smart resize handling
            window.addEventListener('resize', utils.debounce(() => {
                if (window.innerWidth > 768 && this.isOpen) {
                    this.close();
                }
            }, 250), { passive: true });

            // Close menu when clicking outside (mobile)
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.mobileMenu.contains(e.target) && e.target !== this.toggleButton) {
                    this.close();
                }
            });

            // Prevent menu close when clicking inside menu
            this.mobileMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        setupAccessibility() {
            // Add ARIA attributes for better accessibility
            this.toggleButton.setAttribute('aria-expanded', 'false');
            this.toggleButton.setAttribute('aria-controls', 'mobile-menu');
            this.toggleButton.setAttribute('aria-label', 'Toggle mobile navigation menu');

            this.mobileMenu.setAttribute('aria-hidden', 'true');
            this.closeButton.setAttribute('aria-label', 'Close mobile navigation menu');

            // Update ARIA states when menu opens/closes
            const originalToggle = this.toggle.bind(this);
            this.toggle = () => {
                originalToggle();
                this.updateAriaStates();
            };

            const originalClose = this.close.bind(this);
            this.close = () => {
                originalClose();
                this.updateAriaStates();
            };
        }

        updateAriaStates() {
            this.toggleButton.setAttribute('aria-expanded', this.isOpen.toString());
            this.mobileMenu.setAttribute('aria-hidden', (!this.isOpen).toString());
        }

        open() {
            this.mobileMenu.classList.add('active');
            this.toggleButton.classList.add('active');
            this.body.style.overflow = 'hidden';
            this.isOpen = true;

            // Focus management for accessibility
            this.closeButton.focus();

            // Announce to screen readers
            this.announceToScreenReader('Menu opened');
        }

        close() {
            this.mobileMenu.classList.remove('active');
            this.toggleButton.classList.remove('active');
            this.body.style.overflow = '';
            this.isOpen = false;

            // Return focus to toggle button
            this.toggleButton.focus();

            // Announce to screen readers
            this.announceToScreenReader('Menu closed');
        }

        toggle() {
            if (this.isOpen) {
                this.close();
            } else {
                this.open();
            }
        }

        announceToScreenReader(message) {
            // Create a live region for screen reader announcements
            let liveRegion = utils.safeQuery('#mobile-menu-announcements');
            if (!liveRegion) {
                liveRegion = document.createElement('div');
                liveRegion.id = 'mobile-menu-announcements';
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                liveRegion.style.position = 'absolute';
                liveRegion.style.left = '-10000px';
                liveRegion.style.width = '1px';
                liveRegion.style.height = '1px';
                liveRegion.style.overflow = 'hidden';
                document.body.appendChild(liveRegion);
            }

            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // Initialize enhanced mobile menu
    const mobileMenu = new MobileMenu();

    // Enhanced Touch Support for better mobile experience
    function initTouchEnhancements() {
        // Enhanced touch feedback for interactive elements
        const interactiveElements = utils.safeQueryAll('.btn, .carousel-btn, .social-link, .share-btn, .nav-tab');

        interactiveElements.forEach(element => {
            // Add touch feedback with better visual response
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.96)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });

            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.transition = '';
                }, 150);
            }, { passive: true });
            
            element.addEventListener('touchcancel', function() {
                this.style.transform = '';
                this.style.transition = '';
            }, { passive: true });
        });

        // Optimize scrolling for touch devices
        const scrollableElements = utils.safeQueryAll('.gallery-grid, .reviews-carousel, .menu-items, .community-grid');
        scrollableElements.forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
            element.style.overscrollBehavior = 'contain';
        });

        // Prevent zoom on double tap for certain elements
        const noZoomElements = utils.safeQueryAll('.hero-section, .menu-hero, .about-hero, .catering-hero, .fun-hero, .careers-hero');
        noZoomElements.forEach(element => {
            element.addEventListener('touchend', function(e) {
                const now = Date.now();
                if (now - lastTouchEnd <= 300) {
                    e.preventDefault();
                }
                lastTouchEnd = now;
            }, { passive: false });
        });

        let lastTouchEnd = 0;
    }

    // Initialize touch enhancements
    initTouchEnhancements();

    // Enhanced Accessibility Features
    function initAccessibilityEnhancements() {
        // Enhanced carousel accessibility
        const carouselElements = {
            prevBtn: utils.safeQuery('.prev-btn'),
            nextBtn: utils.safeQuery('.next-btn'),
            dots: utils.safeQueryAll('.dot'),
            carousel: utils.safeQuery('.reviews-carousel')
        };

        if (carouselElements.prevBtn) {
            carouselElements.prevBtn.setAttribute('aria-label', 'Previous customer review');
        }
        if (carouselElements.nextBtn) {
            carouselElements.nextBtn.setAttribute('aria-label', 'Next customer review');
        }

        carouselElements.dots.forEach((dot, index) => {
            dot.setAttribute('aria-label', `Go to customer review ${index + 1}`);
            dot.setAttribute('role', 'button');
            dot.setAttribute('tabindex', '0');
        });

        // Enhanced keyboard navigation for carousel
        if (carouselElements.carousel) {
            carouselElements.carousel.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    // Focus management for carousel dots
                    const activeDot = carouselElements.carousel.querySelector('.dot.active');
                    if (activeDot) {
                        activeDot.focus();
                    }
                }
            });
        }

        // Add skip links for better navigation
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content id for skip link
        const mainContent = utils.safeQuery('main');
        if (mainContent) {
            mainContent.id = 'main-content';
        }
    }

    // Initialize accessibility enhancements
    initAccessibilityEnhancements();

    // Enhanced Dropdown Functionality (for any remaining dropdowns)
function initDropdowns() {
        const dropdowns = utils.safeQueryAll('.dropdown, .dropdown-header');

        dropdowns.forEach((dropdown, index) => {
            const header = dropdown.querySelector('.dropdown-header') || dropdown;
            const content = dropdown.querySelector('.dropdown-content');

            if (!header || !content) return;

            header.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

            const isActive = dropdown.classList.contains('active');
            
            // Close all other dropdowns
                utils.safeQueryAll('.dropdown').forEach(d => {
                    if (d !== dropdown) {
                d.classList.remove('active');
                    }
            });
            
            // Toggle current dropdown
                dropdown.classList.toggle('active', !isActive);
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                utils.safeQueryAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }

    // Initialize dropdowns
    initDropdowns();

    // Performance monitoring and optimization
    function initPerformanceOptimizations() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now() - startTime;
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);

            // Report performance if it takes too long
            if (loadTime > 3000) {
                console.warn('Page load time is over 3 seconds. Consider optimization.');
            }
        });

        // Monitor memory usage for large pages
        if ('memory' in performance) {
            const checkMemoryUsage = utils.throttle(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
                    console.warn('High memory usage detected:', memory);
                }
            }, 30000);

            setInterval(checkMemoryUsage, 30000);
        }

        // Optimize images loading
        const images = utils.safeQueryAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window && images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    // Initialize performance optimizations
    initPerformanceOptimizations();

    // Initialize all components
    const components = {
        heroSlider: initHeroSlider(),
        scrollAnimations: initScrollAnimations(),
        locationMap: initLocationMap(),
        reviewsCarousel: reviewsCarousel,
        gallery: initGallery(),
        mobileMenu: mobileMenu,
        touchEnhancements: initTouchEnhancements(),
        accessibility: initAccessibilityEnhancements(),
        dropdowns: initDropdowns(),
        performance: initPerformanceOptimizations()
    };

    // Make components globally accessible for debugging
    window.desiowebsite = {
        components,
        utils,
        version: '2.0.0',
        initialized: true
    };

    console.log('Enhanced Desìo website initialized successfully!', window.desiowebsite);
});

// Legacy functions for backward compatibility
function toggleDropdown(header) {
    console.warn('toggleDropdown is deprecated. Use the enhanced dropdown system.');
    if (header && header.parentElement) {
        header.parentElement.classList.toggle('active');
    }
} 