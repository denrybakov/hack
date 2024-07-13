import { Module } from '../core/module';

export class TimerModule extends Module {
	constructor(type, text) {
		super(type, text);
		this.el = document.querySelector('body');
	}

	trigger() {
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

		this.form.addEventListener('submit', event => {
			event.preventDefault();
			const { target } = event;
			const submitButton = target;

			if (submitButton) {
				this.modalWindow.classList.add('modal-overlay_hidden');
				const timerBlock = document.createElement('div');
				timerBlock.className = 'timer';
				this.el.append(timerBlock);
				let timerValue = document.createElement('span');
				timerValue.className = 'timer-span';
				timerBlock.append(timerValue);
				timerValue.textContent = this.input.value;
				const timer = setInterval(() => {
					timerValue.textContent = this.input.value--;
					if (this.input.value < -1) {
						clearInterval(timer);
						timerBlock.remove();
					}
				}, 1000);
			}
		});
	}
}
