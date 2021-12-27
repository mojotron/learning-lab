import '../styles/main.css';

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
