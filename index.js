// Change size of icons and fonts in css
// fix css structure
// add next and previous pages. Grey them out if there are no more pages to show
// maximum of 10 images per page
// reactive layout

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
    // Get references to previous and next buttons
    const previousButton = document.querySelector('.previous');
    const nextButton = document.querySelector('.next');

    // Set default href values
    previousButton.href = `javascript:void(0)`;
    nextButton.href = `javascript:void(0)`;

    // If not on the first page, enable previous button
    if (currentPage > 1) {
        previousButton.href = `javascript:void(0)`;
        previousButton.addEventListener('click', () => {
            currentPage--;
            searchImages();
        });
    }

// Calculate total pages based on total hits and items per page
//here we assume/want 10 items per page
let totalPages = Math.ceil(totalHits / 10);

// If not on the last page, enable next button
if (currentPage < totalPages) {
    nextButton.href = `javascript:void(0)`;
    nextButton.addEventListener('click', () => {
        currentPage++;
        searchImages();
    });
}

// Add a text element to display current page and total pages
const paginationText = document.createElement('span');
paginationText.textContent = `Page ${currentPage} of ${totalPages}`;

// Insert the text element between previous and next buttons
previousButton.parentNode.insertBefore(paginationText, nextButton);

}

function displayResults(results) {
    // Display the search results in the results container
    const resultsContainer = document.getElementById('results');
    clearResults(resultsContainer);

    if (results.length === 0) {
        // Display a message if no results are found
        const noResultsPara = document.createElement('p');
        noResultsPara.textContent = 'No results found :(';
        resultsContainer.appendChild(noResultsPara);
    } else {
        // Display each result as an image in a div
        results.forEach(result => {
            const resultDiv = document.createElement('div');
            const imageElement = document.createElement('img');
            imageElement.src = result.previewURL;
            resultDiv.appendChild(imageElement);
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



