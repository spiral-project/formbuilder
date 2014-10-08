/** @jsx React.DOM */

"use strict";

var React = require("react");

var FormContainer = React.createClass({
  render: function() {
    return <div id="formcontainer">{this.props.items}</div>;
  }
});

module.exports = FormContainer;
