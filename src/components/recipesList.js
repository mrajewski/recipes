import React from 'react';


function RecipeList(props) {

    return (
        <section className='recipes-container'>
            {props.recipes.map((recipe,index)=>{
                return <div key={index} className='recipes-el'>
                    {/*<div className="recipes-img">*/}
                        <img src={recipe.thumbnail} alt=""/>
                    {/*</div>*/}
                    <h3>{recipe.title}</h3>
                    <ul>
                        {recipe.ingredients.split(', ').map((ingredient,i)=>{
                            return <li key={i}>{ingredient}</li>
                        })}
                    </ul>
                    <a href={recipe.href}>LINK</a>
                </div>

            })}

        </section>
    )
}

export default RecipeList