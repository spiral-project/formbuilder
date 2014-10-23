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
var FormConfirmation = require("./FormConfirmation");

var Fields = require("./Fields");


var FormEditor = React.createClass({
  mixins: [
    FluxMixin,
    Router.Navigation,
    StoreWatchMixin("FieldElementsStore")
  ],

  // This is called when the URL changed for the same route.
  componentWillReceiveProps: function(newProps) {
    if (newProps.params.formId) {
      this.loadForm(newProps.params);
    }
  },

  // This is called when the route loads for the first time.
  componentDidMount: function() {
    if (this.props.params.formId) {
      this.loadForm(this.props.params);
    }
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
    this.props.backend.storeForm(
      this.props.params.formId,
      this.state,
      this.props.params.hawkToken
    ).then(function(params) {
      console.log("Saved !", params);
      this.setState({
        'submitted': true,
        'submittedFormParams': params
      });
      //this.transitionTo('infoFormCreated', params);
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

  hideConfirmation: function() {
    this.setState({
      'submitted': false
    });
  },

  render: function() {
    var confirmation;
    if (this.state.submitted) {
      confirmation = <FormConfirmation
        formData={this.state}
        hide={this.hideConfirmation} />
    }

    return (
      <div className="row">
        {confirmation}
        <div className="col-xs-1 col-sm-1"></div>
        <div className="col-xs-3 col-sm-3 col-lg-2">
          <FieldList fields={Fields}
                     addFormElement={this.addFormElement} />
        </div>
        <div id="form-container" className="col-xs-7 col-sm-7">
          <FormHeader
            userLink={this.getUserLink()}
            submitForm={this.submitForm} />
          <FormContainer
            elements={this.state.formElements}
            metadata={this.state.metadata}
            submitForm={this.submitForm} />
        </div>
      </div>
    );
  }
});

module.exports = FormEditor;
