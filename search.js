$(document).ready(function(){
    $.ajax({
        url: "https://accounts.spotify.com/authorize",
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
});