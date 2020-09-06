## Weekend Project, E Commerce
Web application where users can order items
### Weekend 2
Continue to work on the app. P1, finish the order function, add paypal, then continue to update once a month or so with new things when possible.
### Weekend 3
Yes I spent 3 weekends working on this project, but I am happy with the results.
- Orders are getting posted to the server.
- Inventory levels are getting adjusted.
- Emails are getting sent.

## Goal
Combine my past and new knowledge/skills to create a full stack app

## Plan of action
### Create MongoDB models
### Create backend API
### Create frontend interface

## Post Weekend Project Comments
### Post Weekend 1
Decided to do a second weekendon this, and adding a Paypal integration, the email confirmation, and then continuing to update the app with new 'features' as I learn new things. 
### Post Weekend 2
Completed payment function. Frontend is displaying forms to get cutomer information, and then given the option to pay with Paypal. Order object is getting created, but not posted to the backend.
### Post Weekend 3
Orders are getting posted to the server, inventory is getting adjusted, order number is getting displayed to the frontend, and an email is getting sent to the customer

## Post 3 Week Comments
The project is in a great working state. The below things are concerns for a real project, but deemed un-needed for these projects.
- Some of the views need some TLC (ex buttons are too close)
- If an item is sold out, the item should not be displayed. And when an order is placed, it should check if the item still has inventory, and handle backorder / removing the item as needed
- The email confirmation isn't sending any order information, but I would be able to make a function return a string displaying the order information
- I am happy with how my files are organized.
- - Still not sure if I should be making React components files or keep them in one file
- - I would have liked to keep all the gmail code in one file, but I was having issues using the Google API to authorize the email account.
- - The Paypal API was easy to use, but I don't think I needed to create its own component and could be simplified

## Motivation
Learnt some new skills in July / August (async/await, promisses, Array.map), and I wanted to make a larger weekend project using these tools when the scenario come up

## Features
- Promisses
- Array functions
- Google API (Sending emails)
- Paypal API
- React frontend
- Express Node backend
- MongoDB database

## Code Example / Misc things I learned during the project
- When adding a proxy to a package.json file, the React app will need to be manually restarted to get the updated proxy info
- When working with forms, place the onSubmit function call in the <Form> tags and not the <Button> tag
--If placed in the Button tag, the page will still refresh even with 'event.preventDefault()'


## Installation


## How to use?
use 'npm start' from project root

## Contribute


## Credits
Paypal code - Jeff Delaney(Fireship.io), https://github.com/fireship-io/193-paypal-checkout-v2-demos/blob/master/react-app/src/App.js, and https://www.youtube.com/watch?v=AtZGoueL4Vs
Gmail Code - Jai Parakh, https://medium.com/@parakh.js/how-to-use-gmail-api-with-node-js-part-1-b17097a64990


#### Anything else that seems useful

