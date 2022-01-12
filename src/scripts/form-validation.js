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
