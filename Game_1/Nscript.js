const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win'),
    level: document.querySelector('.level')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    objective: 0,
    numOfObjective: 1,
    loop: null
}

const difficulty = [
    {
        level: '0',
        dimension: 1,
        noob: 1
    },
    {
        level: '1',
        dimension: 2,
        noob: 1
    },
    {
        level: '2',
        dimension: 2,
        noob: 1
    },{
        level: '3',
        dimension: 3,
        noob: 1
    },{
        level: '4',
        dimension: 3,
        noob: 2
    },{
        level: '5',
        dimension: 3,
        noob: 3
    },{
        level: '6',
        dimension: 4,
        noob: 3
    },{
        level: '7',
        dimension: 4,
        noob: 4
    },{
        level: '8',
        dimension: 4,
        noob: 5
    },{
        level: '9',
        dimension: 5,
        noob: 5
    },{
        level: '10',
        dimension: 5,
        noob: 6
    }
]


function generateGame() {

    const currentLevel = difficulty[level.value];

    const dimensions = currentLevel.dimension;
    console.log(dimensions);

    const emojis = ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']

    let newEmojis = emojis
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    let items = [];

    for (let index = 0; index < currentLevel.noob; index++) {
        items.push(newEmojis[0]);
    }

    state.objective = newEmojis[0];

    console.log(state.objective);

    for (let index =currentLevel.noob; index < dimensions*dimensions; index++) {
        items.push(newEmojis[1]);
    }

    console.log(items)

    let newItems = items
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${newItems.map(newItems => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${newItems}</div>
                </div>
            `).join('')}
    </div>
    `

const parser = new DOMParser().parseFromString(cards, 'text/html')

selectors.board.replaceWith(parser.querySelector('.board'))

flipAllCards();

}

function startGame() {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
}


const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

function flipAllCards() {
    let cards = document.querySelectorAll('.card')
    setTimeout (() => {
    for (let index = 0; index < cards.length; index ++) {
        cards[index].classList.add('flipped');
    }}, 750)

    setTimeout (() => {
    for (let index = 0; index < cards.length; index ++) {
        cards[index].classList.remove('flipped');
            }        
    }, 1500)
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    console.log(card.innerText);

    if (card.innerText === state.objective) {
        card.classList.add('flipped');
    } else {
        setTimeout (() => {
            card.classList.add('shake')
        }, 100)
    }

    // If there are no more cards that we can flip, we won the game
    if (document.querySelectorAll('.flipped').length == state.numOfObjective) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `

            clearInterval(state.loop)
        }, 2000)
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        console.log(eventParent);

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

selectors.start.addEventListener('click', generateGame);
attachEventListeners()