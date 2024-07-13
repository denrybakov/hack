import { Module } from '../core/module'

export class ClicksModule extends Module {
  constructor(type, text) {
    super(type, text)
  }

  trigger() {
    
    let counter = 0;
    // this.clickCount = document.createElement('h1');
    // this.clickCount.textContent = new Date();
    // document.body.prepend(this.clickCount);
    document.addEventListener('click', () => {
      counter++;
      // this.clickCount.textContent = counter - 1;
    })
    setTimeout(() => {
      // this.clickCount.textContent = `Количество кликов - ${counter - 1}`;
      alert(`Количество кликов - ${counter - 1}`);

    }, 5000)
    
  }
}