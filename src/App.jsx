import { useEffect, useRef } from 'react';
import styles from './App.module.css';

function App() {
  const searchBoxRef = useRef(null);
  const searchBtnRef = useRef(null);
  const recipeContainerRef = useRef(null);
  const recipeDetailsContentRef = useRef(null);
  const recipeCloseBtnRef = useRef(null);

  // Function to get recipes
  const fetchRecipes = async (query) => {
    recipeContainerRef.current.innerHTML = "<h2>Fetching Recipes...</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainerRef.current.innerHTML = ""; // clear message

    if (!response.meals) {
      recipeContainerRef.current.innerHTML = "<h2>No recipes found. Try a different keyword.</h2>";
      return;
    }

    response.meals.forEach(meal => {
      const recipeDiv = document.createElement('div');
      recipeDiv.classList.add(styles.recipe);
      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span></p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
      `;

      const button = document.createElement('button');
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      // Add event to show recipe popup
      button.addEventListener('click', () => {
        openRecipePopup(meal);
      });

      recipeContainerRef.current.appendChild(recipeDiv);
    });
  };

  // Function to fetch ingredients and measurements
  const fetchIngredient = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredientsList += `<li>${measure} ${ingredient}</li>`;
      }
    }
    return ingredientsList;
  };

  // Function to open the recipe popup
  const openRecipePopup = (meal) => {
    recipeDetailsContentRef.current.innerHTML = `
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3>Ingredients:</h3>
      <ul class="ingredientList">${fetchIngredient(meal)}</ul>
      <div>
        <h3>Instruction</h3>
        <p class="recipeInstructions">${meal.strInstructions}</p>
      </div>
    `;
    recipeDetailsContentRef.current.parentElement.style.display = "block";
  };

  useEffect(() => {
    // Close popup when close button clicked
    const handleClose = () => {
      recipeDetailsContentRef.current.parentElement.style.display = "none";
    };

    // Search button click
    const handleSearch = (e) => {
      e.preventDefault();
      const searchInput = searchBoxRef.current.value.trim();
      if (!searchInput) {
        recipeContainerRef.current.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
      }
      fetchRecipes(searchInput);
    };

    const closeBtn = recipeCloseBtnRef.current;
    const searchBtn = searchBtnRef.current;

    closeBtn.addEventListener('click', handleClose);
    searchBtn.addEventListener('click', handleSearch);

    return () => {
      closeBtn.removeEventListener('click', handleClose);
      searchBtn.removeEventListener('click', handleSearch);
    };
  }, []);

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <h1>Ruchi Roots 💚🌴</h1>
          <form>
            <input
              type="text"
              placeholder="Search for recipes..."
              className={styles.searchBox}
              ref={searchBoxRef}
            />
            <button
              type="submit"
              className={styles.searchBtn}
              ref={searchBtnRef}
            >
              Search
            </button>
          </form>
        </nav>
      </header>
      <main>
        <section>
          <div className={styles.recipeContainer} ref={recipeContainerRef}>
            <h2>Search your favorite recipes</h2>
          </div>
          <div className={styles.recipeDetails}>
            <button
              type="button"
              className={styles.recipeCloseBtn}
              ref={recipeCloseBtnRef}
            >
              <i className="fas fa-times"></i>
            </button>
            <div
              className={styles.recipeDetailsContent}
              ref={recipeDetailsContentRef}
            ></div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>Created by Karthik Krishnan, 2025. All rights reserved.</p>
        <p>
          <a 
            href="https://github.com/iamkarthik2004"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <i className="fab fa-github"></i> GitHub
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
