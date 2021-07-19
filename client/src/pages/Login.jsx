import React,{useState} from 'react';
import Axios from "axios";
import {useHistory } from "react-router-dom";
import "../css/Login.css"

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
        routeChange("/Anasayfa");
      } 
    }

    return (
        
        <div>
          <div className="login_screen">
            <div className="login-screen-icon-container">
              <i className='bx bx-pulse bx-tada'></i>
            </div>
            <form className="form_container">
              <input className="login_input"
                onChange={handleChange}
                name="email"
                value={userInfo.email}
                placeholder="Kullanici Adi"
              />
              <input className="login_input"
                onChange={handleChange}
                name="password"
                value={userInfo.password}
                type="password"
                placeholder="Sifre"
              />
              <button className="login_button" onClick={login}>Giris Yap</button>
            </form>
            <footer>
              © Görkem Armağan Dalkıran 2021
            </footer>
          </div>
        </div>
    )
}

export default Login;
