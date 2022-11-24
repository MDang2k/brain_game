const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win'),
    level: document.querySelector('.level'),
    continue: document.querySelector('.continue')
}

const state = {
    gameStarted: false,
    level: 0,
    totalFlips: 0,
    totalTime: 0,
    objective: 0,
    type: 0,
    loop: null
}

const difficulty = [
    {
        level: '0',
        dimension: 3,
        noob: 3,
        type: 'g'
    },
    {
        level: '1',
        dimension: 3,
        noob: 3,
        type: 'g'
    },
    {
        level: '2',
        dimension: 3,
        noob: 3,
        type: 'g'
    },
    {
        level: '3',
        dimension: 3,
        noob: 3,
        type: 'r'
    },
    {
        level: '4',
        dimension: 4,
        noob: 4,
        type: 'g'
    },
    {
        level: '5',
        dimension: 4,
        noob: 4,
        type: 'r'
    },
    {
        level: '6',
        dimension: 4,
        noob: 4,
        type: 'r'
    },
    {
        level: '7',
        dimension: 4,
        noob: 5,
        type: 'g'
    },
    {
        level: '8',
        dimension: 4,
        noob: 5,
        type: 'r'
    },
    {
        level: '9',
        dimension: 5,
        noob: 5,
        type: 'r'
    },
    {
        level: '10',
        dimension: 5,
        noob: 6,
        type: 'g'
    }
]



function randomizeNumbers(amount) {
    let numbers = [];

    numbers.push(Math.ceil(Math.random() * 9));

    for (let index = 1; index < amount; index++) {
        numbers.push(Math.ceil(Math.random() * 5) + numbers[index - 1])
    }

    return numbers
}


function generateGame() {

    const currentLevel = difficulty[level.value];

    const dimensions = currentLevel.dimension;
    console.log(`Size is: ${dimensions} x ${dimensions}`);

    state.type = currentLevel.type;

    let numbers = randomizeNumbers(currentLevel.noob);

    state.objective = numbers;

    console.log(state.objective);

    let items = [];

    for (let index = 0; index < numbers.length; index++) {
        items.push(numbers[index])
    }

    for (let index = currentLevel.noob; index < dimensions*dimensions; index++) {
        items.push(' ');
    }

    console.log(items)

    let newItems = items
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    console.log(newItems)

    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${newItems.map(newItems => `
                <div class="card">
                    <div class="card-back ${currentLevel.type === 'g' ? 'green' : 'red'}">${newItems}</div>
                </div>
            `).join('')}
    </div>
    `

const parser = new DOMParser().parseFromString(cards, 'text/html')

selectors.board.replaceWith(parser.querySelector('.board'))

}

function startGame() {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} lượt`
        selectors.timer.innerText = `Thời gian: ${state.totalTime} giây`
    }, 1000)
}


const flipCard = card => {
    state.totalFlips++

    console.log(`card.innerText: ${card.innerText}`);

    if (state.type === 'r'){
        state.objective.sort(function(a, b) {return b - a});
    }

    console.log(`state.objective[0]: ${state.objective[0]}`)

    if (card.innerText == state.objective[0]) {
        setTimeout(() => {
            card.classList.add('flipped');
            console.log(card.classList);
        }, 500)
        state.objective.shift();
    } else {
        setTimeout (() => {
            card.classList.add('shake')
        }, 100)
        card.classList.remove('shake')
    }

    // If there are no more cards that we can flip, we won the game
    if (!state.objective[0]) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    Bạn đã chiến thắng!<br />
                    trong <span class="highlight">${state.totalFlips}</span> lượt<br />
                    và dưới <span class="highlight">${state.totalTime}</span> giây
                </span>
                <button class="continue">Tiếp tục</button>
            `

            clearInterval(state.loop)
        }, 1000)
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}

selectors.start.addEventListener('click', generateGame);

attachEventListeners()