import React,{useState,useEffect} from "react";
import "../css/TotalGuests.css";
import Navbar from "../components/Navbar";


function TotalGuests() {

    const numberInterval = ["Seçiniz",1,2,3,4];
    const [guests,setGuests] = useState([]);
    const [monthYear,setMonthYear] = useState("");
    const [buildingNo,setBuildingNo] = useState(0);
    let countTotalGuestsInDayInterval = 0;
    let countTotalGuestsInMonth = 0;
    let ts = Date.now();
    let date_ob = new Date(ts);
    let month = date_ob.getMonth() + 1;
    if (month / 10 < 1){
        month = "0" + month;
    }

    async function fetchData() {
        const res = await fetch("/guests/totalguest");
        res
          .json()
          .then(res => setGuests(res))
    }
    useEffect(() => {
        fetchData();
    },[]); 

    function handleMonthYearChange(event) {
        setMonthYear(event.target.value);
    }

    function handleBuildingNoChange(event) {
        setBuildingNo(event.target.value);
    }

    return <div>
        <Navbar/>
        <div className="totalguests-container">
            <p className="totalguests-selection-items">Toplam misafir sayısını görmek istediğiniz tarihi ve bina numarasını seçiniz.</p>
            <input className="totalguests-selection-items" name="monthYear" type="month" value={monthYear} onChange={handleMonthYearChange}></input>
            <p className="totalguests-selection-items">Bina numarası</p>
            <select className="totalguests-selection-items" name="buildingNo" value={buildingNo} onChange={handleBuildingNoChange}>
                {numberInterval.map((number) => (
                    <option key={number}>{number}</option>
                ))}
            </select>
            <div className="ingredients_container">
                <div className="ingredients_table">
                <table className="content-table">
                    <thead>
                    <tr>
                        <th>Tarih</th>
                        <th>Gün Aralığı</th>
                        <th>Bina Numarası</th>
                        <th>7-12 Aylık</th>
                        <th>1-2 Yaş</th>
                        <th>3-6 Yaş</th>
                        <th>7-12 Yaş</th>
                        <th>13+ Yaş - Personel</th>
                        <th>Toplam Kişi Sayısı</th>
                        <th>Aylık Toplam Kişi Sayısı</th>
                    </tr>
                    </thead>
                    <tbody>      
                    
                    {guests.map((guest,index) => {
                        countTotalGuestsInDayInterval = 0;
                        if(parseInt(guest.building_no) === parseInt(buildingNo)){
                            if( monthYear.substring(5,7) === guest.date.substring(5,7) && 
                                monthYear.substring(0,4) === guest.date.substring(0,4)){
                                countTotalGuestsInDayInterval = countTotalGuestsInDayInterval + guest.seven_to_twelve_months_age
                                + guest.one_to_two_years_age + guest.three_to_six_years_age +
                                guest.seven_to_twelve_years_age + guest.thirteen_or_higher_age;
                                countTotalGuestsInMonth += countTotalGuestsInDayInterval;
                                return (
                                    <tr key={index}>
                                        <td>{guest.date}</td>
                                        <td>{guest.day_time}</td>
                                        <td>{guest.building_no}</td>
                                        <td>{guest.seven_to_twelve_months_age}</td>
                                        <td>{guest.one_to_two_years_age}</td>
                                        <td>{guest.three_to_six_years_age}</td>
                                        <td>{guest.seven_to_twelve_years_age}</td>
                                        <td>{guest.thirteen_or_higher_age}</td>
                                        <td>{countTotalGuestsInDayInterval}</td>
                                        <td>{countTotalGuestsInMonth}</td>
                                    </tr>
                                ) 
                            }  
                        }  return null
                    })}        
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
}

export default TotalGuests;