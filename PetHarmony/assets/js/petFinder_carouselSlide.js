$("#animal-carousel-results-photo").on('slid.bs.carousel', function (e) {
    console.log('slide event!');

    var currentIndex = $('div.active').index();

    //index position will allow for referring to locally stored JSON object
    console.log("current pic: " + currentIndex)

    var multPetResultsObject = localStorage.getItem('multAnimalResults');

    if (multPetResultsObject) { //if more than one photo is in carousel

        multPetResultsObject = JSON.parse(multPetResultsObject);

        var petDetails = multPetResultsObject.pets.pet;

        console.log(petDetails);


        for (var i = 0; i < petDetails.length; i++) {
            if (currentIndex === i) { //match active pet in carousel with pet in array
                var petInfo = petDetails[i]
                insertInfo(petInfo)//petFinder_resultsPageLoad.js
            }
        }
    }
});