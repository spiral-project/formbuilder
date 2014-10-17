/** @jsx React.DOM */

"use strict";

var React = require("react");
var LinkedStateMixin = require("react/addons").addons.LinkedStateMixin;
var EditorMixin = require("./EditorMixin");

var TitleEditor = React.createClass({
  mixins: [LinkedStateMixin, EditorMixin],
  componentWillReceiveProps: function() {
    console.log("TitleEditor will receive props", arguments);
  },
  componentDidMount: function() {
    console.log("TitleEditor component did mount", arguments);
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}
            onKeyDown={this.handleKeyDown}
            className="form" role="form">
        <input valueLink={this.linkState('label')}
               className="form-control input-sm"
               type="text"
               id="label"
               placeholder="Label" />
      </form>);
  }
});

var TitleRenderer = React.createClass({
  render: function() {
    console.log("Render Title", this.props);
    return <h2>{this.props.data.label}</h2>;
  }
});

module.exports = {
  Editor: TitleEditor,
  Renderer: TitleRenderer
};

