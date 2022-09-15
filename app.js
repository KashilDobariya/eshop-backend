const express = require("express")
const app = express()
const dotenv=require('dotenv').config()
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(morgan("tiny"));
app.use(cors());

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log("Databse Conncetions is Ready.....")
    })
    .catch((err) => {
        console.log(err);
})

app.get('/', (req, res) => { 
    res.send("Hello World");
})

app.post('/post', (req, res) => {
    res.send("Welcome to Your World");
})

app.listen(process.env.port, () => {
    console.log(`App Listening on the port ${process.env.port}`);
})