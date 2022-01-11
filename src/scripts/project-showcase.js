function ProjectShowcase() {
  // const parentElement = document.querySelector('.project-showcase');
  const projects = [];

  const add = project => {
    // form {name, crate logic}
    projects.push(project);
  };

  // const removeCurrent = () => {
  //   parentElement.innerHTML = '';
  // }

  return { add };
}

export default ProjectShowcase();
