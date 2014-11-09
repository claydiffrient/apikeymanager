
var React = require('react');
var config = require('../../config/config');
require('node-jsx').install({extension: '.jsx'});

module.exports = function (app) {

    app.get('/login', function (req, res) {
        var props = {};
        var LoginSignup = React.createFactory(require('../../components/LoginSignup'));
        var LoginSignup = React.renderToString(LoginSignup(props));

        res.render('home', {
            componentMarkup: LoginSignup,
            title: config.app.title,
            jsonProps: JSON.stringify(props)
        });

    });
};