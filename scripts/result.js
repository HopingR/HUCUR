// result.js

// Wait for the DOM to be fully loaded before running the JavaScript code
document.addEventListener('DOMContentLoaded', function () {
    // Button to start over
    const startOverBtn = document.getElementById('startOverBtn');
    startOverBtn.addEventListener('click', function () {
        // Redirect to index.html
        window.location.href = 'index.html';
    });

    // Button to show results
    const showResultsBtn = document.getElementById('showResultsBtn');
    showResultsBtn.addEventListener('click', function () {
        // Show results container
        document.getElementById('resultsContainer').style.display = 'block';

        // Retrieve values from session storage
        const video1 = JSON.parse(sessionStorage.getItem('video1')) || [];
        const video2 = JSON.parse(sessionStorage.getItem('video2')) || [];
        const video3 = JSON.parse(sessionStorage.getItem('video3')) || [];
        const videoTitles = JSON.parse(sessionStorage.getItem('videoTitles')) || ['Video 1', 'Video 2', 'Video 3']; // Default titles

        // Calculate sum of each array
        const sumVideo1 = video1.reduce((acc, val) => acc + val, 0);
        const sumVideo2 = video2.reduce((acc, val) => acc + val, 0);
        const sumVideo3 = video3.reduce((acc, val) => acc + val, 0);

        // Display the results in a Bootstrap table with video titles
        const resultsContent = document.getElementById('resultsContent');
        resultsContent.innerHTML = `
           
            <h2 class="text-center">The highest played video is ${sumVideo1 > sumVideo2 && sumVideo1 > sumVideo3 ? videoTitles[0] : sumVideo2 > sumVideo3 ? videoTitles[1] : videoTitles[2]}</h2>
        `;

        // Draw bar graph using Chart.js
        drawBarGraph(sumVideo1, sumVideo2, sumVideo3, videoTitles);
    });
});

// Function to draw the bar graph using Chart.js
function drawBarGraph(sumVideo1, sumVideo2, sumVideo3, videoTitles) {
    const ctx = document.getElementById('barChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: videoTitles,
            datasets: [{
                label: 'Sum of Arrays',
                data: [sumVideo1, sumVideo2, sumVideo3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'No of Plays'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Video Titles'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Bar Chart Analysis'
                },
                legend: {
                    display: false
                }
            }
        }
    });
}


