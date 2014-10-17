/** @jsx React.DOM */

"use strict";

var React = require("react");
var DaybedBackend = require("./backends/daybed").Backend;
var flux = require("./flux").flux;

var Router = require("react-router");
var Routes = Router.Routes;
var Route = Router.Route;

var FormBuilderApp = require("./components/FormBuilderApp");
var FormEditor = require("./components/FormEditor");
var FormList = require("./components/FormList");


var backend = new DaybedBackend();

var getSession = function() {
  var sessionToken = window.localStorage.getItem("hawkSessionToken");
  var session;
  if (sessionToken !== "") {
    session = {
      token: sessionToken
    };
  }
  return session;
};

var setSession = function(session) {
  window.localStorage.setItem("hawkSessionToken", session);
};

backend.initialize(document.formbuilder.config, getSession, setSession)
  .then(function() {
    var routes = (
      <Routes>
        <Route handler={FormBuilderApp}>
          <Route name="formList"
                 handler={FormList} flux={flux} backend={backend} />
          <Route name="formEditor"
                 path="/forms/:formId"
                 handler={FormEditor} flux={flux} backend={backend} />
        </Route>
      </Routes>
    );

    React.renderComponent(routes, document.getElementById('formbuilder'));
  })// XXX .catch(<ErrorComponent>);;
