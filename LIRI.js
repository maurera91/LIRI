require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const command = process.argv[2]
const query = process.argv.slice(3).join(" ");
const fs = require("fs");

var spotify = new Spotify({
    id: "36a5f65e53d74f6a904d4ecbda91b990",
    secret: "198547b3ed104bff9af737d30d548031"
})

var LIRI = function(command,query){
    console.log("-------------------------------------")
    if (command =="concert-this"){
        axios.get(`http://rest.bandsintown.com/artists/${query}/events&key=codingbootcamp.trilogy`).then(
            function(response){
                console.log(`${response.data.venue.city}, ${response.data.venue.region}`);
                console.log(moment(response.data.datetime).format("MM/DD/YYYY"));
            }
        )
    }
    else if (command=="spotify-this-song"){
        spotify.search({type: "track", query: query}).then(function(response){
            
            console.log(`Artist: ${response.tracks.items[0].album.artists[0].name}`);
            console.log(`Song Name: ${response.tracks.items[0].name}`);
            console.log(`Album Name: ${response.tracks.items[0].album.name}`);
            console.log(`Preview Link: ${response.tracks.items[0].external_urls.spotify}`)
            console.log("-------------------------------------")
            

        }).catch(function(err){
            console.log(err);
        });


    }
    else if (command=="movie-this"){
        axios.get(`http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=${"trilogy"}`).then(
            function(response){
                console.log(`Title: ${response.data.Title}`);
                console.log(`Date Released: ${response.data.Released}`);
                console.log(`IMDB rating: ${response.data.imdbRating}`);
                console.log(`Rotten Tomatoes: ${response.data.Ratings[1].Value}`);
                console.log(`Country: ${response.data.Country}`);
                console.log(`Language: ${response.data.Language}`);
                console.log(`Plot: ${response.data.Plot}`);
                console.log(`Actors: ${response.data.Actors}`);
                console.log("-------------------------------------")
            }
        );

    }
    else if (command=="do-what-it-says"){
        fs.readFile("random.txt", "utf8", function(error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
            let dataArr = data.split(",");
        
            if (dataArr[0] == "do-what-it-says"){
                console.log("ah ah ah, no infinite loop for you!");
            }
            else{
                LIRI(dataArr[0],dataArr[1]);
            }
        
        });

    }
    else{
         console.log("Not a Command!\nCommands:\nconcert-this\nspotify-this-song\nmovie-this\ndo-what-it-says")
     }
     
}
LIRI(command,query);