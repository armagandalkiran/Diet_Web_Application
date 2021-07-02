import React,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import "./Ingredients.css";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";

const styles = (theme) => ({
  root: {
    fontSize: '200px',
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      flip: false,
      paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 70,
    rowHeight: 60,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;
    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
      >
        {cellData}
        
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer> 
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---
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
    <div className="ingredients_container"><Navbar/>
      <input onChange={handleSearch} type="text" className="ingredients_search_input" placeholder="Ara"></input>
      <div className="ingredients_table">
      <main>
      <Paper style={{ height: 400, width: '100%' }}>
        <VirtualizedTable
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          columns={[
              {
              width: 200,
              label: 'Ürün Adı',
              dataKey: 'name',   
            },  
            {
              width: 160,
              label: 'Alınan Tarih',
              dataKey: 'entry',
              numeric: false,
            },
            {
              width: 160,
              label: 'Gönderilen Tarih',
              dataKey: 'sent',
              numeric: false,
            },
            {
              width: 160,
              label: 'Son Kullanım Tarihi\u00A0(g)',
              dataKey: 'expr',
              numeric: false,
            },
            {
              width: 160,
              label: 'Teslim Eden Firma\u00A0(g)',
              dataKey: 'company',
              numeric: false,
            },
            {
              width: 160,
              label: 'Stok',
              dataKey: 'stock',
              numeric: false,
            },
          ]}
          // onRowClick={({index}) => handleOnClick(rows[index])}
          onRowClick={({index}) => handleClickOpen(rows[index])}
          
        />
      </Paper>
      </main>
      {/* THIS PART MUST BE COMPONENT TURN BACK HERE */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Baslik kismi gerekliyse malzeme adi girilebilir</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Yeni stok miktarini giriniz.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={changedIngredient.stock}
            label="Stok (gr)"
            fullWidth
            onChange={handleChange}
            name="stock"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Iptal
          </Button>
          <Button onClick={() => modalApprove()} color="primary">
            Onayla
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}