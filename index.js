// document.addEventListener('DOMContentLoaded', function () 
const API_KEY = '42113626-a85b698dbb2334412768f0e98';
const API_URL = 'https://pixabay.com/api/';
let currentPage = 1;

function searchImages() {
    const searchTerm = document.getElementById('searchInput').value;
    const colorFilter = document.getElementById('colorSelect').value;

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

    // Fetch data, display results, and update the pagination buttons
    fetchData(url)
        .then(data => {
            displayResults(data.hits);
            updatePaginationButtons(data.totalHits);
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
    const previousButton = document.querySelector('.previous');
    const nextButton = document.querySelector('.next');

    // Set default href values
    previousButton.href = `javascript:void(0)`;
    nextButton.href = `javascript:void(0)`;

    // Initially hide next and previous buttons
    nextButton.style.display = 'none';
    previousButton.style.display = 'none';

    const itemsPerPage = 10;
    let totalPages = Math.ceil(totalHits / itemsPerPage);

    // If not on the first page, enable previous button
    if (currentPage > 1) {
        previousButton.href = `javascript:void(0)`;
        previousButton.addEventListener('click', () => {
            currentPage--;
            searchImages();
        });
    }

    // If not on the last page, enable next button
    if (currentPage < totalPages) {
        nextButton.href = `javascript:void(0)`;
        nextButton.addEventListener('click', () => {
            currentPage++;
            searchImages();
        });
    }

    // Show next and previous buttons if there are search results
    if (totalHits > 0) {
        nextButton.style.display = ''; 
        previousButton.style.display = ''; 
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



