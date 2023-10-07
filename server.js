const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();


connectDb()
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/contacts/",require("./router/contactRouter"))
app.use("/api/user/",require("./router/userRouter"))

app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
}) 

