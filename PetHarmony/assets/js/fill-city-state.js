document.addEventListener("load", fillInCityState());


function fillInCityState(){
    //we do not need to call returnCityState, because that function calls this one.
    //that would result in an infinite loop.
    //  returnCityState()
    if (localStorage.getItem("userLocation") !== null ||(localStorage.getItem("userLocation") !=="undefined")) {
        $("#location-input").val(localStorage.getItem("userLocation"));
        }
    //$("#location-input").val(userCityState);
   
    //we are filling in the value from storage of the userLocation
    // console.log(userCityState);
    // console.log("fill in service ran.")
}