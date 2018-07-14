var config = {
    apiKey: "AIzaSyDVT5Gl7KDjUGmCFB6GNLzBahpKBMgUtSU",
    authDomain: "schedule-4165c.firebaseapp.com",
    databaseURL: "https://schedule-4165c.firebaseio.com",
    projectId: "schedule-4165c",
    storageBucket: "schedule-4165c.appspot.com",
    messagingSenderId: "228465042291"
};

firebase.initializeApp(config);

var trainRef = firebase.database();

var train = new Object();

//takes user input in the form and adds to database on submit
$("#submit").click(function (event) {
    event.preventDefault();
    train.name = $("#train-name").val();
    train.destination = $("#destination").val();
    train.first = $("#first-train").val();
    train.freq = $("#freq").val();
    trainRef.ref().push(train);
    console.log(train);
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#freq").val("");
})

//pulls train data from database for every child added to display and operate upon
trainRef.ref().on("child_added", function (childSnapshot, prevChildKey) {


//variables contain display info and First which is stored in database to operate on in order to display next arrival and minutes away
    var Name = childSnapshot.val().name;
    var Destination = childSnapshot.val().destination;
    var Frequency = childSnapshot.val().freq;
    var First = childSnapshot.val().first;

//variables take the first train input and convert the time into a seconds total   
    var start = First.split(":");
    var startHours = (start[0] * 3600);
    var startMin = (start[1] * 60);
    var startTot = startHours + startMin;

//uses moment function and converts current time into seconds total
    var nowHours = moment().hour();
    var nowMinutes = moment().minute();
    var NowTot = (nowHours * 3600) + (nowMinutes * 60);
    var freqTot = Frequency * 60;

    var Next = 0;
    var dis = 0;
    var till = 0;

    var n = 0;
    var x = 0;

//Function to figure out next trains arrival time in seconds
    function calcForwards(i) {
        while (x < NowTot) {
            n++;
            x = n * freqTot;
            Next = x
        }
    }

//Function to figure out how many minutes from now till next train
    function tillNext(a, b, c) {
        till = (a - b) / 60;
    }

//function to convert next train arrival time from seconds to a clock display    
    function calcNext(d, i) {
        d = Number(d, );
        if (Math.floor(d / 3600) > 12) {
            var h = (Math.floor(d / 3600)) - 12;
            var m = Math.floor(d % 3600 / 60);
            dis = h + ":" + m + "p.m.";
        } else {
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            dis = h + ":" + m
        }
    }

    calcForwards(Next);
    tillNext(Next, NowTot, till);
    calcNext(Next);

    console.log(childSnapshot.val());
    console.log("Now " + NowTot);
    console.log("Start " + startTot);
    console.log("Freq " + freqTot)
    console.log(till);
    console.log(dis)

//adds database information to display as table data in table rows
    $("#sched > tbody").append("<tr><td>" + Name + "</td><td>" + Destination + "</td><td>" +
        Frequency + "</td><td>" + dis + "</td><td>" + till + "</td></tr>"

    );

})