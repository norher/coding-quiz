// Make start function
// 1. Start a timer
//      a. timer should be 10 mins
//      b. When 10 mins are over, timer clears and goes to view results page.
// 2. Render out quiz questions 1 by 1.
// 3. Save each right or wrong answer for each turn.
// 4. display final result.
// 5. add final result to a tally of wins and losses stored locally.

// While the quiz is in progress
// 1. Add event listeners to each answer choice.
// 2. Correct answer choices will add to correct side
// 3. Wrong answer choices will add to wrong side. 
// 4. Event listeners should also display the next question. 
// 5. Event listeners should also display whether the answer was right or wrong.

const startButton = document.getElementById("startBtn");
const questionContainerEl = document.getElementById("questionContainer");
const questionEl = document.getElementById("questionContainer");
const greeterEl = document.getElementById("greeting")
const answerButtonEl = document.getElementById("answerBtns");
const nextButton = document.getElementById("nextBtn");
const resultsButton = document.getElementById("resultsBtn");
const scoreEl = document.getElementById("scorer")
var timeEl = document.getElementById("timer");
var timeLeft = 60;
let score = 0;
let shuffledQuestions, currentQuestionIndex

const questions = [
    {
    question: "What does HTML stand for?",
    answers: [
        { text: "Honey, Tea, Mango, Lime", correct: false },
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Head To My Limo", correct: false},
        { text: "How To Make Labels", correct: false}
    ]
},
    {
    question: "What does HTML do?",
    answers: [
        { text: "Gives you step by step instruction on how to make a lemonade", correct: false},
        { text: "It tells the browser how to display content", correct: true},
        { text: "When added to your social media, it gives you more likes.", correct: false},
        { text:  "It prints labels", correct: false}
    ]
},
    {
    question: "Which one of these Elements is NOT HTML semantics elements?",
    answers: [
        { text: "'main' element", correct: false},
        { text: "'footer' element", correct: false},
        { text: "'nav' element", correct: false},
        { text: "'span' element", correct: true}
    ]
},
    {
    question: "What does CSS stand for?",
    answers: [
        {text: "Camaro Super Sport", correct: false},
        {text: "Cool Spies Spying", correct: false},
        {text: "Cascading Style Sheets", correct: true},
        {text:"Cream, Soup, Salad", correct: false}
    ]
},
    {
    question: "What does CSS do?",
    answers: [
        {text: "It runs complicated algorithms to complete math in a calculator", correct: false},
        {text: "It describes how HTML elements are displayed", correct: true},
        {text: "It shows you a new way to do spying", correct: false},
        {text: "It's a new diet to lose weight", correct: false}
    ]
},

    {
    question: "What is JavaScript?",
    answers: [
        {text: "It's an app to custom order a coffee", correct: false},
        {text: "It's a script for a movie about coffee", correct: false},
        {text: "It's a language you have to learn in order to speak barista", correct: false},
        {text: "It's a programming language of the web, one of the most popular", correct: true}
    ]
},
    {
    question: "What is a function in JavaScript?",
    answers: [
        {text: "It's a show that you have to watch in order to learn JavaScript", correct: false},
        {text: "It is a comment that explains something but doesn't get executed", correct: false},
        {text: "It's a block of code designed to perform a particular task on command", correct: true},
        {text: "It's a way to trick your body into functioning a certain way", correct: false}
    ]
},
    {
    question: "What is the command in gitbash to create a new directory?",
    answers: [
        {text: "mkdir", correct: true},
        {text: "newfolder", correct: false},
        {text: "pull", correct: false},
        {text: "newdirectory", correct: false}
    ]
},
    {
    question: "What is the command in gitbash to create a new file?",
    answers: [
        {text: "newfile", correct: false},
        {text: "touch", correct: true},
        {text: "push", correct: false},
        {text: "mkfile", correct: false}
    ]
}
]

    // [, , , ],


startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    getNewQuestion()
} )

function startGame() {
    console.log("started");
    startButton.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide")
    getNewQuestion();
    timeEl.classList.remove("hide");
    greeterEl.classList.add("hide");
    startTimer();
    // startTimer();
    // getNewQuestion(); 
}

function noTimeLeft() {
    timeEl.textContent = "You Lost, haha";
}

function startTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft + ' seconds until the end of the quiz.';

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            noTimeLeft();
        }
    }, 1000);
};

function getNewQuestion() {
    resetNew()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    answerButtonEl.classList.remove("hide");
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text;
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", checkAnswer)
        answerButtonEl.append(button);
    } )
}

function setStatusClass(element, correct) {
    clearStatusClass(element) 
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function checkAnswer(e) {
    const answerSelected = e.target
    const correct = answerSelected.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        resultsButton.classList.remove("hide")
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }

}

function resetNew() {
    clearStatusClass(document.body)
    resultsButton.classList.add("hide")
    nextButton.classList.add("hide")
    while (answerButtonEl.firstChild) {
        answerButtonEl.removeChild (answerButtonEl.firstChild)

    }
}