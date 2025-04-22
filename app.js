let searchInputElement = document.getElementById("searchInput");
let searchResultsElement = document.getElementById("searchResults");
let spinnerElement = document.getElementById("spinner");

function createAppendsSearchResults(result) {
    let resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");
    searchResultsElement.appendChild(resultItemElement);

    let {
        link,
        title,
        description
    } = result;
    let resultTitle = document.createElement("a");
    resultTitle.href = link;
    resultTitle.target = "_blank";
    resultTitle.textContent = title;
    resultTitle.classList.add("result-title");
    resultItemElement.appendChild(resultTitle);

    let titleBreak = document.createElement("br");
    resultItemElement.appendChild(titleBreak);

    let urlElement = document.createElement("a");
    urlElement.classList.add("result-url");
    urlElement.href = link;
    urlElement.target = "_blank";
    urlElement.textContent = link;

    resultItemElement.appendChild(urlElement);

    let lineBreak = document.createElement("br");
    resultItemElement.appendChild(lineBreak);

    let descriptionElement = document.createElement("p");
    descriptionElement.classList.add("link-description");
    descriptionElement.textContent = description;
    resultItemElement.appendChild(descriptionElement);





}


function displayResults(searchResults) {
    spinnerElement.classList.toggle("d-none");
    for (let result of searchResults) {
        createAppendsSearchResults(result);
    }
   searchInputElement.value = ''
}



function wikipediasearch(event) {
    if (searchInputElement.value === '') {
        return
    }
    if (event.key === "Enter") {
        spinnerElement.classList.toggle("d-none");
        searchResultsElement.textContent = "";
        let searchInput = searchInputElement.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
                console.log(jsonData);
            });
    }
}



searchInputElement.addEventListener("keydown", wikipediasearch);