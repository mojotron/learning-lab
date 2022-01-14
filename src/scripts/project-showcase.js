function ProjectShowcase() {
  const titleElement = document.querySelector('.project-showcase__heading');
  const displayElement = document.querySelector('.project-showcase__display');

  const display = project => {
    displayElement.innerHTML = '';
    const { label, domElement } = project;
    titleElement.innerText = label;
    displayElement.insertAdjacentElement('afterbegin', domElement);
  };

  return { display };
}

export default ProjectShowcase();
