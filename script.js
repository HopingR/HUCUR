// Variables for the first video
var player1;
var clickCount1 = 0;
var responseSequence1 = [2, 3, 1, 4, 2, 5, 3, 1, 4, 2, 5, 3, 1, 4, 2, 5]; // Longer response sequence
var index1 = 0;
var playButton1 = document.getElementById('playButton1');

// Variables for the second video
var player2;
var clickCount2 = 0;
var responseSequence2 = [1, 4, 2, 3, 1, 5, 2, 3, 4, 5, 1, 2, 3, 4, 1, 5]; // Longer response sequence
var index2 = 0;
var playButton2 = document.getElementById('playButton2');

// This function creates an <iframe> (and YouTube player) after the API code downloads.
function onYouTubeIframeAPIReady() {
    // Create player for the first video
    player1 = new YT.Player('player1', {
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
            'onReady': onPlayerReady1,
            'onStateChange': onPlayerStateChange1
        }
    });

    // Create player for the second video
    player2 = new YT.Player('player2', {
        height: '100%', // Set player height
        width: '100%', // Set player width
        videoId: 'M7lc1UVf-VE', // Change the videoId for the second video
        playerVars: {
            'playsinline': 1,
            'controls': 0,
            'autoplay': 0, // Autoplay the video
            'mute': 0, // Mute the video to avoid autoplay restrictions
            'rel': 0 // Disable related videos
        },
        events: {
            'onReady': onPlayerReady2,
            'onStateChange': onPlayerStateChange2
        }
    });
}

// The API will call these functions when the video players are ready.
function onPlayerReady1(event) {
    event.target.setVolume(100); // Set volume to 100 (full volume)
}

function onPlayerReady2(event) {
    event.target.setVolume(100); // Set volume to 100 (full volume)
}

// The API calls these functions when the player's state changes.
function onPlayerStateChange1(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        disableButton(playButton2);
        setTimeout(function() {
            enableButton(playButton2);
        }, 60000); // Enable the button after 1 minute (60000 milliseconds)
    }

    // Check if the video has ended
    if (event.data == YT.PlayerState.ENDED && index1 < responseSequence1.length) {
        // Restart the video from the beginning
        player1.seekTo(0);
        player1.playVideo();
    }
}

function onPlayerStateChange2(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        disableButton(playButton1);
        setTimeout(function() {
            enableButton(playButton1);
        }, 60000); // Enable the button after 1 minute (60000 milliseconds)
    }

    // Check if the video has ended
    if (event.data == YT.PlayerState.ENDED && index2 < responseSequence2.length) {
        // Restart the video from the beginning
        player2.seekTo(0);
        player2.playVideo();
    }
}

function disableButton(button) {
    button.disabled = true;
}

function enableButton(button) {
    button.disabled = false;
}

// Monitor click events on the play buttons for both videos
playButton1.addEventListener('click', function() {
    clickCount1++;

    if (clickCount1 === responseSequence1[index1]) {
        alert("Number of clicks for Video 1 detected: " + clickCount1);
        player1.playVideo(); // Play the first video when the response sequence is met
        setTimeout(function() {
            pauseVideo(player1);
        }, 60000); // Pause the video after 1 minute (60000 milliseconds)
        clickCount1 = 0; // Reset click count after playing the video
        index1++; // Increment the index for the first video
    }
});

playButton2.addEventListener('click', function() {
    clickCount2++;

    if (clickCount2 === responseSequence2[index2]) {
        alert("Number of clicks for Video 2 detected: " + clickCount2);
        player2.playVideo(); // Play the second video when the response sequence is met
        setTimeout(function() {
            pauseVideo(player2);
        }, 60000); // Pause the video after 1 minute (60000 milliseconds)
        clickCount2 = 0; // Reset click count after playing the video
        index2++; // Increment the index for the second video
    }
});

function pauseVideo(player) {
    player.pauseVideo();
}

// Update the HTML content with the response sequences for each video
document.getElementById('responseSequence1').innerHTML = "Response Sequence for Video 1: " + responseSequence1.join(", ");
document.getElementById('responseSequence2').innerHTML = "Response Sequence for Video 2: " + responseSequence2.join(", ");
