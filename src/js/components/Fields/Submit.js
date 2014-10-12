/** @jsx React.DOM */

"use strict";

var React = require("react");
var TitleEditor = require("./Title").Editor;

var SubmitRenderer = React.createClass({
  render: function() {
    return <button type="button" className="btn btn-success pull-right">
      {this.props.data.label}
    </button>;
  }
});

module.exports = {
  Editor: TitleEditor,
  Renderer: SubmitRenderer
};

