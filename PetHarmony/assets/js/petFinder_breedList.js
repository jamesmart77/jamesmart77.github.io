//ANIMAL TYPE DROPDOWN CHANGE --> UPDATE BREED DROPDOWN
$("#animal-type-input").on("change", function(){
    
    var animalType = $(this).val().toLowerCase();//animal type needs to be lowercase for api
    var url =
    'https://api.petfinder.com/breed.list?key=435c7d11e964556e87d7de00e3333dba&animal=' + animalType +
    '&format=json';

    $.ajax({
        type: 'GET',
        data: {},
        url: url + '&callback=?',
        dataType: 'json',
        success: function (data) {

            //remove all breed drop list optins except the first(ie. any)
            $('#breed-type-input').children('option:not(:first)').remove();
            
            //passing breed array
            var petfinder = data.petfinder.breeds;

            console.log(petfinder);

            //declare and assign to breed drop down list
            var breedList = $("#breed-type-input");

            //loop through all breeds and append to drop down
            for(var i = 0; i < petfinder.breed.length; i++){
                let breedOption = $("<option>")

                breedOption.text(petfinder.breed[i].$t);

                breedList.append(breedOption);
            }

        }
    })
})