const carouselImage = document.getElementById('carouselImage');
const carouselCaption = document.getElementById('carouselCaption');
const prevButton = document.getElementById('prevRuta');
const nextButton = document.getElementById('nextRuta');
const dotsContainer = document.getElementById('carruselDots');

const rutas = [
  { src: 'img/flysch.jpeg', alt: 'Flysch de Zumaia', label: 'Flysch de Zumaia' },
  { src: 'img/bosqueOma.jpeg', alt: 'Bosque de Oma', label: 'Bosque de Oma' },
  { src: 'img/Gaztelugatxe.jpeg', alt: 'San Juan de Gaztelugatxe', label: 'San Juan de Gaztelugatxe' },
  { src: 'img/anboto.jpeg', alt: 'Anboto', label: 'Monte Anboto' },
  { src: 'img/gorbea.png', alt: 'Parque Natural Gorbea', label: 'Parque Natural Gorbea' }
];

let currentIndex = 0;
let slideInterval;

const renderSlide = index => {
  const ruta = rutas[index];
  if (!ruta || !carouselImage || !carouselCaption) return;

  carouselImage.src = ruta.src;
  carouselImage.alt = ruta.alt;
  carouselCaption.textContent = ruta.label;

  const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle('active', dotIndex === index);
  });
};

const goToSlide = index => {
  currentIndex = (index + rutas.length) % rutas.length;
  renderSlide(currentIndex);
};

const goNext = () => goToSlide(currentIndex + 1);
const goPrev = () => goToSlide(currentIndex - 1);

const initDots = () => {
  if (!dotsContainer) return;
  dotsContainer.innerHTML = '';
  rutas.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
};

const startAutoSlide = () => {
  clearInterval(slideInterval);
  slideInterval = setInterval(goNext, 6000);
};

const setupCarousel = () => {
  if (!carouselImage || !carouselCaption) return;

  initDots();
  renderSlide(currentIndex);
  startAutoSlide();

  if (prevButton) prevButton.addEventListener('click', () => {
    goPrev();
    startAutoSlide();
  });

  if (nextButton) nextButton.addEventListener('click', () => {
    goNext();
    startAutoSlide();
  });

  const carouselElement = document.getElementById('rutaCarrusel');
  if (carouselElement) {
    carouselElement.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carouselElement.addEventListener('mouseleave', startAutoSlide);
  }
};

setupCarousel();
