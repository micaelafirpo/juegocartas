//      CLASES    //
// Clase de mis Cartas Orphan Black //
class Orphan {
  static cartas() {
    return [
      new Carta(
        "images/sarah.jpg",
        "Sarah Manning",
        "Vive en los límites y sobrevive gracias a su ingenio. Es temeraria y tiene un corazón leal. Daría todo por su hija.",
        1
      ),
      new Carta(
        "images/felix.jpg",
        "Felix Dawkings",
        "Es un hombre dramático, un gato callejero y buscavidas. El apoyo emocional de todos los clones",
        2
      ),
      new Carta(
        "images/alison.jpg",
        "Alison Hendrix",
        "Siempre quiere tener el control y mantener su imagen perfecta. Necesita pastillas y teorías conspirativas para controlarse",
        3
      ),
      new Carta(
        "images/cosima.jpg",
        "Cosima Niehaus",
        "Excéntrica científica al borde de la genialidad. Da todo por salvar a sus hermanas clones",
        4
      ),
      new Carta("images/helena.jpg", "Helena", "Sobre Helena", 5),
      new Carta(
        "images/rachel.jpg",
        "Rachel Duncan",
        "Es la única clon consciente de sí misma desde siempre. Persona de negocios cruel. Es una persona imprevisible.",
        6
      ),
      new Carta(
        "images/paul.jpg",
        "Paul Dierden",
        "Es un hombre decente con rasgos cincelados.",
        7
      ),
      new Carta(
        "images/all.jpg",
        "All Bell",
        "Detective veterano. Ingenioso y resistente. Una persona muy leal.",
        8
      ),
      new Carta(
        "images/vic.jpg",
        "Vic",
        "Bola volátil de inseguridad masculina. Es un enfermo del amor, se siente traicionado y es esporádicamente violento.",
        9
      ),
      new Carta("images/mrs.jpg", "Siobhan Sadler", "Sobre Mrs S", 10),
      new Carta(
        "images/delphine.jpg",
        "Delphine Cormier",
        "Sobre Delphine",
        11
      ),
      new Carta(
        "images/mark.jpg",
        "Mark Rollins",
        "Proleteano homicida. Producto del Proyecto Castor",
        12
      ),
      new Carta("images/donnie.jpg", "Donnie Hendrix", "Sobre Doniie", 13),
      new Carta(
        "images/scott.jpg",
        "Scott Smith",
        "Científico amigo de Cosima. ",
        14
      ),
      new Carta(
        "images/kira.jpg",
        "Kira",
        "Muestra un intelecto altamente avanzado. Capacidad extraña de curarse rápidamente. ",
        15
      ),
      new Carta(
        "images/cal.jpg",
        "Cal Morrison",
        "Ingenioso individualista.",
        16
      ),
      new Carta(
        "images/krystal.jpg",
        "Krystal Goderich",
        "Clon esteticista muy superficial",
        17
      ),
    ];
  }
  static cartaRandom() {
    let cartas = this.cartas();
    return cartas[Math.floor(Math.random() * cartas.length)];
  }
  static cartasRandom() {
    let carta1 = this.cartaRandom();
    let carta2 = this.cartaRandom();
    let carta3 = this.cartaRandom();
    return [carta1, carta2, carta3];
  }
}
// Inicio Clase Carta //
class Carta {
  constructor(imagen, nombre, info, puntaje) {
    this.imagen = imagen;
    this.nombre = nombre;
    this.info = info;
    this.puntaje = puntaje;
  }
}
// Fin Clase Carta //

// Inicio Clase Partida //
class Partida {
  constructor(nombreJugador1, nombreJugador2) {
    this.jugador1 = new Jugador(nombreJugador1);
    this.jugador2 = new Jugador(nombreJugador2);
    this.titulo = `${nombreJugador1} y ${nombreJugador2}`;
    this.cartas = this.cartasRepartidas();
    this.match = this.match();
  }
  cartasRepartidas() {
    return [
      this.jugador1.cartaRepartida(1),
      this.jugador1.cartaRepartida(2),
      this.jugador1.cartaRepartida(3),
      this.jugador2.cartaRepartida(1),
      this.jugador2.cartaRepartida(2),
      this.jugador2.cartaRepartida(3),
    ];
  }
  match() {
    if (this.jugador1.even == this.jugador2.even) {
      return true;
    } else return false;
  }
  matchResultado() {
    if (this.match) return " 🥰 HAY MATCH";
    else return " 😢 NO HAY MATCH";
  }
  resultadosCartas() {
    //Creo un div nuevo para mostrar el resumen de la partida
    let divResumen = document.createElement("div");
    //Hago que este div tome el mismo estilo que ya cree en css
    divResumen.classList.add("pantallaMatchResultados");
    //Anido los resultados
    divResumen.appendChild(this.jugador1.resultadosCartas());
    divResumen.appendChild(this.jugador2.resultadosCartas());
    //Creo y muestro el titulo match
    let match = document.createElement("h3");
    match.innerHTML = "¿Hubo match?";
    //Anido el titulo a lo demas
    divResumen.appendChild(match);
    //Muestro el resultado del match
    let matchResultado = document.createElement("h4");
    matchResultado.innerHTML = this.matchResultado();
    //Anido el resultado a lo demas
    divResumen.appendChild(matchResultado);
    //Retorno el nuevo div creado
    return divResumen;
  }
  listaPartidasGuardadas() {
    //Creo un li para las partidas guardadas
    let liGuardado = document.createElement("li");
    //Le agrego la clase de formato de lista de Bootstrap
    liGuardado.classList.add("list-group-item");
    //
    liGuardado.innerHTML = this.titulo;
    //Retorno el nuevo li creado
    return liGuardado;
  }
}
//Fin Clase Partida //

// Clase para cada Jugador
class Jugador {
  constructor(nombreJugador) {
    this.nombreJugador = nombreJugador;
    this.cartas = Orphan.cartasRandom();
    this.puntaje = this.puntaje();
    this.even = this.puntaje % 2 == 0;
  }
  puntaje() {
    return this.cartas.map((a) => a.puntaje).reduce((a, b) => a + b, 0);
  }
  imagen() {
    return this.cartas.map((carta) => carta.imagen);
  }
  cartaRepartida(nro) {
    let carta = this.cartas[nro - 1];

    let divCartas = document.createElement("div");
    divCartas.classList.add("carousel-item");
    divCartas.classList.add("carta");
    let titulo = document.createElement("h2");
    titulo.innerHTML = `Carta ${nro}/3 de ${this.nombreJugador}`;

    let imagen = document.createElement("img");
    imagen.classList.add("img-carousel");
    imagen.src = carta.imagen;

    let nombreCarta = document.createElement("h4");
    nombreCarta.innerHTML = carta.nombre;

    let info = document.createElement("p");
    info.innerHTML = carta.info;

    divCartas.appendChild(titulo);
    divCartas.appendChild(imagen);
    divCartas.appendChild(nombreCarta);
    divCartas.appendChild(info);

    return divCartas;
  }
  resultadosCartas() {
    let divResultadoJugador = document.createElement("div");
    divResultadoJugador.classList.add("resultadosJugador");

    let nombreTitulo = document.createElement("h4");
    nombreTitulo.classList.add("resultadosNombre");
    nombreTitulo.innerHTML = this.nombreJugador;

    let imagenDiv = document.createElement("div");
    imagenDiv.classList.add("resultadosImagen");

    let imagen1 = document.createElement("img");
    let imagen2 = document.createElement("img");
    let imagen3 = document.createElement("img");

    imagen1.src = this.cartas[0].imagen;
    imagen2.src = this.cartas[1].imagen;
    imagen3.src = this.cartas[2].imagen;

    imagenDiv.appendChild(imagen1);
    imagenDiv.appendChild(imagen2);
    imagenDiv.appendChild(imagen3);

    divResultadoJugador.appendChild(nombreTitulo);
    divResultadoJugador.appendChild(imagenDiv);

    return divResultadoJugador;
  }
}
//      FIN CLASES      //
//Declaracion de variables
let pantallaInicial = document.getElementById("pantallaInicial");
let pantallaAnimacion = document.getElementById("pantallaAnimacion");
let pantallaCartas = document.getElementById("pantallaCartas");
let pantallaMatch = document.getElementById("pantallaMatch");
let pantallaGuardados = document.getElementById("pantallaGuardados");
let carouselCartasItem = document.getElementById("carouselCartasItem");
let partidasAnteriores = document.getElementById("partidasAnteriores");
//let botonJugar = document.getElementById('botonJugar')
let pantallaMatchResultados = document.getElementById(
  "pantallaMatchResultados"
);
let listaPartidas = document.getElementById("listaPartidas");
//Fin declaracion de variables
let partidas = {};
let partidaActual = null;

/// FUNCIONES ///

//Funciones generales//
function mostrar(elemento) {
  if (elemento.className.includes("oculto"))
    elemento.classList.remove("oculto");
}
function ocultar(elemento) {
  if (!elemento.className.includes("oculto")) elemento.classList.add("oculto");
}
//Fin funciones generales//

//Funciones especificas del juego//
function nuevaPartida() {
  //Declaracion de mis jugadores
  let jugador1 = document.getElementById("jugador1");
  let jugador2 = document.getElementById("jugador2");
  //Tomo el valor ingresado por el user
  let nombreJugador1 = jugador1.value;
  let nombreJugador2 = jugador2.value;
  //Validacion
  if (jugador1.value == "" || jugador2.value == "") {
    alert("Hay que llenar los datos che");
    return;
  }
  //Repartir las cartas para empezar el juego
  repartir(nombreJugador1, nombreJugador2);
  //Oculto la pantalla del Inicio
  ocultar(pantallaInicial);
  //Vacio los input para que no queden guardados los nombres que escribió
  jugador1.value = "";
  jugador2.value = "";
}

function repartir(nombreJugador1, nombreJugador2) {
  //Creo una nueva partida con los jugadores ingresados
  let partida = new Partida(nombreJugador1, nombreJugador2);
  //La guardo como partida actual
  partidaActual = partida;
  //Funcion para ver las 6 cartas con el carousel
  verPartida();
}

function verPartida() {
  mostrar(pantallaAnimacion);
  //Agarro las cartas de esta partida
  let cartas = partidaActual.cartas;

  //Anido las 6 cartas
  for (let i = 0; i < 6; i++) {
    if (cartas[i].className.includes("active")) {
      cartas[i].classList.remove("active");
    }
    carouselCartasItem.appendChild(cartas[i]);
  }
  //Animacion
  setTimeout(function () {
    cartas[0].classList.add("active");
    ocultar(pantallaAnimacion);
    mostrar(pantallaCartas);
  }, 3000);
}
let botonVolverARepartir = document.getElementById("volverARepartir");
botonVolverARepartir.addEventListener("click", volverARepartir);
function volverARepartir() {
  //Borro lo que estaba cargado en mi carousel
  carouselCartasItem.innerHTML = "";
  //Vuelvo a tomar los nombres de cada Jugador
  let nombreJugador1 = partidaActual.jugador1.nombreJugador;
  let nombreJugador2 = partidaActual.jugador2.nombreJugador;

  ocultar(pantallaCartas);
  repartir(nombreJugador1, nombreJugador2);
}
let botonverResultados = document.getElementById("verResultados");
botonverResultados.addEventListener("click", verResultados);
function verResultados() {
  let resultadosCartas = partidaActual.resultadosCartas();
  pantallaMatchResultados.appendChild(resultadosCartas);

  ocultar(pantallaCartas);
  mostrar(pantallaMatch);

  carouselCartasItem.innerHTML = "";
}

function guardarYVolver() {
  guardar();
  volver();
}

function guardar() {
  partidas[partidaActual.titulo] = partidaActual;
  mostrar(partidasAnteriores);

  listaPartidas.appendChild(partidaActual.listaPartidasGuardadas());
}

function volver() {
  ocultar(pantallaMatch);
  mostrar(pantallaInicial);

  // No hay que anidar nada en mi lista de Partidas Guardadas
  pantallaMatchResultados.innerHTML = "";
}

listaPartidas.addEventListener("click", function (e) {
  if (e.target.className.includes("list-group-item")) {
    let liGuardado = e.target;
    partidaActual = partidas[liGuardado.innerHTML];
    ocultar(pantallaInicial);
    verPartida();
  }
});
