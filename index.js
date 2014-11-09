var init = require('./config/init');
var config = require('./config/config');
var mongoose = require('mongoose');

var db = mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('\x1b[31m', 'Could not connect to MongoDB!');
        console.log(err);
    }
});

var app = require('./config/express')(db);

require('./config/passport')();

app.listen(config.port);

exports = module.exportss = app;

console.log('API Key Server started on port ' + config.port);