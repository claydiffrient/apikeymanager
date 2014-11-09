var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var compress = require('compression');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var passport = require('passport');
var exphbs = require('express-handlebars');
var flash = require('connect-flash');
var config = require('./config');
var path = require('path');
var mongoStore = require('connect-mongo')({
    session: session
});

module.exports = function (db) {
    var app = express();

    //Get all the model files
    config.getGlobbedFiles('./app/models/**/*.js').forEach(function (model) {
       require(path.resolve(model));
    });

    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.set('showStackError', true);

    console.log(path.resolve('./app/views/', 'layouts'));
    console.log(process.cwd() + '/app/views/layouts');
    var hbsConfig = {
        defaultLayout: 'main',
        layoutsDir: './app/views/layouts'
    };


    app.engine('handlebars', exphbs(hbsConfig));
    app.set('view engine', 'handlebars');

    app.set('views', './app/views');


    if (process.env.NODE_ENV === 'development') {
        app.use(logger('dev'));
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.enable('jsonp callback');

    app.use(cookieParser());

    app.use(session({
        saveUnitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: new mongoStore({
            db: db.connection.db,
            collection: config.sessionCollection
        })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages
    app.use(flash());

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // Setting the app router and static folder
    app.use(express.static(path.resolve('./public')));

    // Globbing routing files
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });

    return app;
};