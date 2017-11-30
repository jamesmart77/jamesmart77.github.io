$(document).on("click", ".deletebtn", function () {
    // `this` refers to the "some_class" element
    var petID = $(this).attr('data-id');

    var ImgQuery = firebase.database().ref();
    //var imgArr = [];

    ImgQuery.once("value")
        .then(function (snap) {
            snap.forEach(function (childSnapShot) {
                var imgID = childSnapShot.val().image;
                var key = childSnapShot.key;

                if (imgID === petID) {
                    database.ref().child(key).remove();
                    $( "div[data-id=" + petID + "]" ).fadeOut( "slow", function() {
                        // Animation complete.
                      });
                    return
                }
            });

        })

});