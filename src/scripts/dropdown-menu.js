export default function DropdownMenu(dropdownName, parentElement) {
  let menuElement;

  const createElement = (tagName, className) => {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
  };

  const createButton = label => {
    const btnElement = document.createElement('button');
    btnElement.className = 'dropdown__btn';
    btnElement.textContent = label;

    return btnElement;
  };

  const createLink = (label, targetPath = '#') => {
    const linkElement = createElement('a', 'dropdown__menu__content__link');
    linkElement.href = targetPath;
    linkElement.textContent = label;
    menuElement.insertAdjacentElement('beforeend', linkElement);
  };

  const creatDropdown = label => {
    // create dropdown container
    const dropdownElement = createElement('div', 'dropdown');
    // -create button
    dropdownElement.insertAdjacentElement('beforeend', createButton(label));
    // -create menu
    const dropdownMenu = createElement('div', 'dropdown__menu');
    menuElement = dropdownMenu;
    dropdownElement.insertAdjacentElement('beforeend', dropdownMenu);
    // --create arrow
    dropdownMenu.insertAdjacentElement(
      'beforeend',
      createElement('div', 'dropdown__menu__arrow')
    );
    // --create content container
    const dropdownContent = createElement('div', 'dropdown__menu__content');
    dropdownMenu.insertAdjacentElement('beforeend', dropdownContent);
    // ----create links

    parentElement.insertAdjacentElement('beforeend', dropdownElement);
  };

  const init = () => {
    creatDropdown(dropdownName, parentElement);
  };

  init();

  return { createLink };
}
