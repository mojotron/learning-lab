export default function DropdownMenu(dropdownName, parentElement, links = []) {
  let contentElement;

  const createElement = (tagName, className) => {
    const element = document.createElement(tagName);
    element.className = className;
    return element;
  };
  const buttonHandler = e => {
    const isDropdownBtn = e.target.matches('.dropdown__btn');
    if (!isDropdownBtn && e.target.closest('.dropdown') !== null) return;

    let currentDropDown;
    if (isDropdownBtn) {
      currentDropDown = e.target.closest('.dropdown');
      currentDropDown.classList.toggle('dropdown--active');
    }

    document.body.querySelectorAll('.dropdown--active').forEach(dropdown => {
      if (dropdown === currentDropDown) return;
      dropdown.classList.remove('dropdown--active');
    });
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
    contentElement.insertAdjacentElement('beforeend', linkElement);
  };

  const createDataSpan = (label, dataId, dataValue) => {
    const spanElement = createElement('span', 'dropdown__menu__content__link');
    spanElement.dataset[dataId] = dataValue;
    spanElement.textContent = label;
    contentElement.insertAdjacentElement('beforeend', spanElement);
  };

  const creatDropdown = label => {
    // create dropdown container
    const dropdownElement = createElement('div', 'dropdown');
    // -create button
    dropdownElement.insertAdjacentElement('beforeend', createButton(label));
    // -create menu
    const dropdownMenu = createElement('div', 'dropdown__menu');

    dropdownElement.insertAdjacentElement('beforeend', dropdownMenu);
    // --create arrow
    dropdownMenu.insertAdjacentElement(
      'beforeend',
      createElement('div', 'dropdown__menu__arrow')
    );

    // --create content container
    const dropdownContent = createElement('div', 'dropdown__menu__content');
    contentElement = dropdownContent;
    dropdownMenu.insertAdjacentElement('beforeend', dropdownContent);
    // ----create links
    if (links.length > 0) {
      links.forEach(link => createLink(link.label, link.path));
    }
    parentElement.insertAdjacentElement('beforeend', dropdownElement);
  };

  const init = () => {
    const hasDropdown = document.querySelector('.dropdown');
    creatDropdown(dropdownName, parentElement, links);
    if (!hasDropdown) document.addEventListener('click', buttonHandler);
  };

  init();

  const addHandlerLinks = handler => {
    contentElement.addEventListener('click', e => {
      e.target.closest('.dropdown').classList.remove('dropdown--active');
      handler(e);
    });
  };

  return { createLink, createDataSpan, addHandlerLinks };
}
