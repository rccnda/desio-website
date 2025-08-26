fetch('footer.html')
  .then(response => response.text())
  .then(html => {
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
      placeholder.innerHTML = html;
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
    
    // Initialize footer functionality after injection
    initializeFooter();
  })
  .catch(error => {
    console.error('Error loading footer:', error);
    // Fallback footer if loading fails
    const fallbackFooter = `
      <footer class="site-footer">
        <div class="footer-content">
          <div class="footer-main">
            <div class="footer-section">
              <h3 class="footer-heading">Desìo</h3>
              <p>Authentic Italian eatery in Groningen</p>
            </div>
          </div>
        </div>
      </footer>
    `;
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
      placeholder.innerHTML = fallbackFooter;
    }
  });

function initializeFooter() {
  // Newsletter form functionality
  const newsletterForm = document.getElementById('footer-newsletter');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('button[type="submit"]');
      const email = emailInput.value.trim();
      
      if (!email) {
        showNewsletterMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';
      
      // Simulate newsletter subscription (replace with actual API call)
      setTimeout(() => {
        showNewsletterMessage('Thank you for subscribing! You\'ll receive our updates soon.', 'success');
        emailInput.value = '';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
      }, 1500);
    });
  }
  
  // Add smooth scrolling to footer links
  const footerLinks = document.querySelectorAll('.footer-links a[href^="#"], .footer-links a[href^="./"]');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

function showNewsletterMessage(message, type) {
  // Remove existing message
  const existingMessage = document.querySelector('.newsletter-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageDiv = document.createElement('div');
  messageDiv.className = `newsletter-message ${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    margin-top: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.9rem;
    text-align: center;
    ${type === 'success' ? 'background: rgba(76, 175, 80, 0.2); color: #4caf50;' : 'background: rgba(244, 67, 54, 0.2); color: #f44336;'}
  `;
  
  const newsletterForm = document.getElementById('footer-newsletter');
  if (newsletterForm) {
    newsletterForm.appendChild(messageDiv);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 5000);
  }
} 