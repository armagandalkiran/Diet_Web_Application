const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../dbconfig");

router.get("/showmenu",(req,res) => {

    sql.connect(config, function (err) {
       (err) ? console.log(err) : console.log("Database connected showmenu!");
   
       const request = new sql.Request();
       request.query(`select * from foods f, menus m where f.id = m.food_id`, (err,result) => {
           (err) ? console.log(err) : res.json(result.recordset);
           //res.json(result.recordset)
       });
   });
});



module.exports = router;