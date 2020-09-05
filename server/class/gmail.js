const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const mailComposer = require('nodemailer/lib/mail-composer');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.modify',
'https://www.googleapis.com/auth/gmail.compose','https://www.googleapis.com/auth/gmail.send'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './class/token.json';

class Gmail{
    
    constructor() {
        fs.readFile('./class/credentials.json', (err, content) => {
            if(err){
                return console.log('Error loading client secret file:', err);
            }
        
            // Authorize the client with credentials, then call the Gmail API.
            this.CREDENTIALAS = content;
            this.authorize(JSON.parse(content), this.getAuth);
        });
      }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    authorize(credentials, callback) {
        const {client_secret, client_id, auth_uri} = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, auth_uri);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, (err, token) => {
            if(err){
                return this.getNewToken(oAuth2Client, callback);
            }
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */

    getNewToken(oAuth2Client, callback) {
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

    getAuth(auth){

    }
    test(){
        //console.log(`Testing Credentials log - ${this.CREDENTIALAS}`);
    }
    sendInvoice(order){
        //Send order object
        console.log('---------------------');
        console.log(JSON.stringify(order));
        console.log('---------------------');
        let orderNumber = order._id;
        let c_name = order.customer.name;
        let c_email = order.customer.email;
        let billing = order.billInfo; // "billInfo":{"address":"4845 53rd Street","city":"Delta","province":"British Columbia","country":"Canada"},
        let shipping = order.shipInfo;// "shipInfo":{"address":"5413 7th ave","city":"Tsawwassen","province":"BC","country":"Canada"},
        let line_items = order.items;// "items":[{"_id":"5f540de382884ae5565874c0","sku":"1000","price":1,"qty":1}]
        let transaction = order.transaction; //if -1, then the customer needs to pay at pickup, order order has been payed
        let totals = order.totals;// "totals":{"sub":1,"tax":0.01,"due":1.01},

        //var obj = new Mail(auth, "mitchell.rian.smith@gmail.com", 'Test Subject3', 'Test Body', 'mail', '');
        //constructor(auth, to, sub, body, task, attatchmentSrc)
        this.me = 'mitchell.test.smith@gmail.com'; // Who is sending the email
        this.task = 'mail';
        this.auth = authorize(this.CREDENTIALAS);
        this.to = "mitchell.rian.smith@gmail.com"//Using hard coded email for testing //c_email;
        this.sub = `Invoice - Order ${orderNumber}`;
        this.body = 'TEMP EMAIL BODY';
        this.gmail = google.gmail({version: 'v1', auth});
        this.attatchment = '';


        this.makeBody();
    }
    makeBody(){
		var arr = [];
		for(var i=0;i<this.attatchment.length;i++){
			arr[i] = {
				path: this.attatchment[i],
				encoding: 'base64'
			}
		}

		//Mail Body is created.
		if(this.attatchment.length){
			var mail = new mailComposer({
				to: this.to,
				text: this.body,
				subject: this.sub,
				textEncoding: "base64",
				attachments: arr
			});	
		}else{
			var mail = new mailComposer({
				to: this.to,
				text: this.body,
				subject: this.sub,
				textEncoding: "base64"
			});
		}
		
		//Compiles and encodes the mail.
		mail.compile().build((err, msg) => {
			if (err){
				return console.log('Error compiling email ' + error);
			} 
		
			const encodedMessage = Buffer.from(msg)
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');
			
			if(this.task === 'mail'){
				this.sendMail(encodedMessage);
			}else{
				this.saveDraft(encodedMessage);
			}
		});
	}
    //Send the message to specified receiver.
    sendMail(encodedMessage){
        this.gmail.users.messages.send({
            userId: this.me,
            resource: {
                raw: encodedMessage,
            }
        }, (err, result) => {
            if(err){
                return console.log('NODEMAILER - The API returned an error: ' + err);
            }
                
            console.log("NODEMAILER - Sending email reply from server:", result.data);
        });
    }
    //Saves the draft.
    saveDraft(encodedMessage){
		this.gmail.users.drafts.create({
			'userId': this.me,
			'resource': {
			  'message': {
				'raw': encodedMessage
			  }
			}
		})
    	}

	//Deletes the draft.
    deleteDraft(id){
		this.attachment.gmail.users.drafts.delete({
			id: id,
			userId: this.me 
		});
    }

	//Lists all drafts.
    listAllDrafts(){
        this.gmail.users.drafts.list({
            userId: this.me
        }, (err, res) => {
        	if(err){
            	console.log(err);
        	}
		    else{
				console.log(res.data);
			}
    	});
    }
}
module.exports = Gmail;