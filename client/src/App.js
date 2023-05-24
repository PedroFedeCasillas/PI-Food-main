import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from "./components/Home/Home";
import CreateRecipe from "./components/CreateRecipe/CreateRecipe";
import RecipeDetail from "./components/Detail/RecipeDetail";
import About from "./components/about/About";
import LandingPage from './components/LandingPage/LandingPage';
import NavBar from './components/Navbar/NavBar';




function App() {
  return (
    <>
       <Route path="/home" component={NavBar}></Route>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route  path="/home" component={Home}></Route>
        <Route path="/recipes/create" component={CreateRecipe}></Route>
        <Route path="/recipes/:id" component={RecipeDetail}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
    </>
  )
};

export default App;
