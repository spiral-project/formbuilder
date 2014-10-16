/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var FormHeader = React.createClass({
  mixins: [FluxChildMixin],

  getInitialState: function() {
    return {
      formName: this.props.formName
    }
  },

  setFormName: function(e) {
    this.getFlux().actions.setFormName(this.refs.formName.getDOMNode().value);
  },

  render: function() {
    return <header>
      <input
        ref="formName"
        placeholder="Form Name"
        id="formName"
        type="text"
        onChange={this.setFormName} value={this.props.formName} />
      <button
        className="btn btn-success pull-right"
        onClick={this.props.submitForm} >
        Save form
      </button>
    </header>;
  }
});

module.exports = FormHeader;
