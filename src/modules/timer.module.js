import { Module } from '../core/module';
import { isValid } from '../utils';

export class TimerModule extends Module {
	constructor(type, text) {
		super(type, text);
		this.el = document.querySelector('body');
	}

	trigger() {
		clearInterval(this.#timerSet);
		document.body.innerHTML = '';
		this.#createModalWindow();
		this.input.value = '';

		this.form.addEventListener('submit', event => {
			event.preventDefault();
			const { target } = event;
			const submitButton = target;

			if (submitButton) {
				this.modalWindow.classList.add('modal-overlay_hidden');
				this.#createTimerBlock();
				this.#timerSet();
			}
		});
		this.input.addEventListener('input', event => {
			this.#validation();
		});
	}
	#createModalWindow() {
		this.modalWindow = document.createElement('div');
		this.modalWindow.className = 'timer_modal-overlay ';
		this.el.append(this.modalWindow);

		this.form = document.createElement('form');
		this.form.className = 'modal-form';

		this.modalWindow.append(this.form);

		this.formLabel = document.createElement('label');
		this.form.append(this.formLabel);
		this.formLabel.className = 'form-label';
		this.formLabel.textContent = 'Введите количество секунд для отсчёта:';

		this.input = document.createElement('input');
		this.input.setAttribute('required', '');
		this.input.className = 'modal-input';
		this.input.type = 'number';
		this.input.placeholder = 'введите значение больше 0';

		this.form.append(this.input);

		this.button = document.createElement('button');
		this.button.className = 'modal-button';
		this.button.textContent = 'Запустить таймер!';
		this.button.type = 'submit';
		this.form.append(this.button);
	}

	#validation() {
		if (this.input.value <= 0 || !this.input.value) {
			this.button.disabled = true;
		} else {
			this.button.disabled = false;
		}
	}

	#timerSet() {
		const timer = setInterval(() => {
			console.log(this.input.value);
			this.timerValue.textContent = this.input.value--;
			if (this.input.value < 0) {
				clearInterval(timer);
				this.timerBlock.remove();
				this.input.value = '';
				this.#createMessage();
			}
		}, 1000);
	}

	#createTimerBlock() {
		this.timerBlock = document.createElement('div');
		this.timerBlock.className = 'timer';
		this.el.append(this.timerBlock);
		this.timerValue = document.createElement('span');
		this.timerValue.className = 'timer-span';
		this.timerBlock.append(this.timerValue);
		this.timerValue.textContent = this.input.value;
	}

	#createMessage() {
		this.message = document.createElement('span');
		this.message.className = 'message';
		this.message.textContent = 'ВРЕМЯ ВЫШЛО!';
		this.el.append(this.message);
		setTimeout(() => {
			this.message.remove();
		}, 2000);
	}
}
