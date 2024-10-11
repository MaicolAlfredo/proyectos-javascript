import { StorageHandler } from "./localStorage.js";

export class Task {
  constructor(name, description, date, priority, id = null, completed = false) {
    this.id = id || Date.now().toString();
    this.name = name;
    this.description = description;
    this.date = date;
    this.priority = priority;
    this.completed = completed;
  }
}

export class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    StorageHandler.saveTasks(this.tasks);
  }

  editTask(updatedTask) {
    const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      StorageHandler.saveTasks(this.tasks);
    }
  }
  //Eliminar una tarea por ID
  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    StorageHandler.saveTasks(this.tasks);
  }
  //Marcar o desmarcar una tarea como completada
  toggleTaskCompletion(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      StorageHandler.saveTasks(this.tasks);
    }
  }

  //Filtrar las tareas según el filtro seleccionado
  filterTasks(filter) {
    switch (filter) {
      case "completed":
        return this.tasks.filter((task) => task.completed);
      case "pending":
        return this.tasks.filter((task) => !task.completed);
      case "high":
        return this.tasks.filter((task) => task.priority === "high");
      default:
        return this.tasks;
    }
  }

  setTasks(tasks) {
    this.tasks = tasks;
  }
}
