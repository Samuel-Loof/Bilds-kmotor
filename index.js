// document.addEventListener('DOMContentLoaded', function () 
const API_KEY = '42113626-a85b698dbb2334412768f0e98';
const API_URL = 'https://pixabay.com/api/';
let currentPage = 1;
const imagesPerPage = 10; // Define the number of images per page

// Initialize index
let currentImageIndex = 0;

// Function to handle pagination when next button is clicked
function nextPage() {
    currentPage++;
    searchImages();
}

// Function to handle pagination when previous button is clicked
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        searchImages();
    } else {
        console.log('Reached beginning of gallery.');
    }
}

function searchImages() {
    const searchTerm = document.getElementById('searchInput').value;
    const colorFilter = document.getElementById('colorSelect').value;
    const content = document.getElementById('content');

    if (!searchTerm) {
        alert('Please enter a valid search term.');
        return;
    }

    currentPage = Math.max(1, currentPage);

    // Construct the API URL with the current page and other parameters
    let url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&per_page=10&page=${currentPage}`;

    if (colorFilter) {
        url += `&colors=${encodeURIComponent(colorFilter)}`;
    }

    // Fetch data from the Pixabay API
    fetchData(url)
        .then(data => {
            const totalHits = data.totalHits; // Extract totalHits from the API response
            displayResults(data.hits);
            updatePaginationButtons(totalHits); // Pass totalHits to updatePaginationButtons
        })
        .catch(error => handleFetchError(error));
}

function setFilter() {
    // Update colorFilter based on user selection
    colorFilter = document.getElementById('colorSelect').value;
}

function fetchData(url) {
    // Fetch data from the Pixabay API
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
            }
            return response.json();
        });
}

function updatePaginationButtons(totalHits) {
    const previousButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Set default href values
    previousButton.href = `javascript:void(0)`;
    nextButton.href = `javascript:void(0)`;

    // If totalHits is not provided or is 0, don't show any pagination buttons
    if (!totalHits || totalHits === 0) {
        return;
    }

    const totalPages = Math.ceil(totalHits / imagesPerPage);

    // Show next button if there are search results and currentPage is not the last page
    if (currentPage < totalPages) {
        nextButton.style.display = '';
    }

    // If currentPage is greater than 1, enable and show previous button
    if (currentPage > 1) {
        previousButton.style.display = '';
        previousButton.disabled = false;
    } else {
        previousButton.style.display = 'none';
        previousButton.disabled = true;
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    clearResults(resultsContainer);

    if (results.length === 0) {
        // Display a message if no results are found
        const noResultsPara = document.createElement('p');
        noResultsPara.textContent = 'No results found :(';
        resultsContainer.appendChild(noResultsPara);
    } else {
        results.forEach(result => {
            const resultDiv = document.createElement('div');
            const imageElement = document.createElement('img');

            // Set the source (URL) of the image
            imageElement.src = result.webformatURL;
            imageElement.style.width = '275px';
            imageElement.style.height = '275px';

            // Check if there is a property for tags
            const tags = result.tags || result.userTags || result.user;

            const tagsPara = document.createElement('p');
            const userPara = document.createElement(`p`);
            tagsPara.textContent = `Tags: ${tags}`;
            userPara.textContent = `User: ${result.user}`;

            // Append the image, tags, and author element to the result div
            resultDiv.appendChild(imageElement);
            resultDiv.appendChild(tagsPara);
            resultDiv.appendChild(userPara);

            // Append the result div to the results container
            resultsContainer.appendChild(resultDiv);
        });
    }
}

function clearResults(container) {
    // Clear the contents of the results container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function handleFetchError(error) {
    console.error('Error fetching data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred.';
    alert(`Failed to fetch data. Error: ${errorMessage}. Please try again later.`);
}
