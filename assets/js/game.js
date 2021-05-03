const Module = (() => {
    'use strict'

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];


    let pointsPlayers = [];


    const btnNew = document.querySelector('#btnNew'),
        btnOrder = document.querySelector('#btnOrder'),
        btnStop = document.querySelector('#btnStop');

    const divPlayersCards = document.querySelectorAll('.divCards'),
        pointsHTML = document.querySelectorAll('small');


    const initializeGame = (numberPlayers = 2) => {

        deck = createDeck();

        pointsPlayers = [];
        for (let i = 0; i < numberPlayers; i++) {
            pointsPlayers.push(0);
        }

        pointsHTML.forEach(elem => elem.innerText = 0);
        divPlayersCards.forEach(elem => elem.innerText = '');

        btnOrder.disabled = false;
        btnStop.disabled = false;
    }


    const createDeck = () => {

        deck = [];

        for (let i = 2; i <= 10; i++) {

            for (let type of types) {
                deck.push(i + type);
            }

        }

        for (let type of types) {
            for (let esp of specials) {
                deck.push(esp + type);
            }
        }

        return _.shuffle(deck);
    }



    const orderCard = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el Mazo';
        }

        return deck.pop();
    }


    const valueCard = (card) => {

        const value = card.substring(0, card.length - 1);

        return (isNaN(value)) ?
            (value === 'A') ? 11 : 10 :
            value * 1;

    }


    const accumulatePoints = (card, shift) => {

        pointsPlayers[shift] = pointsPlayers[shift] + valueCard(card);
        pointsHTML[shift].innerText = pointsPlayers[shift];
        return pointsPlayers[shift];

    }

    const createCard = (card, shift) => {

        const imgCard = document.createElement('img');
        imgCard.src = `assets/img/cards/${ card }.png`;
        imgCard.classList.add('card');
        divPlayersCards[shift].append(imgCard);

    }

    const determineWinner = () => {

        const [minPoints, croupierPoints] = pointsPlayers;

        setTimeout(() => {

            if (croupierPoints === minPoints) {
                alert('Nadie gana');
            } else if (minPoints > 21) {
                alert('Gano el Croupier');
            } else if (croupierPoints > 21) {
                alert('Ganaste!');
            } else {
                alert('Gano el Croupier');
            }

        }, 100);

    }

    const croupierShift = (minPoints) => {

        let croupierPoints = 0;

        do {

            const card = orderCard();
            croupierPoints = accumulatePoints(card, pointsPlayers.length - 1);
            createCard(card, pointsPlayers.length - 1);


        } while ((croupierPoints < minPoints) && (minPoints <= 21));

        determineWinner();
    }


    btnOrder.addEventListener('click', () => {

        const card = orderCard();
        const pointsPlayer = accumulatePoints(card, 0);

        createCard(card, 0);

        if (pointsPlayer > 21) {

            console.warn('Perdiste');
            btnOrder.disabled = true;
            btnStop.disabled = true;
            croupierShift(pointsPlayer);

        } else if (pointsPlayer === 21) {

            console.warn('21, genial!');
            btnOrder.disabled = true;
            btnStop.disabled = true;
            croupierShift(pointsPlayer);
        }

    });

    btnStop.addEventListener('click', () => {

        btnOrder.disabled = true;
        btnStop.disabled = true;

        croupierShift(pointsPlayers[0]);

    });


    btnNew.addEventListener('click', () => {

        initializeGame();

    });

    return {
        newGame: initializeGame
    };

})();