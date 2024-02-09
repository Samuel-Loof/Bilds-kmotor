function updatePaginationButtons(totalHits) {
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
    } else {
        previousButton.style.display = 'none';
    }

    // If currentPage is the last page, remove the next button
    if (currentPage === totalPages) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = '';
    }
}