$(".actor-container").on("click", ".actor-btn", function () {

    //get button click data-name value
    var actor = $(this).data("name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        actor + "&api_key=LcirIgJ4UU8ijrKBSi5jNsUEhqc9QrZN&limit=10&rating=pg";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function (response) {
            //pass response to separate function to prevent
            //overrunning from js
            displayGifs(response);
        });
});

function displayGifs(response) {

    var actorContainer = $(".gif-container");
    var results = response.data;

    //clear gif container 
    actorContainer.empty();

    //loop through array
    results.forEach(function(element) {
        
        let gifDiv = $("<div class='gifDiv'>");
        let gifImg = $("<img class='gifImg'>");
        let gifDetails = $("<div class='gifDetails'>");
        let copyBtn = $("<button class='btn btn-primary btn-xs pull-right clipboard'>");
        let rating = element.rating;
        
        // assign copy to clipboard attr & html
        copyBtn.attr({
            "data-link": element.images.fixed_width.url,
            alt: 'copy image',
            title: 'copy to clipboard'
        });

        copyBtn.html('<i class="fa fa-clipboard" aria-hidden="true"></i>');

        // rating info
        gifDetails.html("Rating: <b>" + rating + "</b>");

        //assign gif attributes for still and animate state
        gifImg.attr({
            src: element.images.fixed_width_still.url,
            alt: element.title,
            'data-still': element.images.fixed_width_still.url,
            'data-animate': element.images.fixed_width.url,
            'data-state': 'still'
        })

        // build gif container
        gifDetails.append(copyBtn);
        gifDiv.append(gifImg);
        gifDiv.append(gifDetails);
        actorContainer.append(gifDiv);
    });

}

//gif click event
$(".gif-container").on("click", ".gifImg", function () {

    var dataState = $(this).attr("data-state")

    //change to still and animate states
    if(dataState === "still"){
        $(this).attr('data-state', 'animate');
        $(this).attr('src', $(this).attr('data-animate'));
    } else {
        $(this).attr('data-state', 'still');
        $(this).attr('src', $(this).attr('data-still'));
    }
});

// copy gif animated url
$(".gif-container").on("click", ".clipboard", function () {

    var dataLink = $(this).attr("data-link");

    // copy to clipboard needs to copy from doc element
    var aux = document.createElement("input");
    aux.setAttribute("value", dataLink);
    document.body.appendChild(aux);

    // select url in input element
    aux.select();
    document.execCommand("copy");

    // delete input element
    document.body.removeChild(aux);

    // show success alert
    $('.alert').show()
    $('.alert').css('display', 'block');
});