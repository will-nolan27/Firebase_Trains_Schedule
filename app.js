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

var train= new Object();

$("#submit").click(function(event){
    event.preventDefault();
    train.name=$("#train-name").val();
    train.destination=$("#destination").val();
    train.first=$("#first-train").val();
    train.freq=$("#freq").val();
    trainRef.ref().push(train);
    console.log(train);
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#freq").val("");
})

trainRef.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    var Name = childSnapshot.val().name;
    var Destination = childSnapshot.val().destination;
    var Frequency = childSnapshot.val().freq;
    var First = childSnapshot.val().first;
    
    var start = First.split(":");
    var startHours = (start[0]*3600);
    var startMin = (start[1]*60);
    var startTot = startHours+startMin;


    var nowHours= moment().hour();
    var nowMinutes= moment().minute();
    var NowTot=(nowHours*3600)+(nowMinutes*60);

    var freqTot= Frequency*60;
    
    
    
    console.log("Now " + NowTot);
    console.log("Start " + startTot);
    console.log("Freq " + freqTot);
   
        var n = 0;
        var x = 0;
    function calcForwards(i){
      
        while (x < startTot) {
          n++;
          x = n*freqTot;
        }
       console.log(n)
    };
 
 calcForwards();
   // function calcBackwards(){
//
   // }


   
   
    var trainTime ;
    var tMinutes;
    var tArrival;
    
    


    $("#sched > tbody").append("<tr><td>" + Name + "</td><td>" + Destination + "</td><td>" +
    Frequency + "</td><td>" + Arrival + "</td><td>" + Minutes + "</td></tr>"
    
);

})