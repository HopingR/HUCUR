// script.js

// Video list to store added videos
var videos = [];

// Event listener for page load
window.addEventListener('load', function () {
    loadVideosFromCookies();
});

// Event listener for beforeunload (when the page is being refreshed or unloaded)
window.addEventListener('beforeunload', function () {
    saveVideosToCookies();
});

// Function to save videos to cookies
function saveVideosToCookies() {
    setCookie('videos', JSON.stringify(videos), 5); // 5 days
}

// Function to load videos from cookies
function loadVideosFromCookies() {
    var videosCookie = getCookie('videos');
    if (videosCookie) {
        videos = JSON.parse(videosCookie);
        updateVideoUI();
    }
}

// Function to update video UI
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
        label.classList.add('video-label');
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + ' ' + video.name));

        videoLibrary.appendChild(label);
    });
}

// Function to validate YouTube video URL
function isValidYouTubeUrl(url) {
    // Regular expression for YouTube URL format
    var youtubeRegExp = /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    // Test the URL against the regular expression
    return youtubeRegExp.test(url);
}

// Function to check if an assessment parameter has a valid value
function isValidAssessmentParameter(value) {
    // You can add additional validation logic as needed
    return value !== "secs" && parseFloat(value) !== 0 && !isNaN(value);
}
// Function to add a video
// Function to add a video and assessment parameters
function addVideo() {
    // Check if the video list is full (maximum 4 videos allowed)
    if (videos.length >= 4) {
        alert('Video bank is full. Maximum 4 videos allowed.');
        return;
    }

    // Get values from input fields
    var videoName = document.getElementById("video_title").value;
    var videoUrl = document.getElementById("video_url").value;
    var responseSequence = document.getElementById("response_sequence").value;

    // Validate if videoName, videoUrl, and assessment parameters are provided
    if (videoName && videoUrl && totalSessionTime && idleTimeout && videoPlayTime && responseSequence) {
        // Check if assessment parameters have valid values
        if (
            isValidAssessmentParameter(totalSessionTime) &&
            isValidAssessmentParameter(idleTimeout) &&
            isValidAssessmentParameter(videoPlayTime) &&
            isValidYouTubeUrl(videoUrl)
        ) {
            var video = {
                name: videoName,
                url: videoUrl,
                assessment: {
                    totalSessionTime: totalSessionTime,
                    idleTimeout: idleTimeout,
                    videoPlayTime: videoPlayTime,
                    responseSequence: responseSequence
                }
            };

            videos.push(video);
            // Save videos to cookies
            saveVideosToCookies();
            updateVideoUI(video);  // Call the function to update UI with the new video

            // Reset the input fields
            document.getElementById("videoName").value = "";
            document.getElementById("videoUrl").value = "";
            document.getElementById("totalSessionTime").value = "";
            document.getElementById("idleTimeout").value = "";
            document.getElementById("videoPlayTime").value = "";

            
        } else {
             // Display separate error messages for invalid parameters
            if (!isValidAssessmentParameter(totalSessionTime)) {
                alert("Please provide a valid Total Session Time.");
            }
            if (!isValidAssessmentParameter(idleTimeout)) {
                alert("Please provide a valid Idle Timeout.");
            }
            if (!isValidAssessmentParameter(videoPlayTime)) {
                alert("Please provide a valid Video Play Time.");
            }
            if (!isValidYouTubeUrl(videoUrl)) {
                alert("Please provide a valid YouTube Video URL.");
            }
        }
    } else {
        alert("Please provide all required information.");
    }
}


/*
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

        // Append the label to videoLibrary
        videoLibrary.appendChild(label);
    });
}*/

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
    // Save videos to cookies after deletion
    saveVideosToCookies();
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

/*// Function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}*/
function setCookie(cname, cvalue, exdays) {
    const d = new Date(); // Define a new constant to store the current date.
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); // Convert days to milliseconds.
    let expires = "expires="+d.toUTCString(); // Create the full expiry string.
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; // Combine everything together and store the cookie.
  }
function getCookie(cname) {
    let name = cname + "="; // Add an equal-sign to the parameter-provided cookie name.
    let ca = document.cookie.split(';'); // Get the user's cookies and split the result on each semicolon.
    for(let i = 0; i < ca.length; i++) { // Iterate through the cookie array.
      let c = ca[i]; // Get the value of each cookie.
      while (c.charAt(0) == ' ') { // Remove whitespace.
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) { // If the parameter-provided cookie exists, return it.
        return c.substring(name.length, c.length);
      }
    }
    return ""; // If all else fails, return a blank string.
  }
// Function to erase a cookie by name
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Function to start the assessment
function startAssessment() {
    // Check if at least two videos are selected
    var selectedVideos = document.querySelectorAll('input[type="checkbox"]:checked');
    
    if (selectedVideos.length < 3) {
        alert('Please select at least three videos to start the assessment.');
        return;
    }

    // Continue with the assessment logic...
  
    window.location.href = 'assessment.html';
}


// Update the button click event to call startAssessment
document.getElementById('startAssessmentButton').addEventListener('click', startAssessment);

