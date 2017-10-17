//function that links to html
function beginTrivia() {

    //reset rounds to 0
    // trivia.currentRound = 2;
    // trivia.currentQuestion = 2;
    addCss();
    showQuestion();
    $( ".jumbotron" ).fadeOut( "slow", function(){});
    $( ".trivia-container" ).fadeTo( 2500, 1);

}

function addCss(){
    $(".trivia-container").css("opacity", 0);
    $(".trivia-container").addClass("panel panel-default");
    $(".section-head").addClass("panel-header");
    $(".section-body").addClass("panel-body");
}