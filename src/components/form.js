import React from 'react';
import Add from '@material-ui/icons/Add';

function Form(props) {
    const {click, submit, change, inputVal, data} = props;
    return (
        <form onSubmit={submit}>
            <label>
                <input onChange={change} type="text" value={inputVal} list='data' placeholder='Choose product'/>
            </label>
            <button className='add-btn' onClick={click}>
                <Add/>
            </button>
            <button className='search-btn' type='submit'>SEARCH</button>
            <datalist id='data'>
                {data.map((ingredientExample, index) => {
                    return <option key={index} value={ingredientExample}/>
                })}
            </datalist>
        </form>
    )
}

export default Form