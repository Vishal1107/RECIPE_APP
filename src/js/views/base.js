export const elements = {
  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("search"),
  recipeResult: document.getElementById("recipeResults"),
  recipeResultLoader: document.getElementById("recipeResultList"),
};

export const renderLoader = (parent) => {
  const loader = `<div id="loader">
  </div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
