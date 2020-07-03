import Search from "./models/Search";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";
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
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResult();
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
    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();
      state.recipe.calcTime();
      state.recipe.calcServings();
      console.log(state.recipe);
    } catch (error) {
      alert("Error in Recipe Processing");
    }
  }
};

["hashchange, load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
