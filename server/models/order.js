var mongoose = require('mongoose');


const Order = new mongoose.Schema({
    //orderNumber: {type: Number}, Don't think I need orderNumber, can just use the MongoDB
    customer: {name: {type: String}, email: {type: String}},
    billInfo: {address: {type: String}, city:{type: String}, province:{type: String}, country:{type: String}},
    shipInfo: {address: {type: String}, city:{type: String}, province:{type: String}, country:{type: String}},
    items:[{ sku:{type: String}, price:{type: Number}, qty:{type: Number}}],
    totals:{ sub:{type: Number}, tax:{type: Number}, due:{type: Number}},
    transaction: {type: Number}
});

module.exports = mongoose.model('Order', Order);