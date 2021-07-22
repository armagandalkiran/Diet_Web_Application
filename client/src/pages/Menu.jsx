import React from "react";
import {useHistory} from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/Menu.css"

function Menu() {


    const history = useHistory();

    const handleClick = (path) =>{ 
        history.push(path);
    }

    return <div>
        <Navbar/>  
            <div>
                <div className="menu-contents">
                    <h1>Aylık menü oluşturabilir,görüntüleyebilir veya düzenleyebilirsiniz.</h1>
                    <div className="menu-buttons-container">
                        <button className="menu-buttons" onClick={() => handleClick("/ToplamMisafir")} >Toplam misafir</button>
                        <button className="menu-buttons" onClick={() => handleClick("/MenuOlustur")}>Menü oluştur</button>
                        <button className="menu-buttons" onClick={() => handleClick("/MenuGoruntule")}>Menü görüntüle</button>
                        <button className="menu-buttons" onClick={() => handleClick("/ToplamGramaj")}>Toplam gramaj</button>
                    </div>
                </div>
            </div>
    </div>

}

export default Menu;