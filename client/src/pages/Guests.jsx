import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import Axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../css/Guests.css"

function Guests () {
    const numberInterval = [...Array(100).keys()];
    const staticDays = ["Sabah","Ogle","Ikindi Ara","Aksam","Gece Ara"];
    const [dayInterval,setDayInterval] = useState({
        day_time:"sabah",
        seven_to_twelve_months_guests:0,
        one_to_two_years_guests:0,
        three_to_six_years_guests:0,
        seven_to_twelve_year_guests:0,
        thirteen_or_higher_guests:0,
        building_no:1
    });
    const [startDate, setStartDate] = useState(new Date());
    let dateMDY = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;

    function handleComboChange(event){
        const {name,value} = event.target;
        setDayInterval(prevValue => {
            return {
            ...prevValue,
            [name] : value,
            }
        });
    }

    function handleClick(e){
        dayInterval.date = dateMDY;
        e.preventDefault();
        Axios.post("/guests",dayInterval).then(response=>{
            console.log(response);
        });
    }

    return (
        <div className="guests_container">
            <Navbar/>
            <p>Tarih seçiniz</p>
            <form>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <p>Gün aralığı seçiniz</p>
            <select name="day_time" value={dayInterval.days} onChange={handleComboChange}>
                {staticDays.map((day) => (
                    <option key={day}>{day}</option>
                ))}
            </select>
            <p>7-12 aylık misafir sayısını giriniz.</p>
            <select name="seven_to_twelve_months_guests" value={dayInterval.seven_to_twelve_months_guests} onChange={handleComboChange}>
                {numberInterval.map((number) => (
                    <option key={number}>{number}</option>
                ))}
            </select>
            <p>1-2 yaş arası misafir sayısını giriniz.</p>
            <select name="one_to_two_years_guests" value={dayInterval.one_to_two_years_guests} onChange={handleComboChange}>
                {numberInterval.map((number) => (
                    <option key={number}>{number}</option>
                ))}
            </select>
            <p>3-6 yaş arası misafir sayısını giriniz.</p>
            <select name="three_to_six_years_guests" value={dayInterval.three_to_six_years_guests} onChange={handleComboChange}>
                {numberInterval.map((number) => (
                    <option key={number}>{number}</option>
                ))}
            </select>
            <p>7-12 yaş arası misafir sayısını giriniz.</p>
            <select name="seven_to_twelve_year_guests" value={dayInterval.seven_to_twelve_year_guests} onChange={handleComboChange}>
                {numberInterval.map((number) => (
                    <option key={number}>{number}</option>
                ))}
            </select>
            <p>13+ misafirler ve personel sayısını giriniz.</p>
            <select name="thirteen_or_higher_guests" value={dayInterval.thirteen_or_higher_guests} onChange={handleComboChange}>
                {numberInterval.map((number) => (
                    <option key={number}>{number}</option>
                ))}
            </select>
            <p>Bina numarası giriniz.</p>
            <select name="building_no" value={dayInterval.building_no} onChange={handleComboChange}>
                {numberInterval.map((number) => (
                    <option key={number}>{number}</option>
                ))}
            </select>
            <button onClick={handleClick}>Gönder</button>
            </form>
            
        </div>)
}


export default Guests;