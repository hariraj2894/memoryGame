document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const restartBtn = document.getElementById('restart-btn');
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    // Create the cards dynamically
    function createBoard() {
        // Shuffle the card values and duplicate them for pairs
        let cardDeck = [...cardValues, ...cardValues];
        cardDeck = shuffleArray(cardDeck);

        // Clear the board
        board.innerHTML = '';

        // Create card elements
        cardDeck.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-value', value);

            const front = document.createElement('div');
            front.classList.add('front');
            front.textContent = value;

            const back = document.createElement('div');
            back.classList.add('back');

            card.appendChild(front);
            card.appendChild(back);

            board.appendChild(card);

            card.addEventListener('click', () => flipCard(card));
        });
    }

    // Shuffle an array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Flip the card
    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('matched')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            // Check if two cards are flipped
            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    // Check if two flipped cards match
    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;

            if (matchedPairs === cardValues.length) {
                setTimeout(() => {
                    alert('You Win!');
                }, 500);
            }
            flippedCards = [];
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    // Restart the game
    function restartGame() {
        matchedPairs = 0;
        flippedCards = [];
        createBoard();
    }

    // Initialize the game
    createBoard();

    // Restart button event listener
    restartBtn.addEventListener('click', restartGame);
});
