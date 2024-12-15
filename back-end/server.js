const express = require("express");
const app = express();
const connectDB = require('./dbConnection')
const cors = require("cors");
const Ticket = require('./Schema');
app.use(cors());

app.use(express.json());

connectDB();
app.use(express.urlencoded({ extended: false }))

app.use("/api", require("./routes"));

app.listen(8080,()=>{
    console.log("App listening to port 8080")
});