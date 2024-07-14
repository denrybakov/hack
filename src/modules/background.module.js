import { Module } from '../core/module';
import { random } from '../utils';

export class BackgroundModule extends Module {
  constructor(type, text) {
    super(type, text)
    this.arrBackgrounds = ['../assets/fon1.jpg', '../assets/fon2.jpg', '../assets/fon3.jpg', '../assets/fon4.jpg', '../assets/fon5.jpg']
  }

  trigger() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(this.#getRandomBackground, 3000);
  }

  #getRandomBackground = () => {
    document.querySelector('body').style.background = `url('${this.arrBackgrounds[random(0, this.arrBackgrounds.length - 1)]}') no-repeat center / cover`;
  }
}

