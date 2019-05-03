var api_key = "84a97eeb2d1c42b946ac60b243be2b7c";

// Click handler for generated list of artists
$("#topTracks").on("click", function (event) {
    // event.preventDefault();
    alert("top tracks search");
    $("#artist-name").text($(this).attr("data-artist"));
    getArtistPhoto($(this).attr("data-artist"));
    getArtistInfo($(this).attr("data-artist"));
});

// ===================================
function getArtistInfo(artistName) {
    
    // Takes context of calling object
    // artistName = $(this).attr("data-artist");

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
        $("#artist-bio").html(response.artist.bio.summary);
    });
}
// ===================================
function getArtistPhoto(artistName) {

    // Takes context of calling object
    // artistName = $(this).attr("data-artist");

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
        // console.log(response.artist.image[2]["#text"]);
        $("#artist-photo").attr("src", response.artist.image[2]["#text"]);
    });
}

// function getAlbumTracks(artistName, albumName) {
    
//     let queryURL = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=";
//     queryURL += api_key;
//     queryURL += "&artist=";
//     artistName = artistName.replace(/ /g,"%20");
//     queryURL += artistName;
//     queryURL += "&album=";
//     albumName = albumName.replace(/ /g,"%20");
//     queryURL += albumName;
//     queryURL += "&format=json";

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         let newList = $("<ol>");
//         for(let i=0; i<response.album.tracks.track.length; i++){
//             console.log(response.album.tracks.track[i].name);
//             let newItem = $("<li>").text(response.album.tracks.track[i].name);
//             newList.append(newItem);
//         }
//         return newList;
//     });
// }

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
            
            let newItem = $("<li>");
            
            // Artist Name
            let newArtist = $("<span>").addClass("artist").attr("data-artist", response.tracks.track[i].artist.name);
            newArtist.html("<strong>" + response.tracks.track[i].artist.name + "</strong>");
            newItem.append(newArtist);

            // Track Name
            let newTrack = $("<span>").addClass("track");
            newTrack.text(' - "' + response.tracks.track[i].name + '"');
            newItem.append(newTrack);
            
            // Append newly build item to list
            newList.append(newItem);
        }

        // Append list to DOM
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
        let newList = $("<ol>");

            // Loop to generate list of top artists
            for(let i=0; i<response.artists.artist.length; i++) {
                let artistName = response.artists.artist[i].name;
                let newItem = $("<li>")
                let newSpan = $("<span>")
                    .attr({
                        "class": "artist",
                        "data-artist": artistName
                    })
                    .text(artistName.toString());
            newItem.append(newSpan);
            newList.append(newItem);
        }
        // Appending newList to DOM
        $("#top-artists").append(newList);

        // Click handler for generated list of artists
        $("#topArtists").on("click", function(){
            alert("top artist search");
            $("#artist-name").text($(this).attr("data-artist"));
            getArtistPhoto($(this).attr("data-artist"));
            getArtistInfo($(this).attr("data-artist"));
        });
    });
}