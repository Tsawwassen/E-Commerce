var express = require('express');
var app = express();
var router = express.Router();


//Models
var Items = require('../models/item');
var Orders = require('../models/order');

//Class Object
var Gmail = require('../class/gmail.js');

{//Gmail Code - Start
	var CREDENTIALAS; //Variable used to store GoogleAPI credentials
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify',
'https://www.googleapis.com/auth/gmail.compose','https://www.googleapis.com/auth/gmail.send'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './class/token.json';

// Load client secrets from a local file.
fs.readFile('./class/credentials.json', (err, content) => {
    if(err){
        return console.log('Error loading client secret file:', err);
    }

    // Authorize the client with credentials, then call the Gmail API.
	authorize(JSON.parse(content), getAuth);
	CREDENTIALAS = content;
	
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

function authorize(credentials, callback, order) {
    const {client_secret, client_id, redirect_uris} = credentials.web;
	const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
	

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if(err){
            return getNewToken(oAuth2Client, callback);
        }
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, order);
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
        });
    });
}

//getAuth is just used as a test callback function to confirm the authorization was a success
function getAuth(auth){
	//console.log("autorized");
}

//Gmail Code - End
}


//Database
var mongoose = require('mongoose');
var ObjectId = require('mongojs').ObjectID;
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

 router.get('/sendInvoiceEmail/:id', function(req, res){
	 Orders.findById(req.params.id)
	 .then(order => {
		//console.log(order);
		authorize(JSON.parse(CREDENTIALAS), sendEmail, order);
		
		res.json({status: "success"});
	 })
	.catch(err => res.json({status: "error", data: err}));
 });

 function sendEmail(auth, order){

	 var email = new Gmail( auth, 
							"mitchell.rian.smith@gmail.com", /**`${order.customer.email}` **/ //DONE : Change to customer's email. Move the block comment to use the email given on the order, using my email still for testing
							`Order Number ${order._id} Confirmation`, //Done : Change email subject to something meaningful. bit too long for real world application, but it works
							"Hello \ntesting escape keys in plain text \nthird line", //TODO : Change email body to order, constructor is expecting a string
							 ); 
	email.makeBody();
}
/**
 * TODO
 * 
 * Orders (create, get)
 * 
 */

module.exports = router;
