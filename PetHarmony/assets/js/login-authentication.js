var config = {
    apiKey: "AIzaSyBdvzDGVlb8w6es6yBOacj8n7TTkvVmoCA",
    authDomain: "group-project-1-8353f.firebaseapp.com",
    databaseURL: "https://group-project-1-8353f.firebaseio.com",
    projectId: "group-project-1-8353f",
    storageBucket: "group-project-1-8353f.appspot.com",
    messagingSenderId: "653234238699"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

$(document).ready(function () {
    var userLoggedIn = localStorage.getItem("userLoggedIn");

    // Get elements

    const txtEmail = $("#txtEmail");
    const txtPassword = $("#txtPassword");
    const btnLogin = $("#btnLogin");
    const btnSignUp = $("#btnSignUp");
    const btnLogout = $("#btnLogout");
    const btnGoogle = $("#btnGoogle");

    // add login event
    $("#btnLogin").on("click", e => {
        // Get email and passwork
        const email = txtEmail.val().trim();
        const pass = txtPassword.val().trim();
        const auth = firebase.auth();
        if ((email == "") || (pass == "")) {
            return false;
        }
        // if (pass == promise) {
        //     $("#txtPassword").empty();
        // }
        //Sign Up
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => $("#auth-text").html(e.message));

        // if (e.message) {
        //     $("#auth-text").html("The password is invalid or the user does not have a password.");
        // }
    });
    // Add signup event
    $("#btnSignUp").on("click", e => {
        // TODO: Check for real email
        const email = txtEmail.val().trim();
        const pass = txtPassword.val().trim();
        const auth = firebase.auth();
        if ((email == "") || (pass == "")) {
            return false;
        }
        //Sign Up
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // signout
    $("#btnLogout").on("click", e => {
        firebase.auth().signOut();
        window.location.href = "index.html";
        localStorage.setItem("userLoggedIn", false);
        localStorage.clear();
    });

    // add a realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
            // btnLogout.show();

            if (window.location.href.indexOf("home-page.html") == -1 && !userLoggedIn) {
                localStorage.setItem("userLoggedIn", true);
                window.location.href = "home-page.html";
            }
        } else {
            // $("#auth-text").html("Sign Up or Login to find your purrrfect pet!");
            console.log('not logged in');
            btnLogout.hide();
            // window.location.href = "https://ehulseman.github.io/Group-Project-1/index.html";
        }
    });

})

function OAuthSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();

    console.log("button")
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        window.location.href = "home-page.html";
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

}