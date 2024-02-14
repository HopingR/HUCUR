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
});
