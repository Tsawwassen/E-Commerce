var express = require('express');
var router = express.Router();

//Models
var Items = require('../models/item');

//Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecomm', {useNewUrlParser: true,  useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res, next) {
    Items.create({
        sku: "test",
        name: "Test",
        desc: "Test", 
        price: 1.00,
        inv_level: 5,
        tax: 0.02 // TODO add a functionality to have different tax codes with different values
    })
    res.send('respond with an api resource');
});

module.exports = router;
