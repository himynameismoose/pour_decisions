//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

document.querySelector('button').addEventListener('click', getDrink);

function getDrink() {
    let drink = document.querySelector('input').value;

    fetch (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.drinks[0]);
        document.querySelector('h2').innerHTML = data.drinks[0].strDrink;
        document.querySelector('img').src = data.drinks[0].strDrinkThumb;
        document.querySelector('h3').innerText = data.drinks[0].strInstructions;

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

const loadingIndicator = document.getElementById('loading-indicator');
        const drinkImage = document.getElementById('drink-image');
        const drinkName = document.getElementById('drink-name');
        const drinkInstructions = document.getElementById('drink-instructions');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        const carouselContent = document.querySelector('.carousel-content');
        const carouselNavigation = document.querySelector('.carousel-navigation');
        const toggleAutoplayButton = document.getElementById('toggle-autoplay-button');

        let drinks = []; // Array to store fetched drink data
        let currentIndex = 0; // Current index of the displayed drink
        let carouselInterval; // Variable to hold the interval ID for auto-play
        const AUTO_PLAY_INTERVAL_MS = 2500; // 5 seconds for auto-play

        /**
         * Starts the automatic carousel rotation.
         */
        function startAutoCarousel() {
            // Clear any existing interval to prevent multiple intervals running
            stopAutoCarousel();
            carouselInterval = setInterval(() => {
                // Advance to the next drink, loop to the beginning if at the end
                currentIndex = (currentIndex + 1) % drinks.length;
                displayDrink(currentIndex);
            }, AUTO_PLAY_INTERVAL_MS);
            toggleAutoplayButton.textContent = "Stop Auto-Play";
        }

        /**
         * Stops the automatic carousel rotation.
         */
        function stopAutoCarousel() {
            clearInterval(carouselInterval);
            carouselInterval = null; // Clear the interval ID
            toggleAutoplayButton.textContent = "Start Auto-Play";
        }

        /**
         * Fetches drink data from TheCocktailDB API.
         * Displays a loading indicator during the fetch.
         */
        async function fetchDrinks() {
            loadingIndicator.classList.remove('hidden'); // Show loading spinner
            drinkImage.classList.add('hidden');
            carouselContent.classList.add('hidden');
            carouselNavigation.classList.add('hidden');
            toggleAutoplayButton.classList.add('hidden');

            try {
                // Fetch drinks (e.g., all drinks containing 'margarita')
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                drinks = data.drinks || []; // Store the drinks array, handle null case

                if (drinks.length > 0) {
                    currentIndex = 0; // Start with the first drink
                    displayDrink(currentIndex);
                    // Initial button states are handled by displayDrink
                    
                    drinkImage.classList.remove('hidden');
                    carouselContent.classList.remove('hidden');
                    carouselNavigation.classList.remove('hidden');
                    toggleAutoplayButton.classList.remove('hidden');

                    // Start auto-play by default if there are drinks
                    startAutoCarousel(); 
                } else {
                    drinkName.textContent = "No drinks found.";
                    drinkInstructions.textContent = "Please try searching for a different term.";
                    drinkImage.src = "https://placehold.co/300x300/cccccc/333333?text=No+Image"; // Placeholder
                    prevButton.disabled = true;
                    nextButton.disabled = true;
                    drinkImage.classList.remove('hidden');
                    carouselContent.classList.remove('hidden');
                    carouselNavigation.classList.remove('hidden');
                }
            } catch (error) {
                console.error("Error fetching drinks:", error);
                drinkName.textContent = "Failed to load drinks.";
                drinkInstructions.textContent = "Please check your internet connection or try again later.";
                drinkImage.src = "https://placehold.co/300x300/ff6666/ffffff?text=Error"; // Error placeholder
                prevButton.disabled = true;
                nextButton.disabled = true;
                drinkImage.classList.remove('hidden');
                carouselContent.classList.remove('hidden');
                carouselNavigation.classList.remove('hidden');
            } finally {
                loadingIndicator.classList.add('hidden'); // Hide loading spinner
            }
        }

        /**
         * Displays the drink at the given index.
         * @param {number} index - The index of the drink to display.
         */
        function displayDrink(index) {
            if (drinks.length === 0) {
                // Handle case where no drinks are loaded
                prevButton.disabled = true;
                nextButton.disabled = true;
                return;
            }

            // Ensure index wraps around for continuous looping
            currentIndex = (index + drinks.length) % drinks.length; 
            
            const drink = drinks[currentIndex];
            drinkImage.src = drink.strDrinkThumb || "https://placehold.co/300x300/cccccc/333333?text=No+Image";
            drinkImage.alt = drink.strDrink;
            drinkName.textContent = drink.strDrink;
            drinkInstructions.textContent = drink.strInstructions;

            // Buttons are always enabled for looping carousel, unless only one drink
            if (drinks.length > 1) {
                prevButton.disabled = false;
                nextButton.disabled = false;
            } else {
                prevButton.disabled = true;
                nextButton.disabled = true;
            }
        }

        // Event listeners for navigation buttons
        prevButton.addEventListener('click', () => {
            stopAutoCarousel(); // Stop auto-play on manual interaction
            currentIndex = (currentIndex - 1 + drinks.length) % drinks.length; // Loop backwards
            displayDrink(currentIndex);
            startAutoCarousel(); // Restart auto-play after manual interaction
        });

        nextButton.addEventListener('click', () => {
            stopAutoCarousel(); // Stop auto-play on manual interaction
            currentIndex = (currentIndex + 1) % drinks.length; // Loop forwards
            displayDrink(currentIndex);
            startAutoCarousel(); // Restart auto-play after manual interaction
        });

        // Event listener for the toggle auto-play button
        toggleAutoplayButton.addEventListener('click', () => {
            if (carouselInterval) {
                stopAutoCarousel();
            } else {
                startAutoCarousel();
            }
        });

        // Initialize the carousel by fetching drinks when the window loads
        window.onload = fetchDrinks;