/** @jsx React.DOM */

"use strict";

var React = require("react");
var Router = require("react-router");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FieldList = require("./FieldList");
var FormContainer = require("./FormContainer");
var FormHeader = require("./FormHeader");

var Fields = require("../Fields");


var FormEditor = React.createClass({
  mixins: [
    FluxMixin,
    Router.Navigation,
    StoreWatchMixin("FieldElementsStore")
  ],

  loadFromProps: function(props) {
    if (props.params.formId) {
      this.loadForm(props.params);
      this.getFlux().actions.setFormId(props.params.formId);
    } else {
      this.getFlux().actions.setInitialData();
    }
  },

  // This is called when the URL changed for the same route.
  componentWillReceiveProps: function(newProps) {
    this.loadFromProps(newProps);
  },

  // This is called when the route loads for the first time.
  componentDidMount: function() {
    this.loadFromProps(this.props);
  },

  loadForm: function(params) {
    return this.props.backend.loadForm(params.formId, params.hawkToken)
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
    this.getFlux().actions.updateFormStatus("pending");
    this.props.backend.storeForm(
      this.props.params.formId,
      this.state,
      this.props.params.hawkToken
    ).then(function(params) {
      this.getFlux().actions.updateFormStatus("saved");
      this.transitionTo('editForm', params);
    }.bind(this));
  },

  addFormElement: function(fieldType) {
    var defaultData = JSON.parse(JSON.stringify(
      Fields[fieldType].defaultData));
    this.getFlux().actions.addFormElement(fieldType, defaultData);
  },

  getUserLink: function() {
    if (this.props.params.formId) {
      return this.makeHref('viewForm', this.props.params);
    }
  },

  getReportLink: function() {
    if (this.props.params.formId) {
      return this.makeHref('reportForm', this.props.params);
    }
  },

  render: function() {
    var confirmation;

    return (
      <div className="row">
        <div className="col-xs-1 col-sm-1"></div>
        <div className="col-xs-3 col-sm-3 col-lg-2">
          <FieldList fields={Fields}
                     addFormElement={this.addFormElement} />
        </div>
        <div id="form-container" className="col-xs-7 col-sm-7">
          <FormContainer
            elements={this.state.formElements}
            metadata={this.state.metadata}
            submitForm={this.submitForm} />
          <FormHeader
            formStatus={this.state.formStatus}
            formReady={this.state.formElements.length !== 0}
            metadata={this.state.metadata}
            userLink={this.getUserLink()}
            reportLink={this.getReportLink()}
            submitForm={this.submitForm} />
        </div>
      </div>
    );
  }
});

module.exports = FormEditor;
