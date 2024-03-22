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

        // Retrieve Assessment Parameters
        const playtime = JSON.parse(sessionStorage.getItem('playtime'));
        const totalSessionTime = JSON.parse(sessionStorage.getItem('totalSessionTime'));

        // Retrieve Response Sequence
        
        const responseSequence1 = JSON.parse(sessionStorage.getItem('responseSequence1'));
        const responseSequence2 = JSON.parse(sessionStorage.getItem('responseSequence2'));
        const responseSequence3 = JSON.parse(sessionStorage.getItem('responseSequence3'));

        // Retrieve index
        const index1 = JSON.parse(sessionStorage.getItem('index1'));
        const index2 = JSON.parse(sessionStorage.getItem('index2'));
        const index3 = JSON.parse(sessionStorage.getItem('index3'));

        // Retrieve clicks
        
        const clickCount1 = JSON.parse(sessionStorage.getItem('clickCount1'));
        const clickCount2 = JSON.parse(sessionStorage.getItem('clickCount2'));
        const clickCount3 = JSON.parse(sessionStorage.getItem('clickCount3'));

        // Calculate sum of each array
        const sumVideo1 = video1.reduce((acc, val) => acc + val, 0);
        const sumVideo2 = video2.reduce((acc, val) => acc + val, 0);
        const sumVideo3 = video3.reduce((acc, val) => acc + val, 0);

        // debug
        var response_sequnece1 = JSON.parse("[" + responseSequence1 + "]");
        var response_sequnece2 = JSON.parse("[" + responseSequence2 + "]");
        var response_sequnece3 = JSON.parse("[" + responseSequence3 + "]");
        
        // Display the results in a Bootstrap table with video titles
        const resultsContent = document.getElementById('resultsContent');
        resultsContent.innerHTML = `
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Play Sequence</th>
                            <th>Sum</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${videoTitles[0]}</td>
                            <td>${video1.join(', ')}</td>
                            <td>${sumVideo1}</td>
                        </tr>
                        <tr>
                            <td>${videoTitles[1]}</td>
                            <td>${video2.join(', ')}</td>
                            <td>${sumVideo2}</td>
                        </tr>
                        <tr>
                            <td>${videoTitles[2]}</td>
                            <td>${video3.join(', ')}</td>
                            <td>${sumVideo3}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h2> Assessment Parameters</h2>
            <p> Total Session Time : ${(totalSessionTime / 1000).toFixed(2)} (secs) / ${(totalSessionTime / 60000).toFixed(2)} (mins) </p>
            <p> Play Time : ${(playtime / 1000).toFixed(2)} (secs) / ${(playtime / 60000).toFixed(2)} (mins) </p>

            <h2 class="text-center">The highest played video is ${
                sumVideo1 >= sumVideo2 && sumVideo1 >= sumVideo3 ? videoTitles[0] :
                sumVideo2 >= sumVideo1 && sumVideo2 >= sumVideo3 ? videoTitles[1] :
                videoTitles[2]
            }</h2>
            
            <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th colspan="4">Interaction Summary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Titles</td>
                        <td>Response Sequence</td>
                        <td>Additional Clicks</td>
                        <td>Total</td>
                    </tr>
                    <tr>
                        <td>${videoTitles[0]}</td>
                        <td>${highlightResponse(response_sequnece1, index1)}</td>
                        <td>${clickCount1}</td>
                        <td>${calculateTotal(response_sequnece1, clickCount1, index1)}</td>
                    </tr>
                    <tr>
                        <td>${videoTitles[1]}</td>
                        <td>${highlightResponse(response_sequnece2, index2)}</td>
                        <td>${clickCount2}</td>
                        <td>${calculateTotal(response_sequnece2, clickCount2, index2)}</td>
                    </tr>
                    <tr>
                        <td>${videoTitles[2]}</td>
                        <td>${highlightResponse(response_sequnece3, index3)}</td>
                        <td>${clickCount3}</td>
                        <td>${calculateTotal(response_sequnece3, clickCount3, index3)}</td>
                    </tr>
                </tbody>
            </table>
          </div>
            
        `;

        // Draw bar graph using Chart.js
        drawBarGraph(sumVideo1, sumVideo2, sumVideo3, videoTitles);

        // Draw line graph using Chart.js
        drawLineGraph(sumVideo1, sumVideo2, sumVideo3, videoTitles);
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
                    min: 0,
                    max: 10,
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

    // Create and append download button for bar chart
    const downloadBarChartBtn = document.createElement('button');
    downloadBarChartBtn.textContent = 'Download Bar Chart';
    downloadBarChartBtn.className = 'btn btn-primary';
    downloadBarChartBtn.id = 'downloadBarChart';
    downloadBarChartBtn.style.marginTop = '10px';
    downloadBarChartBtn.addEventListener('click', function () {
        const url = myChart.toBase64Image();
        const link = document.createElement('a');
        link.download = 'barChart.png';
        link.href = url;
        link.click();
    });
    document.getElementById('resultsContainer').appendChild(downloadBarChartBtn);
}

// Function to draw the line graph using Chart.js
function drawLineGraph(sumVideo1, sumVideo2, sumVideo3, videoTitles) {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: videoTitles,
            datasets: [{
                label: 'Sum of Arrays',
                data: [sumVideo1, sumVideo2, sumVideo3],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 10,
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
                    text: 'Line Chart Analysis'
                },
                legend: {
                    display: false
                }
            }
        }
    });

    // Create and append download button for line chart
    const downloadLineChartBtn = document.createElement('button');
    downloadLineChartBtn.textContent = 'Download Line Chart';
    downloadLineChartBtn.className = 'btn btn-primary';
    downloadLineChartBtn.id = 'downloadLineChart';
    downloadLineChartBtn.style.marginTop = '10px';
    downloadLineChartBtn.addEventListener('click', function () {
        const url = myChart.toBase64Image();
        const link = document.createElement('a');
        link.download = 'lineChart.png';
        link.href = url;
        link.click();
    });
    document.getElementById('resultsContainer').appendChild(downloadLineChartBtn);

    // Create and append download report button
    const downloadReportBtn = document.createElement('button');
    downloadReportBtn.textContent = 'Download Report';
    downloadReportBtn.className = 'btn btn-primary';
    downloadReportBtn.id = 'downloadReport';
    downloadReportBtn.style.marginTop = '10px';
    downloadReportBtn.addEventListener('click', function () {
    // Call function to download report
    downloadReport();
});
document.getElementById('resultsContainer').appendChild(downloadReportBtn);
}

// Function to calculate total based on response sequence, additional clicks, and index
function calculateTotal(responseSequence, additionalClicks, index) {
    const adjustedIndex = index - 1;
    let total = 0;
    if (adjustedIndex === -1) {
        total = additionalClicks;
    } else {
        for (let i = 0; i <= adjustedIndex; i++) {
            total += responseSequence[i];
        }
        total += additionalClicks;
    }
    return total;
}

// Function to highlight response sequence element
function highlightResponse(responseSequence, index) {
    if (!Array.isArray(responseSequence)) return '';
    return responseSequence.map((value, i) => i === index - 1 ? `<span class="highlight">${value}</span>` : value).join(', ');
}

// Function to download report as a screenshot or PDF
function downloadReport() {
    const resultsContainer = document.getElementById('resultsContainer');

    // Use html2canvas to capture the contents of resultsContainer
    html2canvas(resultsContainer).then(canvas => {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL();

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'report.png'; // Change the file name and extension as needed

        // Simulate a click on the link to trigger the download
        link.click();
    });
}


