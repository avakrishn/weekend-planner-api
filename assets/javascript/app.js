var movies = ["Back To The Future", "Solo: A Star Wars Story", "Avengers Infinity War", "The Sound Of Music", "Zootopia"];
var musicians = ["OK Go", "Bruno Mars", "Imagine Dragons", "Adele", "Green Day"];
var sportsTeams = ["Golden State Warriors", "New England Patriots", "San Francisco Giants", "Toronto Maple Leafs", "LA Galaxy"];




function addButtons(){
    event.preventDefault();
    var userInput = $(this).prev().val().trim().toLowerCase(); // the prev method gets the immediate predecessor of the element in the DOM tree, in this case $(this) is the specific form button pressed and the .prev() method finds the input field that was just above the button pressed. (.prev() is similar to .next())
    if(userInput !== ""){
        if($(this).parent().attr('id') == "movieForm") //.parent() method gets the parent div that the element is nested in, in the DOM tree.
        {
            for(var i in movies){
                if (movies[i].toLowerCase() === userInput){
                    $(this).prev().val("");
                    return false;
                }   
            }
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
    $(this).prev().val("");
}


function addGifs (){
    var offset = $(this).attr('data-offset'); //keeps track of current value of data-offset of the button that was pressed
    var selection = $(this).text();
    console.log(selection);
    var gifURL = "https://api.giphy.com/v1/gifs/search?q="+selection+"&offset="+offset+"&api_key=bq07u6AXsHP4sCiu6fbhkT6IVvpQsfbS&limit=4"
    var gifDiv = $(this).parent().next()
    gifDiv.empty(); // empties the Gifs div under the button div that is in respect to the button pressed
    var infoDiv = $(this).parent().next().next()
    infoDiv.empty(); //empties the Info div under the Gifs div that is in respect to the button pressed


    $.ajax({
        url: gifURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (var i in response.data){
            // var title = $("<h4>").html("Title: "+ response.data[i].title);
            var newDiv = $("<div>").addClass("float-left m-2");
            var newGif = $("<img>").addClass('gif').attr("src", response.data[i].images.fixed_height_small_still.url);
            newGif.attr({
                "data-still": response.data[i].images.fixed_height_small_still.url,
                "data-animate": response.data[i].images.fixed_height_small.url,
                "data-state": "still",
            });
            var rating = $("<h5>").html("Rating: " + response.data[i].rating);
            newDiv.append(newGif, rating);
            gifDiv.append(newDiv);
        }
    });
    $(this).attr('data-offset', parseInt(offset)+4); //sets the data-offset value equal to the original data-offset value + 4 that is unique to the specific button
}



function playPauseGifs(){
    if($(this).attr("data-state") == "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate"); 
    }
    else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

function createButtons(){
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


$(window).ready(function(){
    createButtons();
    $('form button').on('click', addButtons);
});


$(document).on('click', '.gif', playPauseGifs);
$(document).on('click', '.movie, .musician, .sportsTeam', addGifs);