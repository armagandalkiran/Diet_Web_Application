import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import "../css/Ingredients.css";


import Axios from "axios";


export default function Ingredients() {

  const [ingredients,setIngredients] = useState([]);
  const [search,setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [tempIngredientId,setTempIngredientId] = useState(0);

  const [changedIngredient,setChangedIngredient] = useState({
    id : "",
    stock : ""
  });

  var sample = [];
  var rows = [];

  const handleClickOpen = (value) => {
    setOpen(true);
    setTempIngredientId(value.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalApprove = (value) => {
    Axios.post("/ingredients",changedIngredient).then(response=>{
      fetchData();
      console.log(response);
      setOpen(false);
    });
    setChangedIngredient({
      id: "",
      stock: ""
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

  //burda foreach dene daha iyi olabilir
  ingredients.map((ingredient) => {
    var key = ingredient.name;
    sample = [`${ingredient.entry_date.slice(0,10)}`
    ,`${ingredient.sent_date.slice(0,10)}`
    ,`${ingredient.expiration_date.slice(0,10)}`
    ,`${ingredient.company_name}`
    ,`${ingredient.stock}gr`
    ,`${ingredient.id}`]
    if(search === ""){
    rows.push(createData(key, ...sample));
    }
    else if (key.toLowerCase().includes(search.toLowerCase())){
    rows.push(createData(key, ...sample)); 
    }
    return key
  });

  function createData(name, entry, sent, expr, company, stock,id) {
    return { name, entry, sent, expr, company, stock,id};
  }

  function handleSearch (event) {
    setSearch(event.target.value);
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setChangedIngredient(prevValue => {
      return {
      ...prevValue,
      [name] : value,
      id : tempIngredientId
      };
    });
  }

  return (
    <div><Navbar/>
      <Modal
        opened={open}
        closed={handleClose}
      />
      <div className="ingredients_container">
        <input onChange={handleSearch} type="text" className="ingredients_search_input" placeholder="Ara"></input>
        <div className="ingredients_table">
          <table className="content-table">
            <thead>
              <tr>
                <th>Malzeme adı</th>
                <th>Eklenme tarihi</th>
                <th>Gönderim tarihi</th>
                <th>Son tüketim tarihi</th>
                <th>Teslim eden firma</th>
                <th>Alınan miktar</th>
                <th>Kullanılan miktar</th>
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
                    <td>{row.name}</td>
                    <td>{row.name}</td>
                    <td>{row.name}</td>
                    <td>{row.name}</td>
                    <td>
                      <div className="action-icons">
                        <i onClick={handleClickOpen} className="bx bxs-edit"></i>
                        <i className="bx bxs-plus-square"></i>
                        <i className="bx bxs-minus-square"></i>
                      </div>  
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}