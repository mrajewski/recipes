import React from 'react';

function Form(props) {
    const {click, submit, change, inputVal, data} = props;
    return (
        <form onSubmit={submit}>
            <label>
                <input onChange={change} type="text" value={inputVal} list='data' placeholder='Choose product'/>
            </label>
            <datalist id='data'>
                {data.map((ingredientExample, index) => {
                    return <option key={index} value={ingredientExample}/>
                })}
            </datalist>
            <div className="buttons">
                <button onClick={click}>ADD INGREDIENT</button>
                <button type='submit'>SEARCH</button>
            </div>

        </form>
    )
}

export default Form