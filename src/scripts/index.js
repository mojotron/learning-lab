import '../styles/main.css';
import projectShowcase from './project-showcase';

import ImageSlider from './image-slider';
import DropdownMenu from './dropdown-menu';

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
