document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        searchImages();
    }
});

document.getElementById('searchInput').addEventListener('click', function() {
    // Ensure the search input regains focus when clicked
    this.focus();
});

// Additional code to handle the 'click' event on the document if needed
document.addEventListener('click', function(event) {
    // Check if the click target is not the search input
    if (event.target.id !== 'searchInput') {
        searchImages();
    }
});

