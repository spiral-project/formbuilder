/** @jsx React.DOM */

"use strict";

var React = require("react");
var LinkedStateMixin = require("react/addons").addons.LinkedStateMixin;

var CheckboxesEditor = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return this.props.data
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

  updateValues: function() {
    var value = this.refs.values.getDOMNode().value;
    this.setState({
      values: value.split(', ')
    });
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

        <input ref="values"
               onChange={this.updateValues}
               className="form-control input-sm"
               type="text"
               id="values"
               value={this.state.values.join(', ')} />

      </form>);
  }
});

module.exports = CheckboxesEditor;

