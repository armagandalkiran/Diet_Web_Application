const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../dbconfig");

router.post("/register", (req,res)  => {
    
    const {name,surname,email,password,type} = req.body;

    // database connection 
    sql.connect(config, function (err) {
        (err) ? console.log(err) : console.log("Database connected ! register");
    
        const request = new sql.Request();
        request.query(`insert into users (name,surname,email,password,type)
        values ('${name}','${surname}','${email}','${password}',${type})`, (err) => {
      
        (err) ? console.log(err) : res.send();
        });
    });
    
});

module.exports = router;