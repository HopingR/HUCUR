document.addEventListener('DOMContentLoaded', function () {
    // Retrieve selected video information from sessionStorage
    const selectedVideos = JSON.parse(sessionStorage.getItem('selectedVideos'));

    // Display selected video information
    const selectedVideoInfoContainer = document.getElementById('selectedVideoInfo');
    if (selectedVideos && selectedVideos.length > 0) {
        selectedVideos.forEach((video, index) => {
            const title = video.title;
            const url = video.url;
            let responseSequence = '';
            if (Array.isArray(video.responseSequence)) {
                responseSequence = video.responseSequence.join(', ');
            } else {
                responseSequence = video.responseSequence;
            }

            // Create HTML elements to display video information
            const videoInfoElement = document.createElement('div');
            videoInfoElement.innerHTML = `
                <h2>Video ${index + 1} Information:</h2>
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>URL:</strong> ${url}</p>
                <p><strong>Response Sequence:</strong> ${responseSequence}</p>
            `;

            // Append the video information to the container
            selectedVideoInfoContainer.appendChild(videoInfoElement);
        });
    } else {
        // Display a message if no videos are selected
        selectedVideoInfoContainer.innerHTML = '<p>No videos selected.</p>';
    }

    // Retrieve assessment data from sessionStorage
    const assessmentData = JSON.parse(sessionStorage.getItem('assessmentData'));

    // Display assessment parameters
    const assessmentParamsContainer = document.getElementById('assessmentParams');
    if (assessmentData) {
        assessmentParamsContainer.innerHTML = `
            <h2>Assessment Parameters:</h2>
            <p><strong>Idle Time:</strong> ${assessmentData.idleTime}</p>
            <p><strong>Play Time:</strong> ${assessmentData.playTime}</p>
            <p><strong>Session Time:</strong> ${assessmentData.sessionTime}</p>
        `;
    } else {
        // Display a message if assessment parameters are not found
        assessmentParamsContainer.innerHTML = '<p>No assessment parameters found.</p>';
    }
});
