var showtime, theaters, movies, filteredShowtimes = []
var theatersObj = {}, 
    moviesObj = {}

function handleGoingOutClick(e) {
    e.preventDefault(); 
    console.log(e)



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

        // console.log("HTTP Request Succeeded: " + jqXHR.status);
        // console.log(data);
        var cities = data.cities[0].id  
        // console.log(cities)
        
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
            // console.log(data)
            theaters = data.cinemas;
            movies = data.movies;
            showtime = data.showtimes;
            
            // console.log("showtime:", showtime)
            // console.log("movies:", movies)
            movies.forEach(function(movie){
                moviesObj[movie.id] = [movie.title, movie.poster_image_thumbnail]
            })
            theaters.forEach(function(theater){
                theatersObj[theater.id] = [theater.name]  
            })

            showtime.forEach(function(show){
                let placeHolderArr = []
                placeHolderArr.push(theatersObj[show.cinema_id][0])
                placeHolderArr.push(moviesObj[show.movie_id])
                placeHolderArr.push(show.start_at)
                filteredShowtimes.push(placeHolderArr)
            })
            console.log(filteredShowtimes)


            // console.log("moviesObj",moviesObj)
            // console.log("theatersObj:", theatersObj)

         



            var allInfo = {}

            filteredShowtimes.forEach(function(movieInfo) {
              if (!movieInfo[1]) {
                return
              }

              var theaterName = movieInfo[0]
              allInfo[theaterName] = allInfo[theaterName] || {}

              var movieName = movieInfo[1]
              allInfo[theaterName][movieName[0]] = allInfo[theaterName][movieName] || {}

              var showtimes = movieInfo[2]

              allInfo[theaterName][movieName[0]][showtimes] = showtimes || {}

            // console.log('theater name: ', theaterName)
            // console.log('movie name: ', movieName)
            // console.log('showtimes: ', showtimes)

            }) 

            // console.log('newObject: ', allInfo) 
            for (var key in allInfo) {
                // var theatersInfo = key

                // const $container = $('<div>');
                const $theater = $('<p>').css({'font-size': '25px'});
                $theater.text(key);

                for (let movie in key ) {
                    const $movie = $('<p>').css({'font-size': '18px'});
                    $movie.text(key[movie]);
                    $movie.insertAfter($theater);
                }

                $("#content-holder2").append($theater);
                
                
                
                
                // console.log('theater name: ', key )
                //   console.log('movies: ', allInfo[key])
                //   console.log('showtimes: ', allInfo[key[2]])
                
            }     
            
            $("#resultsHeader").append('<p>Theaters</p>').css({'font-size': '35px', 'font-weight':'bold'})

            $("#content-holder2").append('<a href="votinginput.html">Go to Vote Page!</a>')

            var theaterImg = "https://screenrant.com/wp-content/uploads/2018/03/Movie-theater.jpg"

            var div= $("<img>").addClass("img-responsive").css({"width": '800px', "height":'350px'});
            div.attr('src', theaterImg)
            $('#image').append(div)


            


            // const showings is an array of arrays containing all showtimes for a given theater 
            // const showings = theaters.map(function(theater) {
            //     return showtimes.filter(function(showtime) {
            //         return showtime.cinema_id === theater.id;
            //     });
            // });



            // moviesAtTheaters is an array of arrays containing each movie and all of its showtimes for each theater. problem is how to display movie and corresponding showtimes without duplicating the movie name over and over!!!  
            // const moviesAtTheaters = theaters.map(function(theater) {
            //     return movies.map(function(movie) {
            //         return showtimes.filter(function(showtime) {
            //             return showtime.movie_id === movie.id && showtime.cinema_id === theater.id;
            //         });
            //     });
            // });

            

            // we are looping thru all movies at each theater and retrieving only the movie_id of each movie. goal is to loop thru showtimes and filter by movie_id 
            // const movieIdsLis = moviesAtTheaters.map(function(movies) {
            //     if(!movies.length) return
            //     movies.map(function(movie){
            //         if(!movie[0]) return 
            //         return movie[0].movie_id
            //     });
            // });


            // how do we "flatten" this to become an array of objects rather array of an array of objects? too many arrays makes it hard to grab data needed
            // console.log(movieIdsLis)
            // const movieTitles = movieIdsLis.map(function(movieIds) {
            //     console.log("movieIds", movieIds)
            //     movieIds.map(function(id) {
            //         console.log("id", id)
            //         movies.filter(function(movie) {
            //             console.log("movie", movie)
            //             return movie.id === id
            //         });
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

            $(".forms").hide()

        });


        // how do we associate a movie with a showtime while associating that movie with a theater? api is stuctured to only show movies times at each theater but doesnt allow us to organize by movie. showtimes endpoint return all movies, all theaters,and all showtimes in vacinity of user's location. but how do we pull off the each movie name and its showtimes?
        
        
        
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("HTTP Request Failed", jqXHR, textStatus, errorThrown);
    })
}


$("#go-out-movies #submit1").on("click", handleGoingOutClick)   

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