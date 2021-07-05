const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../dbconfig");


router.get("/categories",(req,res) => {

    sql.connect(config, function (err) {
       (err) ? console.log(err) : console.log("Database connected categories!");
   
       const request = new sql.Request();
       request.query(`select * from categories`, (err,result) => {
           (err) ? console.log(err) : res.json(result.recordset);
       
       });
   });
});


module.exports = router;