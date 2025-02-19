# Ejercicio del DOM

1. [JavaScript 88 Tema DarkLight](#javascript-88-dom-ejercicios-prácticos-tema-darklight)
1. [JavaScript 89 API LocalStorage](#javascript-89-dom-ejercicios-prácticos-api-localstorage)
1. [JavaScript 90 Responsive con JavaScript](#javascript-90-dom-ejercicios-prácticos-responsive-con-javascript)

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

## JavaScript 89. DOM Ejercicios Prácticos API localStorage

En la clase anterior, habíamos dejado nuestro ejercicio para aplicar el tema oscuro en el DOM. Sin embargo, el detalle es que, cada vez que recargamos el navegador, obtenemos el tema claro. Esto ocurre porque el tema predeterminado es el claro.

En este ejercicio, resolveremos este problema utilizando una API de los navegadores llamada Web Storage, específicamente localStorage. Esta API nos permite almacenar información en el almacenamiento persistente del navegador.

Si vamos a las herramientas de desarrollo del navegador, en la pestaña Application, podremos ver y gestionar los datos guardados en el localStorage.

La API de Web Storage incluye dos tipos de almacenamiento: localStorage y sessionStorage (almacenamiento por sesión). localStorage es un objeto integrado en los navegadores que permite almacenar datos de forma persistente. Datos persisten incluso después de cerrar el navegador.

Vamos a hacer una pequeña refactorización de nuestro código para que pueda funcionar. Lo primero es que necesitamos dos métodos del localStorage: uno que permita obtener el valor de una variable de tipo localStorage y otro que permita actualizar o establecer un valor para localStorage.

Además de hacer la delegación del clic del botón, necesitamos desencadenar un evento de tipo DOMContentLoaded, porque cuando cargue nuestra aplicación, independientemente del funcionamiento del clic de la luna y el sol, queremos que el navegador consulte al localStorage si existe una variable (la que decide si estamos en tema oscuro o no) y, en base a eso, aplique los estilos correspondientes. Entonces, vamos a asignar un evento DOMContentLoaded:
`d.addEventListener("DOMContentLoaded", (e) => {});`. Dentro del DOMContentLoaded, declaramos una alerta: `alert("Hola desde la funcion darktheme")` Recargamos el navegador y, automáticamente, debería aparecer la alerta, pero no lo hace. Esto ocurre porque en el archivo `index_dom.js` (donde ejecutamos la función `darkTheme`) se puede observar que la programación se está desencadenando con el `DOMContentLoaded` del archivo principal (`index_dom.js`).

Sin embargo, hay algo importante que recalcar: el archivo `tema_oscuro.js`, además de trabajar con el evento del clic, utiliza otro DOMContentLoaded. No podemos tener un evento del mismo tipo en ambos archivos, porque ese evento ya está asignado en el ámbito donde se ejecuta la función en index_dom.js.

Aclaración técnica adicional (sin código):
El evento DOMContentLoaded solo se ejecuta una vez al cargar el DOM. Si está declarado en dos archivos diferentes, solo el primero en cargarse funcionará, a menos que se maneje con una lógica centralizada. Esto explica por qué la alerta no aparece: hay una duplicidad de eventos que entran en conflicto.

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

  d.addEventListener("DOMContentLoaded", (e) => {});
}
```

Para que el DOMContentLoaded de la funcion `darkTheme` funcione, lo que podemos hacer es sacarlo literalmente del DOMContentLoaded del archivo index_dom.js. Es decir, evitar anidar ambos eventos, ya que si el código de tema_oscuro.js está dentro del DOMContentLoaded de index_dom.js, se crea un conflicto de ejecución.

Explicación técnica (sin código):
El evento DOMContentLoaded no debe anidarse entre archivos, ya que si un archivo principal (como index_dom.js) ya lo está usando para encapsular su lógica, el segundo archivo (tema_oscuro.js) no podrá ejecutar su propio DOMContentLoaded de forma independiente. La solución es separar los eventos, asegurando que cada archivo gestione su propio DOMContentLoaded sin depender del otro.

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
});

d.addEventListener("keydown", (e) => {
  shortcuts(e);
  moveBall(e, ".ball", ".stage");
});

darkTheme(".dark-theme-btn", "dark-mode");
```

Esta 2 lineas de codigo que activa el modo oscuro.

```js
$selectors.forEach((el) => el.classList.add(classDark));
$themeBtn.textContent = sun;
```

Lo que haremos es crearnos una función que se llame `lightMode` y otra `darkMode`. Estas funciones tendrán las líneas de código que hacen cambiar la luna por el sol en el botón, y que aplican o quitan la clase de CSS a los elementos que usan el tema oscuro. Estas funciones deben ejecutarse tanto al clic del botón como al evento DOMContentLoaded cuando recarguemos. Así, para no duplicar el código, lo guardaremos en funciones reutilizables.

Muy bien. Ahora, lo importante es que, cuando cargue el documento, debemos verificar si existe una variable en localStorage que controle el estado del tema oscuro. Como vamos a utilizar localStorage con frecuencia, podemos hacer lo mismo que hicimos con la variable `d` (que guarda `document`): crear una variable llamada `ls` que sea igual a `localStorage`.Utilizamos un `if` para verificar si localStorage (almacenado en la variable `ls`), en conjunto con el método `getItem()`, contiene un valor guardado. Lo único que tenemos que pasarle es el nombre de la clave; en este caso, nuestra clave se llamará "`theme`".

Si invocamos esta validación en un `console.log(ls.getItem("theme"))`, veremos que nos devuelve `null`. Esto ocurre porque, si nos vamos a la pestaña de Application en las herramientas de desarrollo, no existe ninguna llave en el localStorage con el nombre "`theme`".

Si no existe ninguna variable de tipo `localStorage` que se llame "`theme`", es decir, si `ls.getItem("theme")` es igual (===) a `null`, entonces vamos a decirle que, la primera vez, como no existe esta variable en el navegador de nuestro usuario, vamos a establecer un nuevo valor.

El método para establecer una variable en `localStorage` es `setItem`. Noten que es muy similar a getAttribute y setAttribute en el DOM: en lugar de getAttribute, usamos getItem, y en lugar de setAttribute, usamos setItem.

El método `localStorage.setItem` recibe dos parámetros:

1. El nombre de la variable (en este caso, "theme"), que es lo que se muestra como key en la pestaña Application de las herramientas de desarrollo.

2. El valor (value) que queremos asignar a esa variable.

Entonces, vamos a decirle que, si no existe una variable de tipo localStorage llamada "theme", la vamos a crear y le asignaremos el valor "light"

Voy a tener dos condicionales más:

1. Primer condicional:
   Verifica en localStorage si la variable "theme" es igual (===) a "light". Si es así, ejecutamos la programación que tenemos guardada en la función lightMode().

2. Segundo condicional:
   Verifica en localStorage si la variable "theme" es igual (===) a "dark". Si es así, ejecutamos la programación que tenemos guardada en la función darkMode().

Las funciones `lightMode` y `darkMode`, además de ejecutar la lógica que desactiva o activa el modo oscuro, también deben almacenar el último cambio en localStorage. Internamente, tendríamos que acceder a la variable localStorage (`ls`) y establecerle el valor del tema correspondiente:

1. En la función lightMode:
   Debemos asegurarnos de guardar el valor "light": `ls.setItem("theme", "light");`.

2. En la función darkMode:
   Debemos asegurarnos de guardar el valor "dark": `ls.setItem("theme", "dark");`

`tema_oscuro.js`

```js
const d = document,
  ls = localStorage;

export default function darkTheme(btn, classDark) {
  const $themeBtn = d.querySelector(btn),
    $selectors = d.querySelectorAll("[data-dark]");

  let moon = "🌙",
    sun = "☀️";

  const lightMode = () => {
    $selectors.forEach((el) => el.classList.remove(classDark));
    $themeBtn.textContent = moon;
    ls.setItem("theme", "light");
  };

  const darkMode = () => {
    $selectors.forEach((el) => el.classList.add(classDark));
    $themeBtn.textContent = sun;
    ls.setItem("theme", "dark");
  };

  d.addEventListener("click", (e) => {
    if (e.target.matches(btn)) {
      if ($themeBtn.textContent === moon) {
        darkMode();
      } else {
        lightMode();
      }
    }
  });

  d.addEventListener("DOMContentLoaded", (e) => {
    if (ls.getItem("theme") === null) ls.setItem("theme", "light");
  });

  if (ls.getItem("theme") === "light") lightMode();

  if (ls.getItem("theme") === "dark") darkMode();
}
```

[indice](#ejercicio-del-dom)

## JavaScript 90. DOM Ejercicios Prácticos Responsive con Javascript

Recuerden que estamos en las clases donde estamos haciendo ejercicios de los conceptos que estuvimos trabajando con el DOM. El último ejercicio que hicimos fue justamente este del dark theme y light theme, en el cual utilizamos la API de localStorage para almacenar la información y que, en la siguiente visita del usuario a nuestro ejercicio, recordará qué tema fue el que quedó activo. ¡Perfecto!

El ejercicio que vamos a hacer hoy es sobre responsive design con JavaScript. No se trata simplemente de aplicar un display: none; o un display: block; para mostrar u ocultar el mapa, los enlaces o el video de YouTube. Estamos haciendo lo que se conoce como "responsible responsive design".

De hecho, aquí tengo algunos enlaces. En el año 2012, Ethan Marcotte introdujo el artículo "Responsive Web Design", donde planteó todas estas buenas prácticas para enfrentar los desafíos del diseño web en dispositivos móviles y táctiles, que eran diferentes a las computadoras tradicionales. Posteriormente, Ethan Marcotte publicó un libro sobre el tema.

En los primeros años, el responsive design fue criticado porque, lamentablemente, muchos diseñadores caímos en malas prácticas, como ocultar contenido en la versión móvil simplemente usando display: none; o display: block;. Visualmente, parecía que habíamos solucionado el problema, pero ¿qué pasaba cuando el usuario estaba en su dispositivo móvil consumiendo su plan de datos mensual? Aunque ocultábamos visualmente esos elementos, se seguían descargando, lo que afectaba el rendimiento y la experiencia del usuario.

Posteriormente, alrededor de los años 2014 y 2015, Scott Jehl, otro diseñador web muy reconocido, publicó un libro llamado "Responsible Responsive Design". Este libro retoma el concepto que Ethan Marcotte había acuñado, pero le agrega buenas prácticas relacionadas con el uso de media queries, técnicas de CSS y programación en JavaScript.

Te recomiendo leer estos dos libros. Si no quieres comprar los libros o leerlos (ya que están en inglés y no están traducidos), te comento que en mi sección de cursos tengo una lista de reproducción de un curso llamado "Responsive Design". A lo largo de este curso, te voy explicando conceptos que tomo directamente de estos dos libros: tanto de "Responsive Web Design" como de "Responsible Responsive Design", que, traducido al español, sería algo como "Cómo hacer un diseño para dispositivos móviles de manera responsable".

Antes de resolver el ejercicio (que estoy seguro les interesará a muchos), quería que entendieran el porqué de los ejercicios que vamos a hacer hoy y lo potente que es que ustedes empiecen a implementar estas prácticas en sus proyectos.

Hacemos pequeña modificaciones al `dom-ejercicio.html` agregando mas enlaces a la etiqueta `<nav></nav>`, como agregando mas `<section></section>` a la etiqueta `<main>`. El titulo que llevara este capitulo y que debe ser escrito en los enlaces del nav como el h2 de la section es `Responsive con JavaScript`.

Para este ejercicio, si lo comparamos con el ejercicio ya resuelto, vemos que hay un video y un mapa de Google. Sin embargo, podría ser cualquier contenido que no sea texto, como un video, un audio de HTML, o incluso podría ser, por ejemplo, embeber una línea de tiempo de comentarios de Twitter, una línea de comentarios de Facebook, o una foto de Instagram.

Esta técnica del diseño receptivo responsable (o responsible responsive design) no es otra cosa más que responsive design con JavaScript. La idea es que, para cualquier contenido que no sea texto, trates de evitarlo en las versiones para dispositivos móviles. Lo que se sugiere es que, en lugar de embeber el contenido directamente, lo linkees.

Entonces, en este caso, yo estoy poniendo un mapa y un video, pero, como les digo, podría ser cualquier otro contenido, como un enlace para embeber un PDF, una línea de tiempo, o un widget de alguna red social.

Lo que necesitamos es una div vacia para ambos elementos: `<div id="youtube"></div>`. Es muy importante que, como cada elemento va a capturar un contenido particular, estas prácticas estén evaluando específicamente cada uno de los elementos en los que queramos implementar diseño web receptivo responsable en nuestras aplicaciones. Por eso estoy utilizando id y no clases, ya que la invocación de la función que vamos a crear para hacer un elemento multimedia responsable se ejecutará una vez por cada elemento que queramos revisar y evaluar en nuestra aplicación. Es por esto que estamos utilizando id. Entonces, vamos a generar otro id: `<div id="gmaps"></div>` los 'id' pues hacen perfectamente referencia al contenido que van a cargar.

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
        <a href="#seccion4">Responsive con JavaScript</a>
        <a href="#seccion5">Sección 5</a>
        <a href="#seccion6">Sección 6</a>
        <a href="#seccion7">Sección 7</a>
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
        <h2>Responsive con JavaScript</h2>
        <div id="youtube"></div>
        <div id="gmaps"></div>
      </section>
      <section id="seccion5" class="section">
        <h2>Sección 5</h2>
      </section>
      <section id="seccion6" class="section">
        <h2>Sección 5</h2>
      </section>
      <section id="seccion7" class="section">
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

Creamos un archivo en la carpeta `dom` > `objeto_responsive.js`. Creamos la variable de document `const d = document` y otra para window `w = window` Utilizaremos el objeto matchMedia. Creamos una funcion por defecto `export default function responsiveMedia(){}`.
¿Qué parámetros necesitaríamos para ejecutar esta función?

1. `id`: El `id` del elemento que vamos a estar revisando.
2. `mq`: La media query en la cual se realizará el cambio. Es muy importante definir una media query válida en CSS, ya que será la que determine cuándo pasar del enlace al contenido embebido.
3. `mobileContent`: El contenido HTML que queremos mostrar en la versión móvil.
4. `desktopContent`: El contenido que queremos cargar dinámicamente en la versión de escritorio.

En resumen, los cuatro parámetros son:

- El id del elemento que se va a revisar.

- La media query (mq) que define el cambio.

- El contenido para móviles (mobileContent).

- El contenido para escritorio (desktopContent).

vamos a crear una variable que se va a llamar breakPoint y como su nombre lo dice es la que va a guardar la media query que el usuario me pase en la variable mq: `let breakpoint = w.matchMedia(mq)`

`objeto_responsive.js`

```js
const d = document;
const w = window;

export default function responsiveMedia(id, mq, mobileContent, desktopContent) {
  let breakpoint = w.matchMedia(mq);
}
```

¿dónde vamos a ejecutar esta función `responsiveMedia()`? pues a la carga del documento`DOMContentLoaded`. responsiveMedia() recibe 4 parametros:

1. El id (tendremos dos instancia ) que primeramenta capturamos es el de youtube. Muy importante como vamos a utilizar la funcion 'getElementById()' para capturar el selector solamente pasamos el nombre del selector que es `youtube`.
2. Pasamos la mediaquery: cuando la minima anchura(declaramos entre parentesis como una cadena de texto porque asi es como definiriamos la mediaquery en CSS) sea 1024px esa sera la mediaquery `"(min-width:1024px)"`.
3. "Contenido Móvil".
4. "Contenido Escritorio".

Redeclaramos nuevamente la funcion responsiveMedia() solo cambiando la id por `gmaps`

`index_dom.js`

```js
import hamburgerMenu from "./dom/menu_hamburguesa.js";
import { digitalClock, alarm } from "./dom/reloj.js";
import { shortcuts, moveBall } from "./dom/teclado.js";
import countdown from "./dom/cuenta_regresiva.js";
import { scrollTopButton } from "./dom/boton_scroll.js";
import darkTheme from "./dom/tema_oscuro.js";
import responsiveMedia from "./dom/objecto_responsive.js";
const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  hamburgerMenu(".panel-btn", ".panel", ".menu a");
  digitalClock("#reloj", "#activar-reloj", "#desactivar-reloj");
  alarm("#activar-alarma", "#desactivar-alarma");
  countdown("countdown", "Jan 1,2025", "Feliz año nuevo");
  scrollTopButton(".scroll-top-btn");
  responsiveMedia(
    "youtube",
    "(min-width:1024px)",
    "Contenido Móvil",
    "Contenido Escritorio"
  );
  responsiveMedia(
    "gmaps",
    "(min-width:1024px)",
    "Contenido Móvil",
    "Contenido Escritorio"
  );
});

d.addEventListener("keydown", (e) => {
  shortcuts(e);
  moveBall(e, ".ball", ".stage");
});

darkTheme(".dark-theme-btn", "dark-mode");
```

El `min-width: 1024px` que declaramos a la carga del documento en `index_dom.js` ya lo está capturando en la función responsiveMedia() con:`let breakpoint = w.matchMedia(mq);`. Ya tenemos la media query detectada a través de JavaScript.

Muy importante: El objeto window.matchMedia nos permite, al igual que con los eventos y el addEventListener(), asignarle un listener. Sin embargo, este no es un addEventListener() común, sino un listener específico para media queries. Este listener estaría revisando constantemente la media query, y cuando detecte que la media query ya no se cumple, hará el cambio de contenido.

A esta variable `breakpoint`, que contiene la media query de CSS, le voy a agregar un listener con addListener():`breakpoint.addListener();` El listener recibe una función que estará evaluando la media query, a la que llamaremos responsive.

Creamos una función expresada llamada `responsive`, que recibe el evento (e) de la media query. Dentro de esta función es donde ocurrirá la "magia". Verificamos con un `if()` el parámetro `e.matches`. El parámetro `.matches` es un valor booleano (verdadero o falso) que determinará si la media query se cumple o no. Si se cumple, devolverá true; si no, devolverá false.Ahora, lo siguiente es capturar el id del elemento en cuestión, que sería el parámetro id, usando:`d.getElementById(id);` Este elemento HTML, en este caso, son las div vacías de youtube y gmaps.Cuando la media query se cumpla (es decir, cuando la anchura mínima sea de 1024px o más), significa que estamos en una interfaz de tipo escritorio. Entonces, lo que haremos es asignar al contenido innerHTML de ese elemento el valor de desktopContent:`d.getElementById(id).innerHTML = desktopContent;` Caso contrario (si la anchura es menor a 1024px), asignaremos el contenido de mobileContent:`d.getElementById(id).innerHTML = mobileContent;`.

Si recargo el navegador, verán que la primera vez que carga, la función `responsive` (que está ejecutando el listener) no se ejecuta al inicio. Es decir, no se ejecuta a la carga del documento. Observen que las dos div siguen vacías hasta que se detecta un cambio en la media query. Solo entonces comienza a ejecutar ese contenido.

Esto es muy importante. Lo único que habría que hacer, además de que la función responsive valide el cambio de media query cuando esta ya no se cumple o sí se cumple (usando `breakpoint.addListener(responsive);`), es ejecutar la función responsive directamente al cargar el documento.

Recuerden que responsive recibe el evento de tipo media query. Entonces, lo único que hay que hacer es ejecutar la función y pasarle la variable que contiene toda la información de la media query en JavaScript, que es breakpoint. Con esto, prácticamente habríamos resuelto este ejercicio de manera similar a usar el método DOMContentLoaded o window.load.
pues también hay que ejecutarla directamente a la hora que cargue el documento entonces aquí hay que ejecutar responsive acuérdense que responsive recibe el evento de tipo media query entonces aquí lo único que hay que hacer es ejecutar la función y pasarle la variable que contiene pues toda la información de la media query javascript que es el breakpoint `responsive(breakpoint);` y con esto prácticamente esto es como haber resuelto este ejercicio con el método 'DOMContentLoaded' o el window load esta línea `responsive(breakpoint)` y esta `breakpoint.addListener(responsive);` sería pues el evento rizase prácticamente ahora sí ya tenemos bien hecha nuestro response y porque también va a funcionar a la hora que cargue el documento va a evaluar cuál es la anchura del dispositivo y dependiendo de eso va a poner el contenido móvil o el contenido de escritorio y miren vean como ya no va a aparecer en en vacías mis div de youtube y meetic maps vean valida recarga como estoy en móvil en una en una resolución menor a 1024 me pone contenido móvil y ahí está.

`objeto_responsive.js`

```js
const d = document;
const w = window;

export default function responsiveMedia(id, mq, mobileContent, desktopContent) {
  let breakpoint = w.matchMedia(mq);

  const responsive = (e) => {
    if (e.matches) {
      d.getElementById(id).innerHTML = desktopContent;
    } else {
      d.getElementById(id).innerHTML = mobileContent;
    }
  };

  breakpoint.addListener(responsive);
  responsive(breakpoint);
}
```

Ahora es cuestion de cambiar los parametros de contenido Movil por los enlaces uno es `<a>` y el contenido escritorio un `<iframe>`
`index_dom.js`

```js
import hamburgerMenu from "./dom/menu_hamburguesa.js";
import { digitalClock, alarm } from "./dom/reloj.js";
import { shortcuts, moveBall } from "./dom/teclado.js";
import countdown from "./dom/cuenta_regresiva.js";
import { scrollTopButton } from "./dom/boton_scroll.js";
import darkTheme from "./dom/tema_oscuro.js";
import responsiveMedia from "./dom/objecto_responsive.js";
const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  hamburgerMenu(".panel-btn", ".panel", ".menu a");
  digitalClock("#reloj", "#activar-reloj", "#desactivar-reloj");
  alarm("#activar-alarma", "#desactivar-alarma");
  countdown("countdown", "Jan 1,2025", "Feliz año nuevo");
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
```

[indice](#ejercicio-del-dom)
