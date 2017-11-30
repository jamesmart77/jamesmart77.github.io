//if animal is clicked on home page
function singleAnimalResults(url) {
    
    localStorage.removeItem("singleAnimalResults");
    
    $.ajax({
        type: 'GET',
        data: {},
        url: url + '&callback=?',
        dataType: 'json',
        success: function (data) {

            localStorage.setItem("singleAnimalResults", JSON.stringify(data.petfinder));

            window.location.href = "results-page.html";

        }
    })
}

//----------------------------------
//SEARCH BUTTON SELECTED
//----------------------------------

//alert for location validation
function toggleAlert() {
    var div = $("<div class='alert alert-danger alert-dismissible fade' role='alert' id='bsalert'>");
    var btn = $("<button type='button' class='close' data-dismiss='alert' aria-label='Close'>");
    var spn = $("<span aria-hidden='true'>").html("&times");
      
    var alertText = "<strong>UH OH!</strong> Please provide a location before searching." 

    btn.append(spn);
    div.append(btn);
    div.append(alertText);

    div.insertAfter( ".navbar" );

    $("#bsalert").addClass("show");//makes alert appear
    $("#location-input").css("border", "2px solid #C9282D")//outline location input box
}

$('#bsalert').on('close.bs.alert', toggleAlert)

//=================================
function submitBtnSearch(event){
    
        event.preventDefault();

        //reset local storage
        localStorage.removeItem("multAnimalResults");
        localStorage.removeItem("singleAnimalResults");
    
        var location= $("#location-input").val().toLowerCase();
        var animalType = $("#animal-type-input").val().toLowerCase();//animal type needs to be lowercase for api 
        var breed= $("#breed-type-input").val().toLowerCase();
        var age= $("#age-input").val();//leave uppercase for API call
        var size= $("#size-input").val(); 
    
        var gender 
        var selected = $("#radio-button-group input[type='radio']:checked");
        if (selected.length > 0) {
            gender = selected.val();
        }
        //TODO --> Remove alert and css location input border red
        if(location === null || location === undefined || location === ""){
            toggleAlert()
            return
        }
        
        //location at a minimum required
        var url = 'https://api.petfinder.com/pet.find?key=435c7d11e964556e87d7de00e3333dba&location=' + location
        
        //creating api url based on search parameters
        if(animalType !== 'any'){
            url += '&animal=' + animalType;
        }
        
        if(breed !== 'any'){
            url += '&breed=' + breed;
        }
    
        if(age !== 'Any'){
            url += '&age=' + age;
        }
    
        if(size !== 'any'){
            url += '&size=' + size;
        }
    
        if(gender !== 'any'){
            url += '&sex=' + gender;
        }
    
        url += '&count=15&format=json'
    
        $.ajax({
            type: 'GET',
            data: {},
            url: url + '&callback=?',
            dataType: 'json',
            success: function (data) {
    
                var petfinder = data.petfinder.pets;
    
                var isArray = $.isArray(petfinder.pet)
                
                //isArray will check if more than one animal has been returned
                if(isArray){
                    localStorage.setItem("multAnimalResults", JSON.stringify(data.petfinder));
                    // localStorage.setItem("singleAnimalResults", null);
                } else {
                    localStorage.setItem("singleAnimalResults", JSON.stringify(data.petfinder.pets));
                }

                window.location.href = "results-page.html";   
    
            }
        })
    }