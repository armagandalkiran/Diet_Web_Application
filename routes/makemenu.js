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
    
    console.log(req.body);

    // database connection 
    // sql.connect(config, function (err) {
    //     (err) ? console.log(err) : console.log("Database connected ! register");
    
    //     const request = new sql.Request();
    //     request.query(`insert into users (name,surname,email,password,type)
    //     values ('${name}','${surname}','${email}','${password}',${type})`, (err) => {
      
    //     (err) ? console.log(err) : res.send();
    //     });
    // });
    
});

module.exports = router;