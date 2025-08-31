document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper with lazy loading
    const heroSlider = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        lazy: {
            loadPrevNext: true,
            loadPrevNextAmount: 1,
        },
        preloadImages: false,
        watchSlidesProgress: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
        // Optimize for mobile
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 0,
            }
        }
    });

    // Scroll Animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => scrollObserver.observe(el));
    }

    // Initialize scroll animations
    animateOnScroll();

    // Initialize Leaflet Map for homepage location section
    if (document.getElementById('map')) {
        // Check if Leaflet is available
        if (typeof L !== 'undefined') {
            // Create the custom map
            const map = L.map('map', {
                scrollWheelZoom: false,
                zoomControl: false
            }).setView([53.21495, 6.56885], 16);

            // Add custom tile layer
            L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);

            // Create custom marker icon
            const customMarker = L.icon({
                iconUrl: 'assets/images/map_marker.png',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            });

            // Add marker with popup
            L.marker([53.21495, 6.56885], { icon: customMarker }).addTo(map)
                .bindPopup(`
                    <div style="text-align: center; padding: 10px;">
                        <h3 style="margin: 0 0 10px 0; color: #2C5530;">📍 Desio</h3>
                        <p style="margin: 0 0 8px 0; font-size: 14px;">Herestraat, Groningen</p>
                        <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;">Open daily 12:00-21:00</p>
                        <a href="https://maps.app.goo.gl/jsGu7BLtxVCqFXnn9" 
                           target="_blank" 
                           style="color: #2C5530; text-decoration: none; font-weight: bold; font-size: 12px;">
                            View on Google Maps →
                        </a>
                    </div>
                `)
                .openPopup();

            // Disable zoom controls for mobile
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
        } else {
            // Fallback if Leaflet is not available
            const mapContainer = document.getElementById('map');
            if (mapContainer) {
                mapContainer.innerHTML = `
                    <div style="
                        width: 100%; 
                        height: 100%; 
                        background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 10px;
                        color: #666;
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 20px;
                    ">
                        <div>
                            <div style="font-size: 24px; margin-bottom: 10px;">📍</div>
                            <div style="font-weight: bold; margin-bottom: 5px;">Desio Location</div>
                            <div>Herestraat, Groningen</div>
                            <div style="margin-top: 10px; font-size: 14px;">
                                <a href="https://maps.app.goo.gl/jsGu7BLtxVCqFXnn9" 
                                   target="_blank" 
                                   style="color: #2C5530; text-decoration: none; font-weight: bold;">
                                    View on Google Maps →
                                </a>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }

    // Enhanced Reviews Carousel
    let currentReviewIndex = 0;
    const reviews = document.querySelectorAll('.review-card');
    const reviewsTrack = document.querySelector('.reviews-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (reviews.length > 0 && reviewsTrack) {
        // Initialize reviews carousel
        function showReview(index) {
            // Update active review
            reviews.forEach((review, i) => {
                review.classList.toggle('active', i === index);
            });
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            // Update current index
            currentReviewIndex = index;
            
            // Update navigation buttons
            if (prevBtn) prevBtn.disabled = index === 0;
            if (nextBtn) nextBtn.disabled = index === reviews.length - 1;
        }
        
        // Navigation functions
        function nextReview() {
            const nextIndex = (currentReviewIndex + 1) % reviews.length;
            showReview(nextIndex);
        }
        
        function prevReview() {
            const prevIndex = currentReviewIndex === 0 ? reviews.length - 1 : currentReviewIndex - 1;
            showReview(prevIndex);
        }
        
        // Event listeners for navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', nextReview);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevReview);
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showReview(index));
        });
        
        // Touch/Swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        function handleTouchStart(e) {
            startX = e.touches[0].clientX;
        }
        
        function handleTouchEnd(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next review
                    nextReview();
                } else {
                    // Swipe right - previous review
                    prevReview();
                }
            }
        }
        
        // Add touch events to reviews track
        reviewsTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
        reviewsTrack.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevReview();
            } else if (e.key === 'ArrowRight') {
                nextReview();
            }
        });
        
        // Auto-advance reviews
        let autoAdvanceInterval = setInterval(nextReview, 8000);
        
        // Pause auto-advance on hover
        reviewsTrack.addEventListener('mouseenter', () => {
            clearInterval(autoAdvanceInterval);
        });
        
        reviewsTrack.addEventListener('mouseleave', () => {
            autoAdvanceInterval = setInterval(nextReview, 8000);
        });
        
        // Initialize first review
        showReview(0);
    }

    // Enhanced Gallery Masonry Layout
    function initMasonryGallery() {
        const galleryGrid = document.querySelector('.gallery-grid');
        if (!galleryGrid) return;

        // Add loading animation to gallery items
        const galleryItems = galleryGrid.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('gallery-item-animate');
        });

        // Optimize gallery for mobile
        function updateGalleryLayout() {
            if (window.innerWidth <= 768) {
                // Reset masonry on mobile for better mobile experience
                galleryItems.forEach(item => {
                    item.style.gridRow = 'span 1';
                });
            }
        }

        window.addEventListener('resize', updateGalleryLayout);
        updateGalleryLayout();
    }

    // Initialize gallery
    initMasonryGallery();

    // Enhanced Hamburger Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const body = document.body;

    // Create mobile menu overlay
    const mobileMenuOverlay = document.createElement('div');
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileMenuOverlay);

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.contains('active');
        
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        // Prevent background scrolling
        if (!isActive) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
        } else {
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
    }

    // Event listeners for mobile menu
    if (hamburger && mobileMenu && mobileMenuClose) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });

        // Close menu when clicking overlay
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // Enhanced Touch Support for Mobile
    function enhanceTouchSupport() {
        // Add touch feedback to buttons
        const buttons = document.querySelectorAll('.btn, .carousel-btn, .social-link');
        
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            }, { passive: true });
        });

        // Improve touch scrolling
        const scrollableElements = document.querySelectorAll('.gallery-grid, .reviews-carousel');
        scrollableElements.forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
        });
    }

    // Initialize touch enhancements
    enhanceTouchSupport();

    // Accessibility enhancements
    function enhanceAccessibility() {
        // Add ARIA labels to carousel buttons
        if (prevBtn) prevBtn.setAttribute('aria-label', 'Previous review');
        if (nextBtn) nextBtn.setAttribute('aria-label', 'Next review');
        
        // Add ARIA labels to dots
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.setAttribute('aria-label', `Go to review ${index + 1}`);
            });
        }
    }

    // Initialize accessibility enhancements
    enhanceAccessibility();
}); 