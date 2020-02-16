import {Project, ProjectStatus} from '../models/project'

type Listener<T> = (items: T[]) => void;

export class State<T> {
	//We use protected to get listeners from inherited classes
	protected listeners: Listener<T>[] = [];
	addListener(listenerFn: Listener<T>) {
		this.listeners.push(listenerFn);
	}
}

//Project State management class
export class ProjectState extends State<Project> {
	//LISTENER PATETERN

	private projects: Project[] = [];
	private static instance: ProjectState;

	private constructor() {
		super();
		// this.projects = this.configureState()
		// this.configureState()
	}

	configureState() {
		const emptyOne: Project[] = [];
		// const projectsFromStorage = localStorage.getItem('projects')!);

		// projectsFromStorage.forEach((el:Project) => emptyOne.push(el));
		// this.updateListeners()
		return emptyOne;
	}

	//singleton pattern

	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	addProject(title: string, description: string, people: number) {
		const newProject = new Project(
			Math.random().toString(),
			title,
			description,
			people,
			ProjectStatus.Active
		);
		this.projects.push(newProject);
		//LISTENER PATTERN
		this.updateListeners();
	}
	moveProject(projectid: string, newStatus: ProjectStatus) {
		const project = this.projects.find(prj => prj.id === projectid);
		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}
	private updateListeners() {
		localStorage.setItem('projects', JSON.stringify(this.projects));
		for (const listenerFn of this.listeners) {
			listenerFn(this.projects.slice()); //RETURNING JUST COPY OF PROJECTS NOT ORIGINAL
		}
  }

  async getFromLocal(){
    if(localStorage.getItem('projects')){
      const projectList =  await JSON.parse(localStorage.getItem('projects')!)
      projectList.forEach((proj:Project)=> this.projects.push(proj))
      this.updateListeners()
    }else{alert(' dodaj projekty ')}
  }
  
}
export const projectState = ProjectState.getInstance()
