var movies = ["Back To The Future", "Solo: A Star Wars Story", "Avengers Infinity War", "The Sound of Music", "COCO"];
var musicians = ["OK Go", "Bruno Mars", "Imagine Dragons", "Adele", "Green Day"];
var sportsTeams = ["Golden State Warriors", "Oakland Raiders", "San Francisco Giants", "Toronto Maple Leafs", "LA Galaxy"];


$(document).ready(function(){
    for(var i in movies){
        var movieButton = $("<button>").addClass("btn btn-primary btn-sm m-1 movie").html(movies[i]);
        $('#movieButtons').append(movieButton);
    }

    for(var i in musicians){
        var musicianButton = $("<button>").addClass("btn btn-success btn-sm m-1 musician").html(musicians[i]);
        $('#musicianButtons').append(musicianButton);
    }

    for(var i in sportsTeams){
        var sportsTeamButton = $("<button>").addClass("btn btn-danger btn-sm m-1 sportsTeam").html(sportsTeams[i]);
        $('#sportsTeamButtons').append(sportsTeamButton);
    }
    
    $('.movie, .musician, .sportsTeam').on('click', addGifs); 
    $(document).on('click', '.gif', playPauseGifs);


});

function addGifs (){
    var selection = $(this).text();
    console.log(selection);
    var gifURL = "http://api.giphy.com/v1/gifs/search?q="+selection+"&api_key=bq07u6AXsHP4sCiu6fbhkT6IVvpQsfbS&limit=4"
    var gifDiv = $(this).parent().next()
    gifDiv.empty(); // empties the Gifs div under the button div that is in respect to the button pressed
    var infoDiv = $(this).parent().next().next()
    infoDiv.empty(); //empties the Info div under the Gifs div that is in respect to the button pressed


    $.ajax({
        url: gifURL,
    }).then(function(response){
        console.log(response);
        for (var i in response.data){
            // var title = $("<h4>").html("Title: "+ response.data[i].title);
            // var newDiv = $("<div>").addClass("float-left");
            var newGif = $("<img>").addClass('gif').attr("src", response.data[i].images.fixed_height_small_still.url);
            newGif.attr({
                "data-still": response.data[i].images.fixed_height_small_still.url,
                "data-animate": response.data[i].images.fixed_height_small.url,
                "data-state": "still"
            });
            var rating = $("<h5>").html("Rating: " + response.data[i].rating);
        
            gifDiv.append(newGif, rating);
        }
    });
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