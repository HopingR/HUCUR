document.addEventListener('DOMContentLoaded', function () {
    updateUI();

    document.getElementById('form').addEventListener('submit', (e) => {
        e.preventDefault();
        let title = document.getElementById('video_title').value;
        let url = document.getElementById('video_url').value;
        let responseSequence = document.getElementById('response_sequence').value;

        // Perform validations
        if (validateResponseSequence(responseSequence) && validateURL(url) && validateEmptyFields(title, url, responseSequence)) {
            // Extract video ID from the URL
            let videoId = extractVideoId(url);
            if (videoId) {
                // Add the video
                addVideo(title, videoId, responseSequence);
            } else {
                alert("Invalid YouTube URL.");
            }
        }
    });

    document.getElementById('manageForm').addEventListener('submit', (e) => {
        e.preventDefault();
        startAssessment();
    });

    document.getElementById('deleteBtn').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default action of the click event
        e.stopPropagation(); // Stop event propagation to prevent triggering the form submission
        deleteSelectedVideos();
    });
});

function validateResponseSequence(sequence) {
    // Check if sequence is a comma-separated list of integers
    let regex = /^(\d+\s*,\s*)*\d+$/;
    if (!regex.test(sequence)) {
        alert("Response sequence should be comma-separated integers.");
        return false;
    }
    return true;
}

function validateURL(url) {
    // Simple URL validation
    let regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regex.test(url)) {
        alert("Invalid URL format.");
        return false;
    }
    return true;
}

function validateEmptyFields(title, url, sequence) {
    if (title === "" || url === "" || sequence === "") {
        alert("Please enter all the fields.");
        return false;
    }
    return true;
}

function extractVideoId(url) {
    // Regular expression to match the video ID in the YouTube URL
    let regex = /[?&]v=([^&#]*)/i;
    let match = url.match(regex);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}

function startAssessment() {
    let videosToPlay = document.querySelectorAll('input[name="videos"]:checked');
    if (videosToPlay.length !== 3) {
        alert('Please select three videos to play.');
        return;
    }

    // Retrieve idle time, play time, and session time values
    // Validate assessment parameter values
    let idleTime = document.getElementById('idleTimeout').value.trim();
    let playTime = document.getElementById('videoPlayTime').value.trim();
    let sessionTime = document.getElementById('totalSessionTime').value.trim();
    if (idleTime === "" || playTime === "" || sessionTime === "" || isNaN(idleTime) || isNaN(playTime) || isNaN(sessionTime)) {
        alert('Please enter valid integer values for assessment parameters and ensure none of the fields are empty.');
        return;
    }

    let selectedVideos = [];
    for (let i = 0; i < videosToPlay.length; i++) {
        let index = videosToPlay[i].id.split('_')[1]; // Extract index from id
        let title = getCookie("video_title")[index];
        let url = getCookie("video_url")[index];
        let responseSequenceInput = document.getElementById(`responseSequence_${index}`);
        let responseSequence = responseSequenceInput.value; // Get the value from the input field
        if (responseSequence === "") {
            // If the user hasn't edited the response sequence, use the default value from the cache
            responseSequence = getCookie("response_sequence")[index];
        }
        selectedVideos.push({ title, url, responseSequence });
    }

    

    // Store selected videos in sessionStorage to pass to the next page
    sessionStorage.setItem('selectedVideos', JSON.stringify(selectedVideos));
    

    // Store selected videos and additional data in sessionStorage to pass to the next page
    let assessmentData = {
        idleTime: idleTime,
        playTime: playTime,
        sessionTime: sessionTime
    };
    sessionStorage.setItem('assessmentData', JSON.stringify(assessmentData));

    // Navigate to the playback.html page
    window.location.href = 'playback.html';
}

function addVideo(title, url, responseSequence){
    let titleArray = getCookie("video_title") || [];
    if (titleArray.length >= 5) {
        alert("You can't add more than 5 videos.");
        return;
    }
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
    //updateUI();
    window.location.reload()
}

function updateUI(){
    let titleArray = getCookie("video_title");
    let urlArray = getCookie("video_url");
    let responseSequenceArray = getCookie("response_sequence");
    let res = '';

    if(titleArray){
        for(let i = 0; i < titleArray.length; i++){
            res += `<div class="row">
                        <div class="col">
                            <input type="checkbox" id="video_${i}" name="videos" value="${titleArray[i]}">
                            <label for="video_${i}">${titleArray[i]}</label>
                            <input type="hidden" id="url_${i}" value="${urlArray[i]}">
                            <input type="text" id="responseSequence_${i}" value="${responseSequenceArray[i]}">
                        </div>
                    </div>`; // Make response sequence editable
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

// Function to increment or decrement a numeric value
function incrementDecrement(inputId, step) {
    var inputElement = document.getElementById(inputId);

    // Check if the input element exists
    if (inputElement) {
        // Get the current value as a number (or default to 0)
        var currentValue = parseFloat(inputElement.value) || 0;

        // Increment or decrement the value by the specified step
        var newValue = currentValue + step;

        // Update the input element with the new value
        inputElement.value = newValue;

        // You can add additional logic or constraints if needed
        // For example, ensure the value doesn't go below 0
        if (newValue < 0) {
           inputElement.value = 0;
           console.error('Value cannot be below zero');
        }
    } else {
        console.error('Input element with ID "' + inputId + '" not found.');
    }
}

