var express = require('express');
var router = express.Router();

// Get Category model
var Category = require('../models/category');

/*
 * GET /
 */
router.get('/category', function (req, res) {
    Category.find(function (err, categories) {
        if (err)
            return console.log(err);

        res.send(categories);  
});

});

// Exports
module.exports = router;