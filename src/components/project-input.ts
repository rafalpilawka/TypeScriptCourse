
import { Component } from './base-component';
import {validate, Validatable} from '../utils/validate'
import { autobind } from '../decorators/autobind';
import {projectState} from '../project-state/project-state'

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	titleInputlement: HTMLInputElement;
	descriptionInputlement: HTMLInputElement;
	peopleInputlement: HTMLInputElement;
	//NO INHERITANCE VERSION
	// templateElement: HTMLTemplateElement;
	// hostElement: HTMLElement | HTMLDivElement;
	// element: HTMLFormElement;
	// titleInputlement: HTMLInputElement;
	// descriptionInputlement: HTMLInputElement;
	// peopleInputlement: HTMLInputElement;

	constructor() {
		super('project-input', 'app', true, 'user-input');
		// this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement; // type casting
		// this.hostElement = document.getElementById('app')! as HTMLElement;

		// const importedNODE = document.importNode(this.templateElement.content, true ) ; // Second argument is for deep content
		// this.element = importedNODE.firstElementChild as HTMLFormElement;
		// this.element.id = 'user-input';

		this.titleInputlement = this.element.querySelector(
			'#title'
		) as HTMLInputElement;
		this.descriptionInputlement = this.element.querySelector(
			'#description'
		) as HTMLInputElement;
		this.peopleInputlement = this.element.querySelector(
			'#people'
		) as HTMLInputElement;

		// this.attach();
		this.configure();
	}
	// WE declare PUBLIC METHODS FIRST => CONVENTION
	configure() {
		this.element.addEventListener('submit', this.submitHandler);
	}

	renderContent() {}

	private gatherUserInput(): [string, string, number] | void {
		const enteredTitle = this.titleInputlement.value;
		const enteredDescription = this.descriptionInputlement.value;
		const enteredPeople = this.peopleInputlement.value;
		//CREATING OBJECTS FOR VALIDATION
		const validatableTitle: Validatable = {
			value: enteredTitle,
			required: true
		};
		const validatableDescription: Validatable = {
			value: enteredDescription,
			required: true,
			minLength: 5
		};
		const validatablePeople: Validatable = {
			value: +enteredPeople,
			required: true,
			min: 1,
			max: 4
		};

		//CHECKING ALL FIELDS ARE FILLED
		if (
			!validate(validatableTitle) ||
			!validate(validatableDescription) ||
			!validate(validatablePeople)
		) {
			alert('invalid input');
			return;
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople];
		}
	}

	private clear() {
		this.titleInputlement.value = '';
		this.descriptionInputlement.value = '';
		this.peopleInputlement.value = '';
	}

	@autobind
	private submitHandler(event: Event) {
		event.preventDefault();
		// console.log(this.titleInputlement.value)
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, desc, people] = userInput;
			projectState.addProject(title, desc, people);
			this.clear();
		}
	}

	// private attach(){
	//   this.hostElement.insertAdjacentElement('afterbegin', this.element)
	// }
}
