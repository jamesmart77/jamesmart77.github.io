var trivia = {
    rounds: [
        //round 1
        { //classic rock
            questions: ["What was one of its previous names before this new wave band settled on 'The Cars'?",
                "What was Guns N' Roses debut album in 1987?",
                "Name the Journey album released in 1981 with numerous hits including `Don't Stop Believin`."
            ],
            //round answer options
            options: [{
                    choices: ["Cap'n Swing", "Down n' Dirty", "The Cocktails", "Sound Garden"]
                }, //question 1 choices
                {
                    choices: ["Chinese Democracy", "G N' R Lies", "Appetite for Destruction", "The Civil War"]
                }, //question 2 choices
                {
                    choices: ["Infinity", "Escape", "Separate Ways", "Faithfully"]
                } //question 3 choices
            ],
            answers: ["Cap'n Swing", "Appetite for Destruction", "Escape"],
            answerImages: ["capNSwing.jpg", "gnrAppetite4Destruction.jpg", "Escape.jpg"],
            answerAudio:["justWhatINeeded.mp3","welcomeToTheJungle.mp3","dontStopBelievin.mp3"]

        },
        //round 2
        { //vanity
            questions: ["What was the original title for 'The Breakfast Club?",
                "Which famous actor's cameo as Elliot's principal was cut in 'E.T. the Extra Terrestrial'? ",
                "How old was Eddy Murphy when Beverly Hills Cop was released?"
            ],
            //round answer options --> one around per question
            options: [{
                    choices: ["High School Sucks", "Incarceration", "High School: A Confused Adolescence", "Detention"]
                },
                {
                    choices: ["Dan Aykroyd", "Ed Harris", "Harrison Ford", "Denzel Washington"]
                },
                {
                    choices: ["30", "26", "40", "23"]
                }
            ],
            answers: ["Detention", "Harrison Ford", "23"],
            answerImages: ["breakfastClub.jpg", "harrisonFord.jpg", "eddyMurphy.jpg"]
        },
        //round 3
        { //politics
            questions: ["When was the first assassination attempt made on President Reagan?",
                "Who became the new Soviet Union leader in 1985?",
                "Where was the peaceful protest of Chinese students held in 1989?"
            ],
            //round answer options --> one around per question
            options: [{
                    choices: ["First week in office", "70 days in", "On 180th day", "Christmas Eve, 1981"]
                },
                {
                    choices: ["Mikhail Gorbachev", "Joseph Stalin", "Sarajevo Yugo", "Nikolaus Barbie"]
                },
                {
                    choices: ["Emperor's Garden", "Tokyo Center", "Shanghai", "Tiananmen Square"]
                }
            ],
            answers: ["70 days in","Mikhail Gorbachev","Tiananmen Square"],
            answerImages: ["ronaldReagan.jpg","mikhail.jpg","Tiananmen.jpg"]
        }
    ],
    //set initial values
    currentRound: 0,
    roundTopics: ["Music", "Movies", "Politics"],
    currentQuestion: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    timeRemaining: 30,
}