import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import "../css/MakeMenu.css";

function ShowTotalWeight(){

    const [products,setProducts] = useState([]);
    const [guests,setGuests] = useState([]);

    async function fetchProductsData() {
        const res = await fetch("/totalweight");
        res
          .json()
          .then(res => setProducts(res))
    }
    useEffect(() => {
        fetchProductsData();
    },[]);  

    async function fetchGuestsData() {
        const res = await fetch("/guests");
        res
          .json()
          .then(res => setGuests(res))
    }
    useEffect(() => {
        fetchGuestsData();
    },[]);  

    return (
        <div>
            <Navbar/>
            <div className="menu_container">
                
            </div>
        </div>
        
    )
}

export default ShowTotalWeight;