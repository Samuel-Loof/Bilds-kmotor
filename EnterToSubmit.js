document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        submitted = true;
        searchImages();
    }
});

document.getElementById('searchInput').addEventListener('click', function() {
    // Ensure the search input regains focus when clicked
    this.focus();
});

document.addEventListener('click', function(event) {
    // Check if the click target is not the search input
    if (event.target.id !== 'searchInput') {
        submitted = true;
        searchImages();
    }
});
