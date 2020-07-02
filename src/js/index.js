import Search from "./models/Search";
import { elements, renderLoader, clearLoader } from "./views/base";
import * as searchView from "./views/searchView";

/**  Global Object
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Like Recipe
 */
const state = {};

const controlSearch = async () => {
  var query = searchView.getInput();
  if (query) {
    state.search = new Search(query);
    searchView.clearInput();
    searchView.clearResult();
    renderLoader(elements.recipeResultLoader);
    await state.search.getResult();
    clearLoader();
    searchView.renderResult(state.search.result);
  } else {
    Swal.fire({
      icon: "warning",
      title: "Required",
      text: "Search Field cannot be Empty",
    });
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
