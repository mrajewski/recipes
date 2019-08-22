import React, {Component} from 'react';
import RecipesList from "./components/recipesList";
import AddedIngredients from "./components/addedIngredient";
import Form from "./components/form";
import './App.css';
import "./styles.scss";

class App extends Component {
    state = {
        data: [],
        ingredients: [],
        inputVal: '',
        addedIngredient: []
    };
    componentDidMount() {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'http://www.recipepuppy.com/api/';
        fetch(proxyUrl + targetUrl)
            .then(response => response.json())
            .then(contents => {
                // Making list with all ingredients (sorted and no duplicates)
                const ing = contents.results.map(el => el.ingredients.split(", "));
                const arr = ing.reduce((a, b) => [...a, ...b]);
                this.setState({
                    data: contents.results,
                    ingredients: [...new Set(arr)].sort()
                });
                console.log(this.state.ingredients);
                console.log(this.state.data);
            })
            .catch(() => console.log("Can’t access " + targetUrl + " response. Blocked by browser?"))
    }
    handleOnChange = (e) => {
        this.setState({
            inputVal: e.target.value
        });
    };
    handleOnClick = () => {
        let addedIngredient = this.state.addedIngredient;
        addedIngredient.push(this.state.inputVal);
        this.setState({
            inputVal: '',
            addedIngredient
        });
        console.log(this.state.addedIngredient);
    };

    handleOnSubmit = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <>
                <Form click={this.handleOnClick}
                      change={this.handleOnChange}
                      data={this.state.ingredients}
                      submit={this.handleOnSubmit}
                      inputVal={this.state.inputVal}
                />
                <AddedIngredients list={this.state.addedIngredient}/>
                <RecipesList/>
            </>
        )
    }
}

export default App;
