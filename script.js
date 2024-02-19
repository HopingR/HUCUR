// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%', // Set player height
        width: '100%', // Set player width
        videoId: 'M7lc1UVf-VE',
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'autoplay': 0, // Autoplay the video
            'mute': 0, // Mute the video to avoid autoplay restrictions
            'rel': 0 // Disable related videos
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.setVolume(100); // Set volume to 100 (full volume)
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then pause.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(pauseVideo, 10000);
        done = true;
    }
}

function pauseVideo() {
    player.pauseVideo();
}

// Monitor click events on the container
var container = document.getElementById('container');
var clickCount = 0;
// Define the response sequence for the number of clicks
var responseSequence = [2, 5, 3, 1, 2, 4];
var index = 0;

container.addEventListener('click', function() {
    clickCount++;

    if (clickCount === responseSequence[index]) {
        alert("NUmber of clicks detected"+clickCount);
        player.playVideo(); // Play the video when three clicks are detected
        setTimeout(function() {
            pauseVideo();
        }, 10000); // Pause the video after 6 seconds
        clickCount = 0; // Reset click count after playing the video
        index++; //increement the index
    }
});