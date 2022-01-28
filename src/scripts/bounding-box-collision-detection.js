import '../styles/bounding-box-collision-detection.css';
import { createElement } from './dom-helpers';

export default function BoundingBoxCollision() {
  const parentElement = createElement('div', 'box-collision');
  const boxA = createElement('div', 'box-collision__box box--a', 'A');
  const boxB = createElement('div', 'box-collision__box box--b', 'B');
  parentElement.append(boxA);
  parentElement.append(boxB);

  const getBoxX = boxElement =>
    parseFloat(getComputedStyle(boxElement).getPropertyValue('--x'));

  const setBoxX = (boxElement, value) => {
    boxElement.style.setProperty('--x', value);
  };

  const getBoxY = boxElement =>
    parseFloat(getComputedStyle(boxElement).getPropertyValue('--y'));

  const setBoxY = (boxElement, value) => {
    boxElement.style.setProperty('--y', value);
  };

  document.body.addEventListener(
    'keydown',
    e => {
      e.preventDefault(); // stop page scrolling
      if (e.key === 'ArrowDown') setBoxY(boxB, getBoxY(boxB) + 1);
      if (e.key === 'ArrowUp') setBoxY(boxB, getBoxY(boxB) - 1);
      if (e.key === 'ArrowRight') setBoxX(boxB, getBoxX(boxB) + 1);
      if (e.key === 'ArrowLeft') setBoxX(boxB, getBoxX(boxB) - 1);
    },
    false
  );

  // const boxCollideA = (boxA, boxB) => {
  //   const rectA = boxA.getBoundingClientRect();
  //   const rectB = boxB.getBoundingClientRect();
  //   return (
  //     rectA.top >= rectB.bottom &&
  //     rectA.bottom >= rectB.top &&
  //     rectA.left >= rectB.right &&
  //     rectA.right >= rectB.left
  //   );
  // };

  // const boxCollideB = (boxA, boxB) => {};

  return parentElement;
}
