// Funcion anonima auto embocada
const Modulo = (() => {
    'use strict' // ser estricto al evaluar el codigo


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];


    let puntosJugadores = [];

    // Referencias del HTML
    const btnNuevo = document.querySelector('#btnNuevo'),
        btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    // Funcion que inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {

        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // funcion que crea nueva baraja
    const crearDeck = () => {

        deck = [];

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
        // shuffle de underscore para crear cartas con orden aleatorio
        return _.shuffle(deck);
    }



    // función que toma una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el Mazo'; // "throw" va a mostrar un error en consola
        }

        return deck.pop(); // "pop" elimina el ultimo elemento del array
    }

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

    // Turno: 0 = primer jugador y el ultimo es la pc
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; // se crea la carta
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosCroupier] = puntosJugadores;

        setTimeout(() => {

            if (puntosCroupier === puntosMinimos) {
                alert('Nadie gana');
            } else if (puntosMinimos > 21) {
                alert('Gano el Croupier');
            } else if (puntosCroupier > 21) {
                alert('Ganaste!');
            } else {
                alert('Gano el Croupier');
            }

        }, 100);

    }

    // Logica o Turno de la Computadora
    const turnoCroupier = (puntosMinimos) => {

        let puntosCroupier = 0;

        do {

            const carta = pedirCarta();
            puntosCroupier = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);


        } while ((puntosCroupier < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {

            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCroupier(puntosJugador);

        } else if (puntosJugador === 21) {

            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCroupier(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {

        // bloquea los botones
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoCroupier(puntosJugadores[0]);

    });

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });

    // Lo que se ubique en este return va a ser publico
    return {
        nuevoJuego: inicializarJuego
    };

})();