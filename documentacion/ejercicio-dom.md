# Ejercicio del DOM

1. [JavaScript 88 Tema DarkLight](#javascript-88-dom-ejercicios-prácticos-tema-darklight)

## JavaScript 88. DOM Ejercicios Prácticos Tema DarkLight

Recuerda que estamos en las clases de ejercicios del DOM. En la sesión anterior, estuvimos haciendo una interacción para tener un botón de tipo scroll, llamado "Top Button". Al final de ese ejercicio, te mostré nuestro siguiente reto: hacer un botón que activara o desactivara un tema oscuro para nuestra interfaz.

Recuerda que te había mostrado, en el ejercicio de la cuenta regresiva, la página de Emojipedia porque vamos a poner un ícono de sol "☀️". Vamos a nuestro HTML dom-ejercicio.html y, debajo del botón de scroll, agregaremos otro botón con la clase "dark-theme-btn". Escrito con Emmet en HTML, sería: `button.dark-theme-btn ` Como contenido, este botón tendrá el ícono del sol o la luna "🌙".

`dom-ejercicio.html`

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ejercicios del DOM</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.2.1/hamburgers.min.css"
    />
    <link rel="stylesheet" href="css/dom-ejercicios.css" />
  </head>
  <body>
    <header class="header">
      <h1>Ejercicios del DOM</h1>
    </header>
    <button class="panel-btn hamburger hamburger--spin" type="button">
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <aside class="panel">
      <nav class="menu">
        <a href="#seccion1">Reloj Digital y Alarma Sonora</a>
        <a href="#seccion2">Eventos del Teclado</a>
        <a href="#seccion3">Cuenta Regresiva</a>
        <a href="#seccion4">Sección 4</a>
        <a href="#seccion5">Sección 5</a>
      </nav>
    </aside>
    <main>
      <section id="seccion1" class="section">
        <h2>Reloj Digital y Alarma Sonora</h2>
        <div id="reloj"></div>
        <div>
          <button id="activar-reloj">Iniciar Reloj</button>
          <button id="desactivar-reloj">Detener Reloj</button>
          <button id="activar-alarma">Iniciar alarma</button>
          <button id="desactivar-alarma">Detener alarma</button>
        </div>
      </section>
      <section id="seccion2" class="section">
        <h2>Eventos del Teclado</h2>
        <article class="stage">
          <div class="ball"></div>
        </article>
      </section>
      <section id="seccion3" class="section">
        <h2>Cuenta Regresiva</h2>
        <div id="countdown"></div>
      </section>
      <section id="seccion4" class="section">
        <h2>Sección 4</h2>
      </section>
      <section id="seccion5" class="section">
        <h2>Sección 5</h2>
      </section>
    </main>
    <button class="scroll-top-btn hidden">&#11014;</button>
    <!-- JavaScript 88. DOM Ejercicios Prácticos Tema DarkLight -->
    <button class="dark-theme-btn">☀️🌙</button>

    <script src="index.js" type="module"></script>
  </body>
</html>
```

Vámonos al CSS. Este ejercicio también va a incluir una parte de CSS. De hecho, si te das cuenta, los estilos del botón son prácticamente los mismos que los del botón que hicimos en el video anterior, el "Scroll Top Button".

La diferencia es que, en lugar de posicionarlo a la derecha (right), lo vamos a colocar a la izquierda (left).

`dom-ejercicios.css`

```css
/* DarkThemeButtom */
.dark-theme-btn {
  position: fixed;
  z-index: 999;
  bottom: 1vh;
  /* En lugar de aplicar a 'right' vamos aplicar a 'left' */
  left: 1vw;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: bold;
  background-color: var(--main-color);
  color: var(--second-color);
  cursor: pointer;
  outline: 0;
  border: 0;
  transition: all 0.3s ease-out;
}

.dark-theme-btn:hover {
  background-color: var(--second-color);
  color: var(--main-color);
}
```

Vamos a nuestro ejercicio. En el navegador, se podrán observar los íconos del sol y la luna, pero en realidad solo tendremos un único ícono.
De hecho, el ícono que aparecerá por defecto debe ser la luna, porque esta indica que queremos cambiar al modo "dark". En cambio, cuando estamos en el modo oscuro (dark mode), el ícono que se mostrará será el sol, ya que representa la opción para volver al tema claro (light mode).

Dejaremos los dos íconos y, más adelante, quitaremos el solcito.
Muy bien, vamos a crear un archivo en la carpeta dom, donde están los otros módulos, y lo llamaremos `tema_oscuro.js`.
En este archivo, crearemos una función por defecto llamada DarkTheme:

`tema_oscuro.js`

```js
export default function darkTheme() {}
```

Como parámetro, en este caso, solo necesitaremos el botón. Pero, ojo: generalmente, en este tipo de interacciones, lo que se hace es agregar una clase con los estilos oscuros a todos los elementos a los que queramos aplicar el dark mode.
Por lo general, podríamos aplicar esta clase solo al body o a la etiqueta html, y con eso sería suficiente. Pero imagina que necesitas aplicarla a varios elementos de tu HTML. Para evitar especificar manualmente qué selectores deben cambiar al dark mode, usaremos un data-attribute.
Cada elemento al que quieras cambiarle los estilos al activar o desactivar el tema oscuro, simplemente deberá tener un atributo como data-dark o data-theme-dark.
Para eso, también necesitaríamos un segundo parámetro en nuestra función DarkTheme, llamado dataDark, que servirá para recolectar los selectores de los elementos que tendrán la clase dark. Sin embargo, lo que realmente necesitamos en nuestra función es saber cuál es el nombre de la clase que se aplicará o se eliminará en los elementos que tengan el data-attribute dataDark. Esta clase es la que permitirá alternar entre el tema claro (light mode) y el tema oscuro (dark mode). Por esta razón, en lugar de dataDark, vamos a llamar a este parámetro
`classDark` , ya que su función será agregar o quitar una clase específica. Si te das cuenta, esto es muy similar al ejercicio anterior, donde agregábamos y quitábamos la clase 'hidden' para mostrar u ocultar un botón, o incluso al comportamiento del menú de hamburguesa, que alternaba su visibilidad para abrirse o cerrarse. Entonces, ya tenemos los dos parámetros necesarios para nuestra función:

`tema_oscuro.js`

```js
export default function darkTheme(btn, classDark) {}
```

Vámonos al index_dom.js , donde se ejecutará el código al cargar el documento en el evento `DOMContentLoaded` Debajo de nuestra función scrollTopButton, vamos a declarar `darkTheme()`. Primero, comprobamos la importación de nuestro módulo:`import darkTheme from "./dom/tema_oscuro.js";`.
Ahora, ¿cuál es el nombre del selector del botón? El selector es una clase llamada `dark-theme-btn`, y la clase que activará el tema oscuro se llamará `dark-mode`. Aquí solo necesitamos el nombre de la clase, porque la activaremos y desactivaremos con los métodos add() y remove() de la lista de clases. Por lo tanto, no es necesario incluir el punto (.) al especificar el nombre de la clase, simplemente debemos indicar "dark-mode". ¡Y listo! Con esto, ya tenemos todo lo necesario para que funcione.

`index_dom.js`

```js
import hamburgerMenu from "./dom/menu_hamburguesa.js";
import { digitalClock, alarm } from "./dom/reloj.js";
import { shortcuts, moveBall } from "./dom/teclado.js";
import countdown from "./dom/cuenta_regresiva.js";
import { scrollTopButton } from "./dom/boton_scroll.js";
import darkTheme from "./dom/tema_oscuro.js";
const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  hamburgerMenu(".panel-btn", ".panel", ".menu a");
  digitalClock("#reloj", "#activar-reloj", "#desactivar-reloj");
  alarm("#activar-alarma", "#desactivar-alarma");
  countdown("countdown", "Jan 1,2025", "Feliz año nuevo");
  scrollTopButton(".scroll-top-btn");
  darkTheme(".dark-theme-btn", "dark-mode");
});

d.addEventListener("keydown", (e) => {
  shortcuts(e);
  moveBall(e, ".ball", ".stage");
});
```

Ahora, algo muy importante: no hemos definido la clase en el CSS que aplicará los estilos. Por lo tanto, volvamos al CSS y creemos una clase llamada `dark-mode`.

Esta clase aplicará los siguientes estilos:

- La variable --second-color representa el color negro y se usará como fondo.
- La variable --main-color representa el color amarillo JavaScript y se usará para el texto.

Cuando se active dark-mode, veremos el texto en amarillo y el fondo oscuro.

`dom-ejercicios.css`

```css
/* DarkThemeButtom */
.dark-theme-btn {
  position: fixed;
  z-index: 999;
  bottom: 1vh;
  left: 1vw;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: bold;
  background-color: var(--main-color);
  color: var(--second-color);
  cursor: pointer;
  outline: 0;
  border: 0;
  transition: all 0.3s ease-out;
}

.dark-theme-btn:hover {
  background-color: var(--second-color);
  color: var(--main-color);
}
/* dark-mode */
.dark-mode {
  background-color: var(--second-color);
  color: var(--main-color);
}
```

Muy bien, ahora, lo que les decía: imagínense que quieren aplicar dark-mode a varios elementos. Por ejemplo, si quiero aplicarlo al html, lo que haré será agregar un data-attribute llamado data-dark, que me estoy inventando en este momento: `<html lang="es" data-dark>`. Al agregar data-dark a la etiqueta html, se aplicarán los estilos correspondientes para el modo claro u oscuro.

También podría haberlo aplicado al body, si lo prefiero. De hecho, podemos agregarlo así: `<body data-dark>`.

`dom-ejercicios.html`

```js
<!DOCTYPE html>
<html lang="es" data-dark>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ejercicios del DOM</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/hamburgers/1.2.1/hamburgers.min.css"
    />
    <link rel="stylesheet" href="css/dom-ejercicios.css" />
  </head>
  <body data-dark>
  </body>
</html>
```

Entonces, lo que vamos a hacer en la programación de nuestro tema oscuro es lo siguiente: primero, necesitamos una variable de nombre d que hace referencia al document `const d = document`. Luego, en nuestra función `darkTheme`, creamos dos variables: una que llama al selector del botón. Entonces, vamos a crear una variable que se llame: `const $themeBtn = d.querySelector(btn)`.
Y la otra variable necesito que me enliste una lista de elementos del DOM que tengan el atributo `data-dark`. En este ejemplo, declaramos a la etiqueta `html` y la etiqueta `body`. Entonces, ¿cómo puedo crear en JavaScript un selector que apunte a los elementos que tengan este data-attribute `data-dark`? ¡Muy sencillísimo! Y, de hecho, eso es cuestión de CSS más que de JavaScript. Creamos la variable de nombre `$selectors` (porque son selectores de CSS), que será igual a `document.querySelectorAll`, porque quiero todos los elementos. Ahora, cuando quieran aplicar estilos por un tipo de atributo específico, se especifica entre corchetes, y eso en CSS significa: "vamos a aplicar esta regla a los elementos que tengan este atributo". En este caso, el atributo se llama (no es un atributo de HTML, sino un data-attribute que inventé) `data-dark`: `$selectors = d.querySelectorAll("[data-dark]");`.

Adicionalmente, a estas variables del DOM, necesito crearme una variable. Recuerden que el botón va a cambiar de contenido: pondrá la luna o el sol. Las variables van a contener los emojis; recuerden que pueden programar con los emojis porque, al final, los emojis son texto:`let moon = "🌙", sun = "☀️";`.
Dejo solo la luna en el HTML porque es el comportamiento que esperamos, pues en la interfaz tenemos el tema claro, y el botoncito de la luna indica que se puede cambiar a dark mode.
¿Por qué almacené los emojis en variables? Porque cuando presione el botón, aparte de agregar o quitar la clase a los elementos que tengan el atributo data-dark, también tiene que cambiar su textContent por la luna o por el sol.

Vamos a desencadenar el evento 'click'. Recuerden que hemos trabajado con la delegación de eventos, entonces el evento se lo asigno al document y no al botón:`d.addEventListener("click",e=>{})`. Si el elemento que recibió el clic (e.target), en conjunto con el método matches, comprobamos si coincide con el selector almacenado en btn: `if(e.target.matches(btn)){}`.

¿Cómo comparo para activar o desactivar el modo dark? Lo que haré es evaluar el contenido HTML que muestra la luna. Eso lo podría obtener de la propiedad textContent del botón, que está guardado en la variable $themeBtn.

`console.log($themeBtn.textContent)`

Lo que podemos hacer es: si el botón del tema $themeBtn, en su propiedad textContent, es igual (===) a lo que está en la variable de la luna moon,

`if($themeBtn.textContent === moon)`

si esto se cumple, que le agregue la clase dark-mode a todos los elementos que tienen el data-attribute data-dark, que hemos guardado en la variable $selectors. Pero hay que recordar que hemos llamado a todos con querySelectorAll(), lo que nos devuelve un NodeList, que es una especie de arreglo del DOM. Vamos a utilizar el método forEach() que tienen los NodeList.

Se usa forEach para recorrer cada elemento en $selectors. En cada iteración, a el se le agrega la clase almacenada en classDark usando

`classList.add(classDark)`.

El resultado es que todos los elementos en $selectors tendrán la clase classDark:

`$selectors.forEach((el) => el.classList.add(classDark));`.

Tenemos que cambiar la propiedad textContent de nuestro botón de luna a sol, porque si no, nada más cambiarían los estilos, pero no el contenido del botón:

`$themeBtn.textContent = sun;`.

Caso contrario, en el bloque else, se copiaría el mismo código, solo que en vez de utilizar el método .add(), se usaría .remove(), o sea, que quite la clase:

`$selectors.forEach((el) => el.classList.remove(classDark));`.

Además, en lugar de que el contenido sea el sol, ahora será la luna:

`$themeBtn.textContent = moon;`.

`tema_oscuro.js`

```js
const d = document;

export default function darkTheme(btn, classDark) {
  const $themeBtn = d.querySelector(btn),
    $selectors = d.querySelectorAll("[data-dark]");

  let moon = "🌙",
    sun = "☀️";

  d.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      if ($themeBtn.textContent === moon) {
        $selectors.forEach((el) => el.classList.add(classDark));
        $themeBtn.textContent = sun;
      } else {
        $selectors.forEach((el) => el.classList.remove(classDark));
        $themeBtn.textContent = moon;
      }
    }
  });
}
```
