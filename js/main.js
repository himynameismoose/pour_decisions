//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('.search-name').addEventListener('click', getDrink);

function getDrink() {
    let drink = document.querySelector('input').value;

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.drinks[0]);
            document.querySelector('h2').innerHTML = data.drinks[0].strDrink;
            document.querySelector('#img-result').src = data.drinks[0].strDrinkThumb;
            document.querySelector('h3').innerText = data.drinks[0].strCategory;
            document.querySelector('p').innerText = data.drinks[0].strInstructions;

            let ingredients = [
                data.drinks[0].strIngredient1,
                data.drinks[0].strIngredient2,
                data.drinks[0].strIngredient3,
                data.drinks[0].strIngredient4,
                data.drinks[0].strIngredient5,
                data.drinks[0].strIngredient6,
                data.drinks[0].strIngredient7,
                data.drinks[0].strIngredient8,
                data.drinks[0].strIngredient9,
                data.drinks[0].strIngredient10,
                data.drinks[0].strIngredient11,
                data.drinks[0].strIngredient12,
                data.drinks[0].strIngredient13,
                data.drinks[0].strIngredient14,
                data.drinks[0].strIngredient15
            ];

            console.log(ingredients);

            for (let i = 0; i < ingredients.length; i++) {
                if (ingredients[i] != null) {
                    let ingredient = document.createElement('li');
                    ingredient.innerHTML = ingredients[i];
                    document.querySelector('ul').appendChild(ingredient);
                }
            }
        })
        .catch(err => {
            console.log(`error ${err}`);
        })
}

// DOM element references
const drinkImage = document.getElementById('drink-image');

drinks = []; // store fetched drink data
let currentIndex = 0; // current index of displayed drink in carousel
let carouselInterval;
const AUTO_PLAY_INTERVAL_MS = 1500;

function fetchDrinks() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
        .then(res => res.json())
        .then(data => {
            drinks = data.drinks || [];

            if (drinks.length > 0) {
                currentIndex = 0;
                displayDrink(currentIndex);
                startAutoCarousel();
            }
        })
        .catch(err => {
            console.log(`Error: ${err}`);
        })
}

function startAutoCarousel() {
    carouselInterval = setInterval( () => {
        currentIndex = (currentIndex + 1) % drinks.length;
        displayDrink(currentIndex);
    }, AUTO_PLAY_INTERVAL_MS);
}

function displayDrink(index) {
    currentIndex = (index + drinks.length) % drinks.length;
    const drink = drinks[currentIndex];
    drinkImage.src = drink.strDrinkThumb;
}

window.onload = fetchDrinks;