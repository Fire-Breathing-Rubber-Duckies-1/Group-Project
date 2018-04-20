var apiKey = "93635545f1df3e7c0d3f30734cd346fd"
//var userChoice = Whatever data the user chooses 
var URL = "https://api.themoviedb.org/3/search/movie?api_key=93635545f1df3e7c0d3f30734cd346fd" + "&query=" + movieGenre + "&language=en-US" + "&maxlength=5"
$.ajax({
  url: URL,
  method: "GET"
}).then(function(response){
  
  for (i = 0; i < 5; i++) {
      $("#movie").prepend("<div id=movie holder> <h1>Title: <span id=title></span> </h1> <h2>Plot:<span id=plot></span> </h2><h3>Poster:<span id=img></span></h3></div>")
      var title = response.results[i].title
      $("#title").text(title)
      var plot = response.results[i].overview
      $("#plot").text(plot)
      var poster = response.results[i].poster_path
      //var posterPage = "https://image.tmdb.org/t/p/w500/" + poster;
      //$("#img").html("<a href =" + posterPage + "/a>")
      $('<img/>').attr({
      src: "https://image.tmdb.org/t/p/w500/" + poster
      }).prependTo($('<a />').attr({
      href: "https://image.tmdb.org/t/p/w500/" + poster
      }).prependTo($('#img')));
     
  }
});
//choices for genre
//Action, Adventure, Animation, Comedy, Crime, Documentary, Drama, Family, Fantasy, History, Horror, Music, Mystery, Romance
//Science Fiction, TV movie, thriller, war, western

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyBexNmapKolINtyUFngltIb-2vlLWB3H4w",
    authDomain: "class-pr.firebaseapp.com",
    databaseURL: "https://class-pr.firebaseio.com",
    projectId: "class-pr",
    storageBucket: "",
    messagingSenderId: "583763053083"
  };
  firebase.initializeApp(config);
  //Create vriable to reference database
  var database = firebase.database();
  //Initial Value of counters
  var yesStart = 0;
  var noStart = 0;
  //Counter variables set equal to intial value
  var yes = yesStart;
  var no = noStart;
  //At load of page get current data
  //When the user clicks a button 
  $('#Yes').on("click", function(){
    //Add one to yes counter
    if(!yes){
      yes = 0;
    }
    yes ++;
    //Create limit for counter
    if (yes === 20){
      console.log("Too many votes");
      yes = 0;
    }
    //Save new value to firebase
    database.ref().push({
      yes
    });
    
    //Log value of yes counter
    console.log(yes);
  });
  //When the user clicks a button 
  $('#No').on("click", function(){
    //Add one to yes counter
    if(!no){
      no = 0;
    }
    no ++;
    //Create limit for counter
    if (no === 20){
      console.log("Too many votes");
      no = 0;
    }
    //Save new value to firebase
    database.ref().push({
      no
    });
    
    //Log value of yes counter
    console.log(no);
  });
  database.ref().on('value', function(snapshot){
    //Console log out value
    console.log(snapshot.val());
    //Change value of of yes and no to match database
    yes = snapshot.val().yes;
    no = snapshot.val().no;
    //Update HTML
    $('#results').text("Thumbs Up: " + snapshot.val().yes + " Thumbs Down: " + snapshot.val().no);
    //It erros
  }, function(errorObject){
    console.log("Failed" + errorObject.code);
  });
  
