/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express');
var bodyParser = require('body-parser');
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
require('dotenv').config();

var AWS = require('aws-sdk');

var ses = new AWS.SES(config);
// declare a new express app
var app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

/**********************
 * Example get method *
 **********************/

app.get('/charge', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

app.get('/charge/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
 * Example post method *
 ****************************/

const chargeHandler = async (req, res, next) => {
  const { token } = req.body;
  const { currency, amount, description } = req.body.charge;

  try {
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency,
      description,
      source: token.id,
    });
    if (charge.status === 'succeeded') {
      req.charge = charge;
      req.description = description;
      req.email = req.body.email;
      next();
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const emailHandler = async (req, res) => {
  const {
    charge,
    description,
    email: { shipped, customerEmail, ownerEmail },
  } = req;

  ses.sendEmail(
    {
      Source: config.adminEmail,
      ReturnPath: config.adminEmail,
      Destination: {
        ToAddresses: [config.adminEmail, ownerEmail, customerEmail],
      },
      Message: {
        Subject: {
          Data: 'Order Details - Marketplace',
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
              <h3>Order Processed!</h3>
              <p style="font-weight: bold">Description: ${description}</p>
              <p>${charge.amount / 100}€</p>
              <p>Customer Email: <a href="mailto:${customerEmail}">${customerEmail}</a></p>
              <p>Contact your seller: <a href="mailto:${ownerEmail}">${ownerEmail}</a></p>
              
              ${shipped ? `<p>${charge.source.name}</p>` : `<span></span>`}
              ${
                shipped
                  ? `<p>${charge.source.address_line1}</p>`
                  : `<span></span>`
              }
              ${
                shipped
                  ? `<p>${charge.source.address_city}, ${charge.source.address_zip}</p>`
                  : `<span></span>`
              }

              <p style="font-style: italic; color: grey;">
               "Your product will be ${
                 shipped ? 'delivered' : 'emailed to you'
               } in 1-3 days"
               <p style="font-weight: bold">Thank you for your order!</p>
              
            `,
          },
        },
      },
    },
    (err, data) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      res.json({ message: 'Order processed successfully!', charge, data });
    }
  );
};

app.post('/charge', chargeHandler, emailHandler);

app.post('/charge/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example put method *
 ****************************/

app.put('/charge', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

app.put('/charge/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/charge', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/charge/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log('App started');
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
