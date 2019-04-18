require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var fs = require('fs');
var axios = require("axios")
var inquirer = require('inquirer');
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);
var random = "";
var omdb = "";
var omdbAPIKey = "128bfb02"
var action = process.argv[2];
var userInputArr = [];
for (var i = 3; i < process.argv.length; i++) 
{
	userInputArr.push(process.argv[i]);
}
var userInput = userInputArr.join(" ");

function switchFunction() 
{
    switch (action) 
    {
        case "spotify-this-song":
        spotifyThis(userInput);
        break;

        case "movie-this":
        movieThis(userInput);
        break;

        case "concert-this":
        concertThis(userInput);                  
        break;      
                      
        case "do-what-it-says":
        doWhatItSays();
        break;
  
    }
};


inquirer.prompt([
    /* Pass your questions in here */


  ])
  .then(answers => {
    // Use user feedback for... whatever!!


  });

//Spotify

function spotifyThis(userInput) 
{    
    if(userInput ==="")
    {
        userInput = "The sign";
    }

    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, response) 
    {
        if (err) 
        {
          return console.log('Error occurred: ' + err);
        }        
        console.log(`\n-----------------------------------------------\n`)
        console.log("Artist: " +response.tracks.items[0].artists[0].name);
        console.log("Album: " +response.tracks.items[0].album.name);
        console.log("Song: " +response.tracks.items[0].name);
        console.log("\nSong Preview ⬇︎");
        console.log(response.tracks.items[0].preview_url); 
        console.log("\nPlay song in Spotify ⬇︎");
        console.log( response.tracks.items[0].external_urls.spotify);
        console.log(`\n-----------------------------------------------\n`)
    });
};
    
// Omdb
  
function movieThis(userInput) 
{    
    if(userInput === "")
    {
        console.log("---------------------------------------------");
        console.log("⬇︎  If you haven't watched  Mr. Nobody, then you should:");
        console.log("http://www.imdb.com/title/tt0485947/"+ "\nIt's on Netflix!");
        userInput = "Mr.nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy").then(
    function(response) 
    {
        console.log("---------------------------------------------");
        console.log("Title: " + response.data.Title);
        console.log("Year Released: " + response.data.Year);
        console.log("Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country where the movie was produced: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Runtime: " + response.data.Runtime);
        console.log("Plot: " + response.data.Plot);
        console.log("\nActors: " + response.data.Actors);
        console.log("---------------------------------------------");
    });  
}

//Bands in Town

function concertThis(userInput) 
{
    if(userInput === "")
    {
       userInput = "red hot chilli peppers";
    } 
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
    .then(function(response) 
    {
        console.log("---------------------------------------------");
        console.log(userInput);
        console.log("Venue Name: " + response.data[1].venue.name);
        console.log("Vanue Location :" + response.data[1].venue.city);
        console.log("Date of Event: " + response.data[1].datetime);
        console.log("---------------------------------------------");
    });
}

function doWhatItSays()
{
   random = fs.readFileSync('random.txt', 'utf8');
   console.log(random);
   usersplit = random.split(",");
   userInput = usersplit.subtr(18, 1);
   console.log(userInput);

   spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, response) 
    {
        if (err) 
        {
          return console.log('Error occurred: ' + err);
        }        
        console.log(`\n-----------------------------------------------\n`)
        console.log("Artist: " +response.tracks.items[0].artists[0].name);
        console.log("Album: " +response.tracks.items[0].album.name);
        console.log("Song: " +response.tracks.items[0].name);
        console.log("\nSong Preview ⬇︎");
        console.log(response.tracks.items[0].preview_url); 
        console.log("\nPlay song in Spotify ⬇︎");
        console.log( response.tracks.items[0].external_urls.spotify);
        console.log(`\n-----------------------------------------------\n`)
    });
  
};

switchFunction();