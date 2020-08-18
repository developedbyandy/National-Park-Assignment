let url = 'https://developer.nps.gov/api/v1/parks?';
let apiKey = 'knSmpn5MA87HFXpUL9CjwpRy2et4dm6lB4Q4RmqB';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}



let watchForm = function () {
    $('form').submit(event => {
        event.preventDefault();
        let usStates = $('input[name="stateParks"]').val();
        let numParks = $('input[name="maxNum"]').val();
        getParks(usStates, numParks);


    });
};



let getParks = function (usStates, numParks) {
    const params = {
        limit: numParks,
        q: usStates,
        api_key: apiKey,
    };
    const queryString = formatQueryParams(params)
    const searchURL = url + '?' + queryString;
    console.log(searchURL)

    fetch(searchURL)
        .then(response => response.json())
        .then(responseJson =>
            displayInfo(responseJson))
        .catch(error => console.log(error));


};

let displayInfo = function (responseJson) {
    console.log(responseJson);
    $('.results').removeClass('hidden');
    $('.results').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        console.log(responseJson.data[i])
        $('.results').append(`<div class='jsonResponse'>${responseJson.data[i].fullName}<p>${responseJson.data[i].description}</p><p>${responseJson.data[i].directionsUrl}</div>`)
    }
}



$(watchForm);