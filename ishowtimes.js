function handleGoingOutClick(e) {
    console.log(e)
    e.preventDefault(); 



    var userCity = $("#citySearch").val();
    var encodedCity = encodeURIComponent(userCity);

    let CitiesEndpointCall =  "https://api.internationalshowtimes.com/v4/cities" + "?query=" + encodedCity


    let corsAnywhere = "https://cors-anywhere.herokuapp.com/"
    const searchCities = corsAnywhere + CitiesEndpointCall

    // first ajax call to retrieve id of users city
    $.ajax({ 
        crossDomain: true,
        url: searchCities,
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
        var cities = data.cities[0].id  
        console.log(cities)
        
        var cityId = data.cities[0].id

        let cinemasEnpointCall = "https://api.internationalshowtimes.com/v4/showtimes"
        // second ajax call 
        $.ajax({
            crossDomain: true,
            url: corsAnywhere + cinemasEnpointCall,
            type: "GET",
            data: {
                "city_ids": cityId,
                "countries": "US",
                "append": "movies,cinemas"
            },
            headers: {
                "X-API-Key": "qLMKjfTytA0M5PlmBcicTlcUjgFVLxyM",
            }
        }).done(function(data, textStatus, jqXHR) {
            const theaters = data.cinemas;
            const movies = data.movies;
            const showtimes = data.showtimes;
            console.log(data)
            

            for (var i = 0; i < theaters.length; i++) {
                var g = $('<h3>')
                g.text(theaters[i].name)
                $("#content-holder").append(g)

            }
             // const showings is an array of arrays containing all showtimes for a given theater 
            // const showings = theaters.map(function(theater) {
            //     return showtimes.filter(function(showtime) {
            //         return showtime.cinema_id === theater.id;
            //     });
            // });








            // const playings = showings.map(function(showing) {
            //     console.log(showing)
                // return showing.map(function(show) {
                //     return movies.filter(function(movie) {
                //         return show.movie_id === movie.id
                //     });
                // });
            // });

            // console.log(showings);
            // console.log(moviesAtTheaters);
            $("#citySearch").val("")

        });

        // how do we associate a movie with a showtime while associating that movie with a theater? api is stuctured to only show movies times at each theater but doesnt allow us to organize by movie. showtimes endpoint return all movies, all theaters,and all showtimes in vacinity of user's location. but how do we pull off the each movie name and its showtimes?
        
        
        
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed", jqXHR, textStatus, errorThrown);
    })
}


$("#go-out-choices #submit").on("click", handleGoingOutClick)  

// OLD CODE BELOW------------------------

    // $.ajax({
    //     crossDomain: true,
    //     url: corsAnywhere + cinemasEnpointCall,
    //     type: "GET",
    //     data: {
    //         "countries": "US",
    //     },
    //     headers: {
    //         "X-API-Key": "qLMKjfTytA0M5PlmBcicTlcUjgFVLxyM",
    //     },
    // }).done(function(data, textStatus, jqXHR){
    //     console.log(data)
    
    //     for (var i = 0; i < data.cinemas.length; i++) {
    
    //         var cinemaId = data.cinemas[i].id
    //         var today = '2018-04-14T00:15:00-19:00'
    
    //         let showtimesEndpointCall = "https://api.internationalshowtimes.com/v4/showtimes/?" + "cinema_id=" + cinemaId + "&time_from=" + today + "&time_to=" + today
    
    
    //         $.ajax({
    //             crossDomain: true,
    //             url: corsAnywhere + showtimesEndpointCall,
    //             type: "GET",
    //             data: {
    //                 "countries": "US",
    //             },
    //             headers: {
    //                 "X-API-Key": "qLMKjfTytA0M5PlmBcicTlcUjgFVLxyM",
    //             },
    //         }).done(function(data, textStatus, jqXHR){
    //             console.log(data)
    
    //             for (var i = 0; i < data.showtimes.length; i++) {
    //                 var g = $('<div id="movies">')
    //                 var showtimes = data.showtimes[i].start_at
    //                 $("#movies").append(showtimes)
    //                 $("#content-holder").append(g)
    //             }
    //             console.log(showtimes)
    //         })
    
    //     }
    
    
    // })