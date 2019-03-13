$(document).ready(function(){

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBsXeR0bRUHiC2ielaRcsSKThzQ-_RSs1U",
    authDomain: "train-tracker-if-you-dare.firebaseapp.com",
    databaseURL: "https://train-tracker-if-you-dare.firebaseio.com",
    projectId: "train-tracker-if-you-dare",
    storageBucket: "train-tracker-if-you-dare.appspot.com",
    messagingSenderId: "414487924542"
};
firebase.initializeApp(config);

let database = firebase.database();

    $("#submitButton").on("click", function(response){
        event.preventDefault();

        var trainName = $("#trainsName").val().trim();
        var destination = $("#desiredDestination").val().trim();
        var firstTime = $("#firstTrainTime").val().trim();
        var frequency = $("#trainFrequency").val().trim();
        
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
        });

        console.log(trainName);

        $("#trainsName").val("");
        $("#desiredDestination").val("");
        $("#firstTrainTime").val("");
        $("#trainFrequency").val("");

    });

    database.ref().on("child_added", function(snapshot){

        trainName = snapshot.val().trainName;
        destination = snapshot.val().destination;
        firstTime = snapshot.val().firstTime;
        frequency = snapshot.val().frequency;
    

    let programmaticTrain = $("<tr>");
    let trainNameCell = $("<td>" + trainName + "</td>");
    let destinationCell = $("<td>" + destination + "</td>");
    let firstTimeCell = $("<td>" + firstTime + "</td>");
    let frequencyCell = $("<td>" + frequency + "</td>");
    programmaticTrain.attr("id", "newTrain");
    trainNameCell.attr("id", trainName+"Name");
    destinationCell.attr("id", destination+"Name");
    firstTimeCell.attr("id", firstTime+"Name");
    frequencyCell.attr("id", frequency+"Name");
    programmaticTrain.append(trainNameCell);
    programmaticTrain.append(destinationCell);
    programmaticTrain.append(firstTimeCell);
    programmaticTrain.append(frequencyCell);
    $("#tbody").append(programmaticTrain);

    let firstTimeConverted = moment(firstTime, "HH:mm A").subtract(1, "years");
    let currentTime = moment();
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let tRemainder = diffTime % frequency;
    let minutesUntillTrain = frequency - tRemainder;
    let nextTrain = moment().add(minutesUntillTrain);
    nextTrain = nextTrain.format("hh:mm A");
    $("#minutesUntilTrain").text(nextTrain);
    let nextTrainCell = $("<td>" + nextTrain + "</td>");
    nextTrainCell.attr("id", nextTrain+"Name");
    programmaticTrain.append(nextTrainCell);
    $("#tbody").append(programmaticTrain);

    });
});