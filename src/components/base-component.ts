 
 
 export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	templateElement: HTMLTemplateElement;
	hostElement: T;
	element: U;
	constructor(
		templateId: string,
		hostElement: string,
		insertAtStart: boolean,
		newElementId?: string
	) {
		this.hostElement = document.getElementById(hostElement)! as T;
		this.templateElement = document.getElementById(
			templateId
		)! as HTMLTemplateElement;
		const importedNODE = document.importNode(
			this.templateElement.content,
			true
		);
		this.element = importedNODE.firstElementChild as U;
		if (newElementId) {
			this.element.id = newElementId;
		}
		this.attach(insertAtStart);
	}
	private attach(insertAtStart: boolean) {
		this.hostElement.insertAdjacentElement(
			insertAtStart ? 'afterbegin' : 'beforeend',
			this.element
		);
	}
	abstract configure(): void; //All configuration and render suppose to be in inheritated classes
	abstract renderContent(): void;
}
