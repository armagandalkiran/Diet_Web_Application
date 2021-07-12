import React from "react";
import {BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Ingredients from "./pages/Ingredients";
import Reports from "./pages/Reports";
import Guests from "./pages/Guests";
import Menu from "./pages/Menu";
import MakeMenu from "./pages/MakeMenu";
import ShowMenu from "./pages/ShowMenu";
import ShowTotalWeight from "./pages/ShowTotalWeight";

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
        <Route exact path="/Misafirler" component={Guests}/>
        <Route exact path="/Menu" component={Menu}/>
        <Route exact path="/MenuOlustur" component={MakeMenu}/>
        <Route exact path="/MenuGoruntule" component={ShowMenu}/>
        <Route exact path="/ToplamGramaj" component={ShowTotalWeight}/>
      </Switch>
    </Router>
  )
}

export default App;

