import React, {Component} from 'react';
import RecipesList from "./components/recipesList";
import AddedIngredients from "./components/addedIngredient";
import Form from "./components/form";
import Loader from "./components/loader";
import Header from "./components/header";
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
        recipesToShow: [],
        // pageLoaded: false,
        recipesLoaded: true,
        onHover:false
    };

    componentDidMount() {
        fetch(proxyUrl + targetUrl)
            .then(response => response.json())
            .then(contents => {
                // Making list with example ingredients (sorted and no duplicates)
                const ing = contents.results.map(el => el.ingredients.split(", "));
                const arr = ing.reduce((a, b) => [...a, ...b]);
                this.setState({
                    data: contents.results,
                    ingredients: [...new Set(arr)].sort(),
                    pageLoaded:true
                });
            })
            .catch(() => console.log("Can’t access " + targetUrl + " response. Blocked by browser?"))
    }

    //Searching for no recipes
    searchForRecipes = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(contents => {
                this.setState({
                    recipesToShow: contents.results,
                    inputVal: '',
                    recipesLoaded:true
                })
            })
            .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    };


    handleOnChange = (e) => {
        this.setState({
            inputVal: e.target.value
        });
    };
    handleOnClick = (e) => {
        e.preventDefault();
        if (this.state.inputVal.length <=0){
            return null
        }
        let addedIngredient = this.state.addedIngredient;
        addedIngredient.push(this.state.inputVal);
        this.setState({
            inputVal: '',
            addedIngredient,
        });
    };

    deleteClick = (e,index) => {
      e.preventDefault();
      this.setState({
          addedIngredient: this.state.addedIngredient.filter((el,i)=> i!==index)
      })




    };


    handleOnSubmit = (e) => {
        e.preventDefault();
        if(this.state.addedIngredient.length<1){
            alert('You have to choose at least one ingredient');
            return null
        }
        this.setState({
            recipesLoaded:false,
            addedIngredient: []

        });
        const ending = this.state.addedIngredient.join(',').replace("[^a-zA-Z0-9]", "").toLowerCase();
        this.searchForRecipes(proxyUrl + targetUrl + ending);
    };

    render() {
            return (
                <>
                    <Header/>
                    <section className='search-engine'>
                    <Form click={this.handleOnClick}
                          change={this.handleOnChange}
                          data={this.state.ingredients}
                          submit={this.handleOnSubmit}
                          inputVal={this.state.inputVal}
                    />
                    <AddedIngredients
                        delete={this.deleteClick}
                        list={this.state.addedIngredient}
                    />
                    </section>
                    {this.state.recipesLoaded?<RecipesList recipes={this.state.recipesToShow}/>:<Loader/>}
                </>
            )
    }
}

export default App;
