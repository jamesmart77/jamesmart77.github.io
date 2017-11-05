//remove current player from firebase
$(window).unload(function () {
    if (player.key !== 'blank') {
        database.ref("players/" + player.key).remove()
        // player.onDisconnect().remove();
    }
});

//update panels with open slot
playersRef.on("child_removed", function(){
    if(currentPlayerNumber === 1){
        $(".player2-head").text("Slot 2 is Open");
    } else {
        $(".player1-head").text("Slot 1 is Open");
    }

})