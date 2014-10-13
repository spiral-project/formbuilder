/** @jsx React.DOM */

"use strict";

var React = require("react");

var EditorMixin = {
  updateRequired: function(e) {
    var state = this.state;
    state.required = this.refs.required.getDOMNode().checked;
    this.setState(state);
    // Update the data but do not close the popover.
    this.props.updateFormElement(state, false);
  },

  getRequired: function() {
    return (<div className="checkbox">
      <label>
        <input ref="required"
               type="checkbox"
               checked={this.state.checked}
               onChange={this.updateRequired} />
        Required?
      </label>
    </div>);
  },

  getInitialState: function() {
    return this.props.data;
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.updateFormElement(this.state);
  },

  handleKeyDown: function(e) {
    if (e.key === 'Enter'){
      this.handleSubmit(e);
    }
  }
};

module.exports = EditorMixin;
