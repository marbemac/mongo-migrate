module.exports = {
  getConnection: getConnection
};

function getDbOpts(opts) {
  opts = opts || {
    url: 'mongodb://localhost/my-app'
  };
  return opts;
}

function getConnection(opts, cb) {
  opts = getDbOpts(opts);
  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(opts.url, function(err, db) {
    if (err) {
      return cb(err);
    }

    var complete = function(authErr, res) {
      if(authErr) {
        return cb(authErr);
      }


      if (typeof db.collection !== 'undefined') {
        // for mongodb 2.x
        var collection = db.collection('migrations');
      } else {
        var collection = new mongodb.Collection(db, 'migrations');
      }
      cb(null, {
        connection: db,
        migrationCollection: collection
      });
    };

    complete(null, null);
  });
}
