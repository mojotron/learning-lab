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
  const isDropdownBtn = e.target.matches('.dropdown__btn');
  if (!isDropdownBtn && e.target.closest('.dropdown') !== null) return;

  let currentDropDown;
  if (isDropdownBtn) {
    currentDropDown = e.target.closest('.dropdown');
    currentDropDown.classList.toggle('dropdown--active');
  }

  document.querySelectorAll('.dropdown--active').forEach(dropdown => {
    if (dropdown === currentDropDown) return;
    dropdown.classList.remove('dropdown--active');
  });
});
