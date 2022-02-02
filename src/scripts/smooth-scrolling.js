function SmoothScrolling() {
  const create = (anchorElement, targetElement) => {
    anchorElement.addEventListener('click', () => {
      const targetRect = targetElement.getBoundingClientRect();
      window.scrollTo({
        left: targetRect.left + window.pageXOffset,
        top: targetRect.top + window.pageYOffset,
        behavior: 'smooth',
      });
    });
  };

  const createModern = (anchorElement, targetElement) => {
    anchorElement.addEventListener('click', () => {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return { create, createModern };
}

export default SmoothScrolling();
