var async = require('async');

var connect = require('./connect.js');
var test = require('./test.js');

var process = async.compose(test, connect);

process(function (err, db) {
  db.close(function (err, result) {
    if(!err) {
      console.log('db closed successfully!');
      console.log('');      
      console.log('Test Results Summary:');
    }
  });
});


function errorHandler(err, result, callback) {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
}

