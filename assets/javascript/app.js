//set variables for each form input

//   Initialize Firebase
var config = {
    apiKey: "AIzaSyDkrYPx14C6WS21_YBdw4Goob9G4YpXulA",
    authDomain: "fir-practice-592c7.firebaseapp.com",
    databaseURL: "https://fir-practice-592c7.firebaseio.com",
    projectId: "fir-practice-592c7",
    storageBucket: "fir-practice-592c7.appspot.com",
    messagingSenderId: "319103722711"
  };
  firebase.initializeApp(config);

  //reference to firebase database
  var database = firebase.database();

//write function for .on("click") of submit button
    $("#submit-info").on("click", function() {

        event.preventDefault(); //prevent page from reloading

        //get inputs from form
        var trainName = $("#train-name").val();
        console.log(trainName);
        var destination = $("#destination").val();
        console.log(destination);
        var firstTrain = $("#first-train").val().split(':');
        console.log(firstTrain);
        frequency = $("#frequency").val();
        console.log(frequency);

       //display time input in military time
        momentObj = moment("2018-04-02");
        momentObj.set({hours: firstTrain[0], minutes: firstTrain[1]});
        console.log(momentObj.format("HH:mm"));
        
        var firstTrainTime = momentObj.format("HH:mm A");

        //set object variable for new train
        var newTrain = {
            trainName: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        };
        console.log(newTrain);

        //push data to firebase
        firebase.database().ref().push(newTrain);

        //clear out input fields
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");

        //grab children from database
        database.ref().on("child_added", function(child) {
            console.log(child.val());

            var trainName = child.val().trainName;
            var destination = child.val().destination;
            var dataTrainTime = child.val().firstTrainTime;
            var frequency = child.val().frequency;
       

            //math to calculate when next train arrives relative to current time
            var currentTime = moment();
            var frequencyMinutes = moment().add(frequency, 'minutes');
            console.log(frequencyMinutes.format("MM/DD/YYYY HH:mm"));
            var waitTime = frequencyMinutes.subtract(currentTime);
            console.log(waitTime.format("HH:mm"));
            // var firstTrainConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
            // console.log("first converted: " + firstTrainConverted);
            var nextTrain = "";
            console.log(currentTime + " "+ dataTrainTime + "!!!!!!!____________________!!!!!!!!!");

//      var maxMoment = moment.max(moment(), firsttrainTime); 
//   // If the first train is later than the current time, sent arrival to the first train time
//   if (maxMoment === trainTime) {
//     tArrival = trainTime.format("hh:mm A");
//   } else {
//     // Calculate the minutes until arrival using hardcore math
//    // use . diff to find the difference between the first scheduled train time and the next basically
// }


            //show first train time if the current time is before the first train
            if (currentTime.isBefore(dataTrainTime, 'miliseconds')) {
                console.log("true");
                console.log(currentTime);
                console.log(dataTrainTime);
                var nextTrain = dataTrainTime;
            } else {
                var nextTrain = frequencyMinutes.format("HH:mm");
            };

            //add data to new table row
            var trainData = 
            "<tr><td>" + trainName + "</td><td>"
            + destination + "</td><td>"
            + firstTrainTime + "</td><td>"
            + "Every " + frequency + " minutes" + "</td><td>"
            + nextTrain + "</td></tr>"

            //append trainData to html
            $("#train-table").append(trainData);

        });

    }); //end on click function

   
    //.push(newTrain) to firebase.database().ref()

    //set function so that when it is hit, it will grab every single child from database and listen for any new ones you add

        //set variables to be the child.val() of each data point
        //add new data to a new table row
        //append new row of data to htl
    
