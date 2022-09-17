const { Product } = require("../models/product");
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const productList = await Product.find();

    if (!productList) {
        res.status(500).json({ success: false });
    }
    res.send(productList);
});

router.post('/',(req,res)=>{
    const product = new Product({
        name:req.body.name, 
        description:req.body.description, 
        richDescription:req.body.richDescription, 
        image:req.body.image, 
        images:req.body.images, 
        brand:req.body.brand, 
        price:req.body.price, 
        // category : req.body.category, 
        countInStock:req.body.countInStock, 
        rating:req.body.rating, 
        numReviews:req.body.numReviews, 
        isFeatured:req.body.isFeatured 
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

//put 
router.put("/:id",async(req,res)=>{ 
    // if(!mongoose.isValidObjectId(req.params.id)){ 
    //     return res.status(400).send("Invalid Product Id") 
    // // } 
    // let category=await Category.findById(req.body.category) 
    // if(!category) return res.status(400).send("Invalid Category") 
 
    let product=await Product.findByIdAndUpdate( 
      req.params.id, 
      {  
        name : req.body.name, 
        description : req.body.description, 
        richDescription : req.body.richDescription, 
        image : req.body.image, 
        images : req.body.images, 
        brand : req.body.brand, 
        price : req.body.price, 
        // category : req.body.category,    
        countInStock : req.body.countInStock, 
        rating : req.body.rating, 
        numReviews : req.body.numReviews, 
        isFeatured : req.body.isFeatured,    
      }, 
      {new:true} 
    ); 
    if (!product) return res.status(400).send("the category cannot be created.."); 
    res.send (product); 
  }); 
 
 
  //delete 
  router.delete("/:id",async (req,res)=>{ 
    Product.findByIdAndRemove(req.params.id) 
    .then((category)=>{ 
        if(category){ 
            return res 
            .status (200) 
            .json({success:true,message:"The category is deleted"}) 
        } 
        else{ 
            return res 
            .status(404) 
            .json({success: false, message:"category not found"}) 
        } 
    })  
    .catch((err)=>{ 
        return res.status(500).json({success: false, error: err}) 
    }); 
}); 
 

module.exports = router;
