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
    let numIngredients = this.ingredients.length;
    let periods = Math.ceil(numIngredients / 3);
    return (this.time = periods * 15);
  }

  calcServings() {
    return (this.servings = 4);
  }

  parseIngredients() {
    let unitLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];

    const unitShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];

    const newIngredients = this.ingredients.map((item) => {
      let ingredients = item.toLowerCase();

      // Looping unitLong to replace unitLong to unitShort in ingredients.
      unitLong.forEach((unit, i) => {
        ingredients = ingredients.replace(unit, unitShort[i]);
      });

      // Remove Paranthesis
      ingredients = ingredients.replace(/ *\([^)]*\) */g, " ");

      // Parse Ingredients into Count, Unit, Ingredients

      // Spilting Ingredients into Array
      const arrIng = ingredients.split(" ");
      // Checking Wether Unit Present in Ingredient or not
      const unitIndex = arrIng.findIndex((item1) => {
        unitShort.includes(item1);
      });

      let objIng;

      if (unitIndex > -1) {
        // There is Unit
        const arrCount = arrIng.slice(0, unitIndex);
        let count;
        if (arrCount.length === 1) {
          count: eval(arrIng[0].replace("-", "+"));
        } else {
          count: eval(arrIng.slice(0, unitIndex).join("+"));
        }
        objIng = {
          count: count,
          unit: arrIng(unitIndex),
          ingredients: arrIng.slice(unitIndex + 1).join(),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // If there is no unit but first is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredients: arrIng.slice(0).join(" "),
        };
      } else if (unitIndex === -1) {
        // There is no unit and no count
        objIng = {
          count: 1,
          unit: "",
          ingredients,
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }
}

export default Recipe;
