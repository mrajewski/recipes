import React from 'react';

function Form(props) {
    const {click, submit, change, inputVal, data} = props;
    return (
        <form onSubmit={submit}>
            <input onChange={change} type="text" value={inputVal} list='data'/>
            <datalist id='data'>
                {data.map((ingredientExample,index)=>{
                    return <option key={index} value={ingredientExample}/>
                })}
            </datalist>
            <button onClick={click}>ADD INGREDIENT</button>
            <button type='submit'>SEARCH</button>
        </form>
    )
}

export default Form