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
var Router = require('react-router');
var Link = Router.Link;

var FormList = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("FormListStore")],

  componentDidMount: function() {
    this.loadFormList();
  },

  componentDidReceiveProps: function() {
    this.loadFormList();
  },

  loadFormList: function() {
    return this.props.backend.loadFormList().then(function(models) {
      this.getFlux().actions.setFormList(models);
    }.bind(this));
  },

  getStateFromFlux: function() {
    return {
      formList: this.getFlux().store("FormListStore").getState()
    };
  },

  render: function() {
    return (<div>
      <h1>Yo, this is your list of fields</h1>
      <ul>{
        this.state.formList.map(function(form, i) {
          return <li key={i}>
            <Link to="formEditor" params={{formId: form.id}}>
              {form.title}
            </Link>
            </li>
        })
      }</ul>

    </div>);
  }
});

module.exports = FormList;
