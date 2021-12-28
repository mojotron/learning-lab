import '../styles/main.css';
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
// Drop down menu
document.addEventListener('click', e => {
  document.querySelectorAll('.dropdown__list').forEach(ele => {
    ele.classList.remove('active-menu');
  });

  const dropdown = e.target.matches('.dropdown__btn');
  if (!dropdown) return;

  e.target.nextElementSibling.classList.toggle('active-menu');
});
