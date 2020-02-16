//DRAG AND DROP INTERFACES as contracts
import {ProjectInput} from './components/project-input'
import {ProjectList} from './components/project-list'
import { projectState } from './project-state/project-state'
// class LocalState{
//   projects: Project[]
//   constructor(){
//     this.projects =this.configureState()
//   }
//   configureState(){
//     const emptyOne: Project[] = [];
//     const projectsFromStorage = JSON.parse(localStorage.getItem('projects')!);
//     projectsFromStorage.forEach((el:Project) => emptyOne.push(el));
//     // this.updateListeners()
//     return emptyOne
//   }
// }
// const fromLocalState = new LocalState()
// console.log(fromLocalState)
// const projectState = ProjectState.getInstance(fromLocalState.projects)

new ProjectInput()
new ProjectList('active')
new ProjectList('finished')
projectState.getFromLocal()
// ProjectState.getInstance()

// const prjInput = new ProjectInput()
// const activePrjList = new ProjectList('active')
// const FinishedPrjList = new ProjectList('finished')
