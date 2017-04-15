var process  = require('process');
var fs = require('fs');

module.exports = function(source) {
  var cfg = JSON.parse(fs.readFileSync('./config/config.json'));
  if (source == 'localdev') {
    // Run with local if specified
    return cfg.dbConnect.localdev;
  } else if (source == 'stage') {
    // Run with the staging if specificied
    return cfg.dbConnect.devsrv;
  } else {
    // in general run with the local srv
    return cfg.dbConnect.localdev;
  }
};
