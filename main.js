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
            // Add your action here when the button is clicked
            console.log('Hungry button clicked!');
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
}); 