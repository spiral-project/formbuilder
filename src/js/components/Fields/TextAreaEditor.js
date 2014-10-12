/** @jsx React.DOM */

"use strict";

var React = require("react");
var LinkedStateMixin = require("react/addons").addons.LinkedStateMixin;
var EditorMixin = require("./EditorMixin");

var TextAreaEditor = React.createClass({
  mixins: [LinkedStateMixin, EditorMixin],

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

        <input valueLink={this.linkState('description')}
               className="form-control input-sm"
               type="text"
               id="description"
               placeholder="Put your description here" />
      </form>);
  }
});

module.exports = TextAreaEditor;

