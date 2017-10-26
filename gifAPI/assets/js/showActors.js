function actorLoad(){
    var actorContainer = $(".actor-container");
    var actorArray = actors.arr;

    //clear container
    actorContainer.empty();

    //add all actors in array
    actorArray.forEach(function(element) {
        let actorButton = $("<button class='actor-btn btn btn-info btn-sm'>");

        actorButton.attr("data-name", element);
        actorButton.html(element);

        actorContainer.append(actorButton);

    });
    
}