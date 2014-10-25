/** @jsx React.DOM */

"use strict";

var React = require("react");
var Router = require("react-router");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FormContainer = require("./FormContainer");
var SubmitRenderer = require("../Fields/Submit").Renderer;

var Fields = require("../Fields");


var FormViewer = React.createClass({
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
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-3 col-sm-3"></div>
        <div id="form-viewer-container" className="col-xs-7 col-sm-7">
          <h1>{this.state.metadata.formName}</h1>
          <p>{this.state.metadata.formDescription}</p>
          <div id="form-viewer-elements">
            <FormContainer
              elements={this.state.formElements} />
            <div className="form-viewer-element">
              <SubmitRenderer
                data={{label: this.state.metadata.submitButtonLabel}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FormViewer;
