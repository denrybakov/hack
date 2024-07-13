import { Module } from '../core/module';
import {random} from '../utils';

export class ShapeModule extends Module {
  constructor(type, text) {
    super(type, text)
  }

  #createShape() {
    this.$shape = document.createElement('div');
    this.$shape.classList.add(`figure-${random(1, 5)}`);
    this.$shape.style.width = `${random(100, 300)}px`;
    this.$shape.style.height = `${random(100, 300)}px`;
    this.$shape.style.position = 'absolute';
    this.$shape.style.top = `${random(parseInt(this.$shape.style.height), window.innerHeight - parseInt(this.$shape.style.height))}px`;
    this.$shape.style.left = `${random(parseInt(this.$shape.style.width), window.innerWidth - parseInt(this.$shape.style.width))}px`;
    this.$shape.style.background = `rgb(${random(0, 225)},${random(0, 255)},${random(0, 255)})`;
    document.querySelector('body').append(this.$shape);
  }

  #moveShape() {
    this.$shape.style.top = `${(random(parseInt(this.$shape.style.height), window.innerHeight - parseInt(this.$shape.style.height)))}px`;
    this.$shape.style.left = `${(random(parseInt(this.$shape.style.width), window.innerWidth - parseInt(this.$shape.style.width)))}px`;
  }

  #deleteShape() {
    document.querySelector('div').remove();
  }

  trigger() {
    this.#createShape()
    setTimeout(() => this.#deleteShape(), 3000);
    setInterval(() => this.#moveShape(), 1000);
  }
}

