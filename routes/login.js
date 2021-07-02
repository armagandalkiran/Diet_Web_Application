const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../dbconfig");

router.post("/", (req,res)  => {
    
    const {email,password} = req.body;

    // database connection 
    sql.connect(config, function (err) {
        (err) ? console.log(err) : console.log("Database connected ! login");
    
        const request = new sql.Request();
        request.query(`select * from users where email = '${email}'`, (err,result) => {
        //(err) ? console.log(err) : console.log(result);
        

        if(result.recordset.length !== 0){
            console.log("burdayim");
            if(result.recordset[0].password === password) {
                res.send(true);
            } else {
                res.send(false);
            }
        } else {
            res.send(false);
        }    

        });
    });
    
});

module.exports = router;