/** @jsx React.DOM */

"use strict";

var React = require("react");

var FormHeader = React.createClass({

  setFormName: function(e) {
    this.props.setFormName(this.refs.formName.getDOMNode().value);
  },

  render: function() {
    return <header>
      <input
        ref="formName"
        placeholder="Form Name"
        id="formName"
        type="text"
        onChange={this.setFormName} />
      <button
        className="btn btn-success pull-right"
        onClick={this.props.submitForm} >
        Save form
      </button>
    </header>;
  }
});

module.exports = FormHeader;
