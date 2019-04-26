// API Key variable
var api_key = "84a97eeb2d1c42b946ac60b243be2b7c";

function getArtistInfo(artistName) {
    // Replace spaces in names with "%20"
    artistName = artistName.replace(/ /g,"%20");
    
    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=";
    queryURL += artistName;
    queryURL += "&api_key=";
    queryURL += api_key;
    queryURL += "&format=json";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.artist.bio.summary);
        return response;
    });
}

function getArtistPhoto(artistName) {
    // Replace spaces in names with "%20"
    artistName = artistName.replace(/ /g,"%20");
    
    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=";
    queryURL += artistName;
    queryURL += "&api_key=";
    queryURL += api_key;
    queryURL += "&format=json";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.artist.image[2]);
        return response;
    });
}

function getAlbumInfo(artistName, albumName) {
    $.ajax({
        url: apiArtistAlbumURL(artistName, albumName),
        method: "GET"
    }).then(function(response) {
        console.log(response.artist.bio.summary);
    });
}

function getTrackInfo(artistName, trackName) {

}