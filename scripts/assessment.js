// Include the getCookie function from script.js or another file
function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// Function to load videos from cookies
function loadVideosForAssessment() {
    var selectedVideosCookie = getCookie('selectedVideos');
    if (selectedVideosCookie) {
        var selectedVideos = JSON.parse(selectedVideosCookie);
        displayAssessmentVideos(selectedVideos);
    } else {
        console.error('No selected videos loaded from cookies.');
    }
}

// Function to display assessment videos
function displayAssessmentVideos(videos) {
    var assessmentSection = document.querySelector('.assessment-section');
    if (!assessmentSection) {
        console.error('Assessment section not found.');
        return;
    }

    // Clear existing content
    assessmentSection.innerHTML = '';

    // Loop through the selected videos and create video elements
    videos.forEach(function (video) {
        var videoElement = document.createElement('video');
        videoElement.src = video.url;
        videoElement.controls = true; // Show video controls
        videoElement.classList.add('img-fluid'); // Make the video responsive

        // Add a click event to play the video
        videoElement.addEventListener('click', function () {
            videoElement.play();
        });

        assessmentSection.appendChild(videoElement);
    });
}

// Load selected videos when the assessment page loads
loadVideosForAssessment();
