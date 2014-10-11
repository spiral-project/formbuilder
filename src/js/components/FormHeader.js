/** @jsx React.DOM */

"use strict";

var React = require("react");
var FormElement = require("./FormElement");

var FormHeader = React.createClass({
  render: function() {
    return <header>
      <input id="formName" type="text" placeholder="Form name" />
      <button
        id="save-form"
        className="btn btn-success pull-right"
        onClick={this.props.submitForm} >
        Save form
      </button>
    </header>
  }
});

module.exports = FormHeader;
