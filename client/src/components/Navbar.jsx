import React,{useState} from "react";
import {NavLink} from "react-router-dom"
import "./Navbar.css";

function Navbar(){

  var initialToggleValue = false;
  const [isToggle,setIsToggle] = useState(initialToggleValue);

  return (
    <div className={isToggle === false ? "navbar-body" : "navbar-body body-pd"} id="body-pd">
      <div>
      
        <header className={isToggle === false ? "header": "header body-pd"} id="header">
            <div onClick={()=> setIsToggle(initialToggleValue => !initialToggleValue)} className="header__toggle">
                <i className={isToggle === false ? "bx bx-menu" : "bx bx-menu bx-x"} id="header-toggle"></i>
            </div>
            <div className="header-user">
              <p>Prof Dyt Ozlem Dinc</p>
              <div className="header__img">
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQGVeQxbwzSn1w/profile-displayphoto-shrink_800_800/0/1606858817584?e=1631750400&v=beta&t=7AjndoreYtHZG30SjLzARChgcsDldWIfTDkjAIjAOfc" alt=""/>
              </div>
            </div>
        </header>

        <div className={isToggle === false ? "l-navbar" : "l-navbar show"} id="nav-bar">
              <nav className="nav">
                  <div>
                      <a href="Anasayfa" className="nav__logo">
                          <i className='bx bx-pulse nav__logo-icon'></i>
                          <span className="nav__logo-name">Dietry</span>
                      </a>

                      <div className="nav__list">
                          <NavLink exact to="Anasayfa" className="nav__link">
                          <i className='bx bx-grid-alt nav__icon' ></i>
                              <span className="nav__name">Anasayfa</span>
                          </NavLink>
                          <NavLink exact to="Malzemeler" className="nav__link">
                              <i className='bx bx-fridge nav__icon' ></i>
                              <span className="nav__name">Malzemeler</span>
                          </NavLink>
                          
                          <NavLink exact to="Raporlar" className="nav__link">
                              <i className='bx bxs-report nav__icon' ></i>
                              <span className="nav__name">Raporlar</span>
                          </NavLink>

                          <NavLink exact to="Menu" className="nav__link">
                              <i className='bx bx-food-menu nav__icon' ></i>
                              <span className="nav__name">Menu</span>
                          </NavLink>

                          <NavLink exact to="Misafirler" className="nav__link">
                              <i className='bx bx-user nav__icon' ></i>
                              <span className="nav__name">Misafirler</span>
                          </NavLink>

                          {/* <NavLink exact to="#" className="nav__link">
                              <i className='bx bx-bar-chart-alt-2 nav__icon' ></i>
                              <span className="nav__name">Analytics</span>
                          </NavLink>  */}
                      </div>
                  </div>

                  <a href="#" className="nav__link">
                      <i className='bx bx-log-out nav__icon' ></i>
                      <span className="nav__name">Çıkış</span>
                  </a>
              </nav>
          </div>
      </div>
    </div>
    
  )  
}
export default Navbar;