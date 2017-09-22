function addComment(comment) {
    var objTo = document.getElementById('posted-comments')
    var divComment = document.createElement("div"); //create div to store comments
    var divDateTime = document.createElement("div"); //create div to store date/time of post
    var jobValue = document.getElementsByName('text-comment')[0].value //get comment text
    var nowDate = new Date();
    var date = (nowDate.getMonth() + 1) + '/' + nowDate.getDate() + '/' + nowDate.getFullYear();//date without time

    document.getElementsByName('text-comment')[0].value = "" //reset text box
    divComment.innerHTML = jobValue //inserting comment text into new div
    divDateTime.innerHTML = "Posted on: " + date//insert date in div
    divDateTime.id = 'post-date'//create an id for new div for css
    divComment.id = 'added-comment'
    divComment.appendChild(divDateTime)//inject posted date into new comment div
    objTo.appendChild(divComment) //add new div to parent div

}