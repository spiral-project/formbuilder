/** @jsx React.DOM */

"use strict";

var React = require("react");

var FormHeader = React.createClass({
  render: function() {
    return <header>
      <input
        ref="formName"
        id="formName"
        type="text" value={this.props.formId} />
      <button
        className="btn btn-success pull-right"
        onClick={this.props.submitForm} >
        Save form
      </button>
    </header>;
  }
});

module.exports = FormHeader;
