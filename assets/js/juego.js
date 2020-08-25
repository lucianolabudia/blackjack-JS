/*
2C = Two of Clubs
2D = Two of Diaminds
2H = Two of Hearts
2S = Two of Spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosCroupier = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');

const divCartasJugador = document.querySelector('#jugador-cartas');

const puntosHTML = document.querySelectorAll('small');

// funcion que crea nueva baraja
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {

        for (let tipo of tipos) {
            deck.push(i + tipo);
        }

    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // muestra las cartas generadas
    // console.log(cartas);

    // shuffle de underscore para crear cartas con orden aleatorio
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

// función que toma una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el Mazo'; // "throw" va a mostrar un error en consola
    }

    const carta = deck.pop(); // "pop" elimina el ultimo elemento del array

    console.log(deck);
    console.log(carta); // carta que es del mazo
    return carta;
}

// pedirCarta();

// Funcion para darle valores a las cartas
const valorCarta = (carta) => {

    // extraer el primer valor del string
    const valor = carta.substring(0, carta.length - 1); // extrae el valor de la carta

    /*
    let puntos = 0;
    if (isNaN(valor)) { // evalua si es un numero o no
        // console.log('No es un numero');
        puntos = (valor === 'A') ? 11 : 10;
    } else {
        // console.log('Es un numero');
        puntos = valor * 1;
    }
    */

    // ifelse + corto
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10 :
        valor * 1;

}

// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta " src="assets/cartas/2C.png ">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
    } else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
    }

});