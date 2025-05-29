document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (scroll animations)
  AOS.init({
    duration: 800,
    once: true
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(anchor.getAttribute('href'))
        .scrollIntoView({ behavior: 'smooth' });
    });
  });
});