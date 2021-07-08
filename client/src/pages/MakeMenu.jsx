import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import "../css/MakeMenu.css";
import Product from "../components/Product";

function MakeMenu() {

    const [foods,setFoods] = useState([]);
    const [clickedItem,setClickedItem] = useState("");
    const [categories,setCategories] = useState([]);
    const [cardItems,setCardItems] = useState([]);
    var keepFoodNames = [];

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
    }

    function addToCart(newItem) {
        if(cardItems.includes(newItem)){
            return null;
        }
        setCardItems(prevItems =>{
            return [...prevItems,newItem];
        })
    }

    // foods.forEach((food,index)=>{
    //     foodNames.push(food.name[2]);
    // });
    // let filteredFoodNames = foodNames.filter((item,index) => foodNames.indexOf(item) === index);
    // console.log(filteredFoodNames);

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
            <div className="receipt">fis kismi
            <hr></hr>
            {cardItems.map((item,index)=>{
                return <p key = {index}>
                    {item}
                </p>
            })}
            </div>   
                <div className="note_container">
                    {foods.map((food,index) => {
                        if(food.name[0] === clickedItem) {
                            if(!keepFoodNames.includes(food.name[2])){
                                keepFoodNames.push(food.name[2]);
                                return <Product
                                key = {index}
                                id = {index}
                                title = {food.name[2]}
                                onAdd = {addToCart}
                            />
                            }
                        }return null
                    })}
                </div>
                 
        </div>
    </div>
}

export default MakeMenu;