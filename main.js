document.addEventListener('DOMContentLoaded', function() {
    // Initialize accessibility enhancements
    enhanceAccessibility();

    // Initialize Swiper for the hero section
    if (document.querySelector('.hero-slider')) {
        new Swiper('.hero-slider', {
            loop: true, // Enable continuous loop
            autoplay: {
                delay: 5000, // 5 seconds between slides
                disableOnInteraction: false, // Autoplay continues even after user interaction
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
    }

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
}); 