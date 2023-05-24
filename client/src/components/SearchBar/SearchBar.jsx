import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../../redux/actions"; 
import style from "./SearchBar.module.css";



function SearchBar() {
    
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    const handleSearch = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getRecipeByName(name));
        setName("");
    };

    return (
        <div className={style.SearchBarCont}>
           
            <input className={style.InputBar} 
                   type="search" 
                   name="search"
                   value={name}
                   placeholder="Ingrese el nombre receta" 
                   onChange={(e) => handleSearch(e)} />

            <button className={style.SearchBtn} 
                    type="submit" 
                    onClick={(e) => handleSubmit(e)}> Buscar </button>
        </div>
    );
}

export default SearchBar;