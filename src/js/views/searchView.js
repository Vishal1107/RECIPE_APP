import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResult = () => {
  elements.recipeResult.innerHTML = "";
};

export const renderResult = (recipe) => {
  recipe.map((item) => {
    const markup = `<a>
      <figure>
<img src = "${item.image_url}" class="img-fluid my-2" style="height:50px; width:75px">
      </figure>
      <h6>${item.title}</h6>
      <p>${item.publisher}</p>
     </a>`;
    elements.recipeResult.insertAdjacentHTML("beforeend", markup);
  });
};
