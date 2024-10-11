import { TaskManager } from "./taskManager.js";
import { DOMHandler } from "./domHandler.js";
import { StorageHandler } from "./localStorage.js";

document.addEventListener("DOMContentLoaded", () => {
  const taskManager = new TaskManager();

  //Cargar las tareas desde localStorage
  const storedTasks = StorageHandler.loadTasks();

  //Si hay tareas guardadas en el localStorage, establecer en el TaskManager
  if (storedTasks.length > 0) {
    taskManager.setTasks(storedTasks);
  }

  // Crear una instancia de DOMHandler, pasándole el TaskManager
  const domHandler = new DOMHandler(taskManager);

  //Renderizar las tareas y eventos al cargar la pagina
  domHandler.renderTask();
});
