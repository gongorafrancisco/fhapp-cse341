const api = 'http://www.omdbapi.com/?';
const apiKey = 'apikey=8ffa37e2';
const moviesForm = document.querySelector('#searchMovieForm');
const inputEl = document.querySelector('#searchInput');
const resultsBox = document.querySelector('#results');
const detailsBox = document.querySelector('#results2');
const links = document.querySelectorAll('#results a');

moviesForm.addEventListener('submit', searchMovie);

function searchMovie(event) {
    event.preventDefault();
    const params = apiKey + '&s=' + encodeURI(inputEl.value);
    const url = api + params;
    console.log(url);
    removeChilds(resultsBox);
    removeChilds(detailsBox);
    createRequest(url, updateUISucess, fail);
    moviesForm.reset();
}

function updateUISucess(data) {
    const movies = data.Search;
    console.log(movies);
    console.log(typeof (movies));
    let table = tableConstructor();
    for (const key in movies) {
        buildMoviesList(movies[key], table);
    }
    resultsBox.appendChild(table);
};

function movieSuccess(data) {
    const movies = data;
    console.log(movies);
    console.log(typeof (movies));
    let details = buildMovieDetails(data);
    detailsBox.appendChild(details);
};

function fail(error) {
    console.log(error);
};

function handleErrors(response) {
    if (!response.ok) {
        throw (response.status + ': ' + response.statusText);
    }
    return response.json();
};

function createRequest(url, success, fail) {
    fetch(url)
        .then((response) => handleErrors(response))
        .then((data) => success(data))
        .catch((error) => fail(error));
};

function displayMovieDetails(title) {
    const params = apiKey + '&i=' + encodeURI(title);
    const url = api + params;
    removeChilds(detailsBox);
    createRequest(url, movieSuccess, fail);
}

//Constructors
function buildMoviesList(movie, element) {
    let row = document.createElement('tr');
    let thTitle = document.createElement('th');
    thTitle.textContent = movie.Title;
    row.appendChild(thTitle);
    let tdType = document.createElement('td');
    tdType.textContent = movie.Type;
    row.appendChild(tdType);
    let tdDetails = document.createElement('td');
    let movieLink = document.createElement('a');
    movieLink.textContent = 'See details';
    movieLink.href = movie.imdbID;
    movieLink.onclick = function (event) {
        event.preventDefault();
        displayMovieDetails(movie.imdbID);
    }
    tdDetails.appendChild(movieLink);
    row.appendChild(tdDetails);
    element.appendChild(row);
}

function buildMovieDetails(movie) {
    let ul = document.createElement('ul');
    let text = elementConstructor('span', 'Movie Details');
    ul.appendChild(text);
    for (const key in movie) {
        if (key == 'Poster') {
            if (movie.Poster =='N/A') {
                console.log(movie.Poster);
            } else {
                let posterImg = document.createElement('img');
                posterImg.src = movie.Poster;
                ul.appendChild(posterImg);
            }
        } else if (key == 'Ratings'){
            console.log(movie.Ratings);
        } else {
            let item = elementConstructor('li', key + ': ' + movie[key]);
            ul.appendChild(item);
        }

    }
    return ul;
}

function removeChilds(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}


function elementConstructor(tag, text) {
    const el = document.createElement(tag);
    el.textContent = text;
    return el;
}

function tableConstructor() {
    let moviesTable = document.createElement('table');
    let trHeaders = document.createElement('thead');
    let rowTh = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.textContent = 'Title';
    let th2 = document.createElement('th');
    th2.textContent = 'Type';
    let th3 = document.createElement('th');
    th3.textContent = 'Details';
    rowTh.appendChild(th1);
    rowTh.appendChild(th2);
    rowTh.appendChild(th3);
    trHeaders.appendChild(rowTh);
    moviesTable.appendChild(trHeaders);
    return moviesTable;
}
