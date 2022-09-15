const express = require("express")
const app = express()
const dotenv=require('dotenv').config()
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');


app.use(cors());
app.options("*", cors());

// middleware
app.use(morgan("tiny"));
app.use(express.json());

//Routes
const productRoutes = require("./routes/products");
app.use('/products', productRoutes);

// database
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log("Databse Conncetions is Ready.....")
    })
    .catch((err) => {
        console.log(err);
})


// server
app.listen(process.env.port, () => {
    console.log(`App Listening on the port ${process.env.port}`);
})
