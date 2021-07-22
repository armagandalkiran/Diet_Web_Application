const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../dbconfig");


router.get("/ingredients",(req,res) => {

     sql.connect(config, function (err) {
        (err) ? console.log(err) : console.log("Database connected ingredients!");
    
        const request = new sql.Request();
        request.query(`select * 
        from food_supplies f,stores s
        where f.id = s.foods_id`, (err,result) => {
            (err) ? console.log(err) : res.json(result.recordset);
        
        });
    });
});

router.post("/ingredients",(req,res) => {

    const {id,stock} = req.body;

    sql.connect(config, function (err) {
    (err) ? console.log(err) : console.log("Database connected ingredients!");

    const request = new sql.Request();
    request.query(`update stores
    set stock = ${stock}
    where ID = ${id}`, (err) => {
  
    (err) ? console.log(err) : res.send(req.body);
    });
    });

});

router.post("/ingredients/modal",(req,res) => {

    const {foods_id,stock,entry_date,sent_date,expr_date,company_name} = req.body;

    sql.connect(config, function (err) {
    (err) ? console.log(err) : console.log("Database connected ingredients!");

    const request = new sql.Request();
    request.query(`insert into stores (users_id,foods_id,stock,entry_date,
        sent_date,expiration_date,company_name) values (1,${foods_id},${stock},'${entry_date}'
        ,'${sent_date}','${expr_date}','${company_name}')`, (err) => {
  
    (err) ? console.log(err) : res.send(req.body);
    });
    });

});


module.exports = router;