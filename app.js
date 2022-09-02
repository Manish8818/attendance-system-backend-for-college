require('dotenv').config();
const dotenv= require("dotenv");
const express= require("express");
const app= express();
const port= process.env.PORT||3000;
const router= require("./routes/routes")
const connection= require("./db/conn")
const Student= require("./schema/student");
app.use(express.json());
app.use(router)

connection();

app.listen(port,()=>{
    console.log(`server is listen on the server ${port}`)
})
