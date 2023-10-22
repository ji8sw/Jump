document.addEventListener('DOMContentLoaded', function () {
    // Get references to the input field, button, and results div.
    var searchInput = document.getElementById('textInput');
    var searchButton = document.getElementById('submitButton');
    
    searchButton.addEventListener('click', function () {
        // Get the user's search query from the input field.
        var query = searchInput.value;

        // Check if the query is empty and return early if it is.
        if (query === "") {
            return;
        }

        // Make an API request to serper.dev.
        var myHeaders = new Headers();
        myHeaders.append("X-API-KEY", "091fcb370ddd5cb6b6797c0caf9174c62a265201");
        myHeaders.append("Content-Type", "application/json");

        var requestBody = {
            "q": query
        };

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(requestBody),
            redirect: 'follow'
        };

        fetch("https://google.serper.dev/search", requestOptions)
            .then(response => response.json())
            .then(data => {
                // Extract the URL from the first "organic" result.
                if (data.organic && data.organic.length > 0) {
                    var firstResult = data.organic[0];
                    var firstResultURL = firstResult.link;

                    // Open the URL in a new tab.
                    window.open(firstResultURL, '_blank');
                }
            })
            .catch(error => console.log('Error:', error));
    });
});
