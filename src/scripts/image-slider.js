import '../styles/image-slider.css';

export default function ImageSlider(...images) {
  const imageCount = images.length;
  let currentSlide;
  let rootElement;
  let timerId;

  const moveRight = () => {
    if (currentSlide === imageCount - 1) currentSlide = 0;
    else currentSlide += 1;
    changeSlide();
  };

  const moveLeft = () => {
    if (currentSlide === 0) currentSlide = imageCount - 1;
    else currentSlide -= 1;
    changeSlide();
  };

  const updateSlidePosition = startPosition => {
    rootElement.querySelectorAll('.slider__item').forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - startPosition) * 100}%)`;
    });
  };

  const activeDot = slideId => {
    rootElement
      .querySelectorAll('.slider__dots__dot')
      .forEach(dot => dot.classList.remove('active-dot'));
    rootElement
      .querySelector(`[data-slide-id="${slideId}"]`)
      .classList.add('active-dot');
  };

  const setSliderTimer = () => {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => moveRight(), 10000);
  };

  const changeSlide = () => {
    updateSlidePosition(currentSlide);
    activeDot(currentSlide);
    setSliderTimer();
  };

  const createSlide = path => {
    const slide = document.createElement('div');
    slide.className = 'slider__item';
    const img = document.createElement('img');
    img.className = 'slider__img';
    img.src = path;
    slide.insertAdjacentElement('afterbegin', img);
    return slide;
  };

  const createButton = (symbol, direction) => {
    const btnElement = document.createElement('button');
    btnElement.className = `slider__btn slider__btn--${direction}`;
    btnElement.textContent = symbol;
    btnElement.addEventListener(
      'click',
      direction === 'right' ? moveRight : moveLeft
    );
    return btnElement;
  };

  const dotHandler = e => {
    if (e.target.classList.contains('slider__dots__dot')) {
      const { slideId } = e.target.dataset;
      currentSlide = +slideId;
      changeSlide();
    }
  };

  const createDots = imagesCount => {
    const dotsElement = document.createElement('div');
    dotsElement.className = 'slider__dots';
    for (let i = 0; i < imagesCount; i += 1) {
      dotsElement.insertAdjacentElement('beforeend', createDot(i));
    }
    // add event handler
    dotsElement.addEventListener('click', dotHandler);
    return dotsElement;
  };

  const createDot = i => {
    const dotElement = document.createElement('button');
    dotElement.className = 'slider__dots__dot';
    dotElement.dataset.slideId = i;
    return dotElement;
  };

  const createSlider = () => {
    const sliderElement = document.createElement('div');
    sliderElement.className = 'slider';
    // create slides
    images.forEach(imagePath => {
      sliderElement.insertAdjacentElement('beforeend', createSlide(imagePath));
    });
    // create arrow buttons
    sliderElement.insertAdjacentElement(
      'beforeend',
      createButton('\u2192', 'right')
    );
    sliderElement.insertAdjacentElement(
      'beforeend',
      createButton('\u2190', 'left')
    );
    // create dot elements
    sliderElement.insertAdjacentElement('beforeend', createDots(imageCount));
    // initialize slider
    rootElement = sliderElement;
    currentSlide = 0;
    changeSlide();

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') moveRight();
      if (e.key === 'ArrowLeft') moveLeft();
    });

    return sliderElement;
  };

  const init = () => createSlider();

  return init();
}
