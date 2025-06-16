document.addEventListener('DOMContentLoaded', function() {
    // Add typewriter animation to text elements
    const textElements = document.querySelectorAll('.text-content h1, .text-content p');
    textElements.forEach(element => {
        element.classList.add('typewriter');
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

    // --- LOADING OVERLAY: Only on first visit to homepage ---
    const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
    const loadingOverlay = document.getElementById('loading-overlay');
    if (isHome) {
        if (!sessionStorage.getItem('desioLoaded')) {
            if (loadingOverlay) loadingOverlay.style.display = 'flex';
            window.addEventListener('load', function() {
                setTimeout(function() {
                    if (loadingOverlay) loadingOverlay.classList.add('fade-out');
                    sessionStorage.setItem('desioLoaded', 'yes');
                }, 600);
            });
        } else {
            if (loadingOverlay) loadingOverlay.style.display = 'none';
        }
    } else {
        if (loadingOverlay) loadingOverlay.style.display = 'none';
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

    // --- NEWSLETTER MODAL: Only once per session ---
    let newsletterShown = sessionStorage.getItem('newsletterShown') === 'yes';
    function showNewsletterModal() {
        if (!newsletterShown) {
            document.getElementById('newsletter-modal').classList.add('active');
            newsletterShown = true;
            sessionStorage.setItem('newsletterShown', 'yes');
        }
    }
    window.addEventListener('scroll', function() {
        if (!newsletterShown && window.scrollY > 50) {
            setTimeout(showNewsletterModal, 5000);
        }
    });
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            document.getElementById('newsletter-modal').classList.remove('active');
        });
    }
    const newsletterForm = document.querySelector('#newsletter-modal form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('newsletter-modal').classList.remove('active');
            // Optionally show a thank you message
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

    // --- TYPEWRITER/LETTER REVEAL ---
    if (window.gsap && window.SplitText) {
      document.querySelectorAll('.typewriter').forEach(el => {
        const split = new SplitText(el, {type: 'words,chars'});
        gsap.set(el, {perspective:400});
        gsap.from(split.chars, {
          duration: 1.2,
          opacity:0,
          scale:0,
          y:80,
          rotationX:180,
          transformOrigin:"0% 50% -50",
          ease:"back",
          stagger: 0.03
        });
      });
    }

    // --- Footer background SVG parallax ---
    const footerBg = document.querySelector('.footer-bg');
    if (footerBg && window.gsap && window.ScrollTrigger) {
      gsap.to(footerBg, {
        y: 60,
        opacity: 0.28,
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 0.7
        }
      });
    }

    // --- FOOTER ANIMATIONS ---
    if (window.gsap) {
      gsap.from('.footer-main h2', {opacity: 0, y: 30, scale: 0.8, duration: 1.1, ease: 'elastic.out(1,0.6)', delay: 0.7});
      gsap.from('.footer-policies, .footer-kvk, .footer-social', {opacity: 0, y: 40, duration: 1.1, stagger: 0.18, ease: 'power2.out', delay: 1.1});
      gsap.from('.footer-bg img', {opacity: 0, y: 60, scale: 1.1, duration: 1.2, ease: 'power2.out', delay: 0.5});
    }

    // --- MENU PAGE: Button scroll to section ---
    document.querySelectorAll('.menu-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById(this.dataset.target);
        if (target) {
          target.scrollIntoView({behavior: 'smooth', block: 'start'});
        }
        document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

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

    // Newsletter modal
    const newsletterModal = document.querySelector('.newsletter-modal');
    const closeModal = document.querySelector('.close-modal');
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterModal && closeModal) {
        // Show modal after 5 seconds
        setTimeout(() => {
            if (!localStorage.getItem('newsletterShown')) {
                newsletterModal.classList.add('active');
            }
        }, 5000);

        // Close modal
        closeModal.addEventListener('click', () => {
            newsletterModal.classList.remove('active');
            localStorage.setItem('newsletterShown', 'true');
        });

        // Close on outside click
        newsletterModal.addEventListener('click', (e) => {
            if (e.target === newsletterModal) {
                newsletterModal.classList.remove('active');
                localStorage.setItem('newsletterShown', 'true');
            }
        });

        // Handle form submission
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                // Here you would typically send the email to your backend
                console.log('Newsletter signup:', email);
                newsletterModal.classList.remove('active');
                localStorage.setItem('newsletterShown', 'true');
                // Show success message
                alert('Thank you for subscribing to our newsletter!');
            });
        }
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
}); 