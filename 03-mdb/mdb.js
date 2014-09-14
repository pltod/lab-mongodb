#!/usr/bin/env node

var exec = require('child_process').exec;
var path = require('path');
var connect = require('mongodb');
var mongojs = require('mongojs');
var JSONStream = require('JSONStream');


process.env.MONGO_HOST = process.env.MONGO_HOST || 'localhost';
process.env.MONGO_PORT = process.env.MONGO_PORT || 27017;
process.env.DB = process.env.DB || 'testdb';

var url = 'mongodb://' + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.DB;

var dbs;


var commandPrefix = 'mongod --dbpath ';
//var userHomeDir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
var userHomeDir = __dirname;

//TODO data folder must not be hardcoded. It must exist or just point this variable to existing folder.
var defaultDataDir = 'data';
var dbpath = path.join(userHomeDir, defaultDataDir);
var mongoCommand = commandPrefix + dbpath;

// Denotes the directory with collection data
var dataPath = process.argv[3];
var defaultDataPath = 'collections';


(process.argv[2] === 'start') && start();
(process.argv[2] === 'show') && show();
(process.argv[2] === 'reinit') && reinit();
(process.argv[2] === 'user') && user();
(process.argv[2] === undefined) && help();


function start() {
  
  var child = exec(mongoCommand, function(err, stdout, stderr) {
      if (err) throw err;
  });
  
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);  
}



function show() {
  exec('ps -Aef | grep mongo', function(err, stdout, stderr) {
    if (err) throw err;
    else console.log(stdout);
  });
}

function reinit() {
  connectDB()
    .then(dropDatabase, e)
    .then(processing, e)
    .then(closeDatabase, e);
}

//gets that via mongojs and streams
function user() {
  var db = mongojs(url, ['user', 'data']);
  var str = JSONStream.stringify();
  db.user.find({}).pipe(str).pipe(process.stdout);
  
  //TODO Connection is not closed.
}


function help() {

  console.log('mdb.js - help');
  console.log('mdb.js start - start the DB');
  console.log('mdb.js show - show running DB processes');
  console.log('mdb.js reinit "derectory with collections" - reinit the DB data, drop all collections and recreates them with fresh data');
  console.log('mdb.js "collection name" - show collection data');      
  
}


function e (err) {
  console.log(err);
}

function dispatch(resolve, reject, err, result) {
  if (!err) {
    resolve(result);
  }
  else {
    reject(err);
    dbs.close();
  }
}

function connectDB() {
  return new Promise(function (resolve, reject) {
    
    connect(url, function (err, db) {
      dispatch(resolve, reject, err, db);    
    });
    
  });  
}

function dropDatabase(db) {
  return new Promise(function(resolve, reject) {
    // Let's drop the database
    db.dropDatabase(function(err, result) {
      dbs = db.db(process.env.DB);      
      dispatch(resolve, reject, err, dbs);
    });  
  });  
}

function createCollection(obj) {
  
  //dbs must be initialized in advance
  
  return new Promise(function(resolve, reject) {
    dbs.createCollection(obj.cname, function (err, collection) {
      obj.collection = collection;
      dispatch(resolve, reject, err, obj);
    });
  });
}

function insertData(obj) {
  return new Promise(function (resolve, reject) {
    obj.collection.insert(obj.content, {w:1}, function(err, result) {
      dispatch(resolve, reject, err, result);
    });
  });
}

function processing() {
  var path = require('path');
  var fs = require('fs');
  var dir;
  
  if (dataPath) {
    dir = path.normalize(dataPath);
  } else {
    dir = path.normalize(defaultDataPath);
  }
  
  var list = fs.readdirSync(dir);

  return new Promise(function (resolve, reject) {
    console.log('PROCESSING COLLECTIONS: ');
    console.log(list);
    list.forEach(function (file, index) {
      var cname = file.split('.')[0];
      var content = require(path.join(dir, file));
      
      
      var exit = (list.length - 1 == index) ? true : false;
      createCollection({cname: cname, content: content})
      .then(insertData, e)
      .then(function (result) {
        if (exit)
        {
          dispatch(resolve, reject, null, result);
        }
      }, e);
    })
  });
}

function closeDatabase(res) {
  console.log('REINIT DONE!');
  dbs.close();
}

