import React from 'react';
import 'simplebar';
import 'simplebar/dist/simplebar.css';

function RecipeList(props) {
    return (
        <section className='recipes-container'>
            {props.recipes.map((recipe, index) => {
                return <div key={index} className='recipes-el'>
                    <img src={recipe.thumbnail} alt=""/>
                    <h3>{recipe.title}</h3>
                    <ul data-simplebar>
                        <span>Ingredients:</span>
                        {recipe.ingredients.split(', ').map((ingredient, i) => {
                            return <li key={i}># {ingredient}</li>
                        })}
                    </ul>
                    <a href={recipe.href} rel="noopener noreferrer" target='_blank'>Read more</a>
                </div>
            })}
        </section>
    )
}

export default RecipeList