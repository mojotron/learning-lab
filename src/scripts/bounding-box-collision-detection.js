import '../styles/bounding-box-collision-detection.css';
import { createElement } from './dom-helpers';

export default function BoundingBoxCollision() {
  const parentElement = createElement('div', 'box-collision');
  const boxA = createElement('div', 'box-collision__box box--a', 'A');
  const boxB = createElement('div', 'box-collision__box box--b', 'B');
  parentElement.append(boxA);
  parentElement.append(boxB);

  document.body.addEventListener(
    'keydown',
    e => {
      if (e.key === 'ArrowDown') {
        e.stopPropagation();
        const temp = parseFloat(getComputedStyle(boxB).getPropertyValue('--y'));
        boxB.style.setProperty('--y', temp + 1);
      }
      if (e.key === 'ArrowUp') {
        e.stopPropagation();
        const temp = parseFloat(getComputedStyle(boxB).getPropertyValue('--y'));
        boxB.style.setProperty('--y', temp - 1);
      }
      if (e.key === 'ArrowRight') {
        const temp = parseFloat(getComputedStyle(boxB).getPropertyValue('--x'));
        boxB.style.setProperty('--x', temp + 1);
      }
      if (e.key === 'ArrowLeft') {
        const temp = parseFloat(getComputedStyle(boxB).getPropertyValue('--x'));
        boxB.style.setProperty('--x', temp - 1);
      }
    },
    false
  );

  return parentElement;
}
