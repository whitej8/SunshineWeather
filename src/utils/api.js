var Fetch = require('whatwg-fetch');
var rootUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=Atlanta&mode=json&cnt=5&units=imperial';
var apiUrl = '&apikey=3aa158b2f14a9f493a8c725f8133d704';

module.exports = {
    get: function() {
        return fetch(rootUrl + apiUrl, {})
        .then(function(response) {
            return response.json();
        });
    }
};