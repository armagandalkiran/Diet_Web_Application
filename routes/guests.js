const express = require("express");
const sql = require("mssql");
const router = express.Router();
const config = require("../dbconfig");



router.post("/guests",(req,res) => {

    const {day_time
        ,seven_to_twelve_months_guests
        ,one_to_two_years_guests
        ,three_to_six_years_guests
        ,seven_to_twelve_year_guests
        ,thirteen_or_higher_guests
        ,building_no
        ,date
    } = req.body;

    sql.connect(config, function (err) {
        (err) ? console.log(err) : console.log("Database connected guests!");

        const request = new sql.Request();
        request.query(`insert into guests
        (seven_to_twelve_months_age,
            one_to_two_years_age,
            three_to_six_years_age,
            seven_to_twelve_years_age,
            thirteen_or_higher_age,
            building_no,
            date,
            users_id,
            day_time) values 
            ('${seven_to_twelve_months_guests}'
            ,'${one_to_two_years_guests}'
            ,'${three_to_six_years_guests}'
            ,${seven_to_twelve_year_guests}
            ,${thirteen_or_higher_guests}
            ,${building_no}
            ,'${date}'
            ,1
            ,'${day_time}') `, (err) => {
    
        (err) ? console.log(err) : res.send(req.body);
        });
    });
});

router.get("/guests",(req,res) => {

    sql.connect(config, function (err) {
       (err) ? console.log(err) : console.log("Database connected guests!");
   
       const request = new sql.Request();
       request.query(`select * from guests`, (err,result) => {
           (err) ? console.log(err) : res.json(result.recordset);
           //res.json(result.recordset)
       });
   });
});

module.exports = router;