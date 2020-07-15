//------------------------->> IMPORT VIEWS

import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";

//------------------------->> IMPORT MODELS

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Like from "./models/Like";

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

// -------------------------->> HANDLE EVENT DELETE & UPDATE LIST ITEM EVENTS

elements.shopping.addEventListener("click", (e) => {
  const id = e.target.closest(".shoppingItem").dataset.itemid;
  console.log(id);

  if (e.target.matches(".fa-window-close")) {
    // Delete from State
    state.list.deleteItem(id);
    // Delete from UI
    listView.deleteItem(id);
  } else if (e.target.matches("shoppingCountValue")) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

//-------------------------->> LIST CONTROLLER

const controlList = () => {
  if (!state.list) {
    state.list = new List();
  }

  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredientsValue);
    listView.renderList(item);
  });
};

//-------------------------->> LIKE CONTROLLER

const cotrolLike = () => {};
if (!state.like) {
  state.like = new Like();
}

const currentId = state.recipe.id;

if (!state.like.isLiked(currentId)) {
  // User Not Like Recipe
  const newLike = state.like.addLike(
    currentId,
    state.recipe.title,
    state.recipe.author,
    state.recipe.author,
    state.recipe.img
  );
  // User Liked Recipe
} else {
  state.like.deleteLike(currentId);
}
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
  } else if (e.target.matches("#wishlistButton, #wishlistButton *")) {
    controlList();
  } else if (e.target.matches(".fa-heart-o")) {
    controlLike();
  }
});
