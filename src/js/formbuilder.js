/** @jsx React.DOM */

"use strict";

var React = require("react");
var FormBuilderApp = require("./components/FormBuilderApp");
var flux = require("./flux").flux;
var DaybedBackend = require("./backends/daybed").Backend;

var backend = new DaybedBackend();

var getSession = function() {
  var hash = window.location.hash.substr(1);
  var session;
  if (hash !== "") {
    session = {
      token: hash
    };
  }
  return session;
};

var setSession = function(session) {
  window.location.hash = session;
};

backend.initialize(document.formbuilder.config, getSession, setSession)
.then(function() {
  backend.load("superform")
    .then(function(data) {
      flux.actions.setInitialData(data);
    })
    .catch(function(error) {
      console.log("error while loading the form", error);
    });
});

React.renderComponent(
  <FormBuilderApp
    flux={flux}
    backend={backend} />,
  document.getElementById('formbuilder'));
