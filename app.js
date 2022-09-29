const express = require("express");
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
// const authJwt = require("./helpers/Jwt");


app.use(cors());
app.options("*", cors());

// middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
// app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

//Routes
const categoriesRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRotes = require("./routes/orders");
app.use('/categories', categoriesRoutes);
app.use('/products', productRoutes);
app.use('/users', usersRoutes);
app.use('/orders', ordersRotes);


// database
mongoose.connect(process.env.CONNECTION_URL, {
    
    // dbName: process.env.dbName
})
    
    .then(() => {
        console.log("Databse Conncetions is Ready.....")
    })
    .catch((err) => {
        console.log(err);
    });


const PORT = process.env.PORT || 3300;
        
// server
app.listen(process.env.PORT, () => {
    console.log(`App Listening on the port ${PORT}`);
});
