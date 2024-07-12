import { Module } from '../core/module'

export class TimerModule extends Module {
  constructor(type, text) {
    super(type, text)
  }


  trigger() {
    alert('Метод создания Таймера !')
  }
}