fetch('footer.html')
  .then(response => response.text())
  .then(html => {
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
      placeholder.innerHTML = html;
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }); 