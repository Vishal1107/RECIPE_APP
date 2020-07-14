//------------------------->> IMPORT VIEWS

import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

//------------------------->> IMPORT MODELS

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";

/**  Global Object
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Like Recipe
 */
let state = {};

//-------------------------->> SEARCH CONTROLLER

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

//-------------------------->> EVENT AFTER SEARCH BUTTONS

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

//-------------------------->> EVENT AFTER CLICKING PAGINATIONS BUTTONS

elements.paginationButtons.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (btn) {
    let searchPage = parseInt(btn.dataset.goto);
    searchView.clearResult();
    searchView.clearButtons();
    searchView.renderResult(state.search.result, searchPage);
  }
});

//-------------------------->> RECIPE CONTROLLER

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

//-------------------------->> HASH CHANGE ACTION

window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);

//-------------------------->> EVENT LISTENER TO SERVINGS BUTTONS

elements.renderRecipe.addEventListener("click", (e) => {
  if (e.target.matches("#btnIncrease")) {
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches("#btnDecrease")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  }
});
