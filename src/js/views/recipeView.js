import { elements } from "./base";

let createIngredients = (ingredient) => {
  return `<div>
    <span><i class="fa fa-check-circle text-danger" aria-hidden="true"></i>
    <span>${ingredient.count}</span>
    <span>${ingredient.unit}</span>
    <span>${ingredient.ingredientsValue}</span>
    </div>`;
};

export let clearRecipeView = () => {
  elements.renderRecipe.innerHTML = "";
};

export const renderRecipe = (recipe) => {
  const markup = `
    <div className="row">

    <section class="col-md-12">
    <figure>
    <img src= "${recipe.img}" class="img-fluid w-100 text-center recipeImage" />
    <figcaption class="text-center">
    <h3 class="mt-3 font-time text-info text-uppercase">${recipe.title}</h3>
    </figcaption>
    </figure>
    </section>

    <section>
    <div class="col-md-12 text-center">
     <span class="mx-5"><i class="fa fa-clock-o"></i>
     ${recipe.time} Minutes</span>
    <span class="mx-5">${recipe.servings} Servings</span>
    <span class="float-right"><i class="fa fa-heart-o fa-2x" aria-hidden="true"></i></span>
    </div>
    </section>

   <section class="mt-5">
<ul>
${recipe.ingredients.map((el) => createIngredients(el)).join(" ")}
</ul>
   </section>


    <section class="col-md-12 text-center mt-5">
    <button class="btn btn-primary rounded-pill">
  <i class="fa fa-shopping-cart mx-2" aria-hidden="true"></i> ADD TO SHOPPING LIST
</button>
</section>



<section class="col-md-12 text-center my-5">

<h5 class="text-center font-time text-uppercase"> How to Cook It </h5> 
<p>This Recipe is carefully designed and tested by <b>${recipe.author}</b> <br/>
Please Check Out Directions </p>

<a href= "${
    recipe.url
  }" class="btn btn-primary rounded-pill text-uppercase">Directions <i class="fa fa-angle-double-right" aria-hidden="true"></i></a>


</section>


 </div>
    
    
    
    `;
  elements.renderRecipe.insertAdjacentHTML("afterbegin", markup);
};
