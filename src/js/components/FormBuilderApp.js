/** @jsx React.DOM */

"use strict";
var randomBytes = require("crypto").randomBytes;

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FieldList = require("./FieldList");
var FormContainer = require("./FormContainer");
var Fields = require("./Fields");


var FormBuilderApp = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("FieldElementsStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      formElements: flux.store("FieldElementsStore").getState().elements
    };
  },

  submitForm: function() {

  },

  addFormElement: function(fieldType) {
    this.getFlux().actions.addFormElement(fieldType);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-xs-1 col-sm-1"></div>
        <div className="col-xs-3 col-sm-3 ">
          <FieldList fields={Fields}
                     addFormElement={this.addFormElement} />
        </div>
        <div className="col-xs-7 col-sm-7">
          <FormContainer
            elements={this.state.formElements}
            submitForm={this.submitForm} />
        </div>
      </div>
    );
  }
});

module.exports = FormBuilderApp;
