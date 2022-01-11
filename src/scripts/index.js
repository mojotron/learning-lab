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

// plug in image slider to the body
const projectShowcase = document.querySelector('.project-showcase__display');
ImageSlider(projectShowcase, [image1, image2, image3]);

// client form validation
const formElement = document.querySelector('.form');

const validateInput = {
  username(value) {
    const usernameRegex = /^[a-z_]*$/i;
    if (value === '') return 'Username input filed is empty!';
    if (!value.match(usernameRegex))
      return 'Username can include letters and underscore!';
    if (value.length < 4 || value.length > 15)
      return 'Username must be between 4 and 15 characters long!';
    return false;
  },

  email(value) {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (value === '') return 'Email input field is empty';
    if (!value.match(emailRegex))
      return 'Please enter valid email form (example@email.com)!';
    return false;
  },

  password(value) {
    const charRegex = /[?=.*?[#?!@$%^&*-]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    if (value === '') return 'Pease create password!';
    if (value.length < 8) return 'password must be at least 8 characters long!';
    if (value.length > 32) return 'Password maximum length is 32 characters!';
    if (!value.match(charRegex))
      return 'Password must include at least 1 special character!';
    if (!value.match(upperCaseRegex))
      return 'Password must include at least 1 upper case character!';
    if (!value.match(lowerCaseRegex))
      return 'Password must include at least 1 lower case character!';
    if (!value.match(numberRegex))
      return 'Password must include at least 1 numeric character!';
    return false;
  },

  passwordRetype(value) {
    if (value !== document.querySelector('#password-1').value)
      return 'Passwords miss match';
    return false;
  },
};

const updateInputError = (validate, errorElement) => {
  if (validate) {
    errorElement.innerText = validate;
    errorElement.classList.add('active');
  } else {
    errorElement.classList.remove('active');
  }
};
const updateInputIcon = (validate, parentElement) => {
  if (validate) {
    parentElement.querySelector('.icon--error').classList.add('active');
    parentElement.querySelector('.icon--ok').classList.remove('active');
  } else {
    parentElement.querySelector('.icon--error').classList.remove('active');
    parentElement.querySelector('.icon--ok').classList.add('active');
  }
};

const validateController = e => {
  const validate = validateInput[e.target.name](e.target.value);
  const errorEle = e.target.parentElement.querySelector('.form__field__error');
  updateInputError(validate, errorEle);
  updateInputIcon(validate, e.target.parentElement);
};

formElement.querySelectorAll('input').forEach(input =>
  input.addEventListener('input', e => {
    if (
      e.target.matches('#username') ||
      e.target.matches('#email') ||
      e.target.matches('#password-1') ||
      e.target.matches('#password-2')
    ) {
      validateController(e);
    }
  })
);

// TODO add check on form submit
