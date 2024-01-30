const PIXABAY_API_KEY = 'YOUR_PIXABAY_API_KEY';
const PIXABAY_API_URL = 'https://pixabay.com/api/';

function searchImages() { 
    const searchTerm  = document.getElementById('searchInput').ariaValueMax;

    if (!searachTerm) {
        alert('Search');
        return;
    }

    const url = `${PIXABAY_API_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(searchTerm)}`;

    fetch(url)
    .then(response => response.json())
    .then(data => displayResults(data.hits))
    .catch(error => console.error('error fetching data'));

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
