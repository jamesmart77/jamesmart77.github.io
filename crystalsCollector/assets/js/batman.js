//# of games played
var rounds = 0;

//input Batman gif and start running animation
function startBatman() {
    
    if (rounds > 0){return};//only execute on initial load

    let batmanElement = $("<img>");
    
    let batmanImg = "assets/images/batman.gif";

    //add image and class
    batmanElement.addClass("batman-img");
    batmanElement.attr("src", batmanImg);

    $(".batman").append(batmanElement);

    batmanRun();
}


function batmanRun(){
    var intervalID;
    var audio = new Audio("assets/audio/goodluck.mp3");

    setTimeout(playAudio,3500);

    intervalID = setInterval(running, 65);
    
    function running(){
        //get current screen width - good to have here in case screen size adjusts after opening
        let screenWidth = $(window).width();

        //get batman element and position
        let batmanElement = $(".batman");
        let batmanPosition = batmanElement.position();
        
        //have batman move out of sigh and stop run
        if ((batmanPosition.left - 500) > screenWidth){
            clearInterval(intervalID);
        } else {
            batmanElement.css("left", batmanPosition.left + 8);
        }    
    }

    function playAudio(){
        //add text to batman and play audio
        let batmanText = $("<div>");

        batmanText.addClass("batman-txt");
        $(".batman").prepend(batmanText);//add text to beginning of batman div
        $(".batman-txt").html("GOOD LUCK!!");
        audio.play();
    }
}