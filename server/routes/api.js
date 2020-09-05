var express = require('express');
var app = express();
var router = express.Router();


//Models
var Items = require('../models/item');
var Orders = require('../models/order');

//Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ecomm', {useNewUrlParser: true,  useUnifiedTopology: true });

/* GET home page. */
router.get('/', function(req, res) {
    res.send('respond with an api resource');
});

router.get('/items', function(req, res){
    Items.find(req.query)
	.then(items => {
		res.json({status: "success", data: items});
	})
	.catch(error => {
		res.json({status: "error", data: error});
    });
});

 router.post('/order', function(req, res){
	Orders.create(req.body)
	.then(order => {
		updateInventory(order.items);
		res.json({status: "success", data: order._id});
	})
	.catch(error => {
		res.json({status: "error", data: error});
	});
});

let updateInventory = (items) => {
	items.forEach((item) => {
		Items.findOne({sku: item.sku})
		.then(i =>{
		 	i.inv_level = i.inv_level - item.qty;
			i.save();
		});
	})
}

/**
 * TODO
 * 
 * Orders (create, get)
 * 
 */

module.exports = router;
