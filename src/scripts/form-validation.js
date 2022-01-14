// client form validation
// const formHTML = `
//   <div class="form" >
//     <div class="form__header">
//       <h2 class="form__header__headings">Create Account</h2>
//     </div>
//     <form class="form__body" action="/" method="GET">
//       <div class="form__field">
//         <label for="username">username</label>
//         <input
//           class="form__field__input"
//           type="text"
//           name="username"
//           id="username"
//           placeholder="username"
//         />
//         <span class="form__field__icon icon--ok">&#10004;</span>
//         <span class="form__field__icon icon--error">&#9888;</span>
//         <span class="form__field__error">Error Message</span>
//       </div>

//       <div class="form__field">
//         <label for="email">email</label>
//         <input
//           class="form__field__input"
//           type="email"
//           name="email"
//           id="email"
//           placeholder="example@email.com"
//         />
//         <span class="form__field__icon icon--ok">&#10004;</span>
//         <span class="form__field__icon icon--error">&#9888;</span>
//         <span class="form__field__error">Error Message</span>
//       </div>

//       <div class="form__field">
//         <label for="password-1">password</label>
//         <input
//           class="form__field__input"
//           type="text"
//           name="password"
//           id="password-1"
//         />
//         <span class="form__field__icon icon--ok">&#10004;</span>
//         <span class="form__field__icon icon--error">&#9888;</span>
//         <span class="form__field__error">Error Message</span>
//       </div>

//       <div class="form__field">
//         <label for="password-2">retype password</label>
//         <input
//           class="form__field__input"
//           type="text"
//           name="passwordRetype"
//           id="password-2"
//         />
//         <span class="form__field__icon icon--ok">&#10004;</span>
//         <span class="form__field__icon icon--error">&#9888;</span>
//         <span class="form__field__error">Error Message</span>
//       </div>

//       <button class="form__btn" type="submit">Submit</button>
//     </form>
//   </div>
// `;

const formInputConfig = {
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
    id: 'password-1',
    label: 'password',
    placeholder: '',
    type: 'text',
  },
  passwordAgain: {
    id: 'password-2',
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
  return element;
}

// const formElement = document.querySelector('.form');

// const updateInputError = (validate, errorElement) => {
//   if (validate) {
//     errorElement.innerText = validate;
//     errorElement.classList.add('active');
//   } else {
//     errorElement.classList.remove('active');
//   }
// };
// const updateInputIcon = (validate, parentElement) => {
//   if (validate) {
//     parentElement.querySelector('.icon--error').classList.add('active');
//     parentElement.querySelector('.icon--ok').classList.remove('active');
//   } else {
//     parentElement.querySelector('.icon--error').classList.remove('active');
//     parentElement.querySelector('.icon--ok').classList.add('active');
//   }
// };

// const validateController = e => {
//   const validate = validateInput[e.target.name](e.target.value);
//   const errorEle = e.target.parentElement.querySelector('.form__field__error');
//   updateInputError(validate, errorEle);
//   updateInputIcon(validate, e.target.parentElement);
// };

// formElement.querySelectorAll('input').forEach(input =>
//   input.addEventListener('input', e => {
//     if (
//       e.target.matches('#username') ||
//       e.target.matches('#email') ||
//       e.target.matches('#password-1') ||
//       e.target.matches('#password-2')
//     ) {
//       validateController(e);
//     }
//   })
// );

// // TODO add check on form submit

// function FormInputValidation() {
//   const lengths = {
//     minName: 4,
//     maxName: 15,
//     minPass: 8,
//     maxPass: 32,
//   };
//   const regex = {
//     username: /^[a-z_]*$/i,
//     email:
//       /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
//     specChar: /[?=.*?[#?!@$%^&*-]/,
//     upperCase: /[A-Z]/,
//     lowerCase: /[a-z]/,
//     number: /[0-9]/,
//   };

//   const username = value => {
//     if (value === '') return 'Username input filed is empty!';
//     if (!value.match(regex.username))
//       return 'Username can include letters and underscore!';
//     if (value.length < lengths.minName || value.length > lengths.maxName)
//       return 'Username must be between 4 and 15 characters long!';
//     return false;
//   };

//   const email = value => {
//     if (value === '') return 'Email input field is empty';
//     if (!value.match(regex.email))
//       return 'Please enter valid email form (example@email.com)!';
//     return false;
//   };

//   const password = value => {
//     if (value === '') return 'Pease create password!';
//     if (value.length < lengths.minName)
//       return 'password must be at least 8 characters long!';
//     if (value.length > lengths.maxName)
//       return 'Password maximum length is 32 characters!';
//     if (!value.match(regex.specChar))
//       return 'Password must include at least 1 special character!';
//     if (!value.match(regex.upperCase))
//       return 'Password must include at least 1 upper case character!';
//     if (!value.match(regex.lowerCase))
//       return 'Password must include at least 1 lower case character!';
//     if (!value.match(regex.number))
//       return 'Password must include at least 1 numeric character!';
//     return false;
//   };

//   const passwordAgain = (value, passwordValue) => {
//     if (value !== document.querySelector('#password-1').value)
//       return 'Passwords miss match';
//     return false;
//   };

//   return { username, email, password, passwordAgain };
// }
