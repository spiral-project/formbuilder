/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var FormEditor = require("./FormEditor");


var FormBuilderApp = React.createClass({
  mixins: [FluxMixin],

  render: function() {
    return <FormEditor backend={this.props.backend} />;
  }
});

module.exports = FormBuilderApp;
