// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to load or show elements based on viewport
  function loadElementsInViewport() {
    const elements = document.querySelectorAll('.lazy-load'); // Select elements with class 'lazy-load'
  
    elements.forEach(element => {
      if (isElementInViewport(element)) {
        // If element is in viewport, load/show content (e.g., remove class, load image)
        element.classList.add('loaded'); 
        // Example: Load image if it's an image element
        if (element.tagName === 'IMG') {
          element.src = element.getAttribute('data-src'); 
        }
      }
    });
  }
  
  // Initial load on page load
  loadElementsInViewport();
  
  // Add event listener for scroll and resize events
  window.addEventListener('scroll', loadElementsInViewport);
  window.addEventListener('resize', loadElementsInViewport);