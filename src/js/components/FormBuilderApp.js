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


var FormBuilderApp = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("FieldElementsStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      formElements: flux.store("FieldElementsStore").getState().elements,
      formName: undefined,
    };
  },

  submitForm: function() {
    this.props.serializer(this.state);
  },

  addFormElement: function(fieldType) {
    var defaultData = JSON.parse(JSON.stringify(
      Fields[fieldType].defaultData));
    this.getFlux().actions.addFormElement(fieldType, defaultData);
  },

  setFormName: function(formName) {
    this.setState({
      formName: formName,
    });
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-1 col-sm-1"></div>
        <div className="col-xs-3 col-sm-3 ">
          <FieldList fields={Fields}
                     addFormElement={this.addFormElement} />
        </div>
        <div id="form-container" className="col-xs-7 col-sm-7">
          <FormHeader formName={this.state.formName}
                      submitForm={this.submitForm}
                      setFormName={this.setFormName} />
          <FormContainer
            elements={this.state.formElements}
            submitForm={this.submitForm} />
        </div>
      </div>
    );
  }
});

module.exports = FormBuilderApp;
