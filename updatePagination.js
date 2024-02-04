// const resultsContainer = document.getElementById('results-container');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');


function updatePaginationButtons(totalHits) {
    const previousButton = document.querySelector('.previous');
    const nextButton = document.querySelector('.next');

    // Set default href values
    previousButton.href = `javascript:void(0)`;
    nextButton.href = `javascript:void(0)`;

    // Initially hide next and previous buttons
    nextButton.style.display = 'none';
    previousButton.style.display = 'none';

    const itemsPerPage = 10; // Antal bilder per sida
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
        nextButton.style.display = inline-block; // or 'inline-block'
        previousButton.style.display = inline-block; // or 'inline-block'
    }
}
