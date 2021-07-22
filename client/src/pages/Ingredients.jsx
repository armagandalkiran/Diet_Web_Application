import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import "../css/Ingredients.css";
import Axios from "axios";
import EditModal from "../components/EditModal";


export default function Ingredients() {

  const [ingredients,setIngredients] = useState([]);
  const [search,setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editModalOpen,setEditModalOpen] = useState(false);
  const [tempIngredientId,setTempIngredientId] = useState(0);
  
  var changedIngredient = {}
  var sample = [];
  var rows = [];

  const handleClickOpen = (value) => {
    setOpen(true);
  };

  const handleEditModalClickOpen = (value) => {
    setEditModalOpen(true);
    setTempIngredientId(value);
  };

  function handleClose(){
    setOpen(false);
    setEditModalOpen(false);
  };

  function handleEditStock(value) {
    changedIngredient.id = tempIngredientId;
    changedIngredient.stock = value;
    Axios.post("ingredients",changedIngredient).then(response=>{
      fetchData();
    });
  }

  async function fetchData() {
    const res = await fetch("/ingredients");
    res
      .json()
      .then(res => setIngredients(res))
  }
  useEffect(() => {
      fetchData();
  },[]);  

  ingredients.forEach((ingredient) => {
    var key = ingredient.name;
    sample = [`${ingredient.entry_date.slice(0,10)}`
    ,`${ingredient.sent_date.slice(0,10)}`
    ,`${ingredient.expiration_date.slice(0,10)}`
    ,`${ingredient.company_name}`
    ,`${ingredient.stock}gr`
    ,`${ingredient.ID}`]
    if(search === ""){
    rows.push(createData(key, ...sample));
    }
    else if (key.toLowerCase().includes(search.toLowerCase())){
    rows.push(createData(key, ...sample)); 
    }
  });

  function createData(name, entry, sent, expr, company, stock,id) {
    return { name, entry, sent, expr, company, stock,id};
  }

  function handleSearch (event) {
    setSearch(event.target.value);
  }

  return (
    <div><Navbar/>
      <Modal
        opened = {open}
        closed = {handleClose}
        fetch = {fetchData}
      />
      <EditModal
        opened = {editModalOpen}
        closed = {handleClose}
        fetch = {fetchData}
        edit = {handleEditStock}
      />
        <div className="ingredients_container">
          <div className="ingredients-operations-container">
            <button onClick={handleClickOpen} className="ingredients-stock-button">Stok Ekle</button>
            <input onChange={handleSearch} type="text" className="ingredients_search_input" placeholder="Ara"></input>
          </div>
          <table className="content-table">
            <thead>
              <tr>
                <th>Malzeme adı</th>
                <th>Eklenme tarihi</th>
                <th>Gönderim tarihi</th>
                <th>Son tüketim tarihi</th>
                <th>Teslim eden firma</th>
                <th>Güncel stok</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row,index)=>{
                return (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.entry}</td>
                    <td>{row.sent}</td>
                    <td>{row.expr}</td>
                    <td>{row.company}</td>
                    <td>{row.stock}</td>
                    <td>
                      <div className="action-icons">
                        <i onClick={()=>handleEditModalClickOpen(row.id)} className="bx bxs-edit"></i>
                      </div>  
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
    </div>
  );
}