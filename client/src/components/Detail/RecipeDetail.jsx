import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../Navbar/NavBar";
import defaultImg from "../../assets/img/defaultImg.jpg";
import loader from "../../assets/img/loader.gif";
import style from "./RecipeDetail.module.css";


const RecipeDetail = () => {
    const { id } = useParams()
    const [recipeDetail, setRecipe] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3001/recipes/${id}`)
            .then((response) => response.json())
            .then((data) => setRecipe(data))
            .catch((error) => window.alert(`${error.message}`))
        return () => setRecipe({})
    }, [id])

    return (
        <div className={style.DetailPage}>   
                <NavBar />
            <div className={style.DetailCont}>
                {
                    recipeDetail[0]? (
                        <div>
                            <dvi className={style.TitleImage}>
                                <h1 className={style.RecipeName}> { recipeDetail[0].name } </h1>
                                {
                                    recipeDetail[0].image?
                                        <img src={recipeDetail[0].image} alt={recipeDetail[0].name} width="300px" height="250px" /> :
                                        <img src={defaultImg} alt="Default Recipe" width="300px" height="250px" />
                                }
                            </dvi>
                            <div className={style.InfoBox}>
                                <h3 className={style.InfoName}> Resumen: </h3>
                                <p className={style.InfoContent}> { recipeDetail[0].summary } </p>
                                <h3 className={style.InfoName}> Puntuación de salud: </h3>
                                <p className={style.InfoContent}> { recipeDetail[0].healthScore } </p>
                                <h3 className={style.InfoName}> Tipo de dieta: </h3>
                                {
                                    recipeDetail[0].diets.length?
                                        <p className={style.InfoContent}> { recipeDetail[0].diets } </p> :
                                        <p className={style.InfoContent}> No hay dietas para esta receta todavía </p>
                                }
                                <h3 className={style.InfoName}>Pasos: </h3>
                                {
                                    recipeDetail[0].steps
                                        ? <p className={style.InfoContent}> { recipeDetail[0].steps } </p>
                                        : <p className={style.InfoContent}> Esta receta no tiene pasos. </p>
                                }
                                <Link to="/home">
                                    <button className={style.BackBtn}> Volver al libro de recetas </button>
                                </Link>
                            </div>
                        </div>
                    ) : <div className={style.LoaderCont}>
                            <img className={style.LoaderGif} src={loader} alt="Loader" />
                            <p className={style.Loader}> Cooking... </p>
                        </div>
                }
            </div>
        </div>
    )
};


export default RecipeDetail;