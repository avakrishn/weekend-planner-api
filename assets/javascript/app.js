var movies = ["Back To The Future", "The Godfather", "Avengers Infinity War", "The Sound of Music", "It’s a Wonderful Life"];
var musicians = ["Panic! At the Disco", "Childish Gambino", "Imagine Dragons", "Beyonce","Ed Sheeran"];
var sportsTeams = ["Golden State Warriors", "Philadelphia Eagles", "San Francisco Giants", "Toronto Maple Leafs", "LA Galaxy"];

$(document).ready(function(){
    for(var i in movies){
        var movieButton = $("<button>").addClass("btn btn-primary btn-sm m-1").html(movies[i]);
        $('#movieButtons').append(movieButton);
    }

    for(var i in musicians){
        var musicianButton = $("<button>").addClass("btn btn-success btn-sm m-1").html(musicians[i]);
        $('#musicianButtons').append(musicianButton);
    }

    for(var i in sportsTeams){
        var sportsTeamButton = $("<button>").addClass("btn btn-danger btn-sm m-1").html(sportsTeams[i]);
        $('#sportsTeamButtons').append(sportsTeamButton);
    }

});
