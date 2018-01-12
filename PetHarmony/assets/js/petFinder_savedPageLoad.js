document.addEventListener("load", savedPageLoad());

var savedImgRef = database.ref();

function savedPageLoad() {
    var savedImgQuery = firebase.database().ref();
    var imgArr = [];

        //query FB once
        savedImgQuery.once("value")
            .then(function (snap) {
                snap.forEach(function (childSnapShot) {
                    var imgID = childSnapShot.val().image;
                    // console.log(imgID);
                    imgArr.push(imgID)
                });
                //get img IDs from petFinder
                getSavedPetIDs(imgArr);
            })
}

function getSavedPetIDs(petsArr) {

    console.log(petsArr)

    //remove everything
    $("#saved-animal-container").empty();

    //for each saved pet, render to page after ajax call on Pet ID
    for (var i = 0; i < petsArr.length; i++) {
        var url = 'https://api.petfinder.com/pet.get?key=435c7d11e964556e87d7de00e3333dba&id=' + petsArr[i]


        url += '&format=json'

        $.ajax({
            type: 'GET',
            data: {},
            url: url + '&callback=?',
            dataType: 'json',
            success: function (data) {


                var petfinder = data.petfinder.pet;

                if (petfinder) {
                    var infoDiv = $("<div id='animal-div' class='card col-lg-3 col-md-4 col-sm-12 col-xs-12 savedPetCard'>")
                    var cardBody = $("<div class='card-body savedPetCardBody'>")
                    var name = $("<h4 class='card-title'>" + petfinder.name.$t + "</h4>");
                    var deleteIcon = $("<span id='deleteSavedPet' class='pull-right deletebtn'>");

                    infoDiv.attr('data-id', petfinder.id.$t);
                    deleteIcon.attr('data-id', petfinder.id.$t);
                    deleteIcon.addClass("fa fa-trash-o");

                    var imgAddress = "";

                    for (var t = 0; t < petfinder.media.photos.photo.length; t++) {
                        let imgItr = petfinder.media.photos.photo[t].$t;

                        if (imgItr.indexOf(300) >= 0) {
                            imgAddress = petfinder.media.photos.photo[t].$t;
                        }

                    }

                    if (imgAddress === "") {
                        imgAddress = "assets/images/imageNA.png"
                    }

                    var photo = $("<img class='card-img-top savedPetImg'>").attr({
                        src: imgAddress,
                        alt: 'pet image',
                        'data-id': petfinder.id.$t
                    });


                    name.append(deleteIcon)
                    cardBody.append(name)
                    infoDiv.append(photo)
                    infoDiv.append(cardBody)


                    // return infoHTML;
                    $('#saved-animal-container').append(infoDiv);
                }
            }
        })
    }

}

//animal on home page selected
$("#saved-animal-container").on("click", ".savedPetImg", function () {
    
        var animalID = ($(this).data('id'));
    
        var url =
            'https://api.petfinder.com/pet.get?key=435c7d11e964556e87d7de00e3333dba&id=' + animalID +
            '&format=json';
    
        singleAnimalResults(url)
    
    })