import '../styles/main.css';
// Dark team
const darkModeCheckbox = document.querySelector('.dark-mode__checkbox');

function darkModeHandler() {
  if (this.checked) {
    document.documentElement.style.setProperty(
      '--primary-color',
      'var(--dark-color)'
    );
    document.documentElement.style.setProperty(
      '--secondary-color',
      'var(--light-color)'
    );
  } else {
    document.documentElement.style.setProperty(
      '--primary-color',
      'var(--light-color)'
    );
    document.documentElement.style.setProperty(
      '--secondary-color',
      'var(--dark-color)'
    );
  }
}

darkModeCheckbox.addEventListener('change', darkModeHandler);
// Drop down menu
document.addEventListener('click', e => {
  const isDropdownBtn = e.target.matches('.dropdown__btn');
  if (!isDropdownBtn && e.target.closest('.dropdown') !== null) return;

  let currentDropDown;
  if (isDropdownBtn) {
    currentDropDown = e.target.closest('.dropdown');
    currentDropDown.classList.toggle('dropdown--active');
  }

  document.querySelectorAll('.dropdown--active').forEach(dropdown => {
    if (dropdown === currentDropDown) return;
    dropdown.classList.remove('dropdown--active');
  });
});
// mobile menu
const mobileMenu = document.querySelector('.top-nav__toggle-btn');
mobileMenu.addEventListener('click', e => {
  e.target.textContent = e.target.textContent === 'x' ? '\u2630' : 'x';
  document
    .querySelector(`.top-nav__links__list`)
    .classList.toggle('active-toggle');
});
// slider
const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slider__item');
const leftArrowBtn = slider.querySelector('.slider__btn--left');
const rightArrowBtn = slider.querySelector('.slider__btn--right');
const dotContainer = slider.querySelector('.slider__dots');

const updateSlidePosition = (startPosition = 0) => {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - startPosition) * 100}%)`;
  });
};

const createDots = () => {
  dotContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dotHtml = `
    <button class="slider__dots__dot" data-slide-id="${i}"></button>
  `;
    dotContainer.insertAdjacentHTML('beforeend', dotHtml);
  });
};

const activeDot = slideId => {
  document
    .querySelectorAll('.slider__dots__dot')
    .forEach(dot => dot.classList.remove('active-dot'));
  document
    .querySelector(`[data-slide-id="${slideId}"]`)
    .classList.add('active-dot');
};

let currentSlide = 0;
let timerId;

createDots();
updateSlidePosition();
activeDot(currentSlide);

const setSliderTimer = () => {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    moveRight();
  }, 10000);
};
setSliderTimer();

const moveRight = () => {
  if (currentSlide >= slides.length - 1) currentSlide = 0;
  else currentSlide += 1;
  updateSlidePosition(currentSlide);
  activeDot(currentSlide);
  setSliderTimer();
};

const moveLeft = () => {
  if (currentSlide <= 0) currentSlide = slides.length - 1;
  else currentSlide -= 1;
  updateSlidePosition(currentSlide);
  activeDot(currentSlide);
  setSliderTimer();
};

rightArrowBtn.addEventListener('click', moveRight);
leftArrowBtn.addEventListener('click', moveLeft);
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') moveRight();
  if (e.key === 'ArrowLeft') moveLeft();
});

dotContainer.addEventListener('click', e => {
  if (e.target.classList.contains('slider__dots__dot')) {
    const { slideId } = e.target.dataset;
    updateSlidePosition(+slideId);
    activeDot(+slideId);
    currentSlide = +slideId;
    setSliderTimer();
  }
});
