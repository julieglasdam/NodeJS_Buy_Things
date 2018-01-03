
const express = require('express');
const app = express();
var router = express.Router();
var assert = require('assert');
// -----------------------------------------------
var user = "Customer01";                    // TEMP
var userId = "59d7376de0cbf1027de116f4";    // TEMP customer01
//var userId = "59d8baa726146c02783529dd";  // TEMP customer02
// -----------------------------------------------

const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const mongodburl = 'mongodb://jglasdam:SJr7QtCNHmHLuf0v@cluster0-shard-00-00-p5sbp.mongodb.net:27017,cluster0-shard-00-01-p5sbp.mongodb.net:27017,cluster0-shard-00-02-p5sbp.mongodb.net:27017/webshop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// Tell file to look in sub directory 'public' for html files
app.use(express.static('public'));

// New body parser from version x4. Parsing request in middleware, before app handles it
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies



// == Get array of orders ==
app.get('/orders', function(req, res){ 
    MongoClient.connect(mongodburl, function(err, db){
       
        // Get the correct collection
        var col = db.collection('orders');
        
        // This works when one customer has one docoment with all orders
        // Find the document with the order id matching the customer id
     /*   col.find({order: userId}).toArray(function(err, result){
            res.json(result);
        }); */

        // This works when one order is one document
        col.find().toArray(function(err, result){
            res.json(result);
        });
        db.close(); 
        
    });
   
});



// == Add to order == 
app.post('/addToCart', function(req, res, next){
    // Get the total price from database
    var total_price = 0;
   
    // Create javascript object to insert
    var item = {
        customer_name: user,                                                 // Customers name
        item_id: req.body.item_id,                                           // Item id
        name: req.body.item_name,                                            // Item name      
        price: req.body.price,                                               // Price
        total_price: parseInt(req.body.price) + parseInt(total_price)        // Total price
    };
    console.log(item);

    // Insert to database
    MongoClient.connect(mongodburl, function(err, db){
        // Check if input is null
        assert.equal(null, err);
        
        db.collection('orders').insertOne(item, function(err, result){
            // Check if it's null
            assert.equal(null, err);
            db.close();
        })
    });
    // Refresh to load updates
    res.redirect('/index.html');
});

module.exports = app;