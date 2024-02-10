document.addEventListener('DOMContentLoaded', function () {
    getCookies();

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        let title = document.getElementById('video_title').value;
        let url = document.getElementById('video_url').value;
        let responseSequence = document.getElementById('response_sequence').value.split(',').map(Number);

        if (title === "" || url === "" || responseSequence.some(isNaN)) {
            alert("Please enter all the fields and ensure response sequence contains only comma-separated integers");
        } else {
            addCookie(title, url, responseSequence);
        }
    });

    document.getElementById('deleteBtn').addEventListener('click', () => {
        deleteSelectedVideos();
    });

    document.getElementById('playBtn').addEventListener('click', () => {
        playVideos();
    });
});

function playVideos() {
    let videosToPlay = document.querySelectorAll('input[name="videos"]:checked');
    if (videosToPlay.length === 0) {
        alert('Please select at least one video to play.');
        return;
    }

    let selectedVideos = [];
    for (let i = 0; i < videosToPlay.length; i++) {
        let index = videosToPlay[i].id.split('_')[1]; // Extract index from id
        let title = getCookie("video_title")[index];
        let url = getCookie("video_url")[index];
        let responseSequence = getCookie("response_sequence")[index];
        selectedVideos.push({ title, url, responseSequence });
    }

    // Store selected videos in sessionStorage to pass to the next page
    sessionStorage.setItem('selectedVideos', JSON.stringify(selectedVideos));

    // Navigate to the playback.html page
    alert('Redirecting');
    window.location.href = 'playback.html';
}

function addCookie(title, url, responseSequence){
    let titleArray = getCookie("video_title") || [];
    let urlArray = getCookie("video_url") || [];
    let responseSequenceArray = getCookie("response_sequence") || [];

    titleArray.push(title);
    urlArray.push(url);
    responseSequenceArray.push(responseSequence);

    setCookie("video_title", JSON.stringify(titleArray), 1);
    setCookie("video_url", JSON.stringify(urlArray), 1);
    setCookie("response_sequence", JSON.stringify(responseSequenceArray), 1);

    // Refresh UI immediately after adding to cookie
    //getCookies();
    window.location.reload()
}

function deleteSelectedVideos() {
    let videosToDelete = document.querySelectorAll('input[name="videos"]:checked');
    if (videosToDelete.length === 0) {
        alert('Please select at least one video to delete.');
        return;
    }

    let titleArray = getCookie("video_title") || [];
    let urlArray = getCookie("video_url") || [];
    let responseSequenceArray = getCookie("response_sequence") || [];

    for (let i = 0; i < videosToDelete.length; i++) {
        let videoTitle = videosToDelete[i].value;
        let index = titleArray.indexOf(videoTitle);
        if (index !== -1) {
            titleArray.splice(index, 1);
            urlArray.splice(index, 1);
            responseSequenceArray.splice(index, 1);
        }
    }

    // Update cookies
    setCookie("video_title", JSON.stringify(titleArray), 1);
    setCookie("video_url", JSON.stringify(urlArray), 1);
    setCookie("response_sequence", JSON.stringify(responseSequenceArray), 1);

    // Refresh UI
    getCookies();
}

function getCookies(){
    let titleArray = getCookie("video_title");
    let res = '';

    if(titleArray){
        for(let i = 0; i < titleArray.length; i++){
            res += `<input type="checkbox" id="video_${i}" name="videos" value="${titleArray[i]}">
                    <label for="video_${i}">${titleArray[i]}</label><br>`;
        }
        document.getElementById('videoList').innerHTML = res;
    }
}

function setCookie(key, value, time){
    let d = new Date();
    d.setTime(d.getTime() + (time * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${key}=${value};${expires};path='/'`;
}

function getCookie(name){
    let cookies = document.cookie.split(';');
    for(let cookie of cookies){
        let [key, value] = cookie.split('=');
        if(key.trim() === name){
            return JSON.parse(value);
        }
    }
    return null;
}
