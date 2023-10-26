document.addEventListener('DOMContentLoaded', function () {
    var SearchInput = document.getElementById('TextInput');
    var SearchButton = document.getElementById('SubmitButton');
    var TokenInput = document.getElementById('TokenInput');
    var ErrorText = document.createElement('div');
    TokenInput.value = localStorage.getItem("Token");

    ErrorText.textContent = 'Token cannot be empty';
    ErrorText.style.color = 'red';
    ErrorText.style.display = 'none';

    TokenInput.parentNode.appendChild(ErrorText);

    SearchButton.addEventListener('click', function () {
        var Query = SearchInput.value;
        var Token = TokenInput.value;
        localStorage.setItem('Token', TokenInput.value);

        if (Query === "") {
            return;
        }

        if (Token === "") {
            ErrorText.style.display = 'block';
            return;
        }

        ErrorText.style.display = 'none';

        var ReqHeaders = new Headers();
        ReqHeaders.append("X-API-KEY", Token);
        ReqHeaders.append("Content-Type", "application/json");

        var requestBody = {
            "q": Query
        };

        var requestOptions = {
            method: 'POST',
            headers: ReqHeaders,
            body: JSON.stringify(requestBody),
            redirect: 'follow'
        };

        fetch("https://google.serper.dev/search", requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.organic && data.organic.length > 0) {
                    window.open(data.organic[0].link, '_blank');
                }
            })
            .catch(error => console.log('Error:', error));
    });
});
