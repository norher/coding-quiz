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

function startQuiz() {
    startTimer();
    showQuestions();
};

var timeEl = document.getElementById("timeLeft");
var mainContainer = document.getElementById('mainContainer');
var timeLeft;
var gameOn = false; 
let score = 0;
let questionChoice;

var questionsList = [
    ["What does HTML stand for?"],
    ["What does HTML do?"],
    ["Choose an element that is NOT semantics HTML"],
    ["What does CSS stand for?"],
    ["What does CSS do?"],
    ["What is JavaScript?"],
    [" What is a function in JavaScript?"],
    ["What is the command in gitbash to create a new directory?"],
    ["What is the command in gitbash to create a new file?"]
];

var answerChoices = [
    ["Honey, Tea, Mango, Lime", "Hyper Text Markup Language", "Head To My Limo", "How To Make Labels"]
    ["Gives you step by step instruction on how to make a lemonade", "It tells the browser how to display content", "When added to your social media, it gives you more likes.", "It prints labels" ],
    ["'main' element", "'span' element", "'footer' element", "'nav' element"],
    ["Camaro Super Sport", "Cascading Style Sheets", "Cool Spies Spying", "Cream, Soup, Salad"],
    ["It runs complicated algorithms to complete math in a calculator", "It describes how HTML elemtns are displayed", "It's a new diet to lose weight", "It shows you a new way to do spying"],
    ["It's an app to custom order a coffee", "It's a programming language of the web, one of the most popular", "It's a script for a movie about coffee", "It's a language you have to learn in order to speak computer"],
    ["It's a show that you have to watch in order to learn JavaScript", "It's a block of code designed to perform a particular task", "It's a way to trick your body into functioning a certain way", "It is a comment that explains something but doesn't get executed"],
    ["newfolder", "mkdir", "newdirectory", "pull"],
    ["newfile", "touch", "mkfile", "push"]
]

init();

function init() {
    var startEl = document.createElement("h1");
    startEl.textContent = "Click button to start quiz.";
    var startBtn = document.createElement("button");
    startBtn.textContent = "Start!";
    startBtn.addEventListener("click", startGame);
    startBtn.classList.add("start-btn");
    mainContainer.append(startEl);
    mainContainer.append(startBtn);
}

function startGame() {
    gameOn = true;
    currentScore = 0;
    timeLeft = 60;
    questionChoice = 0;
    timeEl.textContent = "Time: " + timeLeft;
    startTimer();
    getNewQuestion(); 
}

function noTimeLeft() {
    timeEl.textContent = "You Lost, haha";
}

function startTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft + ' seconds until the end of the quiz.';

        if (timeLeft === 0 || gameOn === false) {
            clearInterval(timerInterval);
            noTimeLeft();
        }
    }, 1000);
};

console.log(questionsList);

function getNewQuestion(num) {
    var whichQuestion = questionsList[0];
    var correctChoice = questionsList[1];
    var answerList = answerChoices;
    var questionEl = document.createElement("h1");
    var possibleAnswers = document.createElement("ul");

    questionEl.textContent = whichQuestion;
    mainContainer.append = questionEl;

    for (i = 0; i < answerList.length; i++) {
        var answerBtn = document.createElement("button");
        var answerItem = document.createElement("li");
        answerBtn.textContent = (i + 1) + ". " + answerChoices[num][i];
        answerBtn.setAttribute("id", "btn" + i);
        if (i === correctChoice) {
            answerBtn.setAttribute('data-correct', "true");
        } else {
            answerBtn.setAttribute("data-correct", "false")
        }
        answerBtn.addEventListener("click", isCorrect);
        answerItem.append(answerBtn);
        possibleAnswers.append(answerItem);
    }
    mainContainer.append(possibleAnswers);
}

function gameMode() {
    if (questionChoice < questions.length) {
        mainContainer.innerHTML = "";
        getNewQuestion(questionChoice);
        questionChoice++;
    } else {
        gameOver();
    }
}