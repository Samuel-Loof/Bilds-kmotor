function searchImages() {
    const colorFilter = document.getElementById('colorSelect').value;

    if (!newSearchTerm) {
        alert('Please enter a valid search term.');
        issearching = false;
        return;
    }

    currentPage = Math.max(1, currentPage);

    // Construct the API URL with the current page and other parameters
    let url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(newSearchTerm)}&per_page=10&page=${currentPage}`;

    if (colorFilter) {
        url += `&colors=${encodeURIComponent(currentColor)}`;
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

