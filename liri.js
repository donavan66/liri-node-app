require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var userInput = process.argv.slice(3).join(" ");
var command = process.argv[2];

if (command == "concert-this") {
    var URL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
    
    axios.get(URL).then(function(response) {
        var jsonData = response.data[0]
        
        var concertData = [
            "Venue: " + jsonData.venue.name,
            "Venue Location: " + jsonData.venue.city,
            "Date: " + moment(jsonData.venue.datetime, 'MM/DD/YYYY') //Not sure how the moment npm works
    ].join("\n\n")
    console.log(concertData);
});
}

else if (command == "spotify-this") {
spotify.search({
    type: 'track',
    query: userInput,
    limit: 5
}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  //console.log(data); 

  var jsonData = data.tracks.items

  for (var i = 0; i < jsonData.length; i++) {
         var albumObject = jsonData[i].album;
         var trackName = jsonData[i].name
         var preview = jsonData[i].preview_url
         var artistsInfo = albumObject.artists
         for (var j = 0; j < artistsInfo.length; j++) {
             console.log("Artist: " + artistsInfo[j].name)
             console.log("Song Name: " + trackName)
             console.log("Preview of Song: " + preview)
             console.log("Album Name: " + albumObject.name)
             console.log(" ")
    }
  }
  });
}

else if (command == "movie-this") {
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + userInput;
    axios.get(URL).then(function(response) {
        var jsonData = response.data

        movieData = [
            console.log("Title: " + jsonData.Title),
                    console.log("Release Year: " + jsonData.Year),
                    console.log("IMDB Rating: " + jsonData.imdbRating),
                    console.log("Country: " + jsonData.Country),
                    console.log("Language: " + jsonData.Language),
                    console.log("Plot: " + jsonData.Plot),
                    console.log("Actors: " + jsonData.Actors),
        ]
    });
}

else if (command == "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        var dataArr = data.split(',');
        // not sure how to run the node again with the txt document.
    });
}

else {
    console.log("Please enter a valid command")
}