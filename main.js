document.addEventListener('DOMContentLoaded', function() {
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

    // GSAP staggered menu animation
    if (window.gsap) {
        gsap.from('nav ul li', {
            opacity: 0,
            y: -30,
            stagger: 0.15,
            duration: 0.7,
            ease: 'power2.out',
            delay: 0.7
        });
    }

    // --- LOGO SVG DRAW-IN & BOUNCE with fallback ---
    const logoSvg = document.getElementById('logo-svg');
    fetch('assets/images/logo_animation.svg')
      .then(res => res.text())
      .then(svg => {
        if (logoSvg) logoSvg.innerHTML = svg;
        const paths = document.querySelectorAll('#logo-svg path');
        paths.forEach(path => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
          path.style.stroke = '#005728';
          path.style.fill = 'none';
          path.style.transition = 'fill 0.5s';
        });
        if (window.gsap) {
          gsap.to('#logo-svg path', {
            strokeDashoffset: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power2.out',
            onComplete: () => {
              paths.forEach(path => path.style.fill = '#005728');
            }
          });
          // Bounce on load
          gsap.fromTo('#logo-svg', {y: -30, scale: 0.9}, {y: 0, scale: 1, duration: 0.7, ease: 'bounce.out', delay: 1.2});
          // Bounce on hover
          logoSvg.addEventListener('mouseenter', () => {
            gsap.fromTo('#logo-svg', {y: 0, scale: 1}, {y: -18, scale: 1.08, duration: 0.3, yoyo: true, repeat: 1, ease: 'power1.inOut'});
          });
        }
      })
      .catch(() => {
        // Fallback to PNG if SVG fails
        const png = document.querySelector('.logo-img-png');
        if (png) png.style.display = 'block';
      });

    // --- FLOATING PASTA ICON ---
    // Use pasta_icon.svg directly
    if (window.gsap) {
      const pastaIcon = document.querySelector("img[src*='pasta_icon.svg']");
      if (pastaIcon) {
        gsap.to(pastaIcon, {
          y: -18,
          repeat: -1,
          yoyo: true,
          duration: 2.5,
          ease: 'sine.inOut',
          delay: 0.5
        });
      }
    }

    // --- PARALLAX SCROLL EFFECTS ---
    if (window.gsap && window.ScrollTrigger) {
      gsap.to('.floating-pasta', {
        y: -40,
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      });
    }

    // --- Footer background SVG parallax ---
    const footerBg = document.querySelector('.footer-bg');
    if (footerBg && window.gsap && window.ScrollTrigger) {
      // Removed as footer-bg is no longer used
    }

    // --- FOOTER ANIMATIONS ---
    if (window.gsap) {
      gsap.from('.footer-main h2', {opacity: 0, y: 30, scale: 0.8, duration: 1.1, ease: 'elastic.out(1,0.6)', delay: 0.7});
      gsap.from('.footer-policies, .footer-kvk, .footer-social', {opacity: 0, y: 40, duration: 1.1, stagger: 0.18, ease: 'power2.out', delay: 1.1});
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

    // Newsletter Pop-up Logic
    const newsletterPopup = document.getElementById('newsletter-popup');
    const closePopupBtn = document.querySelector('.newsletter-popup .close-popup');
    const newsletterPopupForm = document.getElementById('newsletter-popup-form');
    let newsletterShownSession = sessionStorage.getItem('newsletterShown') === 'yes';

    function showNewsletterPopup() {
      if (!newsletterShownSession && newsletterPopup) {
        newsletterPopup.classList.add('active');
        newsletterShownSession = true;
        sessionStorage.setItem('newsletterShown', 'yes');
      }
    }

    if (closePopupBtn) {
      closePopupBtn.addEventListener('click', () => {
        newsletterPopup.classList.remove('active');
      });
    }

    if (newsletterPopupForm) {
      newsletterPopupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // You can add logic here to handle form submission (e.g., send to an API)
        alert('Thank you for subscribing!'); // Placeholder for success message
        newsletterPopup.classList.remove('active');
      });
    }

    // Show newsletter pop-up after a delay on scroll, only once per session
    window.addEventListener('scroll', () => {
      if (!newsletterShownSession && window.scrollY > 200) { // Adjust scroll threshold as needed
        setTimeout(showNewsletterPopup, 3000); // Show after 3 seconds of scrolling
      }
    }, { once: true }); // Ensure this event listener only fires once

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
        return;
      }
      
      if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
      } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
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

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Loading Animation
    if (loadingOverlay) {
      window.addEventListener('load', () => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
          loadingOverlay.style.display = 'none';
        }, 500);
      });
    }

    // --- Store Page Newsletter Form ---
    const storeNewsletterForm = document.querySelector('.store-newsletter .newsletter-form');
    if (storeNewsletterForm) {
        storeNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing!'); // Or some other feedback
            storeNewsletterForm.reset();
        });
    }

    // Image hover effects
    document.querySelectorAll('.image-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('img').style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Dish card hover effects
    document.querySelectorAll('.dish-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Cookie Management
    class CookieManager {
        constructor() {
            this.cookieConsent = document.getElementById('cookieConsent');
            this.cookieSettingsModal = document.getElementById('cookieSettingsModal');
            this.necessaryCookies = document.getElementById('necessaryCookies');
            this.analyticsCookies = document.getElementById('analyticsCookies');
            this.marketingCookies = document.getElementById('marketingCookies');
            
            this.initializeEventListeners();
            this.checkCookieConsent();
        }

        initializeEventListeners() {
            // Accept All button
            document.getElementById('acceptAllCookies').addEventListener('click', () => {
                this.acceptAllCookies();
            });

            // Customize button
            document.getElementById('customizeCookies').addEventListener('click', () => {
                this.openCookieSettings();
            });

            // Close settings modal
            document.getElementById('closeCookieSettings').addEventListener('click', () => {
                this.closeCookieSettings();
            });

            // Save preferences
            document.getElementById('saveCookiePreferences').addEventListener('click', () => {
                this.saveCookiePreferences();
            });

            // Reject all
            document.getElementById('rejectAllCookies').addEventListener('click', () => {
                this.rejectAllCookies();
            });
        }

        checkCookieConsent() {
            const consent = this.getCookie('cookie_consent');
            if (!consent) {
                this.showCookieConsent();
            } else {
                this.loadCookiePreferences();
            }
        }

        showCookieConsent() {
            this.cookieConsent.classList.add('active');
        }

        hideCookieConsent() {
            this.cookieConsent.classList.remove('active');
        }

        openCookieSettings() {
            this.cookieSettingsModal.classList.add('active');
            this.hideCookieConsent();
        }

        closeCookieSettings() {
            this.cookieSettingsModal.classList.remove('active');
        }

        acceptAllCookies() {
            this.setCookie('cookie_consent', 'all', 365);
            this.setCookie('analytics_cookies', 'true', 365);
            this.setCookie('marketing_cookies', 'true', 365);
            this.hideCookieConsent();
            this.initializeCookies();
        }

        rejectAllCookies() {
            this.setCookie('cookie_consent', 'necessary', 365);
            this.setCookie('analytics_cookies', 'false', 365);
            this.setCookie('marketing_cookies', 'false', 365);
            this.closeCookieSettings();
            this.initializeCookies();
        }

        saveCookiePreferences() {
            const analytics = this.analyticsCookies.checked;
            const marketing = this.marketingCookies.checked;
            
            this.setCookie('cookie_consent', 'custom', 365);
            this.setCookie('analytics_cookies', analytics.toString(), 365);
            this.setCookie('marketing_cookies', marketing.toString(), 365);
            
            this.closeCookieSettings();
            this.initializeCookies();
        }

        loadCookiePreferences() {
            const analytics = this.getCookie('analytics_cookies') === 'true';
            const marketing = this.getCookie('marketing_cookies') === 'true';
            
            this.analyticsCookies.checked = analytics;
            this.marketingCookies.checked = marketing;
            
            this.initializeCookies();
        }

        initializeCookies() {
            const analytics = this.getCookie('analytics_cookies') === 'true';
            const marketing = this.getCookie('marketing_cookies') === 'true';

            // Initialize analytics if consented
            if (analytics) {
                this.initializeAnalytics();
            }

            // Initialize marketing if consented
            if (marketing) {
                this.initializeMarketing();
            }
        }

        initializeAnalytics() {
            // Initialize Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'granted'
                });
            }
        }

        initializeMarketing() {
            // Initialize Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('consent', 'grant');
            }
        }

        setCookie(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = `expires=${date.toUTCString()}`;
            document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
        }

        getCookie(name) {
            const nameEQ = `${name}=`;
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }

        deleteCookie(name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
    }

    // Initialize cookie manager when DOM is loaded
    const cookieManager = new CookieManager();

    // --- LEAFLET MAP INITIALIZATION (for desio.html) ---
    const storeMapElement = document.getElementById('store-map');
    if (storeMapElement && typeof L !== 'undefined') {
      fetch('assets/data/location_map.json')
        .then(response => response.json())
        .then(data => {
          const groningenLocation = data.locations.find(loc => loc.id === 'groningen');
          if (groningenLocation) {
            const { lat, lng } = groningenLocation.coordinates;
            const address = groningenLocation.address;

            const map = L.map('store-map').setView([lat, lng], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(`Desio Groningen<br>${address}`)
                .openPopup();
          }
        })
        .catch(error => console.error('Error loading location data:', error));
    }

    // --- SCROLL REVEAL ANIMATIONS ---
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

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
    }
}); 