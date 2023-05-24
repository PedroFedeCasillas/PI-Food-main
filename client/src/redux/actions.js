import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_NAME = "GET_RECIPE_BY_NAME";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const FILTER_MY_RECIPES = "FILTER_MY_RECIPES";
export const SORT_BY_ORDER = "SORT_BY_ORDER";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";


const URL = "http://localhost:3001/";


//=================>>>>get recetas<<<<=================//
 export const getRecipes = () => {
     return async function (dispatch) {
         try {
             let response = await axios.get(`${URL}recipes`, { timeout: 5000 })
             return dispatch({ type: GET_RECIPES, payload: response.data })
         }   catch (error) {
             console.log(error)
         }
     }
 };


//=================>>>>Post = Agregar<<<<=================//
export const createRecipe = (payload) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${URL}recipes/create`, payload)
            return dispatch({ type: CREATE_RECIPE, payload: response.data })
        }   catch (error) {
            console.log(error)
        }
    }
};


//=================>>>>obtener recetas por nombre<<<<=================//
export const getRecipeByName = (name) => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${URL}recipes?name=${name}`)
            return dispatch({ type: GET_RECIPE_BY_NAME, payload: response.data })
        }   catch (error) {
            console.log(error)
        }
    }
};

//=================>>>>obtener recetas por ID<<<<=================//
const getRecipeById = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios.get(`${URL}recipes/${id}`)
            return dispatch({ type: GET_RECIPE_BY_ID, payload: response.data })
        }   catch (error) {
            console.log(error)
        }
    }
};

//=================>>>>filtrar las recetas<<<<=================//
export const filterMyRecipes = (created) => {
    return {
        type: FILTER_MY_RECIPES,
        payload: created
    }
};

//=================>>>>ordenar las recetas<<<<=================//
export const sort = (order) => {
    return {
        type: SORT_BY_ORDER,
        payload: order
    }
};

 //=================>>>>obtener la lista de dietas<<<<=================//
 export const getDiets = () => {
     return async function (dispatch) {
         try {
             let response = await axios.get(`${URL}diets`)
             return dispatch({ type: GET_DIETS, payload: response.data })
         }   catch (error) {
             console.log(error)
         }
     }
 };


//=================>>>>filtrar las recetas según una dieta <<<<=================//
export const filterByDiet = (diet) => {
    return {
        type: FILTER_BY_DIET,
        payload: diet
    }
};

export default getRecipeById;