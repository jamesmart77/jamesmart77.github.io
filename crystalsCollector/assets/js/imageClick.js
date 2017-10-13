$(".row1").on("click", ".crystal-img", function () {
    var crystalValue = ($(this).attr("data-crystalvalue"));
    gameStats.userScore += parseInt(crystalValue);

    //gamesStats object defined in beginGame.js
    $(".userCount").html(gameStats.userScore);
    scoreCheck();

    fontAnimate(".userCount");
});

$(".row2").on("click", ".crystal-img", function () {
    var crystalValue = ($(this).attr("data-crystalvalue"));
    gameStats.userScore += parseInt(crystalValue);

    //gamesStats object defined in beginGame.js
    $(".userCount").html(gameStats.userScore);
    scoreCheck();

    fontAnimate(".userCount");
});

function scoreCheck() {

    if (gameStats.challNumber === gameStats.userScore) {
        alert("Nice Job! You WON!!");
        gameStats.wins += 1;
        $(".wins").html(gameStats.wins);
        fontAnimate(".wins");
        nextRound();
    } else if (gameStats.userScore > gameStats.challNumber) {
        alert("So sad...You LOSE!");
        gameStats.loss += 1;
        $(".loss").html(gameStats.loss);
        fontAnimate(".loss");
        nextRound();
    }

}

function nextRound() {
    rounds++;
    gameStats.userScore = 0;
    $(".userCount").html(gameStats.userScore);
    $(".row1").empty();
    $(".row2").empty();
    beginGame();
}

function fontAnimate(myObject) {
    $(myObject).animate({
        fontSize: "36px"
    }, 200);

    $(myObject).animate({
        fontSize: "30px"
    }, 500);

    
}
