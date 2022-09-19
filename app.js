const express = require("express")
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const authJwt = require("./helpers/Jwt");


app.use(cors());
app.options("*", cors());

// middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

//Routes
const categoriesRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
app.use('/categories', categoriesRoutes);
app.use('/products', productRoutes);
app.use('/users', usersRoutes);
app.use(authJwt);


// database
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log("Databse Conncetions is Ready.....")
    })
    .catch((err) => {
        console.log(err);
    });


// server
app.listen(process.env.port, () => {
    console.log(`App Listening on the port ${process.env.port}`);
});
