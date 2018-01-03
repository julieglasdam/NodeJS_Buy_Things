/*
- Update with id
- Each customer has one document with array of orders
- Add item to cart only with ID and it fill out the rest of order
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

// Get all the .js files
var customers = require('./routes/customers.js');
var items = require('./routes/items.js');
var orders = require('./routes/orders.js');

// Use the files
app.use(customers);
app.use(items);
app.use(orders);


app.listen(3000);