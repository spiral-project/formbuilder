/** @jsx React.DOM */

"use strict";

var React = require("react");
var TitleEditor = require("./Title").Editor;
var RendererMixin = require("./RendererMixin");

var SubmitRenderer = React.createClass({
  mixins: [RendererMixin],

  render: function() {
    return <button type="button" className="btn btn-success pull-right"
                   onClick={this.props.onClick}>
      {this.props.data.label}
    </button>;
  }
});

module.exports = {
  Editor: TitleEditor,
  Renderer: SubmitRenderer
};

