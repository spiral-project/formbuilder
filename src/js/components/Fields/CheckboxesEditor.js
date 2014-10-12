/** @jsx React.DOM */

"use strict";

var React = require("react");
var LinkedStateMixin = require("react/addons").addons.LinkedStateMixin;

var TextAreaEditor = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return this.props.data || {
      label: 'Label',
      description: 'Description'
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.props.updateFormElement(this.state);
  },

  handleKeyDown: function(e) {
    if (e.key === 'Enter'){
      this.handleSubmit(e);
    }
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

        <input valueLink={this.linkState('description')}
               className="form-control input-sm"
               type="text"
               id="description"
               placeholder="Put your description here" />
      </form>);
  }
});

module.exports = TextAreaEditor;

