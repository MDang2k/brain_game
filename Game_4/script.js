const selectors = {
    boardContainer: document.querySelector('.board-container'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('#timer'),
    start: document.querySelector('#start'),
    win: document.querySelector('.win'),
    display: document.querySelector('.display')
}

const numberButtons = document.querySelectorAll('.number')


const levelSelect = document.querySelector('#level');

const section = document.querySelector("section"),
    overlay = document.querySelector(".overlay"),
    showBtn = document.querySelector(".show-modal"),
    closeBtn = document.querySelector(".close-btn"),
    conBtn = document.querySelector(".con-btn"),
    result = document.querySelector("#result");


const state = {
    gameStarted: false,
    objective: 0,
    loop: null,
    pauseTimer: false,
    time: 30
}

const numberSound = {
    0: {
        sound: "./sound/number_0.mp3",
        img: "./img/number_0.gif"
    },
    1: {
        sound: "./sound/number_1.mp3",
        img: "./img/number_1.gif"
    },
    2: {
        sound: "./sound/number_2.mp3",
        img: "./img/number_2.gif"
    },
    3: {
        sound: "./sound/number_3.mp3",
        img: "./img/number_3.gif"
    },
    4: {
        sound: "./sound/number_4.mp3",
        img: "./img/number_4.gif"
    },
    5: {
        sound: "./sound/number_5.mp3",
        img: "./img/number_5.gif"
    },
    6: {
        sound: "./sound/number_6.mp3",
        img: "./img/number_6.gif"
    },
    7: {
        sound: "./sound/number_7.mp3",
        img: "./img/number_7.gif"
    },
    8: {
        sound: "./sound/number_8.mp3",
        img: "./img/number_8.gif"
    },
    9: {
        sound: "./sound/number_9.mp3",
        img: "./img/number_9.gif"
    },


}


let number = Math.ceil(Math.random() * 9 + 1)

function countdown() {
    state.timeLeft--;
    selectors.timer.innerHTML = String(state.timeLeft);
    if (!state.pauseTimer) {
        if (state.timeLeft > 0) {
            setTimeout(countdown, 1000);
        } else {
            result.textContent = "Hết thời gian";
            section.classList.add("active")
        }
    }
};


function generateGame() {

    state.timeLeft = 20;

    let target = Math.ceil(Math.random() * 10) - 1

    state.objective = target

    console.log(target)

    var bleep = new Audio();
    bleep.src = numberSound[target].sound;

    bleep.play(); // Play button sound now


    // setTimeout(function() {
    //     selectors.display.innerText = number;
    // }, 1000)

    // state.pauseTimer = false;

    // setTimeout(countdown(state.timeLeft), 1000);


}


const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement
    })
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(button.dataset.value);

        if (button.dataset.value == state.objective) {
            section.classList.add("active")
            result.innerHTML = ` Bạn đã trả lời chính xác `
        } else {
            section.classList.add("active")
            result.innerHTML = ` Bạn đã trả lời sai `
        }
    })
})

//  press the start button event 
selectors.start.addEventListener('click', generateGame, () => {
    const time = document.querySelector('#time')
    startTimer(20, time)
});

// modal box events
// showBtn.addEventListener("click", () => section.classList.add("active"));

overlay.addEventListener("click", () =>
    section.classList.remove("active")
);

closeBtn.addEventListener("click", () =>
    section.classList.remove("active")
);

conBtn.addEventListener("click", () => {
    section.classList.remove("active")

    levelSelect.value++;
    generateGame();

})



attachEventListeners()