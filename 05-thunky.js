var connect = require('mongodb');

var MONGO_HOST = 'localhost';
var MONGO_PORT = 27017;
var DB = 'testdb';

var url = 'mongodb://' + MONGO_HOST + ":" + MONGO_PORT + "/" + DB;

var thunky = require('thunky');

var accessDB = thunky(function (callback) {
  connect(url, callback);
});

accessDB(function (err, db) {
  console.log(db);
  db.close();
})



