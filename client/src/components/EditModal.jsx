import React,{useState} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "../css/Dialog.css";

function EditModal(props){

  const [editStock,setEditStock] = useState(0);

  function handleChange(event){
    setEditStock(event.target.value);
    
  }

  function handleClick(event){
    event.preventDefault();
    props.closed();
    props.edit(editStock);
  }

  return (
      <Dialog open={props.opened} onClose={props.closed} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">STOK DÜZENLE</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Stok miktarını değiştirmek istediğiniz malzemenin id'si ile işlem yapabilirsiniz.
        Yeni bir malzeme var ise ya da ürün id'sini bilmiyorsanız müşteri hizmetleri ile iletişime geçebilirsiniz.
        </DialogContentText>
        <div className="dialog-contents">
          <p>Yeni stok miktarını giriniz</p>
          <input name="stock" value={editStock.stock} onChange={handleChange}></input>
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


export default EditModal;