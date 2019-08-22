import React, {Component} from 'react';
import RecipesList from "./components/recipesList";
import AddedIngredients from "./components/addedIngredient";
import Form from "./components/form";
import './App.css';
import "./styles.scss";
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'http://www.recipepuppy.com/api/?i=';

class App extends Component {
    state = {
        data: [],
        ingredients: [],
        inputVal: '',
        addedIngredient: [],
        recipesToShow: []
    };

    componentDidMount() {
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
                console.log(contents);
            })
            .catch(() => console.log("Can’t access " + targetUrl + " response. Blocked by browser?"))
    }

    searchForRecipes = (url)=>{
        fetch(url)
            .then(response => response.json())
            .then(contents => {
                this.setState({
                    addenIngredient:[],
                    recipesToShow:contents.results
                })
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }  ;


    handleOnChange = (e) => {
        this.setState({
            inputVal: e.target.value
        });
    };
    handleOnClick = (e) => {
        e.preventDefault();
        let addedIngredient = this.state.addedIngredient;
        addedIngredient.push(this.state.inputVal);
        this.setState({
            inputVal: '',
            addedIngredient
        });
    };

    handleOnSubmit = (e) => {
        e.preventDefault();
        const ending = this.state.addedIngredient.join(',').replace("[^a-zA-Z0-9]", "").toLowerCase();
        this.searchForRecipes(proxyUrl+ targetUrl + ending);
        // this.setState({
        //     addedIngredient: [],
        // });
        // const arr = [];
        // this.state.data.forEach(el => {
        //     this.state.addedIngredient.forEach(a => {
        //         if (el.ingredients.includes(a)) {
        //             arr.push(el)
        //         }
        //     })
        // });
        // console.log(arr);
        // this.setState({
        //     recipesToShow: arr
        // })

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
                <RecipesList recipes={this.state.recipesToShow}/>
            </>
        )
    }
}

export default App;
