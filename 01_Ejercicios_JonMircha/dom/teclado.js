const d = document;

export function shortcuts(e) {
  if (e.key === "a" && e.altKey) {
    alert("haz lanzado una alerta con el teclado");
  }
  if (e.key === "c" && e.altKey) {
    confirm("haz lanzado una confirmación con el teclado");
  }
  if (e.key === "p" && e.altKey) {
    prompt("haz lanzado un aviso con el teclado");
  }
}
