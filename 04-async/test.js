var test = require('tape');

module.exports = function(db, callback) {

  test('Testing User Collection', function(t) {

    var c = db.collection('user');
    t.ok(c, "collection found");
    
    // Test some queries against the collection here...
    
    t.end();
    callback(null, db);

  });

  // Add more tests here...
}
