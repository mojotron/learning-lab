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
  const firstCondition = createElement(
    'p',
    'box-collision__info info-first',
    'box A top <= box B bottom'
  );
  const secondCondition = createElement(
    'p',
    'box-collision__info info-second',
    'box A bottom >= box B top'
  );
  const thirdCondition = createElement(
    'p',
    'box-collision__info info-third',
    'box A left <= box B right'
  );
  const forthCondition = createElement(
    'p',
    'box-collision__info info-forth',
    'box A right >= box B left'
  );
  displayElement.append(
    firstCondition,
    secondCondition,
    thirdCondition,
    forthCondition
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
    updateCollisionInfoText(boxA, boxB);
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

  // const boxCollideOld = (box1, box2) =>
  //   box1.offsetTop <= box2.offsetTop + box2.offsetHeight &&
  //   box1.offsetTop + box1.offsetHeight >= box2.offsetTop &&
  //   box1.offsetLeft <= box2.offsetLeft + box2.offsetWidth &&
  //   box1.offsetLeft + box1.offsetWidth >= box2.offsetLeft;

  const updateCollisionInfoText = (box1, box2) => {
    displayElement
      .querySelectorAll('.box-collision__info')
      .forEach(p => p.classList.remove('box-hit'));
    if (box1.offsetTop <= box2.offsetTop + box2.offsetHeight) {
      firstCondition.classList.add('box-hit');
    }
    if (box1.offsetTop + box1.offsetHeight >= box2.offsetTop) {
      secondCondition.classList.add('box-hit');
    }
    if (box1.offsetLeft <= box2.offsetLeft + box2.offsetWidth) {
      thirdCondition.classList.add('box-hit');
    }
    if (box1.offsetLeft + box1.offsetWidth >= box2.offsetLeft) {
      forthCondition.classList.add('box-hit');
    }
  };

  return parentElement;
}
