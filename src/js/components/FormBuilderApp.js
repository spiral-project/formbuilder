/** @jsx React.DOM */

"use strict";

var React = require("react");

var FormEditor = require("./FormEditor");
var Header = require("./Header");


var FormBuilderApp = React.createClass({
  render: function() {
    return (
      <div>
        <Header />
        {this.props.activeRouteHandler()}
      </div>
      );
  }
});

module.exports = FormBuilderApp;
