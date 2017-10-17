var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "assets/audio/KickstartMyHeart.mp3");

$(document).ready(function () {

    //on page load, execute
    document.addEventListener("load", playMusic());
});


function playMusic(){
    audioElement.play();
}

$(".start-btn").on("click", function(){
    //pause Motley and set src to blank
    audioElement.pause();
    audioElement.setAttribute("src", "");

    //set new song clip
    audioElement.setAttribute("src","assets/audio/iWannaRock.mp3");
    playMusic();
});