
var React = require('react');
var config = require('../../config/config');
require('node-jsx').install({extension: '.jsx'});

module.exports = function (app) {

    app.get('/', function (req, res) {
        var props = {
            test: 'This is a test'
        };
        var Home = React.createFactory(require('../../components/Home'));
        var HomeMarkup = React.renderToString(Home(props));

        res.render('home', {
            componentMarkup: HomeMarkup,
            title: config.app.title,
            jsonProps: JSON.stringify(props)
        });

    });
};