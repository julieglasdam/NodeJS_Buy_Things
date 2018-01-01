/*
Noter:
- Brug Postman til at indsætte ting i databasen
- 1-til-1, mange-til-mange
- MongoDB er ikke normalized
- Callback function
*/ 


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

app.use(express.json());            // to support JSON-encoded bodies

var customers = require('./routes/customers.js');
var items = require('./routes/items.js');
var orders = require('./routes/orders.js');
app.use(customers);
app.use(items);
app.use(orders);






app.listen(3000);