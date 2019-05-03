// Declaring API args as variables for easy change of functionality if needed:
var ytApiKey = 'AIzaSyAj8kAwFIr6JwF0Mj_Q5ZfyPspNQqLIDfY';
var resultType = 'video';

function ytsearch(userSearch) {
    // Takes context of calling object
    // Replace spaces in names with "%20"
    userSearch = userSearch.replace(/ /g,"%20");
    
    let queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet";

    // Append type filter to restrict search to video results only (eg, no channels, playlists, etc)
    queryURL += "&type=";
    queryURL += resultType;
    
    // Append user search string
    queryURL += "&q=";
    queryURL += userSearch + "%20official";
    
    // Append unique API key created for project
    queryURL += "&key=";
    queryURL += ytApiKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    
        // Outputs Video Search Results
        $("#search-results").empty();
        for(let i=0; i<response.items.length; i++){
            
            let videoURL = "https://www.youtube.com/embed/" + response.items[i].id.videoId;

            let newCard = $("<div>").attr({
                "class": "card video-link col-3",
                "data-video-url": videoURL,
                "data-toggle": "modal",
                "data-target": "#exampleModal",
                "style": "display:inline-block"
            });

            let newImg = $("<img>").attr({
                "class": "card-img-top",
                "src": response.items[i].snippet.thumbnails.medium.url,
                "alt": "Card image cap"
            });

            let newCardBody = $("<div>").addClass("card-body");
            let newP = $("<p>").addClass("card-text").text(response.items[i].snippet.title);

            newP.appendTo(newCardBody);
            newCard.append(newImg);
            newCard.append(newCardBody);
            newCard.appendTo("#search-results");
        }
    
        $(".video-link").on("click", function(){
            // Get URL for video of clicked element
            let url = $(this).attr("data-video-url");
            // Place video url into hidden modal element
            $("#ytplayer").attr("src", url);
        }); 
    });
}

$("#video-search").keypress(function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        let search = $(this).val().trim();
        ytsearch(search);
        getArtistInfo(search);
        getArtistPhoto(search);
    }
});