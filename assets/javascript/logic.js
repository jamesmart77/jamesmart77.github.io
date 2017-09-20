// When the factButton is clicked...
// $("#factButton").on("click", function() {
// 	// We generate a random number between 0 and 4 (the number of facts in the jamesFactArray)
// 	var factNum = Math.floor((Math.random() * jamesFactArray.length));
// 	// We display the fact from the jamesFactArray that is in the random position we just generated.
// 	$("#factText").text(jamesFactArray[factNum])
// })

/*------------------------------------*/
 
function nextImage(element){
	//assign html element id
    var img = document.getElementById(element);

    for(var i = 0; i < imgArray.length;i++)
    {	
		//loop through until current fact image is found
        if(imgArray[i].src == img.src)
        {
            if(i == imgArray.length-2 || i == 7 ){//if last photo is the one showing in browser, start over. Never go to question pic
				document.getElementById(element).src = imgArray[0].src;
				$("#factText").text(jamesFactArray[0])
                break;
			}
			//if not last image, go to next image and statement
			document.getElementById(element).src = imgArray[i+1].src;//fact image
			$("#factText").text(jamesFactArray[i+1])//fact statements
            break;
        }
    }
}

// This array holds all of James's facts!
var fact0 = "I <3 coding!!"
var fact1 = "Need two thumbs up? Almost every morning that is what you will get when I come bouncing in to the office. It's good to be able to work :)"
var fact2 = "I would be happy to facilitate a discussion!"
var fact3 = "Smiling is fun - tehe!"
var fact4 = "I take my work seriously and providing value is important. Let's move forward together!"
var fact5 = "Trusting relationships are important, especially on your team."
var fact6 = "I will never underestimate the value or importance of good coffee...Technology runs on Dunkin'."
var jamesFactArray = [fact0, fact1, fact2, fact3, fact4, fact5, fact6]

// When the next pic button is pressed...
var imgArray = new Array();

imgArray[0] = new Image();
imgArray[0].src = 'assets/images/coding.png';

imgArray[1] = new Image();
imgArray[1].src = 'assets/images/twothumbs.png';

imgArray[2] = new Image();
imgArray[2].src = 'assets/images/realtalk.png';

imgArray[3] = new Image();
imgArray[3].src = 'assets/images/profile.jpg';

imgArray[4] = new Image();
imgArray[4].src = 'assets/images/move_fwd.png';

imgArray[5] = new Image();
imgArray[5].src = 'assets/images/team.png';

imgArray[6] = new Image();
imgArray[6].src = 'assets/images/coffee.png';

imgArray[7] = new Image();
imgArray[7].src = 'assets/images/questionmark.png';

