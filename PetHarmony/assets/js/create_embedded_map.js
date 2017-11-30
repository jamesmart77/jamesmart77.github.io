let markerLocation = petLocation
let embeddedApiKey = "AIzaSyDVKfD2GQPkmzqBhcT_tSHEt2XM69yRCWo"
  $( document ).ready(function() {
      $('#embedded-map').attr('src','https://www.google.com/maps/embed/v1/place?key=' + embeddedApiKey + '&q=' + markerLocation)
      console.log($('#embedded-map').attr('src'));
console.log( "ready!" );
console.log("location is " + petLocation)

});      