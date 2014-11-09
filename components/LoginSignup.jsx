var React = require('react');
var Login = require('./Login.jsx');
var Signup = require('./Signup.jsx');

var LoginSignup = React.createClass({
    displayName: 'LoginSignup',

    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center">Login or Signup</h1>
                </div>
                <div className="col-md-5 border">
                    <Login />
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6 border">
                    <Signup />
                </div>
            </div>
        );
    }



});


if (typeof window !== 'undefined') {
    var container = document.getElementById("container");
    var props = JSON.parse(document.getElementById("props").innerHTML);
    React.renderComponent(LoginSignup(props), container);
}

module.exports = LoginSignup;