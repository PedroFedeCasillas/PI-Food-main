const { Router } = require("express");
//const { Recipe, Diet } = require("../../db");
const { getAllRecipes, getRecipeById, createRecipe } = require("../../controllers/controllers");

const recipeRouter = Router();

recipeRouter.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    const allRecipes = await getAllRecipes();
    if (!name) return res.status(200).json(allRecipes);
    const filterByName = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(name.toLowerCase())
    );
    if (filterByName.length === 0)
      return res.status(200).json(`No hay recetas con el nombre: ${name}`);
    res.status(200).json(filterByName);
  } catch (error) {
    res.status(404).json({ error: "Error al recuperar recetas" });
  }
});

recipeRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipeById = await getRecipeById(id);
    res.status(200).json(recipeById);
  } catch (error) {
    res.status(404).json({ error: "Receta no encontrada" });
  }
});

recipeRouter.post("/create", async (req, res) => {
  try {
    const { name, image, summary, healthScore, steps, diets } = req.body;
    const newRecipe = await createRecipe(name, image, summary, healthScore, steps, diets);
    res.status(201).json({ message: `Receta "${name}" agregado exitosamente` });
  } catch (error) {
    res.status(400).json({ error: "Error al crear receta" });
  }
});

module.exports = recipeRouter;

