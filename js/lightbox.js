// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');

document.querySelectorAll('.gallery .gallery-item img').forEach((img) => {
  img.addEventListener('click', () => {
    lightboxImage.src = img.src;
    lightbox.classList.add('show');
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('show');
});