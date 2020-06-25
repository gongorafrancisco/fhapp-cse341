id = document.querySelector('#personId');
const resultsBox = document.querySelector('#personDetails');
form = document.querySelector('form');

form.addEventListener('submit', () => {
    event.preventDefault();
    const url = '/api/person/'+id.value;
    createRequest(url, updateUISucess, fail);
    form.reset();
});


const updateUISucess = function(obj) {
    let resultsContent = "<ul>Here are the details of the person: <li>Person ID: " + obj[0].id + "</li><li>Name: " + obj[0].first_name + "</li><li>Lastname: " + obj[0].last_name + "</li><li>Date of Birth: " + obj[0].birth_date;
    resultsBox.classList.add('alert', 'alert-info');
    resultsBox.innerHTML = resultsContent;
};

const fail = function(error) {
    console.log(error);
};

const handleErrors = function(response) {
    if(!response.ok) {
        resultsBox.innerHTML = "Something went wrong, please try again with an ID greter than zero";
        throw (response.status + ': ' + response.statusText);
    }
    return response.json();
};

const createRequest = function (url, success, fail) {
    fetch(url)
        .then((response) => handleErrors(response))
        .then((data) => success(data))
        .catch((error) => fail(error));
};