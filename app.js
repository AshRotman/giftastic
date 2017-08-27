function addButton(event) {
  event.preventDefault();

  var movie = $('#person').val();

  $('.buttons').append('<button>' + movie + '</button>');
  $('#person').val('');
}


// Event listener for all button elements
  $("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var person = $(this).attr("data-person");
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=f0c7d67b7c134e2c92830fed909c09d6&limit=5";
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After the data comes back from the API
      .done(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(personImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });
  //adding buttom to DOM for new Gif's
  $('#submit').on('click', addButton);
