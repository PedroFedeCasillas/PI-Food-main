import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterMyRecipes, filterByDiet, sort } from "../../redux/actions"; 
import Paginado from "../Paginado/Paginado";
import { RecipeCard } from "../Card/RecipeCard";
import styles from "./Home.module.css";
import defaultImg from "../../assets/img/defaultImg.jpg";
import loader from "../../assets/img/loader.gif";

const Home = () => {
  const dispatch = useDispatch()
  const allRecipes = useSelector((state) => state.recipes)

  // paginado
  const [/*order*/, setOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, /*setRecipesPerPage*/] = useState(9)
  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
  

  const paginacion = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getRecipes())
  }, [dispatch])
 
  // FILTERS
  const handlerFilterByDiet = (e) => { 
    dispatch(filterByDiet(e.target.value)) 
  }

  const handlerFilterMyRecipes = (e) => {
    dispatch(filterMyRecipes(e.target.value))
  }

  // SORT
  const handlerSort = (e) => {
    e.preventDefault()
    dispatch(sort(e.target.value))
    setCurrentPage(1)
    setOrder(e.target.value)
  }

  const resetFilters = (e) => {
    e.preventDefault()
    document.getElementById("filter1").value = "NoSort"
    document.getElementById("filter2").value = "All"
    document.getElementById("filter3").value = "All"
    setCurrentPage(1)
    setOrder('')
    dispatch(getRecipes())
  }

  return (
    <div className={styles.home}>
        
          
          <div className={styles.filtersCont}>
            {/* BOTÓN PARA RESETEAR FILTROS */}
            <button className={styles.getAllBtn} onClick={resetFilters}> Restablecer filtros </button>
            {/* SORTS */}
            <select id="filter1" className={styles.filter1} onChange={(e) => {handlerSort(e)}}>
              <option value="NoSort"> Sin orden </option>
              <option value="AlphAsc"> A - Z </option>
              <option value="AlphDesc"> Z - A </option>
              <option value="ScoreAsc"> Puntuación de salud más baja </option>
              <option value="ScoreDesc"> Puntaje de salud más alto </option>
            </select>
            {/* FILTERS */}
            <select id="filter2" className={styles.filter2} onChange={(e) => {handlerFilterByDiet(e)}}>
              <option value="All"> Todas las dietas </option>
              <option value="gluten free"> Sin gluten </option>
              <option value="ketogenic"> Cetogénico </option>
              <option value="dairy free"> Libre de lácteos </option>
              <option value="lacto ovo vegetarian"> Lacto-Ovo-Vegetariana </option>
              <option value="vegan"> Vegana </option>
              <option value="pescatarian"> Pescatariano </option>
              <option value="paleolithic"> Paleo </option>
              <option value="primal"> Primitiva </option>
              <option value="fodmap friendly"> FODMAP bajo </option>            
              <option value="whole 30"> Entero 30 </option>
            </select>
            <select id="filter3" className={styles.filter3} onChange={(e) => {handlerFilterMyRecipes(e)}}>
              <option value="All"> Todas las recetas </option>
              <option value="Created"> Mis recetas </option>
            </select>
          </div>
          <div>
            <Paginado 
              recipesPerPage={recipesPerPage}
              allRecipes={allRecipes.length}
              currentPage={currentPage}
              paginacion={paginacion}       
            />
          </div>
      
        
          <div className={styles.contenRecipes}>
            {   
              Array.isArray(currentRecipe)?
                currentRecipe[0]?
                currentRecipe.map(recipe => {
                  return (
                    <div key={recipe.id}>
                      <RecipeCard 
                        id={recipe.id}
                        name = {recipe.name}
                        image = {recipe.image ? recipe.image : defaultImg}
                        diets = {recipe.diets}
                        healthScore = {recipe.healthScore}
                      />
                    </div>
                  )
                }): <div className={styles.loadingContainer}>
                      <img className={styles.loaderGif} src={loader} alt="Loader" />
                      <p className={styles.loader}> Cooking... </p>
                    </div>
              : <div className={styles.eContainer}>
                  <p className={styles.error}> No se encontraron recetas con ese nombre </p>
                </div>
                
            }
          </div> {/* recetas */}
      
    </div> 
  )
};

export default Home;