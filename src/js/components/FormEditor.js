/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FieldList = require("./FieldList");
var FormContainer = require("./FormContainer");
var FormHeader = require("./FormHeader");

var Fields = require("./Fields");


var FormEditor = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("FieldElementsStore")],

  componentWillReceiveProps: function() {
    alert("Everything is wrong");
  },

  componentDidMount: function() {
    this.loadForm(this.props.params.formId);
  },

  componentDidReceiveProps: function() {
    this.loadForm(this.props.params.formId);
  },

  loadForm: function(formId) {
    return this.props.backend.loadForm(formId)
      .then(function(data) {
        this.getFlux().actions.setInitialData(data);
      }.bind(this))
      .catch(function(error) {
        console.log("error while loading the form", error);
      });
  },

  getStateFromFlux: function() {
    return this.getFlux().store("FieldElementsStore").getState();
  },

  submitForm: function() {
    this.props.backend.storeForm(this.state).then(function() {
      console.log("Saved !")
    });
  },

  addFormElement: function(fieldType) {
    var defaultData = JSON.parse(JSON.stringify(
      Fields[fieldType].defaultData));
    this.getFlux().actions.addFormElement(fieldType, defaultData);
  },

  render: function() {
    console.log("formeditor render state", this.state);
    return (
      <div className="row">
        <div className="col-xs-1 col-sm-1"></div>
        <div className="col-xs-3 col-sm-3 ">
          <FieldList fields={Fields}
                     addFormElement={this.addFormElement} />
        </div>
        <div id="form-container" className="col-xs-7 col-sm-7">
          <FormHeader formName={this.state.formName}
                      submitForm={this.submitForm} />
          <FormContainer
            elements={this.state.formElements}
            submitForm={this.submitForm} />
        </div>
      </div>
    );
  }
});

module.exports = FormEditor;
