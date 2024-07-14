import { Module } from '../core/module';
import { random } from '../utils';

export class MessageModule extends Module {
	constructor(type, text) {
		super(type, text);
		this.el = document.querySelector('body');
		this.TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
	}

	trigger() {
		this.randomID = random(1, 200);
		this.fetchingTodos();
	}
	fetchingTodos() {
		fetch(`${this.TODOS_URL}/${this.randomID}`)
			.then(response => response.json())
			.then(response => this.createMessage(response))
			.catch(error => {
				console.error(error);
			})
			.finally(() => {
				console.log('message on the screen!');
			});
	}

	createMessage(response) {
		this.messagePar = document.createElement('p');
		this.messagePar.className = 'message-par';
		this.messagePar.textContent = `${response.title}`;
		this.el.append(this.messagePar);
	}
}
