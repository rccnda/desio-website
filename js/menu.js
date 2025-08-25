// Menu Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation functionality
    const menuNavButtons = document.querySelectorAll('.menu-nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    const modal = document.getElementById('dish-modal');
    const closeModal = document.querySelector('.close-modal');

    // Dish data with stories and detailed information
    const dishData = {
        'ragu-bolognese': {
            name: 'Ragù Bolognese',
            price: '€11',
            image: 'assets/images/pasta_placeholder_1.png',
            ingredients: 'Beef, tomato sauce, onion, carrots, celery, laurel, oil, s/p',
            story: 'Our Ragù Bolognese is a tribute to the traditional recipe from Bologna, the culinary heart of Italy. This slow-cooked meat sauce has been perfected over generations, combining tender beef with aromatic vegetables and herbs. The secret lies in the long simmering process that allows all flavors to meld together, creating a rich, hearty sauce that clings perfectly to our fresh pasta.',
            allergies: ['🥩 Meat', '🌾 Gluten']
        },
        'brasato': {
            name: 'Brasato',
            price: '€11',
            image: 'assets/images/pasta_placeholder_2.png',
            ingredients: 'Braised beef, garlic, sage, rosemary, tomatoes, carrots, red wine',
            story: 'Brasato, meaning "braised" in Italian, represents the art of slow cooking that defines Italian comfort food. Our beef is carefully braised in red wine with aromatic herbs until it becomes fork-tender. This method, perfected in Northern Italy, transforms simple ingredients into a dish of extraordinary depth and flavor, perfect for those seeking authentic Italian warmth.',
            allergies: ['🥩 Meat', '🌾 Gluten', '🍷 Wine']
        },
        'puttanesca': {
            name: 'Puttanesca',
            price: '€9',
            image: 'assets/images/pasta_placeholder_3.png',
            ingredients: 'Tomatoes sauce with oregano, olives, capers and garlic.',
            story: 'Puttanesca sauce has a fascinating history from Naples, where it was created by resourceful cooks using pantry staples. The bold combination of olives, capers, and garlic creates a sauce that\'s both simple and sophisticated. Despite its humble origins, this dish has become a beloved classic, representing the ingenuity and passion of Italian cooking.',
            allergies: ['🌾 Gluten', '🌱 Vegan']
        },
        'pesto': {
            name: 'Pesto',
            price: '€11',
            image: 'assets/images/pasta_placeholder_1.png',
            ingredients: 'Basil, pine nuts, parmesan, garlic, olive oil',
            story: 'Our pesto is made fresh daily using the traditional Genovese method from Liguria. We hand-crush fresh basil leaves with pine nuts, aged Parmigiano-Reggiano, and garlic to create a vibrant, aromatic sauce. This ancient technique preserves the essential oils and flavors, resulting in a pesto that\'s both authentic and unforgettable.',
            allergies: ['🌾 Gluten', '🥛 Dairy', '🥜 Nuts']
        },
        'salmone': {
            name: 'Salmone',
            price: '€11',
            image: 'assets/images/pasta_placeholder_2.png',
            ingredients: 'Salmon, cream, dill, lemon, white wine',
            story: 'Our salmon pasta celebrates the coastal influences of Italian cuisine. Fresh salmon is gently poached in white wine and finished with a light cream sauce infused with dill and lemon. This dish reflects the Italian love for seafood and showcases how simple, quality ingredients can create a dish of remarkable elegance and flavor.',
            allergies: ['🐟 Fish', '🌾 Gluten', '🥛 Dairy']
        },
        'pomodoro': {
            name: 'Pomodoro',
            price: '€9',
            image: 'assets/images/pasta_placeholder_3.png',
            ingredients: 'Fresh tomatoes, basil, garlic, olive oil',
            story: 'Pomodoro sauce is the essence of Italian simplicity and tradition. Made with vine-ripened tomatoes, fresh basil, and extra virgin olive oil, this sauce celebrates the natural sweetness of tomatoes. It\'s a testament to the Italian philosophy that the best dishes are those that let quality ingredients speak for themselves.',
            allergies: ['🌾 Gluten', '🌱 Vegan']
        },
        'tonno': {
            name: 'Tonno',
            price: '€11',
            image: 'assets/images/pasta_placeholder_1.png',
            ingredients: 'Tuna, cherry tomatoes, olives, capers',
            story: 'Our tonno pasta draws inspiration from the coastal regions of Sicily and Sardinia, where tuna fishing has been a tradition for centuries. The combination of fresh tuna with Mediterranean staples like olives and capers creates a dish that\'s both light and satisfying, perfect for warm days when you crave the taste of the Italian coast.',
            allergies: ['🐟 Fish', '🌾 Gluten']
        },
        'panini-brasato': {
            name: 'Brasato Panini',
            price: '€10',
            image: 'assets/images/panino_brasato.png',
            ingredients: 'Braised beef, caramelized onions, carrots, celery, red wine, mustard, sage, rosemary, s/p',
            story: 'Our Brasato panini transforms the classic braised beef into a portable masterpiece. The tender beef is complemented by caramelized onions and a hint of mustard, creating a sandwich that\'s both sophisticated and satisfying. This panini represents the perfect marriage of traditional Italian cooking with modern convenience.',
            allergies: ['🥩 Meat', '🌾 Gluten', '🍷 Wine']
        },
        'prosciutto-crudo': {
            name: 'Prosciutto Crudo',
            price: '€10',
            image: 'assets/images/pasta_placeholder_2.png',
            ingredients: 'Cured ham, burrata, sun-dried tomatoes, salad, balsamic',
            story: 'Prosciutto Crudo, Italy\'s most celebrated cured meat, takes center stage in this elegant panini. Paired with creamy burrata and sun-dried tomatoes, this combination showcases the Italian art of balancing flavors and textures. Each bite reveals the careful craftsmanship that goes into creating this timeless Italian classic.',
            allergies: ['🥩 Meat', '🌾 Gluten', '🥛 Dairy']
        },
        'mortadella': {
            name: 'Mortadella',
            price: '€8',
            image: 'assets/images/pasta_placeholder_3.png',
            ingredients: 'Italian mortadella with pistachios, cream cheese, truffle mayo, salad',
            story: 'Mortadella, the pride of Bologna, is elevated in our panini with the addition of pistachios and truffle mayo. This combination celebrates the rich culinary heritage of Emilia-Romagna, where mortadella has been crafted for centuries. The subtle truffle notes add a touch of luxury to this traditional Italian favorite.',
            allergies: ['🥩 Meat', '🌾 Gluten', '🥛 Dairy', '🥜 Nuts']
        },
        'panini-pesto': {
            name: 'Pesto Panini',
            price: '€10',
            image: 'assets/images/pasta_placeholder_1.png',
            ingredients: 'Fresh homemade pesto, burrata, tomatoes',
            story: 'Our Pesto Panini brings the vibrant flavors of Liguria to your hands. Fresh basil pesto is paired with creamy burrata and ripe tomatoes, creating a sandwich that\'s both refreshing and indulgent. This panini captures the essence of Italian summer and the Mediterranean lifestyle.',
            allergies: ['🌾 Gluten', '🥛 Dairy', '🥜 Nuts']
        },
        'panini-salmone': {
            name: 'Salmone Panini',
            price: '€10',
            image: 'assets/images/pasta_placeholder_2.png',
            ingredients: 'Smoked salmon, cream cheese, cucumber cream salad, dill oil',
            story: 'Our Salmone Panini offers a sophisticated take on the classic salmon sandwich. Smoked salmon is paired with a refreshing cucumber cream salad and finished with dill oil, creating a combination that\'s both elegant and satisfying. This panini reflects the Italian love for fresh, quality ingredients.',
            allergies: ['🐟 Fish', '🌾 Gluten', '🥛 Dairy']
        },
        'panini-tonno': {
            name: 'Tonno Panini',
            price: '€8',
            image: 'assets/images/pasta_placeholder_3.png',
            ingredients: 'Tuna, capers, mayo, olives',
            story: 'The Tonno Panini celebrates the Mediterranean tradition of tuna fishing. Fresh tuna is combined with briny capers and olives, creating a flavor profile that\'s both bold and balanced. This panini represents the coastal Italian lifestyle and the importance of preserving traditional flavors.',
            allergies: ['🐟 Fish', '🌾 Gluten', '🥚 Eggs']
        },
        'caprese-burrata': {
            name: 'Caprese with Burrata',
            price: '€8',
            image: 'assets/images/pasta_placeholder_1.png',
            ingredients: 'Fresh burrata, tomatoes, basil, balsamic, oil, salt, pepper',
            story: 'Our Caprese with Burrata is a celebration of Italian simplicity and the beauty of fresh ingredients. Burrata, the creamy cousin of mozzarella, adds luxurious texture to this classic salad. This dish represents the Italian philosophy that the best food comes from respecting and highlighting natural flavors.',
            allergies: ['🥛 Dairy', '🥬 Vegetarian']
        },
        'parmigiano': {
            name: 'Parmigiano Cheese',
            price: '€0.5',
            image: 'assets/images/pasta_placeholder_2.png',
            ingredients: 'Aged 24 months, grated fresh',
            story: 'Parmigiano-Reggiano, the "King of Cheeses," is aged for 24 months to develop its complex, nutty flavor. This cheese has been produced in the same way for over 800 years in the Parma region. Each piece represents centuries of tradition and the dedication of Italian cheesemakers to preserving authentic methods.',
            allergies: ['🥛 Dairy', '🥬 Vegetarian']
        }
    };

    // Function to update ARIA states when sections change
    function updateAriaStates(activeTarget) {
        menuNavButtons.forEach(button => {
            const targetId = button.getAttribute('data-target');
            const isActive = targetId === activeTarget;
            button.setAttribute('aria-selected', isActive.toString());
        });
    }

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

        // Update ARIA states
        updateAriaStates(targetId);
    }

    // Function to show dish modal
    function showDishModal(dishId) {
        
        const dish = dishData[dishId];
        if (!dish) {
            return;
        }

        // Populate modal content
        document.getElementById('modal-dish-image').src = dish.image;
        document.getElementById('modal-dish-image').alt = dish.name;
        document.getElementById('modal-dish-name').textContent = dish.name;
        document.getElementById('modal-dish-price').textContent = dish.price;
        document.getElementById('modal-dish-ingredients').textContent = dish.ingredients;
        document.getElementById('modal-dish-story').textContent = dish.story;

        // Populate allergies
        const allergiesContainer = document.getElementById('modal-dish-allergies');
        allergiesContainer.innerHTML = dish.allergies.map(allergy => 
            `<span class="allergy-tag">${allergy}</span>`
        ).join('');

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
    }

    // Function to close modal
    function closeDishModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Add click event listeners to navigation buttons
    menuNavButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            
            showMenuSection(targetId);
        });
    });

    // Add click event listeners to menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const dishId = this.getAttribute('data-dish');
            
            if (dishId) {
                showDishModal(dishId);
            }
        });
    });

    // Close modal events
    closeModal.addEventListener('click', closeDishModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeDishModal();
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeDishModal();
        }
    });

    // Order Now button functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('order-now-btn')) {
            // Redirect to ordering platform or show ordering options
            window.open('https://order-now-toolkit.takeaway.com/widgets/button?restId=10739861&language=en&horizontal', '_blank');
        }
    });

    // Add to Favorites functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-favorites-btn')) {
            const dishName = document.getElementById('modal-dish-name').textContent;
            e.target.textContent = '❤️ Added to Favorites!';
            e.target.style.background = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
            
            // Store in localStorage
            const favorites = JSON.parse(localStorage.getItem('desioFavorites') || '[]');
            if (!favorites.includes(dishName)) {
                favorites.push(dishName);
                localStorage.setItem('desioFavorites', JSON.stringify(favorites));
            }
            
            setTimeout(() => {
                e.target.textContent = '❤️ Add to Favorites';
                e.target.style.background = '';
            }, 2000);
        }
    });

    // Keyboard navigation support for menu navigation
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
