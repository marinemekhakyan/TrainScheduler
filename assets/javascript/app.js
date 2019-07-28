// Steps to complete:

//
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

var firebaseConfig = {
    apiKey: "AIzaSyCqHu5QWNuKtXsu5QJOO_chkuwagAYJEok",
    authDomain: "train-scheduler-701a0.firebaseapp.com",
    databaseURL: "https://train-scheduler-701a0.firebaseio.com",
    projectId: "train-scheduler-701a0",
    storageBucket: "",
    messagingSenderId: "938460995827",
    appId: "1:938460995827:web:3d739664c55b6e5f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//Button for adding trains

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //get user input

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim().format("hh:mm:ss");
    var trainFrequency = $("#frequency-input").val().trim().format("mm:ss");
})

var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: firstTrain,
    frequency: trainFrequency
};

database.ref().push(newTrain);

// Logs everything to console
console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.first);
console.log(newTrain.frequency);

alert("Train successfully added");

//clears boxes

$("#train-name-input").val("");
$("#destination-input").val("");
$("#first-train-input").val("");
$("#frequency-input").val("");

//stores new info on Firebase

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);


var firstTrainTime = moment.unix(firstTrain).format("hh:mm:ss");
var nextTrain = moment().diff(moment(firstTrain, "mm:ss"), "minutes");
    console.log(nextTrain);




});