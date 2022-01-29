import '../styles/bounding-box-collision-detection.css';
import { createElement } from './dom-helpers';

export default function BoundingBoxCollision() {
  const parentElement = createElement('div', 'box-collision');
  const boxA = createElement('div', 'box-collision__box box--a', 'A');
  const boxB = createElement('div', 'box-collision__box box--b', 'B');
  parentElement.append(boxA);
  parentElement.append(boxB);

  // paras
  const displayElement = createElement('div', 'box-collision__display');
  const boxATop = createElement('p', 'box-collision__info info-a-top');
  const boxABottom = createElement('p', 'box-collision__info info-a-bottom');
  const boxALeft = createElement('p', 'box-collision__info info-a-left');
  const boxARight = createElement('p', 'box-collision__info info-a-right');
  const boxBTop = createElement('p', 'box-collision__info info-b-top');
  const boxBBottom = createElement('p', 'box-collision__info info-b-bottom');
  const boxBLeft = createElement('p', 'box-collision__info info-b-left');
  const boxBRight = createElement('p', 'box-collision__info info-b-right');
  displayElement.append(
    boxATop,
    boxABottom,
    boxALeft,
    boxARight,
    boxBTop,
    boxBBottom,
    boxBLeft,
    boxBRight
  );
  parentElement.append(displayElement);

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

  document.body.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') e.preventDefault(); // stop page scrolling
    if (e.key === 'ArrowDown') setBoxY(boxB, getBoxY(boxB) + 1);
    if (e.key === 'ArrowUp') setBoxY(boxB, getBoxY(boxB) - 1);
    if (e.key === 'ArrowRight') setBoxX(boxB, getBoxX(boxB) + 1);
    if (e.key === 'ArrowLeft') setBoxX(boxB, getBoxX(boxB) - 1);
    if (boxCollide(boxA, boxB)) {
      boxA.style.borderColor = '#00aa6d';
      boxB.style.borderColor = '#00aa6d';
      boxA.style.color = '#00aa6d';
      boxB.style.color = '#00aa6d';
    } else {
      boxA.style.borderColor = 'rgb(143, 29, 29)';
      boxB.style.borderColor = 'rgb(143, 29, 29)';
      boxA.style.color = 'rgb(143, 29, 29)';
      boxB.style.color = 'rgb(143, 29, 29)';
    }
  });

  const boxCollide = (box1, box2) => {
    const rectA = box1.getBoundingClientRect();
    const rectB = box2.getBoundingClientRect();
    return (
      rectA.top <= rectB.bottom &&
      rectA.bottom >= rectB.top &&
      rectA.left <= rectB.right &&
      rectA.right >= rectB.left
    );
  };

  // const boxCollideB = (boxA, boxB) => {};

  return parentElement;
}
