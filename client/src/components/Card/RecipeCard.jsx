import React from "react";
import { Link } from "react-router-dom";
import style from "./RecipeCard.module.css";


export const RecipeCard = ({ id, name, image, healthScore, diets }) => {
    return (
        
            <div className={style.RecipeContainer}>
                <div className={style.NameImageContainer}>
                <Link to={`/recipes/${id}`} className={style.Link}>
                    <h1 className={style.RecipeName}> {name} </h1>
                </Link>
                    <img src={image} alt={name} width="300px" />
                </div>
                <div className={style.InfoContainer}>
                    <span className={style.InfoName}> Tipo de dieta: </span> 
                    {
                        diets.length?
                        <span className={style.InfoContent}> {diets.charAt(0).toUpperCase() + diets.slice(1)} </span> :
                        <span className={style.InfoContent}> No hay dietas para esta receta todavía </span>
                    }
                </div>
                <div className={style.InfoContainer}>
                    <span className={style.InfoName}> Puntuación de salud: </span>
                    <span className={style.InfoContent}> {healthScore} </span>
                </div>
            </div>
        
    )
};



