import React from 'react';


function AddedIngredients(props) {

    return (
        <ul className='added-list'>
            {props.list.map((el,i)=>{
                return <li key={i}>{el}</li>

            })}

        </ul>

    )
}

export default AddedIngredients