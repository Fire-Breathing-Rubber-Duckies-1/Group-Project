// Initialize Firebase
var config = {
    apiKey: "AIzaSyA5HkhNBExfgLpx6aWdPaVY35MSHY-xqKQ",
    authDomain: "group-project-6b248.firebaseapp.com",
    databaseURL: "https://group-project-6b248.firebaseio.com",
    projectId: "group-project-6b248",
    storageBucket: "group-project-6b248.appspot.com",
    messagingSenderId: "666687498662"
  };
  firebase.initializeApp(config);

  var database = firebase.database()
  var ref = database.ref()

  function handleStayingOutClick(e) {
    e.preventDefault();


    // var movieApi = "qLMKjfTytA0M5PlmBcicTlcUjgFVLxyM"

    // var movieURL= "https://api.internationalshowtimes.com/v4/cinemas/" 

    

    let token = "qLMKjfTytA0M5PlmBcicTlcUjgFVLxyM"
    let search = "https://api.internationalshowtimes.com/v4/cinemas/"
    let corsAnywhere = "https://cors-anywhere.herokuapp.com/"
    var zip= $("#zip").val()
    var delivery= $("#type").val()
    search = corsAnywhere + search
    console.log(search)


//     let requestObj = {
//       url: search,
//       data: {term: 'cinemas', location: '94132'},
//       headers: {'Authorization': token},
//       error: function(j, textStatus, errorThrown) {
//         console.log(`Ajax => ${j}, textStatus => ${textStatus}, errorThrown => ${errorThrown}`)
//       }
//     }
//     $.ajax(requestObj)
//     .done(
//       function(response){
//         console.log(response)

}
let search = "https://api.internationalshowtimes.com/v4/movies/"
let corsAnywhere = "https://cors-anywhere.herokuapp.com/"
search = corsAnywhere + search

$.ajax({
    crossDomain: true,
    url: search,
    type: "GET",
    data: {
        "countries": "US",
    },
    headers: {
        "X-API-Key": "qLMKjfTytA0M5PlmBcicTlcUjgFVLxyM",
    },
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed", jqXHR, textStatus, errorThrown);
})


// $("#out").on("click", handleStayingOutClick) 