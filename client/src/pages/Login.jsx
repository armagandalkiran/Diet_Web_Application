import React,{useState} from 'react';
import Axios from "axios";
import {useHistory } from "react-router-dom";
import "./Login.css";

var isAuthenticated;

export function Login() {

    const [userInfo,setUserInfo] = useState({
        email: "",
        password:"",
    });

    // Handle route changes after login
    const history = useHistory();

    const routeChange = (path) =>{ 
        history.push(path);
    }

    // Handle form inputs  
    function handleChange(event) {
        const {name, value} = event.target;

        setUserInfo(prevValue => {
            return {
            ...prevValue,
            [name] : value
            };
        });
    }

    // Handle send backend the form inputs
    const login = (e) => {

        e.preventDefault();
        Axios.post("/",userInfo).then(response=>{
            console.log(response);
            isAuthenticated = response.data;
            localStorage.setItem('rememberMe',isAuthenticated);
            checkAuthentication();
        });
    }

    function checkAuthentication () {

      if(isAuthenticated === true){
        routeChange("/home");
      } 
    }

    return (
        <div className="login_screen">
            <h1 className="login_header">
            -~ Login Page Boilerplate ~-
          </h1>
          <form className="form_container">
            <input className="login_input"
              onChange={handleChange}
              name="email"
              value={userInfo.email}
              placeholder="Mail Adresiniz"
            />
            <input className="login_input"
              onChange={handleChange}
              name="password"
              value={userInfo.password}
              placeholder="Sifreniz"
            />
            <a className="register_directory" href="/register">Kayit ol</a>
            <button className="login_button" onClick={login}>Giris Yap</button>
          </form>
          <footer>
            © Görkem Armağan Dalkıran 2021
          </footer>
        </div>
    )
}

export default Login;