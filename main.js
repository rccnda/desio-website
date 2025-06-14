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
            window.location.href = 'menu.html';
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
            setTimeout(showNewsletterModal, 2000);
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
    if (window.gsap) {
      gsap.to('.floating-pasta', {
        y: -18,
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: 'sine.inOut',
        delay: 0.5
      });
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
    document.querySelectorAll('.typewriter').forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      gsap.to({}, {duration: 0.2}); // slight delay
      text.split('').forEach((char, i) => {
        setTimeout(() => {
          el.textContent += char;
        }, 40 * i);
      });
    });
}); 