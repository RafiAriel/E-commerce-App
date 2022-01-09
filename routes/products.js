var express = require('express');
var router = express.Router();

// Get Product model
var Product = require('../models/product');

// Get Category model
var Category = require('../models/category');

/*
 * GET all products
 */
router.get('/allproducts', function (req, res) {

    Product.find(function (err, products) {
        if (err)
            console.log(err);

        res.send(products);
    });

});

/*
 * GET products by category
 */
router.get('/:category', function (req, res) {

    var categorySlug = req.params.category;

    Category.findOne({slug: categorySlug}, function (err, c) {
        Product.find({category: categorySlug}, function (err, products) {
            if (err)
                console.log(err);
                
            res.send(products);
        });
    });

});

/*
 * GET product details
 */
router.get('/product/:product', function (req, res) {

    var loggedIn = (req.isAuthenticated()) ? true : false;

    Product.findOne({slug: req.params.product}, function (err, product) {
        if (err) {
            console.log(err);
        } else {
                    res.send ({
                        p: product,
                        loggedIn: loggedIn
                    });
        }
    });

});

// Exports
module.exports = router;


