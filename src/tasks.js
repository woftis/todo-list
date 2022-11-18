import { v4 as uuidv4 } from 'uuid';

let tasksList = [];

//factory function for creating neew tasks
const Task = (title, description, dueDate, priority, project) => {
    const id = uuidv4();
    const completed = false;
    return {id, title, description, dueDate, priority, project, completed};
}

//function to call factory to create the tasks
const newTask = (title, dueDate, priority, project, description) => {
    const newTask = Task(title, description, dueDate, priority, project);
    tasksList.push(newTask);
}

const editTask = (id, title, description, dueDate, priority, project) => {
    const index = tasksList.findIndex(task => task.id == id);
    tasksList[index].title = title;
    tasksList[index].description = description;
    tasksList[index].dueDate = dueDate;
    tasksList[index].priority = priority;
    tasksList[index].project = project;

}

const deleteTask = (id) => {
    const index = tasksList.findIndex(task => task.id == id);
    tasksList.splice(index, 1);
}

//function to retrieve tasks which takes a filter - defaults on all tasks if filter not provided
//accepted values are "today" or "project" - when providing project the actual project id should also be provided
const getTasks = (filter, project) => {
    
    if (filter === 'today') {
        //logic dependent on how dates will be handled - filter statement will need to be updated to look at date
        return tasksList.filter(task => task.title == 'do other stuff');
    } 

    if (filter === 'project') {
        return tasksList.filter(task => task.project === project);
    }

    if (filter === 'important') {
        return tasksList.filter(task => task.priority === 'high');
    }

    return tasksList;
}

export {
    tasksList,
    newTask,
    editTask,
    deleteTask,
    getTasks
}