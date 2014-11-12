/** @jsx React.DOM */

"use strict";

var React = require("react");
var Router = require("react-router");
var Jumbotron = require("react-bootstrap/Jumbotron");
var Button = require("react-bootstrap/Button");

var Welcome = React.createClass({
  mixins: [Router.Navigation,],
  onClick: function() {
    this.transitionTo('createForm');
  },
  render: function() {
    return (
      <Jumbotron className="vertical-center">
        <h1>Hey, welcome!</h1>
        <p>This is your new preffered way to create forms</p>
        <p><Button onClick={this.onClick} bsStyle="primary">Create a new one</Button></p>
      </Jumbotron>
    );
  }
});

module.exports = Welcome;
