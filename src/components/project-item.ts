
import { Draggable } from '../models/drag-drop'
import { autobind } from '../decorators/autobind';
import { Component } from './base-component';
import {Project} from  '../models/project'

export default class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
	implements Draggable {
	private project: Project;
	get persons() {
		if (this.project.people === 1) {
			return '1 person';
		}
		return `${this.project.people} persons`;
	}

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, false, project.id);
		this.project = project;
		this.configure();
		this.renderContent();
	}
	//DRAG AND DROP
	@autobind
	dragStartHandler(event: DragEvent) {
		//attaching data to transfer operation
		event.dataTransfer!.setData(
			'text/plain',
			this.project.id
		), (event.dataTransfer!.effectAllowed = 'move');
	}
	dragEndHandler(_: DragEvent) {
		console.log('dragEnd');
	}

	configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler);
		this.element.addEventListener('dragend', this.dragEndHandler);
	}

	renderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title;
		this.element.querySelector('h3')!.textContent = this.persons + ' assigned'; // with getter we dont have to run as a function
		this.element.querySelector('p')!.textContent = this.project.description;
	}
}
