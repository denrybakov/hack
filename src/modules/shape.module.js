import { Module } from '../core/module';
import {random} from '../utils';

export class ShapeModule extends Module {
  constructor(type, text) {
    super(type, text)
  }


  trigger() {
    const shape = document.createElement('div');
    shape.classList.add(`figure-${random(1, 5)}`);
    shape.style.width = `${random(100, 300)}px`;
    shape.style.height = `${random(100, 300)}px`;
    shape.style.position = 'absolute';
    shape.style.top = `${random(parseInt(shape.style.height), window.innerHeight - parseInt(shape.style.height))}px`;
    shape.style.left = `${random(parseInt(shape.style.width), window.innerWidth - parseInt(shape.style.width))}px`;
    shape.style.background = `rgb(${random(0, 225)},${random(0, 255)},${random(0, 255)})`;
    document.querySelector('body').append(shape);

    setTimeout(() => {
      shape.remove();
    }, 10000);

    setInterval(moveBlock, 1000);
    function moveBlock() {
      shape.style.top = `${(random(parseInt(shape.style.height), window.innerHeight - parseInt(shape.style.height)))}px`;
      shape.style.left = `${(random(parseInt(shape.style.width), window.innerWidth - parseInt(shape.style.width)))}px`;
    }
  }
}

