/** @jsx React.DOM */

"use strict";

var React = require("react");
var FieldList = require("./FieldList");
var FormContainer = require("./FormContainer");
var FormElement = require("./FormElement");

var FormBuilderApp = React.createClass({

  getInitialState: function() {
    return {formElements: []};
  },

  addFormElement: function(name) {
    var element = <FormElement name={name} />;

    // XXX need to add the element rather than replacing everything.
    this.setState({
      'formElements': this.state.formElements.concat([element])
    });
  },

  render: function() {
    return (
      <div>
        <FieldList
          fields={["string", "text"]}
          addFormElement={this.addFormElement}
        />
        <FormContainer
          items={this.state.formElements}
        />
      </div>
    );
  }
});

module.exports = FormBuilderApp;
