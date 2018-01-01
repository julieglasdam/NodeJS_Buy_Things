
const express = require('express');
const app = express();
var router = express.Router();
var assert = require('assert');

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

// == READ - Get array of items ==
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

// == INSERT - new items in database ==
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

         // Insert items - fra undervisningen
    /*    app.post('/customers/', function (req, res){
            MongoClient.connect(mongodburl, function (err, db){
                var col = db.collection('customers');
                col.insertOne(req.body, function(err, res){
                    res.status(201);
                    res.json({msg : 'Customer created'});
                });
            });
        });*/

    // Refresh to load updates
    res.redirect('/index.html');
});


// == UPDATE - items ==
app.post('/update', function(req, res, next){
    
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
       
        // Update database with the correct id ---- virker ikke med req.body._id
        var myquery = { _id: ObjectId(req.body._id) };
  
        db.collection("items").updateOne(myquery, item, function(err, res) {
        if (err) throw err;
          console.log("1 document updated");
        db.close();
  });

    });


    // Refresh to load updates
    res.redirect('/index.html');
});


// == DELETE - items ==
app.post('/delete', function(req, res, next){
    var id = req.body.id;

    MongoClient.connect(mongodburl, function(err, db){
        // Check if input is null
        assert.equal(null, err);
        // delete the data
        db.collection('items').deleteOne({"_id" : ObjectId(id)}, function(err, result){
            // Check if it's null
            assert.equal(null, err);
            db.close();
        })
    });

    // Refresh to load updates
    res.redirect('/index.html');
});





module.exports = app;