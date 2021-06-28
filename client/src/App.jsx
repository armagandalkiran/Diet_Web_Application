import React from "react";
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Ingredients from "./pages/Ingredients";
import Reports from "./pages/Reports";

var trueOrFalse = localStorage.getItem('rememberMe') ==='true';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route  path="/Anasayfa" render={() => (
          (trueOrFalse) ? (
             <Home />
          ) : (
             <Redirect to="/"/>
          )
        )}/>
        <Route exact path="/Register" component={Register}/>
        <Route exact path="/Malzemeler" component={Ingredients}/>
        <Route exact path="/Raporlar" component={Reports}/>
      </Switch>
    </Router>
  )
}

export default App;

