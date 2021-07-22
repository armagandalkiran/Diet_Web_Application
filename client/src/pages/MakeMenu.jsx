import React,{useEffect,useState} from "react";
import Navbar from "../components/Navbar";
import "../css/MakeMenu.css";
import Product from "../components/Product";
import Axios from "axios";

function MakeMenu() {

    const staticDays = ["Sabah","Ogle","Ikindi Ara","Aksam","Gece Ara"];
    const categories = ["Kahvaltılık",
        "Ekmekler",
        "İçecekler",
        "Meyveler",
        "Çorbalar",
        "Yumurta Yemekleri",
        "Zeytinyağlılar ve Etsiz Sebze",
        "Etli Sebze Yemekleri",
        "Kurubaklagil Yemekleri",
        "Et Yemekleri",
        "Köfteler",
        "Tavuk ve Hindi Yemekleri",
        "Balık",
        "Pilav ve Makarna",
        "Yoğurt ve Salata",
        "Börek ve Pide",
        "Tatlılar",
        "Pastacılık Ürünleri"
    ]
    const [foods,setFoods] = useState([]);
    const [clickedItem,setClickedItem] = useState("Kahvaltılık");
    // const [categories,setCategories] = useState([]);
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

    // async function fetchCategoryNames() {
    //     const res = await fetch("/categories");
    //     res
    //       .json()
    //       .then(res => setCategories(res))
    // }
    // useEffect(() => {
    //       fetchCategoryNames();
    // },[]); 
      
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
        <div className="makemenu-container">
            <div className="categories">
                <ul>
                    {categories.map((category,index)=>{
                        return (   
                        <li key={index} onClick={() => handleCategoryClick(category)}>{category}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="food-choices-container">
                <p>{clickedItem}</p>
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
            <form>
                <div className="receipt">
                    <div className="receipt-item-container">
                        {cardItems.map((item,index)=>{
                            return <span className="item-icon-container">
                                <p className="basket-item" key = {index}>
                                    {item}
                                </p>
                                <i onClick={()=>{setCardItems(cardItems.filter((item,filterIndex)=>filterIndex !== index))}} class='bx bx-trash'></i>
                            </span>
                        })}
                    </div>
                    {cardItems.length > 0 
                    ? 
                    <div className="basket-operation-items">
                        <input name="date" type="date" value={dayTime.date} onChange={handleDayChange}></input>
                        <select name="dayInterval" value={dayTime.dayInterval} onChange={handleDayChange}>
                            {staticDays.map((day) => (
                                <option key={day}>{day}</option>
                            ))}
                        </select>
                        <button className="menu-buttons" onClick={handleReceiptButtonClick}>Menüyü Gönder</button>
                    </div> 
                    : 
                    <div>
                    <p>Henüz bir şey eklemediniz.</p>
                    <i className='bx bx-basket'></i>
                    </div>}
                </div>   
            </form>
        </div>
    </div>
}

export default MakeMenu;