import '../styles/main.css';
import imageSlider from './image-slider';
import DropdownMenu from './dropdown-menu';
// TODO learn how to dynamically load image paths
// for now this is hard coded names of the images
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';

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

const paths = [image1, image2, image3];
const slider = imageSlider.createSlider(paths);
document.body.append(slider);
// test dynamic dropdown
const { body } = document;
const dropdown1 = DropdownMenu('Hello World', body);
dropdown1.createLink('project X');
