var React = require('react');

var Home = React.createClass({
    displayName: 'Home',

    render: function () {
        return (
            <div>
                <div className="jumbotron">
                    <h1>API Key Manager</h1>
                    <p>You have reached the key manager.  Please login or signup to manage keys</p>
                    <p>
                        <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                    </p>
                </div>
            </div>
        );
    }



});


if (typeof window !== 'undefined') {
    var container = document.getElementById("container");
    var props = JSON.parse(document.getElementById("props").innerHTML);
    React.renderComponent(Home(props), container);
}

module.exports = Home;