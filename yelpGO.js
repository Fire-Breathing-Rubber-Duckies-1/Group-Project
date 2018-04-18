<<<<<<< HEAD
   $("#submit2").on('click', function(event) {
   event.preventDefault()

    let token = "Bearer Fb_cwVKg4ODNzdtxziO3Yj6NC_RnW498C6_Tk1svho-TzraerxvKIGBfymZfR-3kE8jpYqic6l6cp2shLrkNypGr0H0XV_ghVNqfSy_Wo7QqRN_iR-w-6LZYn6vWWnYx"
=======
   $( document ).ready(function() {
   
    let token = "Bearer XCKbzZHW8v3vXJbl2iouO9IGz2IhnrLPb6_UHmjkLy_QIk2P5w5UIqvK-0CNM7OzLvYbP1rbccFC9tWTzVY5YKc-PpHAA55bllNwVhSzWi47ndPnK8F1-MprbBPQWnYx"
>>>>>>> 02264ced7e8b8347719ed46565e9ce3dcdf2a0b2
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
        
        for (var i = 0; i < response.businesses.length; i++) {

            $("#content-holder").prepend('<div> <h1> <span id="info"> </span> <h1> </div>');

            var url = response.businesses[i].url
<<<<<<< HEAD
            var namme = response.businesses[i].name
=======
            var namme = response.businesse[i].name
>>>>>>> 02264ced7e8b8347719ed46565e9ce3dcdf2a0b2
            
            var namer = $('<a href="' + url + '"> ' + namme + ' </a>');
            var rating = $("<div>").append(response.businesses[i].rating)
            var phone = $("<div>").append(response.businesses[i].phone)
            
            $("#info").append(namer)
            $("#info").append(rating)
            $("#info").append(phone)
            
            var img = response.businesses[i].image_url

            var div = $("<img>")
            div.attr('src', img)
            div.addClass("vote")
            div.attr("Data-State", "unclicked")
            console.log(div)
    
            $("#info").append(div)
            
            
            
            
        }
    })

   })