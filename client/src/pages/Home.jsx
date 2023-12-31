import { Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [recipesFilter, setRecipesFilter] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const isMobile = useMediaQuery({
    query: "(max-width: 340px)",
  });

  const isMobileOrTablet = useMediaQuery({
    query: "(max-width: 900px)",
  });

  const idUser = localStorage.getItem("AuthUserId");

  const getRecipes = async () => {
    await axios.get("http://localhost:4001/recipe").then((response) => {
      setRecipes(response.data);
      const itemsCategories = response.data.flatMap(
        (objeto) => objeto.categories
      );

      const itemsVerify = new Set(itemsCategories);

      setCategories([...itemsVerify]);
    });
  };

  const removeRecipes = async (id) => {
    await axios
      .delete("http://localhost:4001/recipe/" + id, {
        headers: {
          Authorization: "Bearer " + "y0uRt0k3N$eCr3T",
        },
      })
      .then(() => {
        getRecipes();
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);

  useEffect(() => {
    if (category != "") {
      setRecipesFilter(
        recipes.filter((item) => {
          return item.categories.includes(category);
        })
      );
    } else {
      setRecipesFilter([]);
      getRecipes();
    }
  }, [category]);

  return (
    <Container className="py-5">
      <Link to="/recipe/create">Create Recipe</Link>
      <Form.Select
        aria-label="Default select example"
        onChange={(event) => setCategory(event.target.value)}
        style={{ marginTop: "32px", width: isMobileOrTablet ? "95%" : "40%" }}
      >
        <option value="">Recipe Filter</option>
        {categories &&
          categories?.map((item, key) => {
            return (
              <option key={key} value={item}>
                {item}
              </option>
            );
          })}
      </Form.Select>
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
          Recipe List{" "}
        </h2>
        <ul
          style={{
            display: "flex",
            "flex-wrap": "wrap",
            gap: "12px",
            marginBottom: "32px",
            "min-height": "80vh",
          }}
        >
          {recipesFilter.length > 0
            ? recipesFilter.map((recipe) => (
                <li
                  key={recipe._id}
                  style={{
                    width: isMobile ? "250px" : "300px",
                    border: "1px solid",
                    "list-style-type": "none",
                    padding: "8px",
                    maxHeight: "300px",
                  }}
                >
                  <img
                    src={recipe.image}
                    style={{ width: "100%", height: "50%", cursor: "pointer" }}
                    onClick={async () => {
                      const filterData = await recipes.filter((item) => {
                        return item._id === recipe._id;
                      });

                      await localStorage.setItem(
                        "recipe",
                        JSON.stringify(filterData[0])
                      );
                      setTimeout(() => {
                        navigate("/recipe/" + recipe._id);
                      }, 600);
                    }}
                  />
                  <h3
                    style={{
                      "text-align": "center",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={async () => {
                      const filterData = await recipes.filter((item) => {
                        return item._id === recipe._id;
                      });

                      await localStorage.setItem(
                        "recipe",
                        JSON.stringify(filterData[0])
                      );
                      setTimeout(() => {
                        navigate("/recipe/" + recipe._id);
                      }, 600);
                    }}
                  >
                    {" "}
                    {recipe.title}
                  </h3>
                  <p
                    style={{
                      "text-align": "center",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={async () => {
                      const filterData = await recipes.filter((item) => {
                        return item._id === recipe._id;
                      });

                      await localStorage.setItem(
                        "recipe",
                        JSON.stringify(filterData[0])
                      );
                      setTimeout(() => {
                        navigate("/recipe/" + recipe._id);
                      }, 600);
                    }}
                  >
                    {" "}
                    {recipe?.categories?.map((item, key) => {
                      return (
                        <span
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                          }}
                          key={key}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </p>

                  {idUser === recipe.author && (
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Pencil
                        size={32}
                        onClick={() => {
                          localStorage.setItem(
                            "recipeEdit",
                            JSON.stringify(recipe)
                          );
                          setTimeout(() => {
                            navigate("/recipe/edit/" + recipe._id);
                          }, 600);
                        }}
                      />{" "}
                      <Trash
                        color={"red"}
                        onClick={() => {
                          removeRecipes(recipe._id);
                        }}
                        size={32}
                      />
                    </div>
                  )}
                </li>
              ))
            : recipes.map((recipe) => (
                <li
                  key={recipe._id}
                  style={{
                    width: isMobile ? "250px" : "300px",
                    border: "1px solid",
                    "list-style-type": "none",
                    padding: "8px",
                    maxHeight: "300px",
                  }}
                >
                  <img
                    src={recipe.image}
                    style={{ width: "100%", height: "50%", cursor: "pointer" }}
                    onClick={async () => {
                      const filterData = await recipes.filter((item) => {
                        return item._id === recipe._id;
                      });

                      await localStorage.setItem(
                        "recipe",
                        JSON.stringify(filterData[0])
                      );
                      setTimeout(() => {
                        navigate("/recipe/" + recipe._id);
                      }, 600);
                    }}
                  />
                  <h3
                    style={{
                      "text-align": "center",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={async () => {
                      const filterData = await recipes.filter((item) => {
                        return item._id === recipe._id;
                      });

                      await localStorage.setItem(
                        "recipe",
                        JSON.stringify(filterData[0])
                      );
                      setTimeout(() => {
                        navigate("/recipe/" + recipe._id);
                      }, 600);
                    }}
                  >
                    {" "}
                    {recipe.title}
                  </h3>
                  <p
                    style={{
                      "text-align": "center",
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                    onClick={async () => {
                      const filterData = await recipes.filter((item) => {
                        return item._id === recipe._id;
                      });

                      await localStorage.setItem(
                        "recipe",
                        JSON.stringify(filterData[0])
                      );
                      setTimeout(() => {
                        navigate("/recipe/" + recipe._id);
                      }, 600);
                    }}
                  >
                    {" "}
                    {recipe?.categories?.map((item, key) => {
                      return (
                        <span
                          style={{
                            padding: "8px",
                            borderRadius: "8px",
                          }}
                          key={key}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </p>

                  {idUser === recipe.author && (
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Pencil
                        size={32}
                        onClick={() => {
                          localStorage.setItem(
                            "recipeEdit",
                            JSON.stringify(recipe)
                          );
                          setTimeout(() => {
                            navigate("/recipe/edit/" + recipe._id);
                          }, 600);
                        }}
                      />{" "}
                      <Trash
                        color={"red"}
                        onClick={() => {
                          removeRecipes(recipe._id);
                        }}
                        size={32}
                      />
                    </div>
                  )}
                </li>
              ))}
        </ul>
      </>
    </Container>
  );
}
