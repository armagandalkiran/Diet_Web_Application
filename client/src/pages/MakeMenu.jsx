import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import "../css/MakeMenu.css";
import Product from "../components/Product";

function MakeMenu() {

    const [foods,setFoods] = useState([]);
    const [clickedItem,setClickedItem] = useState("");
    const [categories,setCategories] = useState([]);

    async function fetchData() {
        const res = await fetch("/makemenu");
        res
          .json()
          .then(res => setFoods(res))
    }
    useEffect(() => {
          fetchData();
    },[]);  

    async function fetchCategoryNames() {
        const res = await fetch("/categories");
        res
          .json()
          .then(res => setCategories(res))
    }
    useEffect(() => {
          fetchCategoryNames();
    },[]); 
      
    function handleCategoryClick(categoryItem){
        setClickedItem(categoryItem);
        console.log(clickedItem);
    }

    return <div>
        <Navbar/>
        <div className="menu_container">
            <div className="categories">
                <ul>
                {categories.map((category,index)=>{
                    return (   
                    <li key={index} onClick={() => handleCategoryClick(category.name)}>{category.name}</li>
                    )
                })}
                </ul>
            </div>
            <div className="receipt">fis kismi</div>   
                <div className="note_container">
                    {foods.map((food,index) => {
                        if(food.name[0] === clickedItem) {
                            return <Product
                                key = {index}
                                title = {food.name[2]}
                            />
                        } return null
                    })}
                </div>
                 
        </div>
    </div>
}

export default MakeMenu;