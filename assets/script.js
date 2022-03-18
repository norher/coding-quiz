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

var timeEl = document.querySelector("#timeLeft");
var startBtn = document.querySelector('#beginBtn');
var timeLeft = 300;
var questionsEl = document.querySelectorAll(".quiz");


function noTimeLeft() {
    timeEl.textContent = "You Lost, haha";
}

function startTimer() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = timeLeft + ' until the end of the quiz.';

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            noTimeLeft();
        }

    }, 1000);
};

startBtn.addEventListener('click', startTimer);


    questionsEl.addEventListener('click', function() {
    var element = event.target;
    if (element.matches(".wrongAnswer")) {
        //What happens when the user clicks on a wrong answer
        questionsEl.setAttribute('style', 'border: 5px solid red')
    };
});
