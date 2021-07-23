import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import "../css/MakeMenu.css";

function ShowTotalWeight(){

    const numberInterval = ["Seçiniz",1,2,3,4];
    const [products,setProducts] = useState([]);
    const [monthYear,setMonthYear] = useState("");
    const [buildingNo,setBuildingNo] = useState(0);
    let countTotalGram = 0;
    let ts = Date.now();
    let date_ob = new Date(ts);
    let month = date_ob.getMonth() + 1;
    if (month / 10 < 1){
        month = "0" + month;
    }

    async function fetchProductsData() {
        const res = await fetch("/totalweight");
        res
          .json()
          .then(res => setProducts(res))
    }
    useEffect(() => {
        fetchProductsData();
    },[]);  

    function handleMonthYearChange(event) {
        setMonthYear(event.target.value);
    }

    function handleBuildingNoChange(event) {
        setBuildingNo(event.target.value);
    }

    return (
        <div>
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
                                <th>Öğün</th>
                                <th>Yemek Adı</th>
                                <th>Malzeme</th>
                                <th>Bina Numarası</th>
                                <th>7-12 Aylık Toplam Gramaj</th>
                                <th>1-2 Yaş Toplam Gramaj</th>
                                <th>3-6 Yaş Toplam Gramaj</th>
                                <th>7-12 Yaş Toplam Gramaj</th>
                                <th>13+ Yaş - Personel Toplam Gramaj</th>
                                <th>Toplam Gramaj</th>
                            </tr>
                            </thead>
                            <tbody>      
                            {products.map((product,index) => {
                                countTotalGram = 0;
                                if(parseInt(product.building_no) === parseInt(buildingNo)){
                                    if( monthYear.substring(5,7) === product.date[0].substring(5,7) && 
                                        monthYear.substring(0,4) === product.date[0].substring(0,4)){
                                        countTotalGram = (product.seven_to_twelve_months_gr * product.seven_to_twelve_months_age) +
                                        (product.one_to_two_years_gr * product.one_to_two_years_age) + 
                                        (product.three_to_six_years_gr * product.three_to_six_years_age) +
                                        (product.seven_to_twelve_years_gr * product.seven_to_twelve_years_age) +
                                        (product.thirteen_or_higher_gr * product.thirteen_or_higher_age)
                                        
                                        return (
                                            <tr key={index}>
                                                <td>{product.date[1]}</td>
                                                <td>{product.day_time[0]}</td>
                                                <td>{product.name[0]}</td>
                                                <td>{product.name[1]}</td>
                                                <td>{product.building_no}</td>
                                                <td>{product.seven_to_twelve_months_gr * product.seven_to_twelve_months_age}</td>
                                                <td>{product.one_to_two_years_gr * product.one_to_two_years_age}</td>
                                                <td>{product.three_to_six_years_gr * product.three_to_six_years_age}</td>
                                                <td>{product.seven_to_twelve_years_gr * product.seven_to_twelve_years_age}</td>
                                                <td>{product.thirteen_or_higher_gr * product.thirteen_or_higher_age}</td>
                                                <td>{countTotalGram}</td>
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
        
    )
}

export default ShowTotalWeight;