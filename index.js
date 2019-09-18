'use strict'


const searchUrl = 'https://api.nps.gov/api/v1/parks';
const apiKey = 'HRhOHH6UmPkYy7Qgs0WdA8nuN739QVrD2Anqk11W';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
    if (responseJson.data.length == 0){
        alert ("No results found. Please make sure you entered a valid state code")
    }
  console.log(responseJson);
  $('#results-list').empty();
  for (let i=0; i<responseJson.data.length; i++) {
    $('#results-list').append(`
      <li><h3>${responseJson.data[i].fullName}</h3>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      </li>
      `)
  };
  $('#results').removeClass('hidden');
}

function getNationalParkInfo(query,limit=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      alert ("Something went wrong. Please check input")
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const limit = $('#js-max-results').val();
    getNationalParkInfo(searchTerm,limit);
  });
}

$(watchForm);