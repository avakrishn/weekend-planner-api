//global variables
var movies = ["Back To The Future", "Solo: A Star Wars Story", "Avengers Infinity War", "The Sound Of Music", "Zootopia"];
var musicians = ["OK Go", "Bruno Mars", "Imagine Dragons", "Adele", "Green Day"];
var sportsTeams = ["Golden State Warriors", "Philadelphia Eagles", "Houston Astros", "Washington Capitals", "Toronto FC"];



function addButtons(){
    var userInput = $(this).prev().val().trim().toLowerCase(); // the prev method gets the immediate predecessor of the element in the DOM tree, in this case $(this) is the specific form button pressed and the .prev() method finds the input field that was just above the button pressed. (.prev() is similar to .next())
    if(userInput !== ""){
        if($(this).parent().attr('id') == "movieForm") //.parent() method gets the parent div that the element is nested in, in the DOM tree.
        {
            for(var i in movies){
                if (movies[i].toLowerCase() === userInput){ //toLowerCase will make it easier to compare if movies array already has the movie that the user entered
                    $(this).prev().val("");
                    return false; // will return false and will stop the progression through function if movies array already has the movie that the user entered
                }   
            }
            // new movie button is created for the movie the user entered (not calling the createButtons function to iterate over all values in the array inorder to preserve the offset number that is an attribute of each button)
            movies.push(userInput);
            var movieButton = $("<button>").addClass("btn btn-primary btn-sm m-1 movie").html(userInput);
            movieButton.attr('data-offset', 0);
            $('#movieButtons').append(movieButton);
        }
        else if($(this).parent().attr('id') == "musicianForm")
        {
            for(var i in musicians){
                if (musicians[i].toLowerCase() === userInput){
                    $(this).prev().val("");
                    return false;
                }   
            }
            musicians.push(userInput);
            var musicianButton = $("<button>").addClass("btn btn-success btn-sm m-1 movie").html(userInput);
            musicianButton.attr('data-offset', 0);
            $('#musicianButtons').append(musicianButton);
        }
        else
        {
            for(var i in sportsTeams){
                if (sportsTeams[i].toLowerCase() === userInput){
                    $(this).prev().val("");
                    return false;
                }   
            }
            sportsTeams.push(userInput);
            var sportsTeamButton = $("<button>").addClass("btn btn-danger btn-sm m-1 movie").html(userInput);
            sportsTeamButton.attr('data-offset', 0);
            $('#sportsTeamButtons').append(sportsTeamButton);
        }
    }
    $(this).prev().val(""); //clears the input text field
}


function addGifs (){
    var offset = $(this).attr('data-offset'); //keeps track of current value of data-offset of the button that was pressed
    var selection = $(this).text();
    console.log(selection);
    var gifURL = "https://api.giphy.com/v1/gifs/search?q="+selection+"&offset="+offset+"&api_key=bq07u6AXsHP4sCiu6fbhkT6IVvpQsfbS&limit=10" //offset will offset the gifs returned by a certain number; gifs are limited to 10 for each query
    var gifDiv = $(this).parent().next().next(); //depending on if in movie, musician, or sports Team sections, $(this).parent will referece the respective movieButtons, musicianButtons, or sportsTeamButtons div and .next().next() will reference the respective the movieGifs, musicianGifs, or sportsTeamGifs div
    gifDiv.empty(); // empties the Gifs div under the button div that is in respect to the button pressed
    var infoDiv = $(this).parent().next().next().next(); //reference the respective Info div depending on if in movie, musician, or sport Teams section
    infoDiv.empty(); //empties the Info div under the Gifs div that is in respect to the button pressed

    // Querying GIPHY API with request
    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function(response){ //response is data in the form of JSON object recieved from API
        // console.log(response);
        for (var i in response.data){
            // var title = $("<h4>").html("Title: "+ response.data[i].title);
            var newDiv = $("<div>").addClass("gifDiv m-1");
            var newGif = $("<img>").addClass('gif').attr("src", response.data[i].images.fixed_height_still.url); //using object keys to select specific value in JSON object
            newGif.attr({ //creating new data attributes to keep track of animate or still state that will be used in another function to change the state based on when the user clicks on the div
                "data-still": response.data[i].images.fixed_height_still.url,
                "data-animate": response.data[i].images.fixed_height.url,
                "data-state": "still",
            });
            var rating = $("<h5>").html("Rating: " + response.data[i].rating); //rating for each gif
            rating.addClass("gifRating");
            var favorite = $("<span>").html('<i class="far fa-heart"></i>').addClass('gifFavorite').css('color', 'white');
            favorite.attr("data-favorite", "no");
            newDiv.append(newGif, rating, favorite); //appends gif, rating, and favorite to div
            gifDiv.append(newDiv); // appends the div to the page
        }
    });
    $(this).attr('data-offset', parseInt(offset)+10); //sets the data-offset value equal to the original data-offset value + 4 that is unique to the specific button
}



function playPauseGifs(){
    $('.gifRating, .gifFavorite').hide(); //hide the rating when the user clicks the gif
    
    if($(this).attr("data-state") == "still"){ //if the current state of gif is still on user click then changes state to animate by changing image src
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate"); 
    }
    else{ //if the current state of gif is animate on user click then changes state to still by changing image src
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

function addFavorites(){
    debugger;
    if($(this).attr("data-favorite") == "yes"){
        // $(this).html('<i class="far fa-heart"></i>').css('color', 'white');
        $(this).parent().remove();
    }
    else{
        $(this).html('<i class="fas fa-heart"></i>').css('color', 'red');
        $(this).attr("data-favorite", "yes").addClass('keep');
        $('.keep').parent().appendTo($(this).parent().parent().prev());
    } 
}

function createButtons(){ //creates buttons that are in the respective arrays and is called on page load
    for(var i in movies){
        var movieButton = $("<button>").addClass("btn btn-primary btn-sm m-1 movie").html(movies[i]);
        movieButton.attr('data-offset', 0); // gives the button a unique data attribute, 'data-offset' whose value will increase by 4 every time the button is pressed and the value will be used when querying the API inorder to display new gifs to user each time the button is pressed.
        $('#movieButtons').append(movieButton);
    }

    for(var i in musicians){
        var musicianButton = $("<button>").addClass("btn btn-success btn-sm m-1 musician").html(musicians[i]);
        musicianButton.attr('data-offset', 0);
        $('#musicianButtons').append(musicianButton);
    }

    for(var i in sportsTeams){
        var sportsTeamButton = $("<button>").addClass("btn btn-danger btn-sm m-1 sportsTeam").html(sportsTeams[i]);
        sportsTeamButton.attr('data-offset', 0);
        $('#sportsTeamButtons').append(sportsTeamButton);
    }
}


$(window).ready(function(){ //when the window is ready create buttons from the respective global variable arrays and on button (inside the form) click, execute addButtons function
    createButtons();
    $('form button').on('click touchstart', addButtons);
    $('form').submit(function(e){
        e.preventDefault(); //need to prevent the form from autosubmitting and refreshing page
        $('form button').click(); // when user hits enter/return to submit the form then the click event is triggered for the button in the form which is attached to the addButtons function; cannot just run addButtons here because addButtons is associated with a specific form button click event
    });
});


$(document).on('click touchstart', '.gif', playPauseGifs); //executes the playPauseGifs function when .gif is clicked
$(document).on('click touchstart', '.movie, .musician, .sportsTeam', addGifs); //executes the addGifs function when either .movie, .musician, or .sportsTeam is clicked
$(document).on('mouseenter','.gifDiv', function(){ //when mouse enters the div containing the gif then the rating will be diplayed
    $('.gifRating, .gifFavorite').show();

});
$(document).on('mouseleave','.gifDiv', function(){ // when mouse leavs the div containing the gif then the rating will be hidden
    $('.gifRating, .gifFavorite').hide();

});

$(document).on('click touchstart', '.gifFavorite', addFavorites);