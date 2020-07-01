import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResult = () => {
  elements.recipeResult.innerHTML = "";
};

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

export const renderResult = (recipe) => {
  recipe.map((item) => {
    const markup = `<a>
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
     </a>`;
    elements.recipeResult.insertAdjacentHTML("beforeend", markup);
  });
};
