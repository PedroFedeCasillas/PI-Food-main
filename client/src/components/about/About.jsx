import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../Navbar/NavBar";
import myPhoto from "../../assets/aboutImgs/avatar-github.png";
import linkedin from "../../assets/aboutImgs/linkedin-logo.png";
import github from "../../assets/aboutImgs/github-logo.png";
import style from "./About.module.css";


const About = () => {
    return (
        <div className={style.AboutPage}>  
                <NavBar />
            <div className={style.AboutCont}>
                <dvi className={style.AboutMe}>
                    <img className={style.Img} src={myPhoto} alt="¡Ese soy yo!" width="200px" />
                    <div className={style.AboutMeInfo}>
                        <h3 className={style.AboutTitles}> Acerca de mi </h3>
                        <p>¡Hola! Mi nombre es Pedro Fede Casillas, de Argentina. Al momento de escribir (Lunes 08 de Mayo de 2023), soy Diseñador Multimedia y actualmente estoy estudiando Desarrollo Fullstack en HENRY. Estoy en las últimas etapas de mi primer paso como Desarrollador Fullstack y este proyecto es parte de eso. </p>
                    </div>
                </dvi>
                <div className={style.AboutPi}>
                    <h3 className={style.AboutTitles}> Acerca de este proyecto </h3>
                    <p>Este es un proyecto en solitario que forma parte de la asignación de un proyecto individual para HENRY. El tema es recetas de comida y el objetivo es crear un catálogo (una especie de libro de recetas)
                         obtener datos de una API externa y una base de datos hecha por mí, agregar filtros, encontrar información específica y una opción para ordenar esos datos, así como una opción para crear
                         su propia receta y agréguela a la base de datos. </p>
                </div>
                <div className={style.LinkCont}>
                    <div className={style.ExtLink}>
                        <div className={style.ExtLinkCont}>
                            <a href="https://www.linkedin.com/in/pedro-fede-casillas-b73778165/" target="_blank" rel="noreferrer">
                                <img src={linkedin} alt="LinkedIN logo" width="150px" />
                            </a>
                        </div>
                        <div className={style.ExtLinkCont}>
                            <a href="https://github.com/PedroFedeCasillas" target="_blank" rel="noreferrer">
                                <img src={github} alt="GitHub logo" width="150px" />
                            </a>
                        </div>
                    </div>
                    <Link to="/home">
                        <button className={style.BackBtn}> Volver al libro de recetas </button>
                    </Link>
                </div>
            </div>
        </div>
    )
};


export default About;