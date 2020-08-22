var express = require('express');
var router = express.Router();

//Models
var Items = require('../models/item');

//Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecomm', {useNewUrlParser: true,  useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('respond with an api resource');
});

router.get('/items', function(req, res, next){
    Items.find(req.query)
	.then(parts => {
		res.json({data: parts});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	});
});


module.exports = router;
