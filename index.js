const API_KEY = '42113626-a85b698dbb2334412768f0e98';
const API_URL = 'https://pixabay.com/api/';

function searchImages() {
    const searchTerm = document.getElementById('searchInput').value;

    if (!searchTerm) {
        alert('Search term is required.');
        return;
    }

    const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}`;

    fetchData(url)
        .then(data => displayResults(data.hits))
        .catch(error => handleFetchError(error));
}

function fetchData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            return response.json();
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    clearResults(resultsContainer);

    if (results.length === 0) {
        const noResultsPara = document.createElement('p');
        noResultsPara.textContent = 'No results found.';
        resultsContainer.appendChild(noResultsPara);
    } else {
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
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

function handleFetchError(error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch data. Please try again later.');
}

