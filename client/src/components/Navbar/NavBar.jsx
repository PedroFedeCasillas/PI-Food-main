import React from "react";
import { Link } from "react-router-dom";
import style from "./Navbar.module.css"
import SearchBar from "../SearchBar/SearchBar"


const NavBar = () => {
    return (
        <div className={style.container}>
            
            <nav className={style.navbar}>
            <div className={style.items}>
                <Link to='/' className={style.logo}>FoodPI🍑</Link> 
                <Link to="/home" className={style.item}>Home</Link>
                <Link to="/recipes/create" className={`${style.item} ${style.item_create}`}>Crea tu receta</Link>
                <Link to="/about" className={style.item}>About</Link>
                <div className={style.Search}><SearchBar/></div>   
                </div>
            </nav>
            
        </div>
    )
};

export default NavBar;