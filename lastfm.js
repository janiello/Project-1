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
        console.log(response.artist.image[2]["#text"]);
        return response;
    });
}

function getAlbumTracks(artistName, albumName) {
    
    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=";
    queryURL += api_key;
    queryURL += "&artist=";
    artistName = artistName.replace(/ /g,"%20");
    queryURL += artistName;
    queryURL += "&album=";
    albumName = albumName.replace(/ /g,"%20");
    queryURL += albumName;
    queryURL += "&format=json";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        let newList = $("<ol>");
        for(let i=0; i<response.album.tracks.track.length; i++){
            console.log(response.album.tracks.track[i].name);
            let newItem = $("<li>").text(response.album.tracks.track[i].name);
            newList.append(newItem);
        }
        return newList;
    });
}

function getTopTracks() {
    // Number of tracks to fetch
    let limit = 20;

    // Query Builder
    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks";
    queryURL += "&limit=";
    queryURL += limit;
    queryURL += "&api_key="
    queryURL += api_key;
    queryURL += "&format=json";

    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.tracks.track);
        let newList = $("<ol>");
        for(let i=0; i<response.tracks.track.length; i++) {
            console.log(
                i+1 + '. ' + response.tracks.track[i].artist.name + ' - ' + response.tracks.track[i].name   
            );
            let newItem = $("<li>").text(response.tracks.track[i]);
            newList.append(newItem);
        }
        $("#top-tracks").append(newList);
    });
}

function getTopArtists() {
    // Number of artists to fetch
    let limit = 10;
    
    // Query Builder
    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists";
    queryURL += "&limit=";
    queryURL += limit;
    queryURL += "&api_key="
    queryURL += api_key;
    queryURL += "&format=json";

    // AJAX call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response.artists.artist);
        let newList = $("<ol>");
        for(let i=0; i<response.artists.artist.length; i++) {
            let newItem = $("<li>")
            let newSpan = $("<span>")
                .attr({
                    "class": "artist",
                    "data-artist": response.artists.artist[i].name
                })
                .text(response.artists.artist[i].name);
            newItem.append(newSpan);
            newList.append(newItem);
        }
        $("#top-artists").append(newList);

        $(".artist").on("click", function(){
            console.log($(this).attr("data-artist"));
        });
    });
}