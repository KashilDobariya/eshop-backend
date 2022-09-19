const { user, User } = require("../models/user");
const express = require("express");
const { route } = require("./products");
const router = express.Router();

// GET
router.get('/', async (req, res) => {
    const userList = await User.find();
    if (!userList) {
        res.status(500).json({ success: false });
    }
    res.send(userList);
});

// POST
router.post("/", async (req, res) => {
    let category = new Category({
        name : req.body.name,
        email : req.body.email,
        passwordHash : req.body.passwordHash,
        phone : req.body.phone,
        isAdmin : req.body.isAdmin,
        street : req.body.street,
        apartment : req.body.apartment,
        zip : req.body.zip,
        city : req.body.city,
        country : req.body.country,
    });
    category = await category.save();
    if (!category) return res.status(400).send("the category cannot be created");
    res.send(category);
});

// Update
router.put("/:id", async (req, res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id, {
            name : req.body.name,
            email : req.body.email,
            passwordHash : req.body.passwordHash,
            phone : req.body.phone,
            isAdmin : req.body.isAdmin,
            street : req.body.street,
            apartment : req.body.apartment,
            zip : req.body.zip,
            city : req.body.city,
            country : req.body.country,
    },
        { new: true }
    );
    if (!category) return res.status(400).send("the category cannot be created");
    res.send(category);
});

// Delete
router.delete("/:id", (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({ success: true, message: "the category is deleted" });
            }
            else {
                return res.status(500).json({ success: false, message: "category not fpounf!" });
            }
        })
        .catch((err) => {
            return res.status(500).json({ success: false, error: err });
        });
});

module.exports = router;