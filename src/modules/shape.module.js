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

    this.#newPositionShape();
  }

  #newPositionShape() {
    this.top = `${(random(parseInt(this.$shape.style.height), window.innerHeight - parseInt(this.$shape.style.height)))}px`;
    this.left = `${(random(parseInt(this.$shape.style.width), window.innerWidth - parseInt(this.$shape.style.width)))}px`;
  }

  #moveShape() {

    if (parseInt(this.$shape.style.left) < parseInt(this.left)) {
      this.$shape.style.left = `${parseInt(this.$shape.style.left) + 1}px`;
    }

    if (parseInt(this.$shape.style.top) < parseInt(this.top)) {
      this.$shape.style.top = `${parseInt(this.$shape.style.top) + 1}px`;
    }

    if (parseInt(this.$shape.style.top) > parseInt(this.top)) {
      this.$shape.style.top = `${parseInt(this.$shape.style.top) - 1}px`;
    }

    if (parseInt(this.$shape.style.left) > parseInt(this.left)) {
      this.$shape.style.left = `${parseInt(this.$shape.style.left) - 1}px`;
    }

    if (parseInt(this.$shape.style.left) === parseInt(this.left) || parseInt(this.$shape.style.top) === parseInt(this.top)) {
      this.#newPositionShape()
    }
  }

  #deleteShape() {
    document.querySelector('div').remove();
  }

  trigger() {
    clearInterval(this.interval)
    this.#createShape()
    setTimeout(() => this.#deleteShape(), 20000);
    this.interval = setInterval(() => this.#moveShape(), 1);
    setTimeout(() => clearInterval(this.interval), 20000);
  }
}

