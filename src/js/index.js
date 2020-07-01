import Search from "./models/Search";
import { elements } from "./views/base";
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
    await state.search.getResult();
    searchView.renderResult(state.search.result);
  } else {
    alert("Search field cannot be empty");
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
