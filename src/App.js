import axios from "axios";
import { useState } from "react";
import "./App.css";
import RecipeTile from "./Component/recipe-tile/index.js";

function App(){
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=536572ee&app_key=0d8ca51949af9fe7fdbacb3534c1451e`;

  const getRecipeInfo = async () => {
    var result = await axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>Recipe Castle🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="Enter Ingredient"
          autoComplete="Off"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
      </form>

      <div className="app__recipes">
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
          })}
      </div>
    </div>
  );
}

export default App;