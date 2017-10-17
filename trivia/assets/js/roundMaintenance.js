var intervalID;
var audio = document.createElement("audio");

//function to display question
function showQuestion() {
   
    $(".round").html("Round " + (trivia.currentRound + 1) + ": " + trivia.roundTopics[trivia.currentRound]); //+1 because of 0 index array
    $(".question").html(trivia.rounds[trivia.currentRound].questions[trivia.currentQuestion]);
    $(".time-remaining").html("Time Remaining: ");

    //print 4 option buttons for current round question
    for (var i = 0; i < 4; i++) {
        let optionElement = $("<button>");

        optionElement.addClass("btn btn-warning option-btn");
        optionElement.html(trivia.rounds[trivia.currentRound].options[trivia.currentQuestion].choices[i]);
        $(".question-options").append(optionElement)
    }

    //start count down on clock
    intervalID = setInterval(stopWatch, 1000);
}

//function to decrease time remaining & time to next question
function stopWatch() {
    //decrement by 1
    let timeLeft = trivia.timeRemaining--;

    //print time remaining
    if (timeLeft > 0) {
        $(".time-remaining").html("Time Remaining: " + timeLeft);
    } else {
        $(".time-remaining").html("Time is Up!");
        clearInterval(intervalID);
        trivia.incorrectAnswers++; //increment incorrect answers
        let answer = trivia.rounds[trivia.currentRound].answers[trivia.currentQuestion]; //get question answer from current round
        showResponse("Nothing", answer);
    }
}

//USER GUESSES A QUESTION
$(".question-options").on("click", ".option-btn", function () {

    let guess = ($(this).html()); //get button html value
    let answer = trivia.rounds[trivia.currentRound].answers[trivia.currentQuestion]; //get question answer from current round
    let result;

    if (guess === answer) {
        trivia.correctAnswers++;
        result = "correctly";
    } else {
        trivia.incorrectAnswers++;
        result = "incorrectly";
    }
    clearInterval(intervalID); //stop time
    showResponse(result, answer);
});

//display how user responded
function showResponse(result, answer) {

    if (result === "correctly") {
        $(".answer-response").html("You answered <b style= color:#4CB74C>" + result + "</b>!")
    } else {
        $(".answer-response").html("You answered <b style= color:#B20000>" + result + "</b>! The correct answer was " + answer + ".");
    }

    //clear option buttons
    $(".question-options").empty();

    let answerImage = $("<img>");
    answerImage.addClass("answerImg");

    if (trivia.currentRound === 0) {
        let audioAddress = "assets/audio/" + trivia.rounds[trivia.currentRound].answerAudio[trivia.currentQuestion];
        audio.setAttribute("src", audioAddress);
        audio.play();
    }

    //add correct answer image --> currentQuestion will map to the corresponding image in answerImages array
    let imageAddress = "assets/images/" + trivia.rounds[trivia.currentRound].answerImages[trivia.currentQuestion];

    answerImage.attr("src", imageAddress);
    $(".response-image").append(answerImage);

    waitingForNextRound();

}

function waitingForNextRound() {
    //set time for 10 seconds -- this is time until next question
    trivia.timeRemaining = 5;

    intervalID = setInterval(timeToNextQuestion, 1000);
}

function timeToNextQuestion() {
    //decrement by 1
    let timeLeft = trivia.timeRemaining--;

    //print time remaining
    if (timeLeft > 0) {
        $(".time-remaining").html("Next question in: " + timeLeft);
    } else {
        clearInterval(intervalID);
        nextQuestion();
    }
}

function nextQuestion() {

    if (trivia.currentQuestion === 2) { //if last question of round
        if (trivia.currentRound === 2) { //if in last round
            showScores();
            return;
        } else {
            trivia.currentRound++; //else, next round
            trivia.currentQuestion = 0; //first question of new round
        }
    } else {
        trivia.currentQuestion++; //same round, next question
    }

    reset();
    showQuestion();
}

function reset() {
    $(".response-image").empty();
    $(".answer-response").empty();
    trivia.timeRemaining = 30;

}