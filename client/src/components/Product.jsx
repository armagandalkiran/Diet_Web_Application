import React from "react";
import "../css/MakeMenu.css";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

function Product(props) {

    return (
        <div className="note">
            <h1>{props.title}</h1>
            <img alt="resim alani"/>
            <Fab size="small">
                <AddIcon/>
            </Fab>
        </div>
    )
}

export default Product;