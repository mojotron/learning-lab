import '../styles/main.css';
import projectShowcase from './project-showcase';

import ImageSlider from './image-slider';
import DropdownMenu from './dropdown-menu';
import BoundingBoxCollision from './bounding-box-collision-detection';
import smoothScrolling from './smooth-scrolling';

import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';

//
import { FormCreateAccount } from './form-validation';

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

// mobile menu
const mobileMenu = document.querySelector('.top-nav__toggle-btn');
mobileMenu.addEventListener('click', e => {
  e.target.textContent = e.target.textContent === 'x' ? '\u2630' : 'x';
  document
    .querySelector(`.top-nav__links__list`)
    .classList.toggle('active-toggle');
});
//

// implement showcase
const miniProjectDropdown = DropdownMenu(
  'MiniProjects',
  document.querySelector('[data-projects-dropdown]')
);

const miniProjectController = e => {
  const projectId = e.target.dataset.miniProject;
  const project = projectsState.projects[projectId];
  projectShowcase.display(project);
};

miniProjectDropdown.addHandlerLinks(miniProjectController);

const projectsState = {
  projects: {},

  add(label, domElement) {
    this.projects[label] = { label: label.replaceAll('-', ' '), domElement };
    this.addLinkToDropdown(label);
  },

  addLinkToDropdown(label) {
    miniProjectDropdown.createDataSpan(
      label.replaceAll('-', ' '),
      'miniProject',
      label
    );
  },

  getProject(label) {
    return this.projects[label];
  },
};

projectsState.add('image-slider', ImageSlider(image1, image2, image3));
projectsState.add('form-validation', FormCreateAccount());
projectsState.add('bounding-box-collision-detection', BoundingBoxCollision());
projectShowcase.display(projectsState.projects['image-slider']);

// Add smooth scrolling
document.querySelectorAll('.dropdown__menu__content__link').forEach(link => {
  smoothScrolling.create(
    link,
    document.querySelector('.project-showcase__display')
  );
});

// TAB COMPONENT
const tabsContainer = document.querySelector('.tabs__container');
const tabBtns = tabsContainer.querySelectorAll('.btn-tab');
const tabContents = document.querySelectorAll('.tab__content');

tabsContainer.addEventListener('click', e => {
  if (!e.target.matches('.btn-tab')) return;
  tabBtns.forEach(btn => btn.classList.remove('btn-tab--active'));
  e.target.classList.add('btn-tab--active');

  tabContents.forEach(tab => tab.classList.remove('tab__content--active'));
  document
    .querySelector(`#tab-content--${e.target.dataset.tabId}`)
    .classList.add('tab__content--active');
});

// Menu fade-in animation
const nav = document.querySelector('.top-nav');
const links = nav.querySelectorAll('.top-nav__links__list__item');
// remove last link and replace it with button selector
const allLinks = [...links].slice(0, -1);
allLinks.push(document.querySelector('.dropdown__btn'));

const fadeInHandle = function (e) {
  if (
    e.target.classList.contains('top-nav__links__list__item') ||
    e.target.classList.contains('dropdown__btn')
  ) {
    const link = e.target;
    allLinks.forEach(ele => {
      if (ele !== link) ele.style.opacity = this.opacity;
    });
  }
};

nav.addEventListener('mouseover', fadeInHandle.bind({ opacity: 0.3 }));
nav.addEventListener('mouseout', fadeInHandle.bind({ opacity: 1 }));

// Lazy Loading images
const lazyImages = document.querySelectorAll('.lazy__img');

const lazyObserverCB = (entries, observer) => {
  const [entry] = entries;
  console.log(entry);
  if (entry.isIntersecting) {
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', e => {
      e.target.classList.remove('blur');
    });
    observer.unobserve(entry.target);
  }
};
const lazyOptions = {
  root: null,
  threshold: 0.5,
  rootMargin: '100px', // to preload image
};
const lazyImagesObserver = new IntersectionObserver(
  lazyObserverCB,
  lazyOptions
);

lazyImages.forEach(img => lazyImagesObserver.observe(img));
