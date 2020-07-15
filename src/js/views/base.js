// -------------------------->> HTML ELEMENTS

export const elements = {
  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("search"),
  recipeResult: document.getElementById("recipeResults"),
  recipeResultLoader: document.getElementById("recipeResultList"),
  paginationButtons: document.getElementById("paginationButtons"),
  renderRecipe: document.getElementById("renderRecipe"),
  middleSection: document.getElementById("middleSection"),
  shopping: document.getElementById("shoppingList"),
  likesMenue: document.querySelector(".toggleLikesMenue"),
  likesList: document.querySelector(".likesList"),
};

// -------------------------->> RENDER LOADER

export const renderLoader = (parent) => {
  const loader = `<div id="loader">
  </div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};

// -------------------------->> CLEAR LOADER

export const clearLoader = () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
