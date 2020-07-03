import axios from "axios";

// -------------------> Recipe Model
class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      let res = await axios.get(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  }

  calcTime() {
    // Assuming 3 Ingredients requires 15 Minutes
    let numIgredients = this.ingredients.length;
    let periods = Math.ceil(numIgredients / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}

export default Recipe;
