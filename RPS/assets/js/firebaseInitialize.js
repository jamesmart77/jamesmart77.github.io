// Initialize Firebase
var config = {
    apiKey: "AIzaSyBeUfmcYXZiY1LTrWHhpBrlGv8qlaetAFI",
    authDomain: "rps-multiplayer-e6c3b.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-e6c3b.firebaseio.com",
    projectId: "rps-multiplayer-e6c3b",
    storageBucket: "",
    messagingSenderId: "1082800212245"
};
firebase.initializeApp(config);

var database = firebase.database();
var isInitialLoad = true;