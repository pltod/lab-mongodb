//WARNING: Works but needs major refactoring

// Starts mongodb sharded cluster with 3 config servers, 4 shards with RF = 3, and 4 mongos

// The code is kind of synchronous because it creates folders in sync manner as well as starts each process after the previous has been started

// Currently there is no clean way to stop the processes - use kill

var fs = require('fs');
var path = require('path');
var log = require('util').log;
var exec = require('child_process').exec;

// TODO This must be external parameter
var rootDir = 'PATH_TO_THE_DIRECTORY_WHERE_SHARDED_CLUSTER_WILL_BE_STARTED';

var processes = ['mongod', 'mongos'];

var configIds = [{id: 'cfg0', port: 26050}, {id: 'cfg1', port: 26051}, {id: 'cfg2', port: 26052}];

var rsIds = [{id: 'a0', port: 27000, rs:'a'}, {id: 'a1', port: 27001, rs:'a'}, {id: 'a2', port: 27002, rs:'a'},
              {id: 'b0', port: 27100, rs:'b'}, {id: 'b1', port: 27101, rs:'b'}, {id: 'b2', port: 27102, rs:'b'},
              {id: 'c0', port: 27200, rs:'c'}, {id: 'c1', port: 27201, rs:'c'}, {id: 'c2', port: 27202, rs:'c'},
              {id: 'd0', port: 27300, rs:'d'}, {id: 'd1', port: 27301, rs:'d'}, {id: 'd2', port: 27302, rs:'d'}];
              
var mongosIds = [{id: 'mongos0', port: 27017}, {id: 'mongos1', port: 26061}, {id: 'mongos2', port: 26062}, {id: 'mongos3', port: 26063}];

var processedConfigs = 0;
var processedRS = 0;
var processedMongos = 0;
var counter = 1;

function e (err) {
  console.log(err);
}

function dispatch(resolve, reject, err) {
  if (!err) {
    resolve();
  }
  else {
    reject(err);
  }
}

function getLogFileName(serverId) {
  return 'log.' + serverId
}

function getLocation(currentDir) {
  return path.join(rootDir, currentDir);
}

function constructConfigServerStringForMongos() {
  var str = '';
  // TODO This must be external parameter
  var serverName = 'SERVER_NAME_WHERE_THE_CLUSTER_IS_STARTED'
  var portDelimiter = ':';
  var serverDelimiter = ','
  configIds.forEach(function (sm, index) {
    if (configIds.length-1 == index) {
      str = str.concat(serverName + portDelimiter + sm.port);
    } else {
      str = str.concat(serverName + portDelimiter + sm.port + serverDelimiter);
    }
  })
  return str;
}

function createDir(serverMetadata) {
  var dir = path.join(rootDir, serverMetadata.id);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    log(dir + ' has been creatred!');
  } else {
    log(dir + ' alredy exists!');
  }
}

function runProcess(command) {
  return new Promise(function (resolve, reject) {

    var child = exec(command, function(err, stdout, stderr) {
      dispatch(resolve, reject, err);
      log(counter + ' done!');
      counter++;
    });

    //Pipe the outputs of the child process to the parent process
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    
  });
}

function runConfigServer() {
  
  var serverMetadata = configIds[processedConfigs];
  processedConfigs++;
  
  var configServerOptions = ' --configsvr --dbpath {server_id} --port {portnumber} --logpath {server_log} --fork';
  var options = configServerOptions
                  .replace('{server_id}', getLocation(serverMetadata.id))
                  .replace('{server_log}', getLocation(getLogFileName(serverMetadata.id)))
                  .replace('{portnumber}', serverMetadata.port);
  var command = processes[0] + options;
  
  createDir(serverMetadata);
  
  
  return runProcess(command);
}

function runShard() {
  var serverMetadata = rsIds[processedRS];
  processedRS++;
  var shardOptions = ' --shardsvr --replSet {rs_name} --dbpath {server_id} --port {portnumber} --logpath {server_log} --logappend --fork --smallfiles --oplogSize 50';
  var options = shardOptions
                  .replace('{rs_name}', serverMetadata.rs)  
                  .replace('{server_id}', getLocation(serverMetadata.id))
                  .replace('{server_log}', getLocation(getLogFileName(serverMetadata.id)))
                  .replace('{portnumber}', serverMetadata.port);
  
  var command = processes[0] + options;
  
  createDir(serverMetadata);

  return runProcess(command);
}

function runMongos() {
  var serverMetadata = mongosIds[processedMongos];
  processedMongos++;
  
  var mongosOptions = ' --configdb {config_servers} --port {portnumber} --logpath {server_log} --logappend --fork';
  var options = mongosOptions
                  .replace('{config_servers}', constructConfigServerStringForMongos())  
                  .replace('{server_log}', getLocation(getLogFileName(serverMetadata.id)))
                  .replace('{portnumber}', serverMetadata.port);

  var command = processes[1] + options;
  
  createDir(serverMetadata);
  
  return runProcess(command);
}

runConfigServer()
  .then(runConfigServer)
  .then(runConfigServer)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runShard)
  .then(runMongos)                        
  .then(runMongos)                        
  .then(runMongos)
  .then(runMongos);