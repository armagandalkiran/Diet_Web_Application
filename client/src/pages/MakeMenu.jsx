import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import "../css/MakeMenu.css";
import Product from "../components/Product";
import Axios from "axios";

function MakeMenu() {

    const staticDays = ["Sabah","Ogle","Ikindi Ara","Aksam","Gece Ara"];
    const [foods,setFoods] = useState([]);
    const [clickedItem,setClickedItem] = useState("");
    const [categories,setCategories] = useState([]);
    const [cardItems,setCardItems] = useState([]);
    const [dayTime,setDayTime] = useState({
        date: "",
        dayInterval: "Sabah"
    });
    const [keepFoodIds,setKeepFoodIds] = useState([]);
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
        if(!cardItems.includes(newItem)){
            setCardItems(prevItems =>{
                return [...prevItems,newItem];
            })
        }
        foods.forEach((food) => {
            if(food.name[2].includes(newItem)){
                keepFoodIds.push(food.id[1]);
            }
        })
        // setKeepFoodIds(prevValue=>{
        //     return [...prevValue,newItemId]
        // });
        
    }
    
    function handleDayChange(event){

        const {name,value} = event.target;
        setDayTime(prevValue =>{
            return {
                ...prevValue,
                [name] : value
            }
        })
    }

    function handleReceiptButtonClick(e) {
        e.preventDefault();
        dayTime.foodIds = keepFoodIds;
        Axios.post("/makemenu",dayTime).then(response=>{
            console.log(response);
        })
        setDayTime({
            date:"",
            dayInterval:""
        })
        setCardItems([]);
        setKeepFoodIds([]);
    }

    // foods.forEach((food,index)=>{
    //     foodNames.push(food.name[2]);
    // });
    // let filteredFoodNames = foodNames.filter((item,index) => foodNames.indexOf(item) === index);
    // console.log(filteredFoodNames);

    return <div>
        <Navbar/>
        <div className="menu-container">
            <div className="categories">
                <ul>
                    {categories.map((category,index)=>{
                        return (   
                        <li key={index} onClick={() => handleCategoryClick(category.name)}>{category.name}</li>
                        )
                    })}
                </ul>
            </div>
            <form>
                <div className="receipt">
                    <hr></hr>
                    {cardItems.map((item,index)=>{
                        return <p key = {index}>
                            {item}
                        </p>
                    })}
                    {cardItems.length > 0 
                    ? 
                    <div>
                        <input name="date" type="date" value={dayTime.date} onChange={handleDayChange}></input>
                        <select name="dayInterval" value={dayTime.dayInterval} onChange={handleDayChange}>
                            {staticDays.map((day) => (
                                <option key={day}>{day}</option>
                            ))}
                        </select>
                        <button onClick={handleReceiptButtonClick}>Gönder</button>
                    </div> 
                    : 
                    <p>Henuz bir sey eklemediniz</p>}
                </div>   
            </form>
            <div className="note_container">
                {foods.map((food,index) => {
                    if(food.name[0] === clickedItem) {
                        if(!keepFoodNames.includes(food.name[2])){
                            keepFoodNames.push(food.name[2]);
                            return (<Product
                                key = {index}
                                id = {food.id[1]}
                                title = {food.name[2]}
                                onAdd = {addToCart}
                                />
                            )
                        }
                    }
                    return null
                })}
            </div>   
        </div>
    </div>
}

export default MakeMenu;