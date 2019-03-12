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
let trainName = "";
let destination = "";
let firstTime = "";
let frequency = 0;

$("#submitButton").on("click", function(response){
    event.preventDefault();
    
    database.ref().set({
        trainName: trainName,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
    });

    trainName = $("#trainName").val().trim();
    destination = $("#desiredDestination").val().trim();
    firstTime = $("#firstTrainTime").val().trim();
    frequency = $("#frequency").val().trim();

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

})
});