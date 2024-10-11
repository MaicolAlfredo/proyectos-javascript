export class StorageHandler {
  //Guardar tareas en localStorage
  static saveTasks(tasks) {
    //convierte el array de tareas a JSON y lo guarda en localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  //Cargar las tareas desde localStorage
  static loadTasks() {
    // obtiene las tareas de localStorage y las convierte de vuelta a un array de objetos
    const tasks = localStorage.getItem("tasks");
    // si hay tareas almacenadas, devuelve, si no, devuelve un array vacio
    return tasks ? JSON.parse(tasks) : [];
  }
}
