const express = require("express");
const register = require("./routes/register.js");
const login = require("./routes/login");
const ingredients = require("./routes/ingredients");
const guests = require("./routes/guests");
const makemenu = require("./routes/makemenu");
const categories = require("./routes/categories");
const showmenu = require("./routes/showmenu");
const totalweight = require("./routes/totalweight");

const app = express();
app.use(express.json());

// place routes here
app.use("/",register);
app.use("/",login);
app.use("/",ingredients);
app.use("/",guests);
app.use("/",makemenu);
app.use("/",categories);
app.use("/",showmenu);
app.use("/",totalweight);

app.listen(5000,()=>{
    console.log("Backend server is active on port 5000");
})