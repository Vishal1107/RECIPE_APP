import { elements } from "./base";
import { Fraction } from "fractional";

//---------------------------------------->> FORMAT COUNT
let formatCount = (count) => {
  if (count) {
    const [int, dec] = count
      .toString()
      .split(".")
      .map((el) => parseInt(el));

    if (!dec) return count;

    if (int === 0) {
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(count - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return "?";
};

//---------------------------------------->> CREATE INGREDIENTS

let createIngredients = (ingredient) => {
  return `<div>
    <span><i class="fa fa-check-circle" aria-hidden="true"></i>
    <span class="recipeIngCounts">${formatCount(ingredient.count)}</span>
    <span>${ingredient.unit}</span>
    <span>${ingredient.ingredientsValue}</span>
    </div>`;
};

//---------------------------------->> CLEAR RECIPE VIEW

export let clearRecipeView = () => {
  elements.renderRecipe.innerHTML = "";
};

//-------------------------------->> RENDER RECIPE IN MIDDLE SECTION

export const renderRecipe = (recipe) => {
  const markup = `
    <div className="row">

    <section class="col-md-12">
    <figure>
    <img src= "${recipe.img}" class="img-fluid w-100 text-center recipeImage" />
    <figcaption class="text-center">
    <h3 class="mt-3 font-time text-dark text-uppercase alert alert-danger">${
      recipe.title
    }</h3>
    </figcaption>
    </figure>
    </section>

    <section>
    <div class="col-md-12 text-center">
     <span class="mx-5"><i class="fa fa-clock-o"></i>
     ${recipe.time} Minutes</span>
    <span class="ml-5 mr-3 peopleServings">${recipe.servings} Servings</span>

    <i class="fa fa-plus-circle" id= "btnIncrease"></i>
    <i class="fa fa-minus-circle" id= "btnDecrease"></i>

    <span class="float-right"><i class="fa fa-heart-o fa-2x" aria-hidden="true"></i></span>
    </div>
    </section>

   <section class="mt-5">
   <ul>
   ${recipe.ingredients.map((el) => createIngredients(el)).join(" ")}
   </ul>
   </section>

  <section class="col-md-12 text-center mt-5">
  <button class="btn btn-primary rounded-pill" id= "wishlistButton">
  <i class="fa fa-shopping-cart mx-2" aria-hidden="true"></i> ADD TO SHOPPING LIST
  </button>
  </section>


  <section class="col-md-12 text-center my-5">

  <h5 class="text-center font-time text-uppercase"> How to Cook It </h5> 
  <p>This Recipe is carefully designed and tested by <b>${
    recipe.author
  }</b> <br/>
  Please Check Out Directions </p>

  <a href= "${
    recipe.url
  }" class="btn btn-primary rounded-pill text-uppercase">Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>

  </section>
 </div>`;

  elements.renderRecipe.insertAdjacentHTML("afterbegin", markup);
};

//-------------------------------------->> UPDATE SERVINGS

export const updateServingsIngredients = (recipe) => {
  //Update Servings
  document.querySelector(".peopleServings").textContent =
    recipe.servings + " Servings";
  //Update Count
  const countElements = Array.from(
    document.querySelectorAll(".recipeIngCounts")
  );

  countElements.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};
