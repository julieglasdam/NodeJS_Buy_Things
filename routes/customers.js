
const express = require('express');
const app = express();
var router = express.Router();
var assert = require('assert');

// ------ TEMP -------
var userId = "59d7376de0cbf1027de116f4";
// -------------------

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



// == Get array of customers ==
app.get('/customers', function(req, res){ // app.get('customers/:id') // error: cannot find collection
    MongoClient.connect(mongodburl, function(err, db){
        var col = db.collection('customers'); 

        // All elements
        col.find().toArray(function(err, result){
            res.json(result);
        });
        db.close(); 
    });
   
});

// ---------- Does not return anything and fucks up html :( 
// Find specific customer and return his name
/*app.get('/oneCustomer', function(req, res){ 
  MongoClient.connect(mongodburl, function(err, db){
    var col = db.collection('customers'); 

    // One element
  col.findOne({'_id' : userId}, function (err, result){
        res.json(result); // null???
    });
    db.close();



  });

}) */

module.exports = app;