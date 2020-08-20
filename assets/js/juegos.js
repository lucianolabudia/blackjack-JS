/*
2C = Two of Clubs
2D = Two of Diaminds
2H = Two of Hearts
2S = Two of Spades
*/

let deck = [];

const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

pedirCarta();