const express = require("express")
const app = express();
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');


app.use(cors());
app.options("*", cors());

// middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());

//Routes
const categoriesRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
app.use('/categories', categoriesRoutes);
app.use('/products', productRoutes);
app.use('/users', usersRoutes);


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
