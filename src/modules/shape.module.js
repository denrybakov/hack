import { Module } from '../core/module';
import {random} from '../utils';

export class ShapeModule extends Module {
  constructor(type, text) {
    super(type, text)
  }

  #arrShape = [];

  #createShape() {
    this.$shape = document.createElement('div');
    this.$shape.classList.add(`figure-${random(1, 50)}`);
    this.$shape.style.width = `${random(100, 300)}px`;
    this.$shape.style.height = `${random(100, 300)}px`;
    this.$shape.style.position = 'absolute';
    this.$shape.style.top = `${random(parseInt(this.$shape.style.height), window.innerHeight - parseInt(this.$shape.style.height))}px`;
    this.$shape.style.left = `${random(parseInt(this.$shape.style.width), window.innerWidth - parseInt(this.$shape.style.width))}px`;
    this.$shape.style.background = `rgb(${random(0, 225)},${random(0, 255)},${random(0, 255)})`;
    document.querySelector('body').append(this.$shape);
    
    this.#currentShape()
    this.#newPositionShape();
  }

  #currentShape() {
    this.#arrShape.push(this.$shape.className);
    this.curShape = document.querySelector(`.${this.#arrShape[this.#arrShape.length - 1]}`);
  }

  #newPositionShape() {
    this.top = `${(random(parseInt(this.curShape.style.height), window.innerHeight - parseInt(this.curShape.style.height)))}px`;
    this.left = `${(random(parseInt(this.curShape.style.width), window.innerWidth - parseInt(this.curShape.style.width)))}px`;
  }

  #moveShape() {
    if (parseInt(this.curShape.style.left) < parseInt(this.left)) {
      this.curShape.style.left = `${parseInt(this.curShape.style.left) + 1}px`;
    }

    if (parseInt(this.curShape.style.top) < parseInt(this.top)) {
      this.curShape.style.top = `${parseInt(this.curShape.style.top) + 1}px`;
    }

    if (parseInt(this.curShape.style.top) > parseInt(this.top)) {
      this.curShape.style.top = `${parseInt(this.curShape.style.top) - 1}px`;
    }

    if (parseInt(this.curShape.style.left) > parseInt(this.left)) {
      this.curShape.style.left = `${parseInt(this.curShape.style.left) - 1}px`;
    }

    if (parseInt(this.curShape.style.left) === parseInt(this.left) || parseInt(this.curShape.style.top) === parseInt(this.top)) {
      this.#newPositionShape()
    }
  }

  #deleteShape() {
    document.querySelector(`.${this.#arrShape.shift()}`).remove();
  }

  trigger() {
    clearInterval(this.interval);
    this.#createShape();
    this.timeout = setTimeout(() => this.#deleteShape(), 10000);
    this.interval = setInterval(() => this.#moveShape(), 1);
  }
}

