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
    // Replace Spaces with URL friendly char encoding
    artistName = artistName.replace(/ /g,"%20");
    
    // Query Builder
    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=";
    queryURL += artistName;
    queryURL += "&api_key=";
    queryURL += api_key;
    queryURL += "&format=json";
    
    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.artist.image[2]["#text"]);
        return response;
    });
}

function getAlbumTracks(artistName, albumName) {

    // Query Builder
    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=";
    queryURL += api_key;
    queryURL += "&artist=";
    
    // Replace Spaces with URL friendly char encoding
    artistName = artistName.replace(/ /g,"%20");
    queryURL += artistName;
    queryURL += "&album=";
    
    // Replace Spaces with URL friendly char encoding
    albumName = albumName.replace(/ /g,"%20");
    queryURL += albumName;
    queryURL += "&format=json";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for(let i=0; i<response.album.tracks.track.length; i++){
            console.log(response.album.tracks.track[i].name);
        }
    });
}

function getTrackInfo(artistName, trackName) {

}