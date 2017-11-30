document.addEventListener("load", resultsPageLoad());

var petLocation

function resultsPageLoad() {

    //reset
    $(".carousel-inner").empty();
    $(".animal-carousel-results-info").empty();

    //assessing data situation for upcoming conditional
    var singlePetResultsObject = localStorage.getItem('singleAnimalResults');
    var multPetResultsObject = localStorage.getItem('multAnimalResults');



    if (singlePetResultsObject) { //truthy statement checking for single animal return
        singlePetResultsObject = JSON.parse(singlePetResultsObject);

        var petDetails = singlePetResultsObject.pet;

        console.log(petDetails);

        var imgDiv = $("<div class='carousel-item active'>");
        var petImg = $("<img class='d-block w-100 pet-carousel-img' alt='pet-image'>");
        var imgAddress

        //loop through images array and find 300px image
        for (var t = 0; t < petDetails.media.photos.photo.length; t++) {
            let imgItr = petDetails.media.photos.photo[t].$t;

            if (imgItr.indexOf(300) >= 0) {
                imgAddress = petDetails.media.photos.photo[t].$t;
            }
        }

        petImg.attr({
            src: imgAddress,
            'data-id': petDetails.id.$t
        })

        imgDiv.append(petImg);

        $(".carousel-inner").append(imgDiv);

        //DESCRIPTION DETAILS

        insertInfo(petDetails)

    } else if (multPetResultsObject) { //checking for multiple animal return
        //then look at the multiAnimalResults localstorage


        multPetResultsObject = JSON.parse(multPetResultsObject);

        var petDetails = multPetResultsObject.pets.pet;

        console.log(petDetails);


        for (var i = 0; i < petDetails.length; i++) {
            let imgDiv
            if (i === 0) {
                imgDiv = $("<div class='carousel-item active'>");
            } else {
                imgDiv = $("<div class='carousel-item'>");
            }

            let petImg = $("<img class='d-block w-100 pet-carousel-img' alt='pet-image'>");
            var imgAddress = "";

            //loop through images array and find 300px image
            for (var t = 0; t < petDetails[i].media.photos.photo.length; t++) {
                let imgItr = petDetails[i].media.photos.photo[t].$t;

                if (imgItr.indexOf(300) >= 0) {
                    imgAddress = petDetails[i].media.photos.photo[t].$t;
                }
            }

            //if no 300px image was found
            if (imgAddress) {} else {
                imgAddress = "assets/images/imageNA.png";
            }

            petImg.attr({
                src: imgAddress,
                'data-id': petDetails[i].id.$t
            })

            imgDiv.append(petImg);

            $(".carousel-inner").append(imgDiv);

            //insert first animals info
            if (i === 0) {
                var petInfo = petDetails[i]
                insertInfo(petInfo)
            }
        }

    } else {
        //if neither single nor multiple, return random 10 animals
    }
}

function insertInfo(petDetails) {
    //assign pet details
    var name = petDetails.name.$t;
    var description = petDetails.description.$t;
    var age = petDetails.age.$t;
    var shots = "NA";
    var fixed = "NA";
    var houseTrained = "NA";
    var sex = petDetails.sex.$t;
    var size = petDetails.size.$t;
    var breed = petDetails.breeds.breed.$t;
    var petID = petDetails.id.$t;



    petLocation = petDetails.contact.zip.$t;

    var optionsArr = $.isEmptyObject(petDetails.options.option);

    if (optionsArr) {} else {
        for (var i = 0; i < petDetails.options.option.length; i++) {
            if (petDetails.options.option[i].$t === "hasShots") {
                shots = "Yes"
            } else if (petDetails.options.option[i].$t === "altered") {
                fixed = "Yes"
            } else if (petDetails.options.option[i].$t === "housetrained") {
                houseTrained = "Yes"
            }
        }
    }

    //build collapsable cards in HTML
    var infoContainer = $("<div id='accordion' role='tablist' aria-multiselectable='true'>");
    var cardDivOne = $("<div class='card'>");

    var cardHeader = $("<div class='card-header' role='tab' id='headingOne'>");

    var headerDiv = $("<h5 class='mb-0'>");
    var headerToggle = $("<a id='mainDetailHeader' data-toggle='collapse' data-parent='#accordion' href='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>")

    //adding pet ID to heart icon
    $(".savePetIcon").removeAttr("data-id");
    $(".savePetIcon").attr("data-id", petID);

    headerToggle.html("<h4>About " + name + "</h4>")
    headerDiv.append(headerToggle);
    cardHeader.append(headerDiv);
    cardDivOne.append(cardHeader);

    var descriptionCardCollapse = $("<div id='collapseOne' class='collapse show' role='tabpanel' aria-labelledby='headingOne'>");
    var descriptionCardBlock = $("<div class='card-block'>");

    if (!description) {
        description = "No description available at this time..."
    }

    descriptionCardBlock.text(description);
    descriptionCardCollapse.append(descriptionCardBlock);

    cardDivOne.append(descriptionCardCollapse);

    //============================
    //MORE DETAILS INFO SECTION===
    //============================

    var cardDivTwo = $("<div class='card'>");
    var headerDivTwo = $("<h5 class='mb-0'>");
    var cardHeaderTwo = $("<div class='card-header' role='tab' id='headingTwo'>");
    var headerToggleTwo = $("<a id='DetailHeader' class='collapsed' data-toggle='collapse' data-parent='#accordion' href='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>")

    headerToggleTwo.html("<h5>More About " + name + "</h5>")
    headerDivTwo.append(headerToggleTwo);
    cardHeaderTwo.append(headerDivTwo);
    cardDivTwo.append(cardHeaderTwo);

    var descriptionCardCollapseTwo = $("<div id='collapseTwo' class='collapse' role='tabpanel' aria-labelledby='headingTwo'>");
    var descriptionCardBlockTwo = $("<div class='card-block'>");

    descriptionCardBlockTwo.append("<p class='card-text additional-info'><b>Age: </b>" + age + "</p>")
    descriptionCardBlockTwo.append("<p class='card-text additional-info'><b>Breed: </b>" + breed + "</p>")
    descriptionCardBlockTwo.append("<p class='card-text additional-info'><b>Sex: </b>" + sex + "</p>")
    descriptionCardBlockTwo.append("<p class='card-text additional-info'><b>Size: </b>" + size + "</p>")
    descriptionCardBlockTwo.append("<p class='card-text additional-info'><b>Shots: </b>" + shots + "</p>")
    descriptionCardBlockTwo.append("<p class='card-text additional-info'><b>Fixed: </b>" + fixed + "</p>")
    descriptionCardBlockTwo.append("<p class='card-text additional-info'><b>House Trained: </b>" + houseTrained + "</p>")

    descriptionCardCollapseTwo.append(descriptionCardBlockTwo);

    cardDivTwo.append(descriptionCardCollapseTwo);

    infoContainer.append(cardDivOne);
    infoContainer.append(cardDivTwo);

    //heart icon reset
    $(".savePetIcon").empty();

    //insert heart icon & text
    $(".savePetIcon").addClass("fa fa-heart-o");
    $(".savePetIcon").html("<b style='font-family:Arial; color:#000'> Save</b>");

    //clear & reset
    $("#animal-carousel-results-info").empty();

    //add to container
    $("#animal-carousel-results-info").append(infoContainer);
}