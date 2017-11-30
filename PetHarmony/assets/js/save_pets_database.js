var image = "";

$(".savePetIcon").on("click", function () {

    //get pet id
    image = $(this).attr("data-id");
    
    //push to FB
    database.ref().push({
        image: image
    })
    
    //remove current info on results page
    $(".savePetIcon").empty();
    $(".savePetIcon").removeClass("fa fa-heart-o");

    //insert full heart icon & text
    $(".savePetIcon").addClass("fa fa-heart");
    $(".savePetIcon").html("<b style='font-family:Arial; color:#000'> Saved</b>");

})