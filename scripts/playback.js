// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player1, player2, player3;
var index1 = 0, index2 = 0, index3 = 0;
var clickCount1 = 0, clickCount2 = 0, clickCount3 = 0;
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var playtime;
var totalSessionTime;
var videoIds = [];
var videoTitles =[];
var responseSequence1, responseSequence2, responseSequence3;

// Keep track of session time
var sessionStartTime = Date.now();
var sessionTimer;

// Retrieve selected video information from sessionStorage
const selectedVideos = JSON.parse(sessionStorage.getItem('selectedVideos'));
if (selectedVideos && selectedVideos.length >= 3) {
    // Extracting values from selected videos
    selectedVideos.slice(0, 3).forEach((video, index) => {
        videoIds.push(video.url);
        videoTitles.push(video.title);
        switch (index) {
            case 0:
                responseSequence1 = video.responseSequence;
                //responseSequence1 = Array.isArray(video.responseSequence) ? video.responseSequence : JSON.parse(video.responseSequence);
                //alert(typeof responseSequence1);
                break;
            case 1:
                responseSequence2 = video.responseSequence;
                //responseSequence2 = Array.isArray(video.responseSequence) ? video.responseSequence : JSON.parse(video.responseSequence);
                //alert(typeof responseSequence2);
                break;
            case 2:
                responseSequence3 = video.responseSequence;
                //responseSequence3 = Array.isArray(video.responseSequence) ? video.responseSequence : JSON.parse(video.responseSequence);
                //alert(typeof responseSequence3);
                break;
        }
    });
}

// Retrieve assessment data from sessionStorage
const assessmentData = JSON.parse(sessionStorage.getItem('assessmentData'));
if (assessmentData) {
    playtime = assessmentData.playTime*1000 || 60000; // default 60 seconds or 1 minute if not found
    totalSessionTime = assessmentData.sessionTime*1000 || 120000; // default 2 minutes if not found
}
//alert(videoIds);
var response_sequnece1 = JSON.parse("[" + responseSequence1 + "]");
var response_sequnece2 = JSON.parse("[" + responseSequence2 + "]");
var response_sequnece3 = JSON.parse("[" + responseSequence3 + "]");
//alert(response_sequnece1);
//alert(response_sequnece2);
//alert(response_sequnece3);
//alert(videoTitles);

document.getElementById('title1').innerHTML = `<h2 class="text-center">${videoTitles[0]}</h2>`;
document.getElementById('title2').innerHTML = `<h2 class="text-center">${videoTitles[1]}</h2>`;
document.getElementById('title3').innerHTML = `<h2 class="text-center">${videoTitles[2]}</h2>`;

document.getElementById('responseSequence1').innerHTML = `<p>Response Sequence 1: ${response_sequnece1}</p>`;
document.getElementById('responseSequence2').innerHTML = `<p>Response Sequence 2: ${response_sequnece2}</p>`;
document.getElementById('responseSequence3').innerHTML = `<p>Response Sequence 3: ${response_sequnece3}</p>`;


//document.getElementById('title1').innerHTML = '${videoTitles[0]}';
//document.getElementById('title2').innerHTML = '${videoTitles[1]}';
//document.getElementById('title3').innerHTML = '${videoTitles[2]}';
// Redirect to result page after session timeout
sessionTimer = setTimeout(function () {
    window.location.href = "result.html";
}, totalSessionTime);

function disableOtherButtons(btn) {
    if (btn === btn1) {
        btn2.disabled = true;
        btn3.disabled = true;
    } else if (btn === btn2) {
        btn1.disabled = true;
        btn3.disabled = true;
    } else if (btn === btn3) {
        btn1.disabled = true;
        btn2.disabled = true;
    }
}

btn1.addEventListener('click', function () {
    clickCount1++;

    // Adjusting index based on response sequence
    if (clickCount1 === response_sequnece1[index1]) {
        alert("Number of clicks detected for video 1: " + clickCount1);
        player1.playVideo();
        setTimeout(function () {
            pauseVideo(player1);
            btn2.disabled = false;
            btn3.disabled = false;
        }, playtime);
        disableOtherButtons(btn1);
        clickCount1 = 0;
        index1++;
    }
});

btn2.addEventListener('click', function () {
    clickCount2++;

    if (clickCount2 === response_sequnece2[index2]) {
        alert("Number of clicks detected for video 2: " + clickCount2);
        player2.playVideo();
        setTimeout(function () {
            pauseVideo(player2);
            btn1.disabled = false;
            btn3.disabled = false;
        }, playtime);
        disableOtherButtons(btn2);
        clickCount2 = 0;
        index2++;
    }
});

btn3.addEventListener('click', function () {
    clickCount3++;

    if (clickCount3 === response_sequnece3[index3]) {
        alert("Number of clicks detected for video 3: " + clickCount3);
        player3.playVideo();
        setTimeout(function () {
            pauseVideo(player3);
            btn1.disabled = false;
            btn2.disabled = false;
        }, playtime);
        disableOtherButtons(btn3);
        clickCount3 = 0;
        index3++;
    }
});

function onYouTubeIframeAPIReady() {
    // Creating players dynamically based on the retrieved video IDs
    for (let i = 0; i < videoIds.length; i++) {
        window['player' + (i + 1)] = new YT.Player('player' + (i + 1), {
            height: '100%', // Set player height
            width: '100%', // Set player width
            videoId: videoIds[i], // Video ID from selected videos
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
}

function onPlayerReady(event) {
    event.target.setVolume(100); // Set volume to 100 (full volume)
}

var done1 = false, done2 = false, done3 = false;

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done1) {
        setTimeout(pauseVideo, playtime, player1);
        done1 = true;
    }

    if (event.data == YT.PlayerState.PLAYING && !done2) {
        setTimeout(pauseVideo, playtime, player2);
        done2 = true;
    }

    if (event.data == YT.PlayerState.PLAYING && !done3) {
        setTimeout(pauseVideo, playtime, player3);
        done3 = true;
    }
}

function pauseVideo(player) {
    player.pauseVideo();
}
