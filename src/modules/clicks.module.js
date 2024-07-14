import { Module } from '../core/module'
import { random } from '../utils';

export class ClicksModule extends Module {
  constructor(type, text) {
    super(type, text)
  }

  #createClickCountBlock() {
		this.clickBlock = document.createElement('div');
    this.clickBlock.className = 'click';
		document.body.append(this.clickBlock);
		this.clickCount = document.createElement('h1');
		this.clickBlock.append(this.clickCount);
    this.clickBlock.style.color = `rgb(${random(0, 255)})`
    
	}

  #createModalTotal() {
    this.modalTotal = document.createElement('div');
    this.modalTotal.className = 'total';
    
    document.body.append(this.modalTotal);
  }

  trigger() {
    document.body.innerHTML = '';
    let counter = 0;
    this.#createClickCountBlock();
    document.addEventListener('click', () => {
      counter++;
      this.clickCount.textContent = counter - 1;
      this.clickCount.style.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
      
    })

    document.addEventListener('contextmenu', () => {
      counter++;
      this.clickCount.textContent = counter - 1;
      this.clickCount.style.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
      
    })

    setTimeout(() => {
      document.body.innerHTML = '';
      this.#createModalTotal();
      this.modalTotal.textContent = `Количество кликов: ${counter - 1}`;
     
      
    }, 5000)
    
  }
  

  
}