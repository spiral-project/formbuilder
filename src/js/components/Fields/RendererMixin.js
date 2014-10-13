/** @jsx React.DOM */

"use strict";

var React = require("react");

var EditorMixin = {
  required: function() {
    return this.props.data.required ? '*' : '';
  }
};

module.exports = EditorMixin;
