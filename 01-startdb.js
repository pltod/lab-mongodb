// Starting mongo via node.js script
// Could be useful if we want to restart mongo together with node using tools like supervisor and nodemon

var exec = require('child_process').exec;
var fs = require('fs');
var util = require('util');

var program = 'mongod --dbpath ';

//for example node startDB.js ' --dbpath path_to_data'
var dbpath = process.argv[2];

if (dbpath === undefined) {
  // Will use temp folder if exist or create temp folder and use it
  dbpath = 'temp';
  fs.exists(dbpath, function (exists) {
    util.error(exists ? "Specified path exists" : "Specified path does not exists! Please provide existing one or use the default...");
    if (exists) {
      run();
    } else {
      fs.mkdirSync('temp');
      run();
    }
  });
} else {
  // If path is correct run the db otherwise inform that the path is missing
  fs.exists(dbpath, function (exists) {
    util.error(exists ? "Specified path exists" : "Specified path does not exists! Please provide existing one or use the default...");
    if (exists) run();
  });
}

function run() {
  var command = program + dbpath;

  var child = exec(command, function(err, stdout, stderr) {
    //Do nothing!
  });

  //Pipe the outputs of the child process to the parent process
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);  
}
