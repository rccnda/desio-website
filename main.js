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

    // Reviews Carousel with Touch/Swipe Support
    let currentReviewIndex = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function showReview(index) {
      const reviews = document.querySelectorAll('.review-card');
      const dots = document.querySelectorAll('.dot');
      
      // Hide all reviews
      reviews.forEach(review => {
        review.classList.remove('active');
      });
      
      // Remove active class from all dots
      dots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      // Show current review and activate corresponding dot
      if (reviews[index]) {
        reviews[index].classList.add('active');
        if (dots[index]) {
          dots[index].classList.add('active');
        }
      }
      
      currentReviewIndex = index;
    }

    function nextReview() {
      const reviews = document.querySelectorAll('.review-card');
      const nextIndex = (currentReviewIndex + 1) % reviews.length;
      showReview(nextIndex);
    }

    function prevReview() {
      const reviews = document.querySelectorAll('.review-card');
      const prevIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
      showReview(prevIndex);
    }

    // Touch/Swipe Event Handlers
    function handleTouchStart(e) {
      startX = e.touches[0].clientX;
      isDragging = true;
      
      // Add visual feedback
      const activeReview = document.querySelector('.review-card.active');
      if (activeReview) {
        activeReview.style.transition = 'none';
      }
    }

    function handleTouchMove(e) {
      if (!isDragging) return;
      
      currentX = e.touches[0].clientX;
      const diffX = currentX - startX;
      
      // Add visual feedback during swipe
      const activeReview = document.querySelector('.review-card.active');
      if (activeReview && Math.abs(diffX) > 10) {
        activeReview.style.transform = `translateX(${diffX * 0.3}px)`;
      }
    }

    function handleTouchEnd(e) {
      if (!isDragging) return;
      
      isDragging = false;
      const diffX = currentX - startX;
      const threshold = 50; // Minimum swipe distance
      
      // Reset transform
      const activeReview = document.querySelector('.review-card.active');
      if (activeReview) {
        activeReview.style.transition = 'all 0.4s ease';
        activeReview.style.transform = 'translateX(0)';
      }
      
      // Determine swipe direction and navigate
      if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
          // Swipe right - go to previous review
          prevReview();
        } else {
          // Swipe left - go to next review
          nextReview();
        }
      }
    }

      // Initialize Reviews Carousel
  function initReviewsCarousel() {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (reviews.length === 0) return;
    
    // Show first review by default
    showReview(0);
    
    // Add event listeners for navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', prevReview);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', nextReview);
    }
    
    // Add event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showReview(index));
    });
    
    // Add touch/swipe event listeners
    const carousel = document.querySelector('.reviews-carousel');
    if (carousel) {
      carousel.addEventListener('touchstart', handleTouchStart, { passive: false });
      carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
      carousel.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    
    // Auto-advance reviews every 5 seconds
    let autoAdvanceInterval = setInterval(nextReview, 5000);
    
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoAdvanceInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      autoAdvanceInterval = setInterval(nextReview, 5000);
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevReview();
      } else if (e.key === 'ArrowRight') {
        nextReview();
      }
    });
  }
  
  // Call the initialization function
  initReviewsCarousel();

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

    // Simple Mobile Menu - Bulletproof Implementation
    function initSimpleMobileMenu() {
        const toggleButton = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeButton = document.getElementById('mobile-menu-close');
        const menuLinks = document.querySelectorAll('.mobile-menu-link');
        const body = document.body;

        // Check if elements exist
        if (!toggleButton || !mobileMenu || !closeButton) {
            console.error('Mobile menu elements not found!', {
                toggleButton: !!toggleButton,
                mobileMenu: !!mobileMenu,
                closeButton: !!closeButton
            });
            return;
        }

        console.log('Mobile menu elements found successfully:', {
            toggleButton: toggleButton,
            mobileMenu: mobileMenu,
            closeButton: closeButton
        });

        let isOpen = false;

        // Open menu
        function openMenu() {
            mobileMenu.classList.add('active');
            toggleButton.classList.add('active');
            body.style.overflow = 'hidden';
            isOpen = true;
        }

        // Close menu
        function closeMenu() {
            mobileMenu.classList.remove('active');
            toggleButton.classList.remove('active');
            body.style.overflow = '';
            isOpen = false;
        }

        // Toggle menu
        function toggleMenu() {
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Event listeners
        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu toggle clicked!');
            toggleMenu();
        });

        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });

        // Close menu when clicking on links
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        });

        // Close menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isOpen) {
                closeMenu();
            }
        });

        // Make functions globally accessible for debugging
        window.mobileMenu = {
            open: openMenu,
            close: closeMenu,
            toggle: toggleMenu,
            isOpen: () => isOpen
        };

        console.log('Simple mobile menu initialized successfully');
    }

    // Initialize simple mobile menu
    initSimpleMobileMenu();

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