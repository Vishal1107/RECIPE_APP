import { elements } from "./base";

// ---------------> To get Input from Search
export const getInput = () => elements.searchInput.value;

// ------------------> Clear Search Input
export const clearInput = () => {
  elements.searchInput.value = "";
};

// ------------------- Clear Search Result
export const clearResult = () => {
  elements.recipeResult.innerHTML = "";
};

// ------------------> Clear Pagination Buttons
export const clearButtons = () => {
  elements.paginationButtons.innerHTML = "";
};

// ------------------> To Limit the Word of title and publsher to 15 Character
const limitRecipeResult = (title, limit = 15) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return title;
};

// ------------------> To Create Pagination Buttons
const createButton = (page, type) =>
  `<button class='${
    type === "prev" ? "btn btn-secondary mb-4" : "btn btn-primary mb-4"
  }' data-goto = '${type === "prev" ? page - 1 : page + 1}' id='${
    type === "prev" ? "prevBtn" : "nextBtn"
  }'>Page ${type === "prev" ? page - 1 : page + 1}</button>`;

// ------------------> Render Pagination Buttons
const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let pageButton;
  if (page === 1 && pages > 1) {
    // Only One Button -> Next Button
    pageButton = createButton(page, "next");
  } else if (page < pages) {
    // Both buttons Prev and Next
    pageButton = `${createButton(page, "prev")}
    ${createButton(page, "next")}`;
  } else if (page === pages && pages > 1) {
    // Only One Button -> Prev Button
    pageButton = createButton(page, "prev");
  }
  elements.paginationButtons.insertAdjacentHTML("afterbegin", pageButton);
};

// ------------------> Render Recipe Results
export const renderResult = (recipe, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipe.slice(start, end).map((item) => {
    const markup = `<a href="${item.recipe_id}">
      <figure>
<img src = "${
      item.image_url
    }" class="img-fluid" style="height:50px; width:75px">
      </figure>
      <div id= "itemTitle">
      <h6 class="text-uppercase text-danger">${limitRecipeResult(
        item.title
      )}</h6>
      <p>${limitRecipeResult(item.publisher)}</p>
      </div>
     </a>
     <hr/>`;
    elements.recipeResult.insertAdjacentHTML("beforeend", markup);
  });

  renderButtons(page, recipe.length, resPerPage);
};
