import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditRecipe() {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [ingredients, setingredients] = useState("");
  const [preparationSteps, setpreparationSteps] = useState("");
  const [categories, setcategories] = useState("");
  const [image, setimage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const idUser = localStorage.getItem("AuthUserId");

    const recipe = JSON.parse(localStorage.getItem("recipeEdit"));

    axios
      .put(
        "http://localhost:4001/recipe/" + recipe._id,
        {
          title,
          ingredients,
          preparationSteps,
          categories,
          image,
          idUser,
        },
        {
          headers: {
            Authorization: "Bearer " + "y0uRt0k3N$eCr3T",
          },
        }
      )
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    const idUser = localStorage.getItem("AuthUserId");

    const recipe = JSON.parse(localStorage.getItem("recipeEdit"));

    if (!idUser) {
      navigate("/login");
    }

    if (recipe) {
      settitle(recipe.title);
      setingredients(recipe.ingredients);
      setpreparationSteps(recipe.preparationSteps);
      setcategories(recipe?.categories);
      setimage(recipe.image);
    }
  }, []);

  return (
    <>
      <h2
        style={{
          fontSize: "32px",
          "text-align": "center",
          marginTop: "30px",
          marginBottom: "32px",
        }}
      >
        {" "}
        Edit Recipe{" "}
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "12px",
          justifyItems: "center",
          marginBottom: "32px",
        }}
      >
        <div style={{ display: "grid", gap: "12px" }}>
          <label>Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gap: "12px" }}>
          <label>Ingredients</label>
          <input
            id="ingredients"
            value={ingredients}
            onChange={(e) => setingredients(e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gap: "12px" }}>
          <label>PreparationSteps</label>
          <input
            id="preparationSteps"
            value={preparationSteps}
            onChange={(e) => setpreparationSteps(e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gap: "12px" }}>
          <label>Categories</label>
          <input
            id="categories"
            value={categories}
            onChange={(e) => setcategories(e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gap: "12px" }}>
          <label>Image URL</label>
          <input
            id="image"
            value={image}
            onChange={(e) => setimage(e.target.value)}
          />
        </div>
        <button
          style={{ marginTop: "16px", width: "200px", borderRadius: "5px" }}
          type="submit"
        >
          {" "}
          Edit{" "}
        </button>
      </form>
    </>
  );
}

export default EditRecipe;
