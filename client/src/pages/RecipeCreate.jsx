import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [ingredients, setingredients] = useState("");
  const [preparationSteps, setpreparationSteps] = useState("");
  const [categories, setcategories] = useState("");
  const [image, setimage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const idUser = localStorage.getItem("AuthUserId");

    axios
      .post(
        "http://localhost:4001/recipe",
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

    if (!idUser) {
      navigate("/login");
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
        Add new Recipe{" "}
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
          create{" "}
        </button>
      </form>
    </>
  );
}

export default CreateRecipe;
