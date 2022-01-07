import '../styles/main.css';
import ImageSlider from './image-slider';
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
// plug in Drop down menu inside nav bar
DropdownMenu('Projects', document.querySelector('[data-projects-dropdown]'), [
  { label: 'project 01', path: '#' },
  { label: 'project 02', path: '#' },
  { label: 'project 03', path: '#' },
  { label: 'project 04', path: '#' },
  { label: 'project 05', path: '#' },
]);
DropdownMenu(
  'Useful Recourses',
  document.querySelector('[data-useful-recourses]'),
  [
    { label: 'Recourse 01', path: '#' },
    { label: 'Recourse 02', path: '#' },
    { label: 'Recourse 03', path: '#' },
    { label: 'Recourse 04', path: '#' },
    { label: 'Recourse 05', path: '#' },
  ]
);
// mobile menu
const mobileMenu = document.querySelector('.top-nav__toggle-btn');
mobileMenu.addEventListener('click', e => {
  e.target.textContent = e.target.textContent === 'x' ? '\u2630' : 'x';
  document
    .querySelector(`.top-nav__links__list`)
    .classList.toggle('active-toggle');
});

// plug in imgae slider to the body
ImageSlider(document.body, [image1, image2, image3]);
