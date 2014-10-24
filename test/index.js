var config = require('./config.json');
var mongo = require('mongodb');
var url = 'mongodb://' + config.server + ":" + config.port + "/" + config.defaultDatabase;
var run = require('./gen-runner');
var dbUtils = require('./db-utils');


function *main () {
  var db = yield dbUtils.connect3(mongo, url);
  
  console.log(db);
  console.log('DB is available to use it here...');  
  
  yield dbUtils.close3(db);
}

run(main);
