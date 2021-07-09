const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../dbconfig");

router.get("/makemenu",(req,res) => {

    sql.connect(config, function (err) {
       (err) ? console.log(err) : console.log("Database connected makemenu!");
   
       const request = new sql.Request();
       request.query(`select * 
       from categories c,food_supplies fs,foods f
       where c.ID = f.category_id AND f.supply_id = fs.id`, (err,result) => {
           (err) ? console.log(err) : res.json(result.recordset);
           //res.json(result.recordset)
       });
   });
});


router.post("/makemenu", (req,res)  => {
    
    const {date,dayInterval,foodIds} = req.body;
    
    // database connection 
    sql.connect(config, function (err) {
        (err) ? console.log(err) : console.log("Database connected ! register");
    
        const request = new sql.Request();
        foodIds.forEach((foodId)=>{
            request.query(`insert into menus (food_id,day_time,date)
            values (${foodId},'${dayInterval}','${date}')`, (err) => {
          
            (err) ? console.log(err) : console.log("islem basarili");
            });
        })

    });
    
});

module.exports = router;