// Funcion anonima auto embocada
(() => {
    'use strict' // ser estricto al evaluar el codigo


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosCroupier = 0;

    // Referencias del HTML
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');

    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasCroupier = document.querySelector('#croupier-cartas');

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
        // console.log(deck);

        // shuffle de underscore para crear cartas con orden aleatorio
        deck = _.shuffle(deck);
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

    // Logica o Turno de la Computadora
    const turnoCroupier = (puntosMinimos) => {

        do {

            const carta = pedirCarta();

            puntosCroupier = puntosCroupier + valorCarta(carta);
            puntosHTML[1].innerText = puntosCroupier;

            // <img class="carta " src="assets/cartas/2C.png ">
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
            imgCarta.classList.add('carta');
            divCartasCroupier.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosCroupier < puntosMinimos) && (puntosMinimos <= 21));

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

        }, 10);

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

        turnoCroupier(puntosJugador);

    });

    btnNuevo.addEventListener('click', () => {

        console.clear(); // limpia la consola
        deck = [];
        deck = crearDeck();

        puntosJugador = 0;
        puntosCroupier = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasCroupier.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    });

})();