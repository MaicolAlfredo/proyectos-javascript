import { Task } from "./taskManager.js";

export class DOMHandler {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.modal = document.getElementById("taskModal"); 
    this.modalTitle = document.getElementById("modalTitle"); 
    this.form = document.getElementById("taskForm"); 
    this.taskList = document.getElementById("taskList"); 
    this.addTaskBtn = document.getElementById("addTaskBtn"); 

    //paginacion
    this.currentPage = 1;
    this.tasksPerPage = 5;
    this.totalPages = 0;
    //filtros recordado
    this.filter = "all";
    this.initEvents();
  }

  initEvents() {
    //evento para abrir la modal
    this.addTaskBtn.addEventListener("click", () => {
      this.openTaskModal();
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleTaskFormSubmit();
    });

    //Eventos para los filtros de tareas
    document
      .getElementById("filterAll")
      .addEventListener("click", () => this.renderTask());
    document
      .getElementById("filterCompleted")
      .addEventListener("click", () => this.renderTask("completed"));
    document
      .getElementById("filterPending")
      .addEventListener("click", () => this.renderTask("pending"));
    document
      .getElementById("filterPriority")
      .addEventListener("click", () => this.renderTask("high"));

    document.querySelector(".close").addEventListener("click", () => {
      this.modal.style.display = "none";
    });
  }

  renderTask(filter = "all") {
    this.filter = filter;
    this.taskList.innerHTML = "";

    const tasks = this.taskManager.filterTasks(filter);

    if (tasks.length === 0) {
      const emptyMessage = document.createElement("div");
      emptyMessage.classList.add("empty-message");
      emptyMessage.textContent = "No hay tareas registrada";
      this.taskList.appendChild(emptyMessage);
      return;
    }

    this.totalPages = Math.ceil(tasks.length / this.tasksPerPage);

    const start = (this.currentPage - 1) * this.tasksPerPage;
    const end = this.currentPage * this.tasksPerPage;
    const tasksToRender = tasks.slice(start, end);

    tasksToRender.forEach((task) => {
      const taskElement = document.createElement("div");
      taskElement.classList.add("task");
      if (task.completed) {
        taskElement.classList.add("completed");
      }

      taskElement.innerHTML = `
      <h3>${task.name}</h3>
      <p>${task.description}</p>
      <p><strong>Fecha Límite:</strong>${task.date}</p>
      <p><strong>Prioridad:</strong>${task.priority}</p>
      <button type="button" class="toggle-complete">${
        task.completed ? "Desmarcar" : "Completada"
      }
      </button>
      <button type="button" class="edit-task">Editar</button>
      <button type="button" class="delete-task">Eliminar</button>
      `;

      this.taskList.appendChild(taskElement);

      const toggleCompleteBtn = taskElement.querySelector(".toggle-complete");

      toggleCompleteBtn.addEventListener("click", () => {
        this.toggleTaskComplete(task.id);
      });

      const editBtn = taskElement.querySelector(".edit-task");
      editBtn.addEventListener("click", () => this.openTaskModal(task));

      const deleteBtn = taskElement.querySelector(".delete-task");
      deleteBtn.addEventListener("click", () => this.deleteTask(task.id));
    });

    this.renderPaginationControl();
  }

  //controles de paginación
  renderPaginationControl() {
    const paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");

    //boton anterior
    if (this.currentPage > 1) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Anterior";
      prevBtn.addEventListener("click", () => {
        this.currentPage--;
        this.renderTask(this.filter);
      });
      paginationContainer.appendChild(prevBtn);
    }

    //pagina numeradas
    for (let i = 1; i <= this.totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      if (i === this.currentPage) {
        pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => {
        this.currentPage = i;
        this.renderTask(this.filter);
      });
      paginationContainer.appendChild(pageButton);
    }

    this.taskList.appendChild(paginationContainer);
  }

  //Abrir el modal para agregar o editar una tarea
  openTaskModal(task = null) {
    this.form.reset(); //resetea el formulario
    if (task) {
      // Si se proporciona una tarea, estamos en modo "editar"
      this.modalTitle.textContent = "Editar Tarea";
      document.getElementById("taskId").value = task.id;
      document.getElementById("taskDescription").value = task.description;
      document.getElementById("taskDate").value = task.date;
      document.getElementById("taskPriority").value = task.priority;
      document.getElementById("taskId").value = task.id;
    } else {
      // si no se proporciona una tarea, estamos en modo "nueva tarea"
      this.modalTitle.textContent = "Nueva Tarea";
    }
    this.modal.style.display = "block";
  }

  handleTaskFormSubmit() {
    const name = document.getElementById("taskName").value;
    const description = document.getElementById("taskDescription").value;
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("taskPriority").value;
    const taskId = document.getElementById("taskId").value;

    if (taskId) {
      // Si existe taskId, estamos editando una tarea
      const updatedTask = new Task(name, description, date, priority, taskId);
      this.taskManager.editTask(updatedTask);
    } else {
      // Si no existe TaskId, estamos creando una nueva tarea
      const newTask = new Task(name, description, date, priority);
      this.taskManager.addTask(newTask);
    }

    this.modal.style.display = "none";
    this.renderTask(this.filter);
  }

  //Alterna entre completada o pendiente para una tarea
  toggleTaskComplete(taskId) {
    this.taskManager.toggleTaskCompletion(taskId);
    this.renderTask(this.filter);
  }

  //Eliminar una tarea y actualizar la lista
  deleteTask(taskId) {
    this.taskManager.deleteTask(taskId);
    this.renderTask(this.filter);
  }
}
