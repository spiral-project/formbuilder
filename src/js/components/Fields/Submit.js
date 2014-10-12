/** @jsx React.DOM */

"use strict";

var React = require("react");
var LinkedStateMixin = require("react/addons").addons.LinkedStateMixin;
var EditorMixin = require("./EditorMixin");

var TitleEditor = require("./Title").Editor;

var SubmitRenderer = React.createClass({
  render: function() {
    return <button type="button" className="btn btn-success pull-right">
      {this.props.data.label}
    </button>
  }
});

module.exports = {
  Editor: TitleEditor,
  Renderer: SubmitRenderer
};

