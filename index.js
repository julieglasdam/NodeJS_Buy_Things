const express = require('express');
const app = express();
var router = express.Router();
var assert = require('assert');
//const ObjectId = require('mongodb'.ObjectID);

const MongoClient = require('mongodb').MongoClient;
const mongodburl = 'mongodb://jglasdam:SJr7QtCNHmHLuf0v@cluster0-shard-00-00-p5sbp.mongodb.net:27017,cluster0-shard-00-01-p5sbp.mongodb.net:27017,cluster0-shard-00-02-p5sbp.mongodb.net:27017/webshop?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// Tell file to look in sub directory 'public' for html files
app.use(express.static('public'));

// New body parser from version x4
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies


// == Get array of customers ==
app.get('/customers', function(req, res){ // app.get('customers/:id') // error: cannot find collection
    MongoClient.connect(mongodburl, function(err, db){
        var col = db.collection('customers'); // error: empty string

        // One element
    /*   col.findOne({'_id' : ObjectId(req.params.id)}, function (err, res){
            res.json(result);
        });
        db.close();*/

        // CREATE
    /*    app.post('/customers/', function (req, res){
            MongoClient.connect(mongodburl, function (err, db){
                var col = db.collection('customers');
                col.insertOne(req.body, function(err, res){
                    res.status(201);
                    res.json({msg : 'Customer created'});
                });
            });
        });*/
        
        // All elements
        col.find().toArray(function(err, result){
            res.json(result);
        });
        db.close();
    });
   
});

// == Get array of items ==
app.get('/items', function(req, res){ 
    MongoClient.connect(mongodburl, function(err, db){
        var col = db.collection('items');
        
        // All elements
        col.find().toArray(function(err, result){
            res.json(result);
        });
        db.close();
    });
   
});



// == Post data ==
app.post('/insert', function(req, res, next){
    // Create javascript object to insert
    var item = {
        name: req.body.item_name,
        quantity: req.body.quantity,
        price: req.body.price
    };
    console.log(item);

    MongoClient.connect(mongodburl, function(err, db){
        // Check if input is null
        assert.equal(null, err);
        // Get the data
        db.collection('items').insertOne(item, function(err, result){
            console.log('something happened');
            // Check if it's null
            assert.equal(null, err);
            db.close();
        })
    });

    // Refresh to load updates
    res.redirect('/items.html');
});

app.listen(3000);