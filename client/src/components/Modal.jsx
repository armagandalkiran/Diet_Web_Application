import React,{useState} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";
import "../css/Dialog.css";

function Modal(props){

  const [addStock,setAddStock] = useState({
    foods_id: 0,
    stock: 0,
    entry_date: "",
    sent_date: "",
    expr_date: "",//,
    company_name: ""
  });

  function handleChange(event){

    const {name,value} = event.target;

    setAddStock(prevValue => {
      return {
        ...prevValue,
        [name] : value
      }  
    });
    
  }

  function handleClick(event){
    event.preventDefault();
    props.closed();
    Axios.post("/ingredients/modal",addStock).then(response=>{
    props.fetch();  
    });
  }

  return (
      <Dialog open={props.opened} onClose={props.closed} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">STOK EKLE</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Stok miktarını değiştirmek istediğiniz malzemenin id'si ile işlem yapabilirsiniz.
        Yeni bir malzeme var ise ya da ürün id'sini bilmiyorsanız müşteri hizmetleri ile iletişime geçebilirsiniz.
        </DialogContentText>
        <div className="dialog-contents">
          <p>Malzeme id</p>
          <input name="foods_id" value={addStock.foods_id} onChange={handleChange}></input>
          <p>Stok (gr)</p>
          <input name="stock" value={addStock.stock} onChange={handleChange}></input>
          <p>Giriş Tarihi</p>
          <input name="entry_date" value={addStock.entry_date} type="date" onChange={handleChange}></input>
          <p>Çıkış Tarihi</p>
          <input name="sent_date" value={addStock.sent_date} type="date" onChange={handleChange}></input>
          <p>Son Tüketim Tarihi</p>
          <input name="expr_date" value={addStock.expr_date} type="date" onChange={handleChange}></input>
          <p>Firma</p>
          <input name="company_name" value={addStock.company_name} onChange={handleChange}></input>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closed} color="primary">
          İptal
        </Button>
        <Button onClick={handleClick} color="primary">
          Onayla
        </Button>
      </DialogActions>
    </Dialog>
  )
}


export default Modal;