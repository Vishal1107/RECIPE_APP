import Search from "./models/Search";

/**  Global Object
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Like Recipe
 */
const state = {};

const controlSearch = async () => {
  let query = "pizza";
  if (query) {
    state.search = new Search(query);
    await state.search.getResult();
    console.log(state.search.result);
  }
};

document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
