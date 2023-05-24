import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory } from "react-router-dom";
import { createRecipe, getRecipes, getDiets } from "../../redux/actions";
import NavBar from "../Navbar/NavBar";
import styles from "./CreateRecipe.module.css";


const validation = (input, recipes) => {
    const nameRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9](?:[A-Za-z0-9 _]+){4,50}$/
    const scoreRegex = /^[0-9\b]+$/
    const summaryRegex = /^.{5,1000}/
    const imageRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|png|gif|webp)/i;


    let errors = {}

      // ERRORSS POR NOMBRE
      if (!input.name.trim) errors.name = "Nombre de receta requerido."
      else if (!nameRegex.test(input.name)) errors.name = "Por favor, no incluya caracteres especiales."
      else if (recipes.some((e) => e.name.toLowerCase() === input.name.toLowerCase())) errors.name = "Esta receta ya está en el recetario."
      // ERRORES PARA RESUMEN
      else if (!input.summary) errors.summary = "Resumen de la receta requerido."
      else if (!summaryRegex.test(input.summary)) errors.summary = "El resumen debe tener entre 5 y 500 caracteres"
      // ERRORES POR PUNTUACIÓN DE SALUD
      else if (!input.healthScore) errors.healthScore = "Puntuación requerido."
      else if (!scoreRegex.test(input.healthScore)) errors.healthScore = "El puntaje de salud debe ser un número"
      else if (input.healthScore < 0 || input.healthScore > 100) errors.healthScore = "La puntuación debe estar entre 0 y 100"
      // ERRORES DE IMAGEN
      else if (!imageRegex.test(input.image)) errors.image = "URL invalida. Una imagen es opcional"
      return errors
  };

const CreateRecipe = () => {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state.allRecipes)
    const diets = useSelector((state) => state.diets)
    const history = useHistory() // useNavigate
    
    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: []
    })
    
    const [errors, setErrors] = useState({})
    
    useEffect(() => {
        dispatch(getRecipes())
        dispatch(getDiets())
    }, [dispatch])

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validation({
                ...input,
                [e.target.name]: e.target.value
            }, recipes)
        )
    }

    const handleSelect = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }   else {
            setInput({
                ...input, 
                diets: input.diets.filter(diet => diet !== e.target.value)
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.name || !input.summary || !input.healthScore || !input.steps) {
          alert("Por favor, completa todos los campos obligatorios");
          return;
        }
        dispatch(createRecipe(input));
        alert("Receta añadida al recetario");
        setInput({
          name: "",
          summary: "",
          healthScore: "",
          steps: "",
          image: "",
          diets: []
        });
        history.push("/home");
      };
      

    return (
        
           
            <div className={styles.createCont}>
            <NavBar />
                <div className={styles.createForm}>
                    <div>
                        <h1 className={styles.createTitle}> Crea tu receta </h1>
                    </div>
                    <div className={styles.formCont}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Nombre*: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="text"
                                        placeholder="Dale un nombre a tu receta"
                                        name="name"
                                        value={input.name}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Resumen*: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="text"
                                        placeholder="Una breve descripción de tu receta."
                                        name="summary"
                                        value={input.summary}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Puntuación de salud*: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="number"
                                        placeholder="Qué tan saludable es?"
                                        name="healthScore"
                                        min="1"
                                        max="100"
                                        value={input.healthScore}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Pasos*: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="text"
                                        placeholder="Comparte cómo hacerlo"
                                        name="steps"
                                        value={input.steps}
                                        onChange={(e) => handleInputChange(e)}         
                                    />
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Imagen*: </label>
                                <div>
                                    <input
                                        className={styles.inputArea}
                                        type="text" 
                                        id="url"
                                        name="image"
                                        placeholder="Díganos dónde encontrar su imagen (escriba una URL)"
                                        value={input.image}
                                        onChange={(e) => handleInputChange(e)}           
                                    />
                                </div>
                            </div>
                            <div className={styles.inputCont}>
                                <label className={styles.inputTitle}> Tipo de dieta: </label>
                                <div>
                                    {diets.map((diet) => {
                                        return (
                                            <span className={styles.checkboxSpan} key={diet.id}>
                                                <input
                                                    className={styles.inputCheckbox}
                                                    type="checkbox"
                                                    value={diet.id}
                                                    name={diet.name}
                                                    onChange={(e) => handleSelect(e)}
                                                />
                                                <p> {diet.name} </p>
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={styles.errorsCont}>
                                <span className={styles.checkboxItems}> * Información requerida </span>
                                { errors.name && <p className={styles.inputError}>{errors.name}</p> }
                                { errors.summary && <p className={styles.inputError}>{errors.summary}</p> }
                                { errors.healthScore && <p className={styles.inputError}>{errors.healthScore}</p> }
                                { errors.steps && <p className={styles.inputError}>{errors.steps}</p>}
                                { errors.image && <p className={styles.inputError}>{errors.image}</p>}

                            </div>
                            <div className={styles.btnCont}>
                                <button className={styles.createBtn} type="submit" disabled={errors.name || errors.summary || errors.healthScore || errors.steps || errors.image}> CREAR </button>
                            </div>
                        </form>
                    </div> {/* Form Container */}
                </div> {/* Create Form */}
            </div>
        
    )
};

export default CreateRecipe;