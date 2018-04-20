
$('#stay-in-submit').click(function(event){
    event.preventDefault();

    var movieGenre = $('#movie-genre-input').val().trim();
    console.log(movieGenre);
    var zipCode = $('#zipcode-input').val().trim();
    console.log(zipCode);
    $('#stay-in-submit').fadeOut().empty()
})
