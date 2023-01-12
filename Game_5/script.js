const selectors = {
    boardContainer: document.querySelector('.board-container'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('#timer'),
    start: document.querySelector('#start'),
    win: document.querySelector('.win'),
    display: document.querySelector('.display')
}

const btnEnter = document.querySelector('#btnEnter')
const minus = document.querySelector('#minus')
const plus = document.querySelector('#plus')
const answerBox = document.querySelector('#answerBox')


const section = document.querySelector("section"),
    overlay = document.querySelector(".overlay"),
    showBtn = document.querySelector(".show-modal"),
    closeBtn = document.querySelector(".close-btn"),
    conBtn = document.querySelector(".con-btn"),
    result = document.querySelector("#result"),
    txtNum1 = document.querySelector("#txtNum1"),
    txtNum2 = document.querySelector("#txtNum2");


const state = {
    gameStarted: false,
    objective: 0,
    loop: null,
    pauseTimer: false,
    time: 30
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

function resetGame() {
    txtNum1.innerHTML = ""
    txtNum2.innerHTML = ""
    answerBox.innerHTML = ""
    document.body.removeChild(document.querySelector('canvas'))
}

function generateGame() {

    state.timeLeft = 20;

    let num1 = Math.ceil(Math.random() * 4)
    let num2 = Math.ceil(Math.random() * 4)

    for (let i = 1; i <= num1; i++) {
        txtNum1.innerHTML += `<p>🍒</p>`
    }

    for (let i = 1; i <= num2; i++) {
        txtNum2.innerHTML += `<p>🍒</p>`
    }

    state.objective = num1 + num2

    console.log(txtNum1.childElementCount);
    console.log(txtNum2.childElementCount);


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

plus.addEventListener("click", () => {
    answerBox.innerHTML += `<p>🍒</p>`
})

minus.addEventListener("click", () => {
    if (answerBox.childElementCount > 0) {
        answerBox.removeChild(answerBox.lastChild)
    }

})


// press the enter button to answer
btnEnter.addEventListener("click", () => {
    if (answerBox.childElementCount == state.objective) {
        section.classList.add("active")
        toggleConfetti();
        result.innerHTML = `Bạn đã trả lời chính xác `
    } else {
        section.classList.add("active")
        result.innerHTML = `Bạn đã trả lời sai `
    }
})

//  press the start button event 
selectors.start.addEventListener('click', generateGame, () => {
    const time = document.querySelector('#time')
    selectors.start.classList.add("disabled")
    console.log(selectors.start);
    startTimer(20, time)
});

// modal box events
// showBtn.addEventListener("click", () => section.classList.add("active"));

overlay.addEventListener("click", () => {
    section.classList.remove("active")
    stopConfetti();
    resetGame()
});

closeBtn.addEventListener("click", () => {
    section.classList.remove("active")
    stopConfetti();
    resetGame()
});

conBtn.addEventListener("click", () => {
    section.classList.remove("active")
    stopConfetti();
    resetGame()
})



attachEventListeners()