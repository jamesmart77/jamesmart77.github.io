//----------------------------------------------
//POST MESSAGES AREA
//----------------------------------------------
var messagesRef = database.ref("/messages");
var audioElement = document.createElement("audio");
var nonActiveMessenger
var messageSender

audioElement.setAttribute("src", "assets/audio/newMessage.mp3");

function postMessage() {

    var messageText = $("#message").val();

    if (currentPlayerName === null || currentPlayerName === undefined) {
        if (nonActiveMessenger === null || nonActiveMessenger ===undefined){
            nonActiveMessenger = prompt("Who should we say this message is from?");
        }
        messageSender = nonActiveMessenger;
    } else {
        messageSender = currentPlayerName;
    }
    database.ref("/messages").push({
        playerName: messageSender,
        messageText: messageText,
        postTime: moment().format("MM-DD-YY, h:mm:ss a")
    });

    isInitialLoad = false; //global variable for message notifications

}

//listening for any new messages posted
//will auto load when page loads
messagesRef.on("child_added", function (snapshot) {

    let container = $("#posted");
    let messageDiv = $("<div>");
    let player = snapshot.val().playerName;
    let message = snapshot.val().messageText;
    let postTime = snapshot.val().postTime;

    messageDiv.html("<b>" + player + "</b><small> " + postTime + "</small>: " + message);

    container.append(messageDiv);
    container.scrollTop(container.prop("scrollHeight")); //scroll to bottom to make new message visible

    //only highlight new message arrivals after initial load
    //only play sound and show indicator for messages poster by other people
    if (isInitialLoad === false && messageSender !== currentPlayerName && messageSender !== nonActiveMessenger) {
        container.css("border", "2px solid limegreen");
        audioElement.play();
    }

    //having this at the end sets the focus back to the message box so new message notification isn't visible
    $("#message").val("");
})

//remove new message arrival indicator once user clicks the input box
$("#message").on("focus", function () {
    $("#posted").css("border", "1px solid #d9d9d9");
})
//----------------------------------------------
//----------------------------------------------