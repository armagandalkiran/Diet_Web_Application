import React from "react";
import "../css/GuestBox.css";


function GuestBox(props){

    return (
        <div className="building-info-boxes">
            <div className="info-boxes-content">
                <p className="building-number">
                    {props.totalGuest}
                </p>
                <p className="building-description">
                    kadın konaklama evi {props.building}
                </p>
            </div>
            <div className="icon-cover-circle">
                <i className='bx bx-building-house' ></i>
            </div>
        </div>
    )
}


export default GuestBox;