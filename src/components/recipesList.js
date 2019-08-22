import React from 'react';


function RecipeList(props) {

    return (
        <div className='recipes-container'>
            {props.recipes.map(el=>{
                return <div className='recipes-el'>
                    <h3>{el.title}</h3>
                    <ul>
                        {el.ingredients.split(', ').map(a=>{
                            return <li>{a}</li>
                        })}
                    </ul>
                    <a href={el.href}>LINK</a>
                    <img src={el.thumbnail} alt=""/>
                </div>

            })}

        </div>
    )
}

export default RecipeList