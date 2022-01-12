import '../styles/main.css';
// import projectShowcase from './project-showcase';
import ImageSlider from './image-slider';
import DropdownMenu from './dropdown-menu';

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

// // mobile menu
const mobileMenu = document.querySelector('.top-nav__toggle-btn');
mobileMenu.addEventListener('click', e => {
  e.target.textContent = e.target.textContent === 'x' ? '\u2630' : 'x';
  document
    .querySelector(`.top-nav__links__list`)
    .classList.toggle('active-toggle');
});

// plug in image slider to the body
const projectShowcasex = document.querySelector('.project-showcase__display');
const x = ImageSlider(image1, image2, image3);
projectShowcasex.append(x);

// implement showcase
// data -> dropdown menu list -> user clicks on link -> send label to showcase ->
// showcase asks for dom element with that label -> display project

const dd = DropdownMenu(
  'Mini Projects',
  document.querySelector('[data-projects-dropdown]')
);
dd.createDataSpan('image slider', 'miniProject', 'image-slider');
dd.addHandlerLinks(e => {
  console.log(e.target.dataset.miniProject);
});
const projectsState = {
  projects: [],

  addProject(label, domElement) {
    this.projects.push({ label, domElement });
  },
};

projectsState.addProject('image-slider', ImageSlider(image1, image2, image3));
