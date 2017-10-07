var audioElement = document.createElement("audio");
audioElement.setAttribute("src", "Assets/audio/mistyMtns.mp3");

$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    //on page load, execute
    document.addEventListener("load", themeMusic());
});

function howToPlay() {
    // Get the modal
    var modal = document.getElementById('myModal');
    var modalText = document.getElementById('modalText');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    var rules = "<h2>Rules</h2><br><ol><li>Press any key to get started!</li><li>Press any letter on your keyboard to enter a guess</li><li>You have 10 guesses before you kill a stick figure...</li><li>Hint: All words only have letters (no numeric or special characters) and are related to Outer Space :)</li><br><li>If you think you know the 'Challenge Word', click the lucky button to enter in the full word.</li></ol>"


    //update modal for recent win
    modalText.innerHTML = rules
    modal.style.display = "block"; //display modal
}


function themeMusic() {

    // var myAudio = document.getElementById('myAudioID');

    if (!audioElement.paused) {
        audioElement.pause();
        let musicStr = '<i class="fa fa-volume-up" aria-hidden="true" style="color: green"></i> Turn Music On';
        $(".music").html(musicStr);
        $("#volumebtn").html(musicStr);
    } else {
        audioElement.play();
        let musicStr = '<i class="fa fa-volume-off" aria-hidden="true" style="color: red"></i> Turn Music Off';
        $(".music").html(musicStr);
        $("#volumebtn").html(musicStr);
        
    }
}

audioElement.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);