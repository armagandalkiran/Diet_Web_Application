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
    where foods_id = ${id}`, (err) => {
  
    (err) ? console.log(err) : res.send(req.body);
    });
});

});

module.exports = router;