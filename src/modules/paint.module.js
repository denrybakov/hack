import { Module } from '../core/module'

export class PaintModule extends Module {
  constructor(type, text) {
    super(type, text)

  }

  trigger() {
    alert('Метод создания КАРТИНЫ !')

  }
}