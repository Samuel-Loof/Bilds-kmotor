function displayResults(results) {
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
            //Creates the images into a div
            const resultDiv = document.createElement('div');
            const imageElement = document.createElement('img');

            imageElement.src = result.webformatURL;
            imageElement.style.width = '275px';
            imageElement.style.height = '275px';

            const tags = result.tags || result.userTags || result.user;

            const tagsPara = document.createElement('p');
            const userPara = document.createElement(`p`);
            tagsPara.textContent = `Tags: ${tags}`;
            userPara.textContent = `User: ${result.user}`;

            //Append the image, tags, and author element to the result div
            resultDiv.appendChild(imageElement);
            resultDiv.appendChild(tagsPara);
            resultDiv.appendChild(userPara);

            // Append the result div to the results container.
            resultsContainer.appendChild(resultDiv);
        });
    }
}