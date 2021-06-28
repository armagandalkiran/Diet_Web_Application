import React,{useState} from 'react';
import Axios from "axios";

function Register() {

    const [userInfo,setUserInfo] = useState({
        name: "",
        surname:"",
        email: "",
        password: "",
        type: 0,
    });

    function handleChange(event) {
        const {name, value} = event.target;

        setUserInfo(prevValue => {
            return {
            ...prevValue,
            [name] : value
            };
        });
    }

    const register = (e) => {
        console.log(userInfo);
        e.preventDefault();
        Axios.post("/register",userInfo).then(response=>{
            console.log(response);
        })
    }

    return (
        <div>
            <h1>
            -~ Register Page Boilerplate ~-
          </h1>
          <form>
            <input
              onChange={handleChange}
              name="name"
              value={userInfo.name}
              placeholder="Name"
            />
            <input
              onChange={handleChange}
              name="surname"
              value={userInfo.surname}
              placeholder="Surname"
            />
            <input
              onChange={handleChange}
              name="email"
              value={userInfo.email}
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              name="password"
              value={userInfo.password}
              placeholder="Password"
            />
            <button onClick={register}>Register</button>
          </form>
        </div>
    )
}

export default Register;


