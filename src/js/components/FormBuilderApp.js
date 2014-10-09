/** @jsx React.DOM */

"use strict";

var React = require("react");
var FieldList = require("./FieldList");
var FormContainer = require("./FormContainer");
var FormElement = require("./FormElement");
var Fields = require("./Fields");

var FormBuilderApp = React.createClass({

  getInitialState: function() {
    return {formElements: []};
  },

  addFormElement: function(name) {

    var editor = Fields[name].editor;
    var renderer = Fields[name].renderer;

    var element = <FormElement name={name}
                               editor={editor}
                               renderer={renderer} />;

    this.setState({
      'formElements': this.state.formElements.concat([element])
    });
  },

  render: function() {
    return (
      <div>
        <FieldList
          fields={Fields}
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
