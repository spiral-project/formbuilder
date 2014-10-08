/** @jsx React.DOM */

"use strict";

var React = require("react");
var FieldList = require("./FieldList");
var FormContainer = require("./FormContainer");

var FormBuilderApp = React.createClass({

  getInitialState: function() {
    return {items: []};
  },

  addItem: function(item) {
    this.setState({
      items: [item]
    });
  },

  render: function() {
    return (
      <div>
        <FieldList
          fields={["string", "text"]}
          addItem={this.addItem}
        />
        <FormContainer
          items={this.state.items}
        />
      </div>
    );
  }
});

module.exports = FormBuilderApp;
