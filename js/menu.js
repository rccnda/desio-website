// Menu Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation functionality
    const menuNavButtons = document.querySelectorAll('.menu-nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    // Function to show a specific menu section
    function showMenuSection(targetId) {
        // Hide all sections
        menuSections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active class from all buttons
        menuNavButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-target="${targetId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    // Add click event listeners to navigation buttons
    menuNavButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            showMenuSection(targetId);
        });
    });

    // Keyboard navigation support
    menuNavButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                showMenuSection(targetId);
            }
        });
    });

    // URL hash navigation
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            showMenuSection(hash);
        }
    }

    // Handle initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Smooth scroll to section when clicking navigation
    menuNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Add a small delay to allow the section to become visible
                setTimeout(() => {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });

    // Add loading animation for menu sections
    function addLoadingAnimation(section) {
        section.classList.add('loading');
        setTimeout(() => {
            section.classList.remove('loading');
        }, 500);
    }

    // Enhanced hover effects for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Price highlighting effect
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });

        price.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Accessibility improvements
    menuNavButtons.forEach(button => {
        // Add ARIA labels
        const targetId = button.getAttribute('data-target');
        const buttonText = button.querySelector('.menu-nav-text').textContent;
        button.setAttribute('aria-label', `Show ${buttonText} menu section`);
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', 'false');
    });

    // Update ARIA states when sections change
    function updateAriaStates(activeTarget) {
        menuNavButtons.forEach(button => {
            const targetId = button.getAttribute('data-target');
            const isActive = targetId === activeTarget;
            button.setAttribute('aria-selected', isActive.toString());
        });
    }

    // Enhanced showMenuSection function with ARIA updates
    const originalShowMenuSection = showMenuSection;
    showMenuSection = function(targetId) {
        originalShowMenuSection(targetId);
        updateAriaStates(targetId);
    };

    // Mobile menu optimization
    function handleMobileMenu() {
        const menuNav = document.querySelector('.menu-navigation');
        const navButtons = document.querySelector('.menu-nav-buttons');
        
        if (window.innerWidth <= 768) {
            // Add horizontal scroll for mobile
            navButtons.style.overflowX = 'auto';
            navButtons.style.overflowY = 'hidden';
            navButtons.style.webkitOverflowScrolling = 'touch';
        } else {
            navButtons.style.overflowX = 'visible';
        }
    }

    // Handle window resize
    window.addEventListener('resize', handleMobileMenu);
    handleMobileMenu(); // Initial call

    // Add intersection observer for menu items
    const menuItemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe menu items for animation
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        menuItemObserver.observe(item);
    });

    // Add search functionality (optional enhancement)
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search menu items...';
        searchInput.className = 'menu-search';
        searchInput.style.cssText = `
            width: 100%;
            max-width: 400px;
            padding: 1rem;
            border: 2px solid var(--accent-color);
            border-radius: 25px;
            font-size: 1rem;
            margin: 2rem auto;
            display: block;
            background: white;
        `;

        const menuNav = document.querySelector('.menu-navigation .container');
        menuNav.appendChild(searchInput);

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const allMenuItems = document.querySelectorAll('.menu-item');

            allMenuItems.forEach(item => {
                const itemName = item.querySelector('h3').textContent.toLowerCase();
                const ingredients = item.querySelector('.ingredients').textContent.toLowerCase();
                
                if (itemName.includes(searchTerm) || ingredients.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Uncomment the line below to enable search functionality
    // addSearchFunctionality();
});
