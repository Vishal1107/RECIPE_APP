import axios from "axios";

//---------------------- Search Model Class
class Search {
  constructor(query) {
    this.query = query;
  }

  async getResult() {
    try {
      let res = await axios.get(
        `https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
      );
      this.result = res.data.recipes;
    } catch (error) {
      alert(error);
    }
  }
}

export default Search;
