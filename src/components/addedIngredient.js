import React from 'react';

function AddedIngredients(props) {
    return (
        <ul className='added-list'>
            {props.list.map((el,i)=>{
                return <li onClick={e => {props.delete(e,i)}} key={i}># {el}</li>

            })}
        </ul>

    )
}

export default AddedIngredients