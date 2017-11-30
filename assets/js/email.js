function sendEmail(){

    //collect users message and open email template
    var body = document.getElementById("message").value;

    window.open('mailto:jamesmart77@gmail.com?body=' + body);

    alert("Apologies for the email pop up...still working on getting this functionality finalized!\nThanks for your understanding.")
}