import Search from "./models/Search";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import Recipe from "./models/Recipe";

/**  Global Object
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Like Recipe
 */
let state = {};

// ------------------------> Search Controller
const controlSearch = async () => {
  var query = searchView.getInput();
  if (query) {
    searchView.clearInput();
    searchView.clearResult();
    searchView.clearButtons();
    state.search = new Search(query);
    renderLoader(elements.recipeResultLoader);
    try {
      await state.search.getResult();
      clearLoader();
      searchView.renderResult(state.search.result);
    } catch (eror) {
      alert("Something Went Wrong");
    }
  } else {
    Swal.fire({
      icon: "warning",
      title: "Required",
      text: "Search Field cannot be Empty",
    });
  }
};

//-------------------------> Event After Search Submit
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

//-------------------------> Event After Clicking Pagination Buttons
elements.paginationButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (btn) {
    let searchPage = parseInt(btn.dataset.goto);
    searchView.clearResult();
    searchView.clearButtons();
    searchView.renderResult(state.search.result, searchPage);
  }
});

//-------------------------------> Recipe Controller

const controlRecipe = async () => {
  let id = window.location.hash.replace("#", "");
  if (id) {
    recipeView.clearRecipeView();
    renderLoader(elements.middleSection);

    if (state.search) {
      searchView.highlight(id);
    }

    state.recipe = new Recipe(id);
    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime();
      state.recipe.calcServings();
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      console.log(error);
    }
  }
};

window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);

elements.btnIncrease.addEventListener("click", (e) => {
  state.recipe.updateServings("inc");
  console.log(state.recipe);
});

elements.btnDecrease.addEventListener("click", (e) => {
  state.recipe.updateServings("dec");
  console.log(state.recipe);
});
