
//check if this is start of game with two new players
function initialChecker() {

    playerQuery.once("value")
    .then(function (snap) {
        let childCount = snap.numChildren();

        if(childCount = 2){
            if(player.key !== "blank"){
                //make active players buttons visible
                $(".btn-key").removeClass('btn-options-invisible').addClass('btn-options-visible');
                
                //update banner
                $(".game-updates").html("<p>Let's battle! Choose your weapon!</p>")
            }
        }

    });
}
