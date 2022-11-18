
import * as display from './display.js';
import * as tasks from './tasks.js';

window.addEventListener('load', () => {
    display.loadProjects();

    const primaryMenuItems = document.querySelectorAll('.primary-menu-items');
primaryMenuItems.forEach(item => {
    item.addEventListener('click', (event) => {
        display.updateCurrentView(event.target.dataset.display);
        //check if clicked item has a project ID, in which case pass it to the load tasks function
        if (event.target.dataset.projectid){
            display.loadTasks(event.target.dataset.projectid);
        } else {
            display.loadTasks();
        }

        display.updateActiveMenuItem(item);
    })
})
})

//first add any keyboard shortcuts we want to use across the UI
document.addEventListener('keydown',  (event) => {
    const enteredChar = event.key;

    //if the user is typing in an input field, stop the function
    if (event.target.tagName == "INPUT" && enteredChar != 'Escape') {
        return;
    }
    switch(enteredChar) {
        case 'Escape':
            display.closeModal();
            break;
        case 'n':
            display.displayModal();
            break;
        case '+':
            display.displayModal();
            break;

    }
});

//listen for users clicking to add a new task and present them the modal
const newTaskBtn = document.getElementById('new-task');
newTaskBtn.addEventListener('click', () => {
    display.addFormType('new');
    display.addProjectsToTaskForm();
    display.displayModal();
})


//listen for users closing the modal (they can also use keyboard shortcut)
const closeModalBtn = document.getElementById('closeModal');
closeModalBtn.addEventListener('click', display.closeModal)

const cancelBtn = document.getElementById('cancel-task');
cancelBtn.addEventListener('click', () => {
    display.closeModal();
    display.clearModal();
})


//process new task submission ans reload the UI with tasks
const form = document.getElementById('task-submission');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    if (form.dataset.formtype === 'new') {
        const formInputs = display.getFormInputs();
        //spread operator means i can just through all the inputs in a oner
        tasks.newTask(...formInputs);
        display.loadTasks();
    }

    //now clear down the form
    display.closeModal();
    display.clearModal();
})


