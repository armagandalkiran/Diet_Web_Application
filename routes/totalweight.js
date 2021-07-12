const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../dbconfig");

router.get("/totalweight",(req,res) => {

    sql.connect(config, function (err) {
       (err) ? console.log(err) : console.log("Database connected total weight!");
   
       const request = new sql.Request();
       request.query(`select * 
       from foods f, menus m,food_supplies fs,categories c
       where f.id = m.food_id AND c.ID = f.category_id AND fs.id = f.supply_id`, (err,result) => {
           (err) ? console.log(err) : res.json(result.recordset);
           //res.json(result.recordset)
       });
   });
});



module.exports = router;