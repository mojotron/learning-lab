// client form validation
function FormInputValidation() {
  const lengths = {
    minName: 4,
    maxName: 15,
    minPass: 8,
    maxPass: 32,
  };
  const regex = {
    username: /^[a-z_]*$/i,
    email:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    specChar: /[?=.*?[#?!@$%^&*-]/,
    upperCase: /[A-Z]/,
    lowerCase: /[a-z]/,
    number: /[0-9]/,
  };

  const username = value => {
    if (value === '') return 'Username input filed is empty!';
    if (!value.match(regex.username))
      return 'Username can include letters and underscore!';
    if (value.length < lengths.minName || value.length > lengths.maxName)
      return 'Username must be between 4 and 15 characters long!';
    return false;
  };

  const email = value => {
    if (value === '') return 'Email input field is empty';
    if (!value.match(regex.email))
      return 'Please enter valid email form (example@email.com)!';
    return false;
  };

  const password = value => {
    if (value === '') return 'Please create password!';
    if (value.length < lengths.minName)
      return 'password must be at least 8 characters long!';
    if (value.length > lengths.maxName)
      return 'Password maximum length is 32 characters!';
    if (!value.match(regex.specChar))
      return 'Password must include at least 1 special character!';
    if (!value.match(regex.upperCase))
      return 'Password must include at least 1 upper case character!';
    if (!value.match(regex.lowerCase))
      return 'Password must include at least 1 lower case character!';
    if (!value.match(regex.number))
      return 'Password must include at least 1 numeric character!';
    return false;
  };

  const passwordAgain = value => {
    if (value === '') return 'Password cannot be empty!';
    if (
      value !== document.querySelector(`#${formInputConfig.password.id}`).value
    )
      return 'Passwords miss match';
    return false;
  };

  return { username, email, password, passwordAgain };
}
// Create form validation factory so we can
const formValidation = FormInputValidation();
// Form event handlers
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

// name, value, parent element
const validateController = element => {
  const validate = formValidation[element.name](element.value);
  const errorEle = element.parentElement.querySelector('.form__field__error');
  updateInputError(validate, errorEle);
  updateInputIcon(validate, element.parentElement);
  return !!validate;
};

const formInputConfig = {
  // options for specific input
  username: {
    id: 'username',
    label: 'username',
    placeholder: 'username',
    type: 'text',
  },
  email: {
    id: 'email',
    label: 'email',
    placeholder: 'example@mail.com',
    type: 'text',
  },
  password: {
    id: 'password',
    label: 'password',
    placeholder: '',
    type: 'text',
  },
  passwordAgain: {
    id: 'passwordAgain',
    label: 'password again',
    placeholder: '',
    type: 'text',
  },
};

function createFormField(inputObject) {
  const { id, label, placeholder, type } = inputObject;
  return `
    <div class="form__field">
      <label for="${id}">${label}</label> 
      <input
        class="form__field__input"
        type="${type}" 
        name="${id}" 
        id="${id}"
        ${placeholder ? `placeholder=${placeholder}` : ''}
      />
      <span class="form__field__icon icon--ok">&#10004;</span>
      <span class="form__field__icon icon--error">&#9888;</span>
      <span class="form__field__error">Error Message</span>
    </div>
  `;
}

export function FormCreateAccount() {
  const element = document.createElement('div');
  element.className = 'form';
  element.innerHTML = `
    <div class="form__header">
      <h2 class="form__header__headings">Create Account</h2>
    </div>
    <form class="form__body" action="/" method="GET">
      ${createFormField(formInputConfig.username)}
      ${createFormField(formInputConfig.email)}
      ${createFormField(formInputConfig.password)}
      ${createFormField(formInputConfig.passwordAgain)}
      <button class="form__btn" type="submit">Submit</button>
    </form>
  `;
  // event listeners
  element.querySelectorAll('input').forEach(input =>
    input.addEventListener('input', e => {
      if (
        e.target.matches(`#${formInputConfig.username.id}`) ||
        e.target.matches(`#${formInputConfig.email.id}`) ||
        e.target.matches(`#${formInputConfig.password.id}`) ||
        e.target.matches(`#${formInputConfig.passwordAgain.id}`)
      ) {
        validateController(e.target);
      }
    })
  );

  element.addEventListener('submit', e => {
    let validate = false;
    element.querySelectorAll('input').forEach(input => {
      if (
        input.matches(`#${formInputConfig.username.id}`) ||
        input.matches(`#${formInputConfig.email.id}`) ||
        input.matches(`#${formInputConfig.password.id}`) ||
        input.matches(`#${formInputConfig.passwordAgain.id}`)
      ) {
        validate = validateController(input);
      }
    });
    if (validate) e.preventDefault();
  });

  return element;
}
