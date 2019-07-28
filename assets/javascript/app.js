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
    var firstTrain = $("#first-train-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

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

        // Stores everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().first;
        var trainFrequency = childSnapshot.val().frequency;

        // Train Info
        console.log(trainName);
        console.log(trainDestination);
        console.log(firstTrain);
        console.log(trainFrequency);

        // Calculations

        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
        console.log(firstTrainConverted);

        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        console.log("Difference in time: " + diffTime);

        var remainingTime = diffTime % trainFrequency;
        console.log(remainingTime);

        var minutesAway = trainFrequency - remainingTime;
        console.log("Minutes Away: " + minutesAway);

        var nextTrain = moment().add(minutesAway, "minutes");
        console.log("Next Arrival: " + moment(nextTrain).format("hh:mm"));


        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesAway),
        );


        $("#train-table > tbody").append(newRow);
    });

});