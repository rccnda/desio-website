document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                if (entry.target.classList.contains('stagger-item')) {
                    entry.target.classList.add('revealed');
                }
                if (entry.target.classList.contains('text-reveal')) {
                    entry.target.classList.add('revealed');
                }
                if (entry.target.classList.contains('section-transition')) {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.scroll-fade, .stagger-item, .text-reveal, .section-transition').forEach(el => {
        observer.observe(el);
    });

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-element');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const offset = scrolled * speed;
            element.style.setProperty('--parallax-offset', `${offset}px`);
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.getElementById(targetId.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add loading animation class to elements
    document.querySelectorAll('.loading-animation').forEach(element => {
        element.style.animationDelay = `${element.dataset.delay || 0}s`;
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

    // Questionnaire Logic
    const questionnaireContainer = document.getElementById('questionnaire-container');
    if (questionnaireContainer) {
        const questions = [
            "How did you feel about the portion sizes - did they seem like a good value for the price?",
            "Was there anything you were hoping to see on the menu that wasn't there?",
            "Did our food give you that classic Italian vibe or remind you of a real Italian meal?",
            "How was the speed of service - did everything come out in a timely way?"
        ];
        const answers = [];
        let currentQuestionIndex = 0;

        function displayQuestion() {
            if (currentQuestionIndex < questions.length) {
                questionnaireContainer.innerHTML = `
                    <div class="question">
                        <p>${questions[currentQuestionIndex]}</p>
                        <textarea id="answer-input" rows="4" placeholder="Your thoughts..."></textarea>
                    </div>
                    <div class="question-navigation">
                        <button id="next-btn" class="btn btn-primary">Next</button>
                    </div>
                `;

                document.getElementById('next-btn').addEventListener('click', () => {
                    const answer = document.getElementById('answer-input').value;
                    answers.push({ question: questions[currentQuestionIndex], answer: answer });
                    currentQuestionIndex++;
                    displayQuestion();
                });
            } else {
                displayFinalStep();
            }
        }

        function displayFinalStep() {
            questionnaireContainer.style.display = 'none';
            document.getElementById('final-message').style.display = 'block';

            // Prepare answers for Formspree
            const form = document.getElementById('formspree-form');
            form.innerHTML = '';
            answers.forEach((item, idx) => {
                const qInput = document.createElement('input');
                qInput.type = 'hidden';
                qInput.name = `question_${idx+1}`;
                qInput.value = item.question;
                form.appendChild(qInput);
                const aInput = document.createElement('input');
                aInput.type = 'hidden';
                aInput.name = `answer_${idx+1}`;
                aInput.value = item.answer;
                form.appendChild(aInput);
            });

            // Grazie button
            const grazieBtn = document.createElement('button');
            grazieBtn.type = 'submit';
            grazieBtn.className = 'btn btn-secondary';
            grazieBtn.textContent = 'Grazie!';
            form.appendChild(grazieBtn);
            form.style.display = 'block';

            // AJAX submit
            form.onsubmit = function(e) {
                e.preventDefault();
                grazieBtn.disabled = true;
                grazieBtn.textContent = 'Sending...';
                fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                })
                .then(response => {
                    if (response.ok) {
                        form.style.display = 'none';
                        document.getElementById('final-message').innerHTML = '<h3>Grazie! Your feedback was sent and appreciated.</h3>';
                    } else {
                        grazieBtn.disabled = false;
                        grazieBtn.textContent = 'Grazie!';
                        alert('There was a problem sending your feedback. Please try again.');
                    }
                })
                .catch(() => {
                    grazieBtn.disabled = false;
                    grazieBtn.textContent = 'Grazie!';
                    alert('There was a problem sending your feedback. Please try again.');
                });
            };
        }

        displayQuestion();
    }

    // Initialize Leaflet Map
    if (document.getElementById('store-map')) {
        fetch('location.json')
            .then(response => response.json())
            .then(data => {
                const map = L.map('store-map', {
                    scrollWheelZoom: false // Optional: disable scroll wheel zoom
                }).setView([data.lat, data.lng], 18);

                L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                }).addTo(map);

                const customMarker = L.icon({
                    iconUrl: 'assets/images/map_marker.png',
                    iconSize: [50, 50], // Adjust size as needed
                    iconAnchor: [25, 50], // Point of the icon which will correspond to marker's location
                    popupAnchor: [0, -50] // Point from which the popup should open relative to the iconAnchor
                });

                L.marker([data.lat, data.lng], { icon: customMarker }).addTo(map)
                    .bindPopup(data.popupText)
                    .openPopup();
            })
            .catch(error => console.error('Error loading map data:', error));
    }

    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
        } else if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
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
}); 