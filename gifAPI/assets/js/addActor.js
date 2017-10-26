$("#addActor-btn").on("click", function(){
    
    //add actor to actor json object
    var input = $("#user-input").val();

    $("#user-input").val("");

    actors.arr.push(input);

    //reload actor object array
    actorLoad();

});