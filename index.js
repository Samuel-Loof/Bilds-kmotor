const API_KEY = '42113626-a85b698dbb2334412768f0e98';
const API_URL = 'https://pixabay.com/api/';
const imagesPerPage = 10;
let currentImageIndex = 0;
let currentPage = 1;

let newSearchTerm = "";
let currentColor = "any color";


function nextPage() {
    currentPage++;
    searchImages();
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        searchImages();
    }
}

function setFilter() {
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

let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    newSearchTerm = document.getElementById('searchInput').value;
    currentColor = document.getElementById('colorSelect').value;
    setFilter();
    searchImages();

    // Check if the event was triggered by pressing the enter key
    if (event.submitter && event.submitter.type === "submit") {
        // Reset currentPage to 1 if submitted by pressing the enter key
        currentPage = 1;
        searchImages();
    }
});

function clearResults(container) {
    // Clear the contents of the results container
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

