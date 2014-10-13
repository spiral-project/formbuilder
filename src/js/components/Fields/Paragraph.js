/** @jsx React.DOM */

"use strict";

var React = require("react");
var TitleEditor = require("./Title").Editor;
var RendererMixin = require("./RendererMixin");

var ParagraphRenderer = React.createClass({
  mixins: [RendererMixin],

  render: function() {
    return <p>{this.props.data.label}</p>;
  }
});

module.exports = {
  Editor: TitleEditor,
  Renderer: ParagraphRenderer
};

