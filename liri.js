require("dotenv").config();

var keys = require('./keys.js')
var request = require("request")
var fs = require('fs')
var moment = require('moment')
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var command = process.argv[2];
var thing = "";
for (var i = 3; i < process.argv.length; i++) {

    if (i > 3 ) {
        thing = thing + " " + process.argv[i]
    }

    else { 
        thing += process.argv[i]
    }
}


if (command === "spotify-this-song") {
    spotifyThis(thing)
} else if (command === "concert-this") {
    concertThis(thing)
} else if (command === "movie-this") {
    movieThis(thing)
} else if (command === "do-what-it-says") {
     doThis(thing)
}


function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
        
        console.log(data);
        console.log(data.tracks.items[0].artists)
        var songArr = data.tracks.items
        songArr.forEach(function(song) {
            console.log("Song Name: " + song.name)
            console.log("Album: " + song.album.name)
            console.log("Artist: " + song.artists[0].name)
            console.log("Link: " + song.href)
            console.log("------------------------------")
        })

    });
}

function concertThis(artist) {
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error,response,body) {
        if (!error && response.statusCode === 200) {
            var artistArr = JSON.parse(body)
            artistArr.forEach(function(event) {
                console.log("Venue Name: " + event.venue.name)
                console.log("Location: " + event.venue.city + ", " + event.venue.region + " " + event.venue.country)
                console.log("Date: " + moment(event.datetime).format("MM/DD/YYYY"))
                console.log("------------------------------")
            })
        }
    })
}

function movieThis(movie) {
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (!error && response.statusCode === 200) {
            movieParse = JSON.parse(body)

            console.log("Movie Title: " + movieParse.Title)
            console.log("Release Year: " + movieParse.Year)
            console.log("iMDb Rating: " + movieParse.imdbRating)
            console.log(movieParse.Ratings[1].Source + " Rating: " + movieParse.Ratings[1].Value)
            console.log("Country: " + movieParse.Country)
            console.log("Language: " + movieParse.Language)
            console.log("Plot: " + movieParse.Plot)
            console.log("Actors: " + movieParse.Actors)

        }
    })
}

function doThis(thing) {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error)
        }

        console.log(data)

    })
}