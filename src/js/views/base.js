//-------------------------> HTML Elements
export const elements = {
  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("search"),
  recipeResult: document.getElementById("recipeResults"),
  recipeResultLoader: document.getElementById("recipeResultList"),
  paginationButtons: document.getElementById("paginationButtons"),
  renderRecipe: document.getElementById("renderRecipe"),
  middleSection: document.getElementById("middleSection"),
};

// ----------------- Render Loader
export const renderLoader = (parent) => {
  const loader = `<div id="loader">
  </div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};

// ----------------- Clear Loader
export const clearLoader = () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
