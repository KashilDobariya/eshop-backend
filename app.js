const express = require("express")
const app = express()
const dotenv=require('dotenv').config()
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log("Databse Conncetions is Ready.....")
    })
    .catch((err) => {
        console.log(err);
})


// Schema
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock:{
        type: Number,
        require:true
    }
})

//model

const Product =mongoose.model('Product',productSchema);

app.post('/',(req,res)=>{
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock.type,
    });
console.log(product)
    product
        .save()
        .then((createdProduct)=>{
            res.status(201).json(createdProduct);
        })
        .catch((err)=>{
            res.status(500).json({
                error:err,
                success:false,
            });
        });
});


app.get('/',(req,res)=>{
    product.find().then((products)=>{
        res.status(200).json(products);
    }).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false 
        })
    })
})

// server
app.listen(process.env.port, () => {
    console.log(`App Listening on the port ${process.env.port}`);
})