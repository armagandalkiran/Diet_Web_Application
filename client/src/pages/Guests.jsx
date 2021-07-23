import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Axios from "axios";
import "../css/Guests.css"

function Guests () {
    const numberInterval = ["Seçiniz",1,2,3,4];
    const staticDays = ["Sabah","Ogle","Ikindi Ara","Aksam","Gece Ara"];
    const [dayInterval,setDayInterval] = useState({
        day_time:"sabah",
        seven_to_twelve_months_guests:0,
        one_to_two_years_guests:0,
        three_to_six_years_guests:0,
        seven_to_twelve_year_guests:0,
        thirteen_or_higher_guests:0,
        building_no:1,
        date:""
    });

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
        e.preventDefault();
        Axios.post("/guests",dayInterval).then(response=>{
            console.log(response);
        });
    }

    return (
        <div>
            <Navbar/>
            <div>
                <form className="guests-form-container">
                    <p>Tarih</p>
                    <input name="date" type="date" value={dayInterval.date} onChange={handleComboChange}></input>
                    <p>Gün aralığı</p>
                    <select name="day_time" value={dayInterval.days} onChange={handleComboChange}>
                        {staticDays.map((day) => (
                            <option key={day}>{day}</option>
                        ))}
                    </select>  
                    <p>7-12 aylık misafir</p>
                    <div className="guests-form-row">
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            seven_to_twelve_months_guests: dayInterval.seven_to_twelve_months_guests - 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>-10</p>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            seven_to_twelve_months_guests: dayInterval.seven_to_twelve_months_guests - 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className="guests-form-row-output">{dayInterval.seven_to_twelve_months_guests}</div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            seven_to_twelve_months_guests: dayInterval.seven_to_twelve_months_guests + 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-plus'></i>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            seven_to_twelve_months_guests: dayInterval.seven_to_twelve_months_guests + 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>+10</p>
                        </div>
                    </div>
                    <p>1-2 yaş arası misafir</p>
                    <div className="guests-form-row">
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            one_to_two_years_guests: dayInterval.one_to_two_years_guests - 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>-10</p>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            one_to_two_years_guests: dayInterval.one_to_two_years_guests - 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className="guests-form-row-output">{dayInterval.one_to_two_years_guests}</div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            one_to_two_years_guests: dayInterval.one_to_two_years_guests + 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-plus'></i>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            one_to_two_years_guests: dayInterval.one_to_two_years_guests + 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>+10</p>
                        </div>
                    </div>
                    <p>3-6 yaş arası misafir</p>    
                    <div className="guests-form-row">
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            three_to_six_years_guests: dayInterval.three_to_six_years_guests - 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>-10</p>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            three_to_six_years_guests: dayInterval.three_to_six_years_guests - 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className="guests-form-row-output">{dayInterval.three_to_six_years_guests}</div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            three_to_six_years_guests: dayInterval.three_to_six_years_guests + 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-plus'></i>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            three_to_six_years_guests: dayInterval.three_to_six_years_guests + 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>+10</p>
                        </div>
                    </div>
                    <p>7-12 yaş arası misafir</p>    
                    <div className="guests-form-row">
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            seven_to_twelve_year_guests: dayInterval.seven_to_twelve_year_guests - 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>-10</p>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            seven_to_twelve_year_guests: dayInterval.seven_to_twelve_year_guests - 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className="guests-form-row-output">{dayInterval.seven_to_twelve_year_guests}</div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            seven_to_twelve_year_guests: dayInterval.seven_to_twelve_year_guests + 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-plus'></i>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            seven_to_twelve_year_guests: dayInterval.seven_to_twelve_year_guests + 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>+10</p>
                        </div>
                    </div>
                    <p>13+ misafirler ve personel</p>    
                    <div className="guests-form-row">
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            thirteen_or_higher_guests: dayInterval.thirteen_or_higher_guests - 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>-10</p>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            thirteen_or_higher_guests: dayInterval.thirteen_or_higher_guests - 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-minus'></i>
                        </div>
                        <div className="guests-form-row-output">{dayInterval.thirteen_or_higher_guests}</div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            thirteen_or_higher_guests: dayInterval.thirteen_or_higher_guests + 1
                            }
                        })} className="guests-incremental-button">
                            <i className='bx bx-plus'></i>
                        </div>
                        <div onClick={()=>setDayInterval(prevValue=>{
                            return{
                            ...prevValue,
                            thirteen_or_higher_guests: dayInterval.thirteen_or_higher_guests + 10
                            }
                        })} className="guests-bigger-incremental-button">
                            <p>+10</p>
                        </div>
                    </div>
                    <p>Bina numarası</p>
                    <select name="building_no" value={dayInterval.building_no} onChange={handleComboChange}>
                        {numberInterval.map((number) => (
                            <option key={number}>{number}</option>
                        ))}
                    </select>
                    <button className="guests-form-button" onClick={handleClick}>Gönder</button>
                </form>
            </div>
        </div>)
}

export default Guests;