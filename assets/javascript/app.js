

var googleApiKey = 'AIzaSyAoSUvf9nkYuSYOhZbwtCjt1THHC9V0KGo'
var weatherApiKey = 'cf2aa58036825fe3fb68e07d959d4291'
var qYoutube;
var googleUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=' + qYoutube + '&type=video&videoEmbeddable=true&key=' + googleApiKey


var favorites = [];
var displayFavorites = false;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDw1SAMNRbUKK7ARIm2USyGr0zR7w4Us6g",
    authDomain: "bootcampproject1-e747f.firebaseapp.com",
    databaseURL: "https://bootcampproject1-e747f.firebaseio.com",
    projectId: "bootcampproject1-e747f",
    storageBucket: "bootcampproject1-e747f.appspot.com",
    messagingSenderId: "191372296763"
};

firebase.initializeApp(config);
// Initialize Done

var database = firebase.database();
var ref = database.ref("/users/")
var currentUid = null;
var signedIn = false;
var signinRefused = false;

$(document).ready(function () {

    signedIn = checkUserStatus()

    // firebase listener
    ref.on('value', function (snapshot) {
        if (signedIn) {
        }
    })


    // firebase listener to see when a user signs in or out
    firebase.auth().onAuthStateChanged(function (user) {
        // if user is signed in
        if (user) {
            signedIn = true;
            currentUid = user.uid;
            console.log(user.displayName + " is signed in as " + currentUid)
            updateUser();
            toggleDisplay();
            // if user is signed out
        } else {
            signedIn = false;
            signinRefused = false;
            currentUid = null;
            resetVariables();
            console.log('Not signed in')
        }
        updateLoginBtn();
    })

    //////////
    // TODO //

    // click event for musicVideo button - loads youtube video
    $('body').on('click', '.musicVideoBtn', function () {
        // get the text of the button (musicVideo name used for youtube search)
        var musicVideo = $(this).text();
        // get the event-id
        var videoID = $(this).attr('event-id')
        // use the event-id attr to select the videoDiv 
        var videoDiv = $('.video-output[event-id=' + videoID + ']')
        // set the youtube search to musicVideo plus music
        qYoutube = musicVideo + " official"
        // call youtube api with the div of where to display the video
        console.log(videoID)
        queryYoutube(videoDiv)
    })
    /////////////////////////////////////////////// TODO END 

    // click event for the search button
    // resets search textbox
    $('#search').on('focus', function () {
        $(this).val('');
    })
    // enter key for search
    $('#search').keypress(function (e) {
        var key = e.which;
        if (key === 13 && $('#search').val().length > 0) {
            $('#btnSearch').click()
        }
    })




    // login button click event
    $('#btnLogin').on('click', function () {
        if (signedIn) {
            firebase.auth().signOut();
        } else {
            $('#loginModal').modal();
        }

        updateLoginBtn();
    })



    // cancel click event for the modal
    $('.cancelLogin').on('click', function () {
        signinRefused = true;
    })

}) // end of document.ready


function resetVariables() {
}

// searches seatgeek api
function querySeatGeek() {
    $('#results').empty();
};




// searches youtube for a video with the music video, output it to videoDiv
function queryYoutube(videoDiv) {

    var url = getUrl('youtube');
    callApi(url).done(function (response) {
        // get the results
        var results = response.items;
        // get the video id from the results for the url
        var videoId = results[0].id.videoId;
        // set the embed url with the video id
        var videoUrl = 'https://www.youtube.com/embed/' + videoId;
        // create the video panel to contain the video
        var videoPanel = $('<div class="panel panel-default">');
        var iframeDiv = $('<div class="embed-responsive embed-responsive-16by9">');
        var videoEmbed = $('<iframe class="embed-responsive-item" allowfullscreen>')
            .attr({ src: videoUrl })
            .appendTo(iframeDiv);
        videoPanel.html(iframeDiv);
        videoDiv.html(videoPanel);
    });
};


// TODO FAVORITE BUTTON
// updates the favorite (star) button
function updateFavoriteBtn(thisBtn) {
    // start with an empty button
    thisBtn.empty();
    var videoID = $(thisBtn).attr("event-id");
    var favStar = $('<span class="glyphicon">');
    favStar.css('top', '-17px');

    // if it's not in favorites[], empty star otherwise filled star
    if (favorites.indexOf(videoID) < 0) {
        favStar.removeClass("glyphicon-star").addClass("glyphicon-star-empty")
    } else {
        favStar.removeClass("glyphicon-star-empty").addClass("glyphicon-star text-danger");
    };

    // add the updated star to the button
    $(thisBtn).append(favStar);
};



function checkUserStatus() {
    var user = firebase.auth().currentUser;
    if (user) {
        currentUid = user.uid;
        return true;
    } else {
        return false;
    }
}



// syncs the currentUser with the database, creates a user if it doesn't already exist
function updateUser() {
    // get the current user's data
    var userData = firebase.auth().currentUser;
    // update the database with the user data (except favorites)
    ref.child(currentUid).update({
        name: userData.displayName,
        email: userData.email,
        emailverified: userData.emailVerified,
        photoUrl: userData.photoURL,
        providerId: userData.providerData[0].providerId,
        providerUid: userData.providerData[0].uid,
    }).then(function () {
        // retrieve the newly updated user to see if they had any favorites stored
        ref.child(currentUid).once('value', function (snapshot) {
            userPhoto = snapshot.val().photoUrl
            // if the user had favorites stored, combine the local favorites array with the database favorites
            if (snapshot.val().favorites) {
                var databaseFavorites = snapshot.val().favorites;
                favorites = combineArrays(favorites.concat(databaseFavorites));
            };
            // update the database favorites with the favorites array
            ref.child(currentUid).update({ favorites: favorites });
        });
    });
};


// updates the "login/out" button based on user status
function updateLoginBtn() {
    if (signedIn) {
        if (firebase.auth().currentUser.providerData[0].providerId === 'google.com') {
            var userPhoto = firebase.auth().currentUser.photoURL;
            $('#profilePic').html('<img src="' + userPhoto + '" class="img-circle img-responsive" width="40" height="auto">')
        }
        $('#btnLogin').html("Sign Out")
    } else {
        $('#btnLogin').html("Sign In")
        $('#profilePic').empty();
    }
}


//TODO//
// toggles the page between displaying favorites or home
function toggleDisplay() {

    if (displayFavorites) {
        $('#navFavorites').addClass("active");
        $('#navHome').removeClass("active");
        $('#results').empty();
        $('#signin').empty();
        if (favorites.length > 0) {
        };

    } else {
        $('#navFavorites').removeClass("active");
        $('#navHome').addClass("active");
        $('#signin').empty();
        if (search.length === 0) {
            $('#results').empty;
        }
    };
};

