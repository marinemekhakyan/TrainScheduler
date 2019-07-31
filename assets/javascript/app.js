//firebase project credentials

var firebaseConfig = {
    apiKey: "AIzaSyCqHu5QWNuKtXsu5QJOO_chkuwagAYJEok",
    authDomain: "train-scheduler-701a0.firebaseapp.com",
    databaseURL: "https://train-scheduler-701a0.firebaseio.com",
    projectId: "train-scheduler-701a0",
    storageBucket: "",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//Button for adding trains

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //getting user input

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: firstTrain,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    // Logging everything to console

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    //Clearing boxes

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");


    //Storing new info on Firebase

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Storing everything into a variable.

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    // Train Info
    console.log("Name " + trainName);
    console.log("Destination " + trainDestination);
    console.log("Time " + firstTrain);
    console.log("Frequency " + trainFrequency);

    // Calculations

    var frequency = parseInt(frequency);

    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));

    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("Difference in time: " + diffTime);

    var remainingTime = diffTime % trainFrequency;
    console.log("Remaining time" + remainingTime);

    var minutesAway = trainFrequency - remainingTime;
    console.log(minutesAway + " minutes away");

    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("Next Arrival: " + moment(nextTrain).format("HH:mm A"));


    //appending all new trains to new rows 

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesAway),
    );


    $("#train-table > tbody").append(newRow);
});