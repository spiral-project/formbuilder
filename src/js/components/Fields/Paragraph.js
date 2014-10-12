/** @jsx React.DOM */

"use strict";

var React = require("react");
var LinkedStateMixin = require("react/addons").addons.LinkedStateMixin;
var EditorMixin = require("./EditorMixin");

var TitleEditor = require("./Title").Editor;

var ParagraphRenderer = React.createClass({
  render: function() {
    return <p>{this.props.data.label}</p>
  }
});

module.exports = {
  Editor: TitleEditor,
  Renderer: ParagraphRenderer
};

