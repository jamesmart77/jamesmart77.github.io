var audioEnd = document.createElement("audio");
audioEnd.setAttribute("src", "assets/audio/thriller.mp3");

function showScores() {

    audioEnd.play();

    //clear everything from elements
    clear();

    $(".round").html("The Results Are In");
    let correctElement = $("<div>");
    let wrongElement = $("<div>");
    // let restartButton = $("<button>");

    correctElement.html("Correct Answers: " + trivia.correctAnswers);
    wrongElement.html("Wrong Answers: " + trivia.incorrectAnswers);

    // restartButton.setAttribute("click", replayTrivia());

    let restartButton = $('<button>', {
        class: 'replayBtn',
        on   : {
           click: function() {
               replayTrivia();
           }
        }
    });

    if (trivia.incorrectAnswers > 0) {
        restartButton.html("Think You Can Do Better?");
    } else {
        restartButton.html("Play Again!");
    }

    restartButton.addClass("btn btn-info start-btn");

    $(".question").append(correctElement);
    $(".question").append(wrongElement);
    $(".question-options").append(restartButton);

}

function replayTrivia(){
    trivia.currentQuestion = 0;
    trivia.currentRound = 0;
    trivia.correctAnswers = 0;
    trivia.incorrectAnswers = 0;
    trivia.timeRemaining = 30;
    
    audioEnd.pause();
    audioEnd.setAttribute("src", "");

    //set new song clip
    audioEnd.setAttribute("src","assets/audio/iWannaRock.mp3");
    playMusic();

    clear();
    $(".trivia-container").css("opacity", 0);
    $( ".trivia-container" ).fadeTo( 2000, 1);
    showQuestion();
}

function clear(){
    $(".round").empty();
    $(".question").empty();
    $(".time-remaining").empty();
    $(".answer-response").empty();
    $(".question-options").empty();
    $(".response-image").empty();
}
