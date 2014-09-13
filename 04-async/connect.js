var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;

process.env.MONGO_HOST = process.env.MONGO_HOST || 'localhost';
process.env.MONGO_PORT = process.env.MONGO_PORT || 27017;
process.env.DB = process.env.DB || 'testdb';

var url = 'mongodb://' + process.env.MONGO_HOST + ":" + process.env.MONGO_PORT + "/" + process.env.DB;

module.exports = function (callback) {
  MongoClient.connect(url, {}, function (err, db) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, db)
    }
  });
}