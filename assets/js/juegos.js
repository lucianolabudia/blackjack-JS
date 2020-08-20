/*
 * 2C = Two of Clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let cartas = [];

const TIPOS = ['C', 'D', 'H', 'S'];
const ESPECIALES = ['A', 'J', 'Q', 'K'];

const CREARCARTAS = () => {

    for (let i = 2; i <= 10; i++) {

        for (let tipo of TIPOS) {
            cartas.push(i + tipo);
        }

    }

    for (let tipo of TIPOS) {
        for (let esp of ESPECIALES) {
            cartas.push(esp + tipo);
        }
    }

    // muestra las cartas generadas
    console.log(cartas);

    // shuffle de underscore para crear cartas con orden aleatorio
    cartas = _.shuffle(cartas);
    console.log(cartas);
    return cartas;
}

CREARCARTAS();