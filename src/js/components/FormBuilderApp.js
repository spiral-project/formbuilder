/** @jsx React.DOM */

"use strict";
var randomBytes = require("crypto").randomBytes;

var React = require("react");

var FieldList = require("./FieldList");
var FormContainer = require("./FormContainer");
var Fields = require("./Fields");

var FormBuilderApp = React.createClass({

  getInitialState: function() {
    return {formElements: []};
  },

  addFormElement: function(name) {
    var editor = Fields[name].editor;
    var renderer = Fields[name].renderer;

    this.setState({
      'formElements': this.state.formElements.concat([{
        key: randomBytes(8).toString('hex'),
        name: name,
        editor: editor,
        renderer: renderer
      }])
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-1 col-sm-1"></div>
        <div className="col-xs-3 col-sm-3 ">
          <FieldList fields={Fields} addFormElement={this.addFormElement} />
        </div>
        <div className="col-xs-7 col-sm-7">
          <FormContainer items={this.state.formElements} />
        </div>
      </div>
    );
  }
});

module.exports = FormBuilderApp;
