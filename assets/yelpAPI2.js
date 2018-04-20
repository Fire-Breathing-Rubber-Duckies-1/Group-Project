   $("#submit2").on('click', function(event) {
   event.preventDefault()

    let token = "Bearer Fb_cwVKg4ODNzdtxziO3Yj6NC_RnW498C6_Tk1svho-TzraerxvKIGBfymZfR-3kE8jpYqic6l6cp2shLrkNypGr0H0XV_ghVNqfSy_Wo7QqRN_iR-w-6LZYn6vWWnYx"

    let search = "https://api.yelp.com/v3/businesses/search"
    let corsAnywhere = "https://cors-anywhere.herokuapp.com/"
    var zip = $("#zip").val()
    var term = $("#type").val()
    search = corsAnywhere + search
    console.log(search)

    let requestObj = {
      url: search,
      data: {term: term, location: zip},
      headers: {'Authorization': token},
      error: function(j, textStatus, errorThrown) {
        console.log(`Ajax => ${j}, textStatus => ${textStatus}, errorThrown => ${errorThrown}`)
      }
    }

    $.ajax(requestObj)
    .done(
      function(response){
        console.log(response)

        $("#resultsHeader").prepend('<p>Resturants</p>').css({'font-size': '35px', 'font-weight':'bold'})
        $("#content-holder2").prepend('<a href="votinginput.html">Go to Vote Page!</a>')


        for (var i = 0; i < response.businesses.length; i++) {

            $("#content-holder2").prepend('<div> <span id="info"> </span><span id="info2"> </span><span id="info3"> </span> </div><br>');

            var url = response.businesses[i].url

            var namme = response.businesses[i].name

            
            var namer = $('<a href="' + url + '"> ' + namme + ' </a>');
            var rating = $("<div>").append(response.businesses[i].rating)
            var phone = $("<div>").append(response.businesses[i].phone)
            
            $("#info").append(namer).css({'font-size': '25px'})
            $("#info2").append("Rating: ", rating).css({'font-size': '25px'})
            $("#info3").append("Phone: ", phone).css({'font-size': '25px'})
            
            var img = response.businesses[i].image_url

            var div = $("<img>").css({width:'200px', height:'200px', display: 'block'})
            div.attr('src', img)
            div.addClass("vote")
            div.attr("Data-State", "unclicked")
            console.log(div)
    
            $("#info").append(div)

            $(".forms").hide()

            
            
            
            
        }
    })

   })