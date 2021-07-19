import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
// import MenuBox from "../components/MenuBox";
import "../css/MakeMenu.css";

function ShowMenu() {

    const [dates,setDates] = useState({
        date: ""
    });
    const [menuItems,setMenuItems] = useState([]);
    const [trackDuplicate,setTrackDuplicate] = useState([]);
    const dayIntervals = ["Sabah","Ogle","Ikindi Ara","Aksam","Gece Ara"];

    async function fetchData() {
        const res = await fetch("/showmenu");
        res
          .json()
          .then(res => setMenuItems(res));
    }
    useEffect(() => {
        fetchData();
    },[]);  

    function handleDateChange(event) {
        const {name,value} = event.target;
        setDates({[name] : value});
        setTrackDuplicate([]);
    }

    return <div>
        <Navbar/>
        <div className="menu-container">
            <label>Tarih seciniz</label>
            <input name="date" type="date" value={dates.date} onChange={handleDateChange}></input>
            <div className="menubox_container">
                { dayIntervals.map((day,index)=>{
                    return (
                    <div className="box" key={index}>
                        <h1>{day}</h1>
                        <ul>
                            {menuItems.map((menuItem,index)=>{
                                if(menuItem.date === dates.date){
                                    if(trackDuplicate.includes(menuItem.name)){
                                        return null;
                                    }
                                    else if(menuItem.day_time === day) {
                                        trackDuplicate.push(menuItem.name)
                                        return <li key={index}>{menuItem.name}</li>
                                    }
                                } return null;
                            })}
                        </ul>
                    </div>
                    )
                  })
                }
            </div>
        </div>
    </div>
}

export default ShowMenu;