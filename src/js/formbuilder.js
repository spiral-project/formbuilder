/** @jsx React.DOM */

"use strict";

var React = require("react");
var FormBuilderApp = require("./components/FormBuilderApp");
var flux = require("./flux").flux;
var DaybedBackend = require("./backends/daybed").Backend;

var serializer = function(data) {
  var backend = new DaybedBackend();
  backend.store(data);
};

React.renderComponent(<FormBuilderApp flux={flux} serializer={serializer} />,
                      document.getElementById('formbuilder'));
