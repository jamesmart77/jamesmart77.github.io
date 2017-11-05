/*
TODO
- assign click event to player choices and map to player myAnswer
- within the if/then conditionals below, establish victor and looser
- assign win/loss respectively to player node
- present victor in results panel
*/
var isFirstPassComplete = true;
var winningAudio = document.createElement("audio");
var losingAudio = document.createElement("audio");
var nextRoundTime
var intervalID

winningAudio.setAttribute("src", "assets/audio/winningSound.mp3");
losingAudio.setAttribute("src", "assets/audio/losingSound.mp3");

//player 1 answer submit
$(".body-1").on("click", ".btn-key", function () {
    
    hideButtons();

    database.ref("players/" + player.key).update({
        myAnswer: ($(this).data('integer'))
    })
})

//player 2 answer submit
$(".body-2").on("click", ".btn-key", function () {
    
    hideButtons();

    database.ref("players/" + player.key).update({
        myAnswer: $(this).data('integer')
    })
})

//hide active player option buttons
function hideButtons(){
    if(player.key !== "blank"){
        //make active players buttons visible
        $(".btn-key").removeClass('btn-options-visible').addClass('btn-options-invisible-round');
    } 
}

//show active player option buttons
function showButtons(){
    if(player.key !== "blank"){
        //make active players buttons visible
        $(".btn-key").removeClass('btn-options-invisible-round').addClass('btn-options-visible');
    } 
}


playersRef.on("child_changed", function (snapshot) {

    if (isFirstPassComplete) {
        var playerOneInfo = {
            answer: 0,
            key: "",
            existingWins: 0,
            existingLossses: 0,
            wins: 0,
            losses: 0
        }

        var playerTwoInfo = {
            answer: 0,
            key: "",
            existingWins: 0,
            existingLossses: 0,
            wins: 0,
            losses: 0
        }

        var numberOfPlayers

        playerQuery.once("value")
            .then(function (snap) {

                numberOfPlayers = snap.numChildren();

                if (numberOfPlayers !== 2) {
                    return
                } //exit if not two players

                snap.forEach(function (childSnapshot) {
                    var answer = childSnapshot.val().myAnswer;
                    var playerNum = childSnapshot.val().playerNum;
                    var playerKey = childSnapshot.key;
                    var wins = childSnapshot.val().wins;
                    var losses = childSnapshot.val().losses;


                    if (playerNum === 1) {
                        playerOneInfo.answer = answer;
                        playerOneInfo.key = playerKey;
                        playerOneInfo.existingWins = wins;
                        playerOneInfo.existingLossses = losses;
                    } else {
                        playerTwoInfo.answer = answer;
                        playerTwoInfo.key = playerKey;
                        playerTwoInfo.existingWins = wins;
                        playerTwoInfo.existingLossses = losses;
                    }

                })

                //SCORING LOGIC
                //two players and both answers must not be 0 (default)
                if (numberOfPlayers === 2 && playerOneInfo.answer !== 0 && playerTwoInfo.answer !== 0) {
                    if (playerOneInfo.answer === 1 && playerTwoInfo.answer === 2) { //rock vs paper
                        //player 2 wins
                        playerOneInfo.losses = 1;
                        playerTwoInfo.wins = 1;
                        updateScores(playerOneInfo, playerTwoInfo)
                        //database.ref("players/" + playerOneInfo.key).set({losses: playerOneInfo.losses + 1})
                        //database.ref("players/" + playerTwoInfo.key).set({wins: playerTwoInfo.wins + 1})
                    } else if (playerOneInfo.answer === 1 && playerTwoInfo.answer === 3) { //rock vs scissors
                        //player 1 wins
                        
                        playerOneInfo.wins = 1;
                        playerTwoInfo.losses = 1;
                        updateScores(playerOneInfo, playerTwoInfo)

                    } else if (playerOneInfo.answer === 1 && playerTwoInfo.answer === 1) { //rock vs rock
                        //tie
                        updateScores(playerOneInfo, playerTwoInfo)
                    } else if (playerOneInfo.answer === 2 && playerTwoInfo.answer === 1) { //paper vs rock
                        //player 1 wins
                        
                        playerOneInfo.wins = 1;
                        playerTwoInfo.losses = 1;
                        updateScores(playerOneInfo, playerTwoInfo)

                    } else if (playerOneInfo.answer === 2 && playerTwoInfo.answer === 2) { //paper vs paper
                        //tie
                        updateScores(playerOneInfo, playerTwoInfo)
                    } else if (playerOneInfo.answer === 2 && playerTwoInfo.answer === 3) { //paper vs scissors
                        //player 2 wins
                        playerOneInfo.losses = 1;
                        playerTwoInfo.wins = 1;
                        updateScores(playerOneInfo, playerTwoInfo)

                    } else if (playerOneInfo.answer === 3 && playerTwoInfo.answer === 1) { //scissors vs rock
                        //player 2 wins
                        playerOneInfo.losses = 1;
                        playerTwoInfo.wins = 1;
                        updateScores(playerOneInfo, playerTwoInfo)

                    } else if (playerOneInfo.answer === 3 && playerTwoInfo.answer === 2) { //scissors vs paper
                        //player 1 wins
                        
                        playerOneInfo.wins = 1;
                        playerTwoInfo.losses = 1;
                        updateScores(playerOneInfo, playerTwoInfo)

                    } else if (playerOneInfo.answer === 3 && playerTwoInfo.answer === 3) { //scissors vs scissors
                        //tie
                        updateScores(playerOneInfo, playerTwoInfo)
                    }

                    database.ref("players/" + player.key).update({
                        myAnswer: 0
                    })
                }
            });
    }
})

function updateScores(playerOneInfo, playerTwoInfo) {

    //boolean prevents constant loop for child_updated
    //only want to update the wins/losses per submission
    isFirstPassComplete = false;

    //clear previous results img
    $(".body-results").empty();

    waitingForNextRound();

    //get loss & win images
    let lossImg = $("<img class='results-img'>").attr({
        src: "assets/images/loser.png"
    })

    let winImg = $("<img class='results-img'>").attr({
        src: "assets/images/victory.png"
    })

    //post corresponding img per active player
    if (currentPlayerNumber === 1) {
        if (playerOneInfo.losses === 1) {
            $(".body-results").append(lossImg);
            losingAudio.play();
        } else if (playerOneInfo.wins === 1){
            $(".body-results").append(winImg);
            winningAudio.play();
        } else{
            $(".body-results").append("<p><b>TIE!</b></p>")
        }
    }

    if (currentPlayerNumber === 2) {
        if (playerTwoInfo.losses === 1) {
            $(".body-results").append(lossImg);
            losingAudio.play();
        } else if (playerTwoInfo.wins === 1){
            $(".body-results").append(winImg);
            winningAudio.play();
        } else{
            $(".body-results").append("<p><b>TIE!</b></p>")
        }
    }

    database.ref("players/" + playerOneInfo.key).update({
        losses: playerOneInfo.existingLossses + playerOneInfo.losses,
        wins: playerOneInfo.existingWins + playerOneInfo.wins
    })
    database.ref("players/" + playerTwoInfo.key).update({
        wins: playerTwoInfo.existingWins + playerTwoInfo.wins,
        losses: playerTwoInfo.existingLossses + playerTwoInfo.losses
    })

    

    isFirstPassComplete = true;
}

function waitingForNextRound() {
    //set time for 4 seconds

    $(".body-results").append("<div class='time-remaining text-center'></div>")
    nextRoundTime = 4;

    intervalID = setInterval(timeToNextQuestion, 1000);
}

function timeToNextQuestion() {
    //decrement by 1
    let timeLeft = nextRoundTime--;

    //print time remaining
    if (timeLeft > 0) {
        $(".time-remaining").html("Next question in: <b>" + timeLeft + "</b>");
    } else {
        clearInterval(intervalID);
        $(".body-results").empty();

        let roundImg = $("<img class='results-img'>").attr({
            src: "assets/images/gameOn.png"
        })

        $(".body-results").append(roundImg);
        showButtons();

    }
}

//listening to update player stats
playersRef.on("value", function (snapshot) {

    //look at current number of players on app
    playerCount = snapshot.numChildren();

    if (playerCount === 2) {

        playerQuery.once("value")
            .then(function (snap) {
                snap.forEach(function (childSnapshot) {
                    var playerWins = childSnapshot.val().wins;
                    var playerLosses = childSnapshot.val().losses;
                    var playerNumber = childSnapshot.val().playerNum;

                    //update panel headers for player name
                    if (playerNumber === currentPlayerNumber) {
                        $(".win-stats").text(playerWins);
                        $(".loss-stats").text(playerLosses);
                    }
                })
            });
    }
});