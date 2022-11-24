const selectors = {
    boardContainer: document.querySelector('.board-container'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('#start'),
    win: document.querySelector('.win'),
    level: document.querySelector('.level') ,
    numberButtons: document.querySelectorAll('[data-number]'),
    output: document.querySelector('.output'),
    clear: document.querySelector('#clear'),
    enter: document.querySelector('#enter'),
    display: document.querySelector('.display')
}

const section = document.querySelector("section"),
            overlay = document.querySelector(".overlay"),
            showBtn = document.querySelector(".show-modal"),
            closeBtn = document.querySelector(".close-btn"),
            conBtn = document.querySelector(".con-btn"),
            result = document.querySelector("#result");


const state = {
    gameStarted: false,
    objective: 0,
    loop: null
}

const difficulty = [ 
    {
        level: '1',
        operator: 'add',
        min: 3,
        max: 10
        
    },
    {
        level: '2',
        operator: 'sub',
        min: 3,
        max: 10
       
    },{
        level: '3',
        operator: 'add',
        min: 4,
        max: 10
        
    },{
        level: '4',
        operator: 'add',
        min: 11,
        max: 20
       
    },{
        level: '5',
        operator: 'sub',
        min: 11,
        max: 20
       
    },{
        level: '6',
        operator: 'add',
        min: 11,
        max: 20
       
    },{
        level: '7',
        operator: 'sub',
        min: 21,
        max: 30
        
    },{
        level: '8',
        operator: 'add',
        min: 21,
        max: 30
        
    },{
        level: '9',
        operator: 'sub',
        min: 21,
        max: 30
    },{
        level: '10',
        operator: 'sub',
        min: 31,
        max: 40
    }
]

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

let number = Math.ceil(Math.random() * 9 + 1)

function generateGame() {

    const currentLevel = difficulty[level.value];

    console.log(number)

    let target = Math.ceil(Math.random() * (currentLevel.max - currentLevel.min + 1) + currentLevel.min);

    console.log(target)

    setTimeout(function() {
        selectors.display.innerText = number;
    }, 1000)


    console.log(currentLevel.operator)
    
    if (currentLevel.operator == 'add') {
        state.objective = number + target;
        setTimeout(function() {
            selectors.display.innerText = target;
            selectors.display.classList.add('green')
        }, 2000)

    } else {
        state.objective = number - target;
        setTimeout(function() {
            selectors.display.innerText = target;
            selectors.display.classList.add('red')
        }, 2000)
    }


}


const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        console.log(eventParent);

        
    })
}

selectors.numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button);
        if (selectors.output.innerText == 'Empty') {
            selectors.output.innerText = '';
            selectors.output.innerText += button.id;
        } else {
            selectors.output.innerText += button.id;
        }
      })
    })

//  press the start button event 
selectors.start.addEventListener('click', generateGame, () => {
    const time = document.querySelector('#time')
    startTimer(30, time)
});

//  press the clear button event 
selectors.clear.addEventListener('click', () => {
    selectors.output.innerText = ''

})

// press the enter button to register answer
selectors.enter.addEventListener('click', () => {
    if (selectors.output.innerText == '') {
        selectors.output.innerText = 'Empty'
    } else if (selectors.output.innerText == state.objective) {
        result.textContent = "Đúng";
        section.classList.add("active");   
    } else {
        result.textContent = "Sai";
        section.classList.add("active"); 
    }
})

// modal box events
showBtn.addEventListener("click", () => section.classList.add("active"));

overlay.addEventListener("click", () =>
    section.classList.remove("active")
);

closeBtn.addEventListener("click", () =>
    section.classList.remove("active")
);

conBtn.addEventListener("click", () => {
    section.classList.remove("active")

    level.value =+ 1;

    generateGame();
})



attachEventListeners()