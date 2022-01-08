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

// client form validation
// valid email regexp from MDN
// regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const formElement = document.querySelector('.form');
const username = formElement.querySelector('#username');
// const userEmail = formElement.querySelector('#email');
// const userPassword1 = formElement.querySelector('#password-1');
// const userPassword2 = formElement.querySelector('#password-2');

// validate empty string

const validateUsername = value => {
  const usernameRegex = /^[a-z_]*$/i;
  if (value === '') return 'Username input filed is empty!';
  if (!value.match(usernameRegex))
    return 'Username can include letters and underscore!';
  if (value.length < 4 || value.length > 15)
    return 'Username must be between 5 and 15 characters long!';

  return false;
};

formElement.addEventListener('submit', e => {
  e.preventDefault();
  const usernameCheck = validateUsername(username.value);
  // console.log(usernameCheck);
  if (usernameCheck) {
    const errorEle = username.parentElement.querySelector(
      '.form__field__error'
    );
    errorEle.innerText = usernameCheck;
    errorEle.style.display = 'block';
  }
  // validateEmail();
  // validatePassword();
  // validatePasswordRetype();
  // hideAllErrorMsgs();
});

// const hideAllErrorMsgs = () => {
//   document.querySelectorAll('.form__field__error').forEach(errorEle => {
//     errorEle.style.display = 'none';
//   });
// };

formElement.querySelectorAll('input').forEach(input =>
  input.addEventListener('input', e => {
    if (e.target.matches('#username')) {
      const usernameCheck = validateUsername(username.value);
      const errorEle = username.parentElement.querySelector(
        '.form__field__error'
      );
      if (usernameCheck) {
        errorEle.innerText = usernameCheck;
        errorEle.style.display = 'block';
      } else {
        errorEle.style.display = 'none';
      }
    }
  })
);
