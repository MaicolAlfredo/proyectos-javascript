import hamburgerMenu from "./dom/menu_hamburguesa.js";
import { digitalClock, alarm } from "./dom/reloj.js";
import { shortcuts } from "./dom/teclado.js";
import countdown from "./dom/cuenta_regresiva.js";
import { scrollTopButton } from "./dom/boton_scroll.js";
import darkTheme from "./dom/tema_oscuro.js";
import responsiveMedia from "./dom/objeto_responsive.js";
const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  hamburgerMenu(".panel-btn", ".panel", ".menu a");
  digitalClock("#reloj", "#activar-reloj", "#desactivar-reloj");
  alarm("assets/alarm.mp3", "#activar-alarma", "#desactivar-alarma");
  countdown("countdown", "Jan 1, 2025", "Feliz año nuevo");
  scrollTopButton(".scroll-top-btn");
  responsiveMedia(
    "youtube",
    "(min-width:1024px)",
    ` <a
      href="https://youtu.be/2SetvwBV-SU?si=2xiO2KBI_-HxxKsQ"
      target="_blank"
      rel="noopener"
      >Ver Video</a
    >`,
    `<iframe width="560" height="315" src="https://www.youtube.com/embed/2SetvwBV-SU?si=pZsUFQcoyiZKGBcC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
  );
  responsiveMedia(
    "gmaps",
    "(min-width:1024px)",
    ` <a
      href="https://maps.app.goo.gl/CWzqnYEMr8qPKSFv7"
      target="_blank"
      rel="noopener"
      >Ver Video</a
    >`,
    `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1968.033890227946!2d-82.5222771219447!3d9.415453861511347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa614f93d1a84f1%3A0x2ebb42a2322d49aa!2sEstadio%20Calvin%20Byron!5e0!3m2!1ses!2spa!4v1740004638900!5m2!1ses!2spa" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
  );
});

d.addEventListener("keydown", (e) => {
  shortcuts(e);
  moveBall(e, ".ball", ".stage");
});

darkTheme(".dark-theme-btn", "dark-mode");
