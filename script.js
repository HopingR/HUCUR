// script.js

// Video list to store added videos
// Initialize the videos array
var videos = [];

// Function to add a video
function addVideo() {
     // Check if the video list is full (maximum 4 videos allowed)
     if (videos.length >= 4) {
        alert('Video bank is full. Maximum 4 videos allowed.');
        return;
    }
    var videoName = document.getElementById("videoName").value;
    var videoUrl = document.getElementById("videoUrl").value;

    // Validate if videoName and videoUrl are provided
    if (videoName && videoUrl) {
        var video = { name: videoName, url: videoUrl };
        videos.push(video);
        updateVideoUI(video);  // Call the function to update UI with the new video

        // Reset the input fields
        document.getElementById("videoName").value = "";
        document.getElementById("videoUrl").value = "";

        // Save videos to cookies or any other storage mechanism as needed
        //saveVideosToCookies();

    } else {
        alert("Please provide both video name and URL.");
    }
}

function updateVideoUI(video) {
    var videoLibrary = document.getElementById('videoLibrary');
    if (!videoLibrary) {
        console.error('Element with ID "videoLibrary" not found.');
        return;
    }

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = video.name;
    checkbox.name = 'videoCheckbox';

    var label = document.createElement('label');
    label.classList.add('video-label'); // Add a CSS class for styling
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(' ' + ' '+ video.name)); // Add space before the video title

    videoLibrary.appendChild(label);

}

function updateVideoUI() {
    var videoLibrary = document.getElementById('videoLibrary');
    if (!videoLibrary) {
        console.error('Element with ID "videoLibrary" not found.');
        return;
    }

    // Clear the existing content in videoLibrary
    videoLibrary.innerHTML = '';

    // Rebuild the UI with the updated video list
    videos.forEach(function (video) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = video.name;
        checkbox.name = 'videoCheckbox';

        var label = document.createElement('label');
        label.classList.add('video-label'); // Add a CSS class for styling
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + ' ' + video.name)); // Add space before the video title

        videoLibrary.appendChild(label);
    });
}

// Function to delete selected videos
function deleteSelectedVideos() {
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    checkboxes.forEach(function (checkbox) {
        var videoName = checkbox.value;
        var index = videos.findIndex(function (video) {
            return video.name === videoName;
        });

        if (index !== -1) {
            videos.splice(index, 1); // Remove the video from the list
        }
    });

    // Update the UI
    updateVideoUI();
}

function saveVideosToCookies() {
    // Your code to save videos to cookies goes here
}