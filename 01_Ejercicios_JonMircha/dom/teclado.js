const d = document;

let x = 0,
  y = 0;

export function moveBall(e, ball, stage) {
  const $ball = d.querySelector(ball),
    $stage = d.querySelector(stage),
    limitsBall = $ball.getBoundingClientRect(),
    limitsStage = $stage.getBoundingClientRect();

  switch (e.keyCode) {
    case 37:
      e.preventDefault();
      //move("left");
      if (limitsBall.left > limitsStage.left) x--;
      break;

    case 38:
      //move("up");
      if (limitsBall.top > limitsStage.top) {
        e.preventDefault();
        y--;
      }
      break;

    case 39:
      e.preventDefault();
      //move("right");
      if (limitsBall.right < limitsStage.right) x++;
      break;

    case 40:
      //move("down");
      if (limitsBall.bottom < limitsStage.bottom) {
        e.preventDefault();

        y++;
      }
      break;

    default:
      break;
  }
  $ball.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
}

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
