import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import GuestBox from "../components/GuestBox";
import "../css/Home.css";

function Home() {

    var date = new Date();
    const [guests,setGuests] = useState([]);
    var totalGuestNumber = 0;
    var buildingNo = 0;

    async function fetchData() {
        const res = await fetch("/guests/homepage");
        res
          .json()
          .then(res => setGuests(res))
    }
    useEffect(() => {
        fetchData();
    },[]); 

    
    return (
    <section>
        <Navbar/>
        <div className="greeting">
            {(parseInt(date.getHours()) < 6 || parseInt(date.getHours()) > 20) ? <p>İyi akşamlar,</p> : <p>İyi günler,</p>}
            <p>{date.toLocaleDateString()}</p>
        </div>
        <div className="home-container">
            {[1,2,3,4].map((item,index)=>{
                totalGuestNumber = 0;
                guests.forEach(guest=>{
                    if(guest.building_no === item){
                        totalGuestNumber = totalGuestNumber + guest.seven_to_twelve_months_age
                        + guest.one_to_two_years_age + guest.three_to_six_years_age +
                        guest.seven_to_twelve_years_age + guest.thirteen_or_higher_age;
                        buildingNo = guest.building_no;
                    }
                })
                return (
                    <GuestBox
                        key = {index}
                        building = {buildingNo}
                        totalGuest = {totalGuestNumber}
                    />
                )           
            })}
            <div className="home-boxes">
                <div className="notification-box">
                    <p className="building-description">Bildirimler<i className='bx bxs-bell'></i></p>
                </div>
                <div>
                    <div className="wide-info-boxes">
                        <p className="building-description">Günün menüsünü görüntüleyin !</p>
                        <i className='bx bxs-food-menu' ></i>
                    </div>
                    <div className="wide-info-boxes">
                        <p className="building-description">Müşteri hizmetleri ile görüşün !</p>
                        <i className='bx bx-question-mark'></i>
                    </div>
                </div>    
            </div>    
        </div>
    </section>
    )

}

export default Home;