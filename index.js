'use strict';

const apiKey = '1';
const searchIngredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
const searchNameURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}
  
function displayIngredientResults(responseJson) {

  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.drinks.length; i++){   
    $('#results-list').append(
      `<li><h3>${responseJson.drinks[i].strDrink}</h3>
          <img src="${responseJson.drinks[i].strDrinkThumb}">
          </li>`
    );}
  
  $('#results').removeClass('hidden');
}
function displayNameResults(responseJson) {

  console.log(responseJson);
  $('#results-list').empty();
  $('#js-error-message').empty();
  for (let i = 0; i < responseJson.drinks.length; i++){   
    $('#results-list').append(
      `<h3>${responseJson.drinks[i].strDrink}</h3>
            <img src="${responseJson.drinks[i].strDrinkThumb}">
           `
    );}
    
  $('#results').removeClass('hidden');
}
// function displayCocktail(responseJson) {
//     $('#results-list').empty();
//     $('#results-drink').empty();
//     for (let i = 0; i < responseJson.drinks.length; i++){   
//       $('#results-drink').append(
//         `<h3>${responseJson.drinks[i].strDrink}</h3>
//             <img src="${responseJson.drinks[i].strDrinkThumb}">
//             <ul>Ingredients:
//               <li>${responseJson.drinks[i].strIngredient1}</li>
//               <li>${responseJson.drinks[i].strIngredient2}</li>
//               <li>${responseJson.drinks[i].strIngredient3}</li>
//               <li>${responseJson.drinks[i].strIngredient4}</li>
//             </ui>
//             <h3>Instructions:</h3>
//             <p>${responseJson.drinks[i].strInstructions}</p>`
//       );}
    
//     $('#results-drink').removeClass('hidden');
  
//   }
    
function searchByIngredients(query) {
  const params = {
    key: apiKey,
    i: query,
    
  };
  const queryString = formatQueryParams(params);
  const url = searchIngredientURL + '?' + queryString;
  
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    //   throw new Error(response.statusText);
    })
    .then(responseJson => displayIngredientResults(responseJson))
    .catch(err => {
      $('#js-error-message').text('There are no results matching. Please try again');
    });
}
  


function searchByName(query) {
  const params = {
    key: apiKey,
    s: query,
  };

  const queryString = formatQueryParams(params);
  const url = searchNameURL + '?' + queryString;
    
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    //   throw new Error(response.statusText);
    })
    .then(responseJson => displayNameResults(responseJson))
    .catch(err => {
      $('#js-error-message').text('There are no results matching. Please try again');
    });
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('.results').empty();
    
    const searchTerm = $('#js-search-term').val();
    const searchType = $('#js-search-type').val();
    
    if (searchType === 'ingredients'){
      searchByIngredients(searchTerm);
    }
    else {
      searchByName(searchTerm);
    }
  });
}
  
$(watchForm);