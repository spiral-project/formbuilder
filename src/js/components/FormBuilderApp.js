/** @jsx React.DOM */

"use strict";

var React = require("react");
var FieldList = require("./FieldList");
var FormContainer = require("./FormContainer");
var Fields = require("./Fields");

var FormBuilderApp = React.createClass({

  getInitialState: function() {
    return {formElements: []};
  },

  addFormElement: function(name) {
    var classes = Fields.getFieldClasses(name);
    var element = <FormElement
      editor={classes.editor}
      rendered={classes.rendered} />;

    // XXX need to add the element rather than replacing everything.
    this.setState({
      formElements: [element]
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
