require("dotenv").config();
const keys = require("./key.js");
const axios = require("axios");
const Spotify = require("node-spotify-api");
const command = process.argv[2]
const query = process.argv[3];
const fs = require("fs");

var spotify = new Spotify({
    id: "36a5f65e53d74f6a904d4ecbda91b990",
    secret: "198547b3ed104bff9af737d30d548031"
})

var LIRI = function(command,query){
    if (command =="concert-this"){
        axios.get(`http://rest.bandsintown.com/artists/${query}/events`).then(
            function(response){
                console.log(response.venue.name);
                console.log(`${response.venue.city}, ${response.venue.region}`);
                console.log(moment(response.datetime).format("MM/DD/YYYY"));
            }
        )
    }
    if (command=="spotify-this-song"){
        spotify.search({type: "track", query: query}).then(function(response){
            console.log(response)
        }).catch(function(err){
            console.log(err);
        });


    }
    if (command=="movie-this"){
        axios.get(`http://www.omdbapi.com/?t=${query}&y=&plot=short&apikey=${keys.OMDB.key}`).then(
            function(response){
                console.log(response);
            }
        );

    }
    if (process.argv[2]=="do-what-it-says"){
        fs.readFile("movies.txt", "utf8", function(error, data) {

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