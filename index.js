'use strict';

const apiKey = '1';
const searchNameURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}
  
function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  $('#js-error-message').empty();
  for (let i = 0; i < responseJson.drinks.length; i++){   
    $('#results-list').append(
      `<div class="thumbs">
      <h3>${responseJson.drinks[i].strDrink}</h3>
            <a href="javascript:displayCocktail(responseJson)"><img src="${responseJson.drinks[i].strDrinkThumb}" class="drink-image"></a>
            </div>
            <div class="details" id="${responseJson.drinks[i].idDrink}">
            <h3>Instructions:</h3>
            <p>${responseJson.drinks[i].idDrink}</p>
            <p>${responseJson.drinks[i].strInstructions}</p>
            <ul>Ingredients:
              <li>${responseJson.drinks[i].strIngredient1}</li>
              <li>${responseJson.drinks[i].strIngredient2}</li>
              <li>${responseJson.drinks[i].strIngredient3}</li>
               <li>${responseJson.drinks[i].strIngredient4}</li>
             </ui>
             </div>
           `
    );}
  $('#results').removeClass('hidden');
  $('.details').hide();
}

function displayCocktail(responseJson){
  $('#results-list').on('click', '.drink-image', event => {
    // alert(event.target.id);
    $('.details').toggle(1000);
    
    
    

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
    })
    .then(responseJson => displayResults(responseJson))
    .then(responseJson => displayCocktail(responseJson))
    .catch(err => {
      $('#js-error-message').text('There are no results matching. Please try again');
    });
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('.results').empty();
    
    const searchTerm = $('#js-search-term').val();
    searchByName(searchTerm);
    
  });
}
  
$(watchForm);