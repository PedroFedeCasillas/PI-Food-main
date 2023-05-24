const axios = require("axios");
const { Recipe, Diet } = require("../db");
require('dotenv').config();
//const { API_KEY } = process.env;
//const URL = "https://api.spoonacular.com/recipes/complexSearch/";


//==========>>>OBTENER Y COMBINAR DATOS DE API Y BASE DE DATOS<<<==========//
const getDataFromApi = async () => {
  try {
    const response = await axios.get(
       "https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5"
    //   `${URL}?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
     );
   
     const { results } = response.data;
     const dataFromApi = results.map((recipe) => ({
       id: recipe.id,
       name: recipe.title,
       image: recipe.image,
       summary: recipe.summary.replace(/<[^>]*>?/g, ""),
       healthScore: recipe.healthScore,
       steps: recipe.analyzedInstructions[0]?.steps.map((r) => r.step),
       diets: recipe.diets.join(", "),
     }));
   
     return dataFromApi; 
  } catch (error) {
    console.log(error);
  }

};

const getDataFromDb = async () => {
  const dataFromDb = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return dataFromDb;
};

const fetchDataFromDb = async () => {
  const [dataDb] = await Promise.all([getDataFromDb()]);
  const recipesFromDb = dataDb.map((r) => ({
    id: r.id,
    name: r.name,
    image: r.image,
    summary: r.summary,
    healthScore: r.healthScore,
    steps: r.steps,
    diets: r.diets.length ? r.diets.map((d) => d.name).join(", ") : r.diets,
  }));

  return recipesFromDb;
};

const getAllRecipes = async () => {
  const apiRecipes = await getDataFromApi();
  const dbRecipes = await fetchDataFromDb();

  const allRecipes = [...apiRecipes, ...dbRecipes];
  const uniqueRecipes = Array.from(new Set(allRecipes.map((recipe) => recipe.id)))
    .map((id) => allRecipes.find((recipe) => recipe.id === id));

  return uniqueRecipes;
};

//==========>>>CONTROLADORES DE RECETAS<<<==========/
const getRecipeById = async (id) => {
  const allRecipes = await getAllRecipes();
  const recipeById = allRecipes.filter((r) => r.id == id);
  if (recipeById.length > 0) {
    return recipeById;
  } else {
    throw new Error(`No se encontró ninguna receta con ID: ${id}`);
  }
};

const createRecipe = async (
  name,
  image,
  summary,
  healthScore,
  steps,
  diets,
) => {
  if (!name || !summary || !healthScore || !steps) {
    throw new Error("Falta información importante");
  }

  const newRecipe = await Recipe.create({
    name,
    image,
    summary,
    healthScore,
    steps,
    rica,
    diets,
  });

  await newRecipe.addDiet(diets);

  return newRecipe;
};

//==========>>>CONTROLADORES DE DIETA<<<==========/
const defaultDiets = [
  { name: "Gluten Free" },
  { name: "Ketogenic" },
  { name: "Lacto-Ovo-Vegetarian" },
  { name: "Vegan" },
  { name: "Pescatarian" },
  { name: "Paleo" },
  { name: "Primal" },
  { name: "Low FODMAP" },
  { name: "Whole 30" },
];

const getDiets = async () => {
  const allDiets = await Diet.findAll();
  if (allDiets.length > 0) {
  return allDiets.map((diet) => diet.name);
  } else {
  const createdDiets = await Diet.bulkCreate(defaultDiets);
  return createdDiets.map((diet) => diet.name);
  }
  };
  
  module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getDiets,
  };
