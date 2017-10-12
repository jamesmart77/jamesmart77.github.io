var gameStats = {
    challNumber: 0,
    userScore: 0,
    wins: 0,
    loss: 0
}

//generate challenge number
function setChallengeNumber() {
    //calling randomNum.js
    let randNum = Math.round(getRandom(120, 19));

    $(".challengeNumber").html(randNum);
    gameStats.challNumber = randNum;
}

//generate images and click values
function setCrystals() {
    for (var i = 1; i < 5; i++) {

        var imageCrystal = $("<img>");

        imageCrystal.addClass("crystal-img");

        let crystalImage = "assets/images/crystal" + i + ".gif"

        imageCrystal.attr("src", crystalImage);

        //calling randomNum.js
        let randNum = Math.round(getRandom(12, 1));

        imageCrystal.attr("data-crystalvalue", randNum);

        if (i < 3) {
            $(".row1").append(imageCrystal);
        } else {
        $(".row2").append(imageCrystal);
        }

    }
}