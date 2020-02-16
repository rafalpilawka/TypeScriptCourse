
import {DragTarget} from '../models/drag-drop'
import {Component} from './base-component'
import {autobind} from '../decorators/autobind'
import ProjectItem from './project-item'
import { projectState } from '../project-state/project-state';
import {ProjectStatus, Project} from '../models/project'

export class ProjectList extends Component<HTMLDivElement, HTMLElement>
	implements DragTarget {
	assignedProjects: Project[];

	constructor(private type: 'active' | 'finished') {
		super('project-list', 'app', false, `${type}-projects`);
		// this.hostElement = document.getElementById('app')! as HTMLDivElement;
		// this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;

		// const importedNODE = document.importNode(this.templateElement.content, true);
		// this.element = importedNODE.firstElementChild as HTMLElement;
		// this.element.id =`${this.type}-projects`;

		this.assignedProjects = [];

		//LISTENER PATTERN IN CLIENT

		// this.attach();
		//++++++++++++++++++++
		this.configure();
		//>>>>>>>>>>>>>>>>>
		this.renderContent();
	}

	@autobind
	dragOverHandler(event: DragEvent) {
		if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
			//default for html  - not allow dropping
			event.preventDefault();
			const listEl = this.element.querySelector('ul')!;
			listEl.classList.add('droppable');
		}
	}

	@autobind
	dragLeaveHandler(_: DragEvent) {
		// console.log(event)
		const listEl = this.element.querySelector('ul')!;
		listEl.classList.remove('droppable');
	}
	@autobind
	dropHandler(event: DragEvent) {
		const prjId = event.dataTransfer!.getData('text/plain');
		projectState.moveProject(
			prjId,
			this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
		);
	}

	configure() {
		//lietsners for drag and drop
		this.element.addEventListener('dragover', this.dragOverHandler);
		this.element.addEventListener('dragleave', this.dragLeaveHandler);
		this.element.addEventListener('drop', this.dropHandler);
		//
		projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter(project => {
				if (this.type === 'active') {
					return project.status === ProjectStatus.Active;
				}
				return project.status === ProjectStatus.Finished;
			});
			this.assignedProjects = relevantProjects;
			this.renderProjects();
		});
	}

	private renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-project-list`
		)! as HTMLUListElement;
		listEl.innerHTML = '';
		for (const prjEl of this.assignedProjects) {
			new ProjectItem(this.element.querySelector('ul')!.id, prjEl);
		}
	}

	// private attach(){
	//   this.hostElement.insertAdjacentElement('beforeend', this.element)
	// }

	renderContent() {
		const listId = `${this.type}-project-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector('h2')!.textContent =
			this.type.toUpperCase() + 'PROJECTS';
	}
}

export const projectsLST: Project[] = [
	{
		id: '1askjsdkjfs',
		title: 'AAAAA',
		description: 'BAKJHJHJSHKJHKJS',
		people: 4,
		status: ProjectStatus.Active
	}
];
