import React from 'react';
import style from "./Paginado.module.css";

const Paginado = ({ recipesPerPage, allRecipes, currentPage, paginacion })  =>{
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) { 
        pageNumbers.push(i)
    } 

    const handlePrev = (e) => {
        e.preventDefault()
        paginacion(currentPage - 1)
    }

    const handleNext = (e) => {
        e.preventDefault()
        paginacion(currentPage + 1)
    }

    return (
        <div className={style.PagContainer}>
            <ul className={style.PageList}>
                <li className={style.PageNum}>
                    <button className={style.PageBtn} onClick={handlePrev}  disabled={currentPage === pageNumbers[0]}> Anterior </button>
                </li>
                {
                    pageNumbers.map((num) => {
                        return (
                            <li className={style.PageNum} 
                                key={num} 
                                active={num === currentPage}
                                onClick={() => paginacion(num)} 
                                id={num}
                            >
                                <button className={style.PageBtn}> {num} </button>
                            </li>
                        )
                    }) 
                }
                <li className={style.PageNum}>
                    <button className={style.PageBtn} onClick={handleNext} disabled={currentPage === pageNumbers[pageNumbers.length - 1]}> Siguiente </button>
                </li>
            </ul>
        </div>
    )
};



export default Paginado;