const API_KEY = '42113626-a85b698dbb2334412768f0e98';
const API_URL = 'https://pixabay.com/api/';
let currentPage = 1;
const imagesPerPage = 10; // Define the number of images per page
let currentSearchTerm = "";
let currentImageIndex = 0;
let oldSearchTerm = "";

let currentColor = "any";
let oldColor = "";

// // update dropdownlista
// //update click function
// // current searchterm changes on every keyup
// // when pressing enter or submit, update old color and searchterm
// //current color changes on every dropdown color menu
// //update enter

function nextPage() {
    logToPage('next page.');
    currentPage++;

    if (!issearching) {
        searchImages(currentSearchTerm);
    }
}

function previousPage() {
    logToPage('previous page.');
    if (currentPage > 1) {
        currentPage--;

        if (!issearching) {
            searchImages(currentSearchTerm);
        }
    } else {
        logToPage('Reached beginning of gallery.');
    }
}

function searchImages(searchTerm) {
    logToPage('searchImages.');
    issearching = true;


    const colorFilter = document.getElementById('colorSelect').value;
    // const content = document.getElementById('content');

    if (!searchTerm) {
        alert('Please enter a valid search term.');
        // Set searching to false when no search term is provided
        issearching = false;
        return;
    }

    currentPage = Math.max(1, currentPage);

    // Construct the API URL with the current page and other parameters
    let url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(currentSearchTerm)}&per_page=10&page=${currentPage}`;

    if (colorFilter) {
        url += `&colors=${encodeURIComponent(colorFilter)}`;
    }
    fetchData(url)
        .then(data => {
            const totalHits = data.totalHits; // Extract totalHits from the API response
            displayResults(data.hits);
            updatePaginationButtons(totalHits); // Pass totalHits to updatePaginationButtons

        })
        .catch(error => {
            handleFetchError(error);
        });
}

function setFilter() {
    logToPage('setFilter.');
    // Update colorFilter based on user selection
    colorFilter = document.getElementById('colorSelect').value;
}

function updatePaginationButtons(totalHits) {
    logToPage('pagination');
    const previousButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    // Set default href values
    previousButton.href = `javascript:void(0)`;
    nextButton.href = `javascript:void(0)`;

    // If totalHits is not provided or is 0, don't show any pagination buttons
    if (!totalHits || totalHits === 0) {
        previousButton.style.display = 'none';
        nextButton.style.display = 'none';
        return;
    }

    const itemsPerPage = 10;
    let totalPages = Math.ceil(totalHits / itemsPerPage);

    // If currentPage is greater than 1, enable and show previous button
    if (currentPage > 1) {
        previousButton.style.display = '';
        previousButton.disabled = false;
    } else {
        previousButton.style.display = 'none';
        previousButton.disabled = true;
    }

    // If currentPage is the last page, disable the next button
    if (currentPage === totalPages) {
        nextButton.style.display = 'none';
        nextButton.disabled = true;
    } else {
        nextButton.style.display = '';
        nextButton.disabled = false;
    }
    // issearching = false;
}

function fetchData(url) {
    logToPage('fetchData.');
    // Fetch data from the Pixabay API
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
            }
            return response.json();
        });
}

function displayResults(results) {
    logToPage('display results.');
    issearching = false;

    const resultsContainer = document.getElementById('results');
    clearResults(resultsContainer);

    if (results.length === 0) {
        // Display a message if no results are found
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');
        const noResultsPara = document.createElement('p');
        noResultsPara.textContent = 'No results found :(';
        messageContainer.appendChild(noResultsPara);
        resultsContainer.appendChild(messageContainer);
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

document.addEventListener('keyup', function (event) {
    logToPage('keyup.');
    if (event.key === 'Enter') {
        logToPage('enter.');
        currentSearchTerm = document.getElementById('searchInput').value;
        searchImages(currentSearchTerm);
        
    }
});

document.getElementById('searchInput').addEventListener('click', function () {
    logToPage('searchinput click');
    // Ensure the search input regains focus when clicked
    this.focus();
});

document.addEventListener('click', function (event) {
    // Check if the click target is not the search input
    if (event.target.id !== 'searchInput') {
        currentSearchTerm = document.getElementById('searchInput').value;
        searchImages(currentSearchTerm);
        logToPage(currentSearchTerm);
    }
});

function clearResults(container) {
    logToPage('clearResults');
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


function logToPage(message) {
    console.log(message); // Log to console as usual

    // Create a new element to hold the log message
    var logElement = document.createElement('p');
    logElement.textContent = message; // Add your message as the text content

    // Append the new element to your log container
    document.getElementById('log').appendChild(logElement);
}