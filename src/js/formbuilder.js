/** @jsx React.DOM */

"use strict";

var React = require("react");
var DaybedBackend = require("./backends/daybed");
var flux = require("./flux").flux;

var Router = require("react-router");
var Routes = Router.Routes;
var Route = Router.Route;

var FormBuilderApp = require("./components/FormBuilderApp");
var FormEditor = require("./components/FormEditor");
var FormViewer = require("./components/FormViewer");
var FormReport = require("./components/FormReport");
var Welcome = require("./components/Welcome");

var backend = new DaybedBackend(document.formbuilder.config);

var routes = (
  <Routes>
    <Route handler={FormBuilderApp}>
      <Route name="welcome"
             path="/"
             handler={Welcome} />
      <Route name="createForm"
             path="/new"
             handler={FormEditor} flux={flux} backend={backend} />
      <Route name="editForm"
             path="/edit/:formId/:hawkToken"
             handler={FormEditor} flux={flux} backend={backend} />
      <Route name="reportForm"
             path="/report/:formId/:hawkToken"
             handler={FormReport} flux={flux} backend={backend} />
      <Route name="reportReaderForm"
             path="/report/:formId"
             handler={FormReport} flux={flux} backend={backend} />
      <Route name="viewForm"
             path="/:formId/"
             handler={FormViewer} flux={flux} backend={backend} />
    </Route>
  </Routes>);

React.renderComponent(routes, document.getElementById('formbuilder'));

