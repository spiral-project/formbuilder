/** @jsx React.DOM */

"use strict";

var React = require("react");
var FormBuilderApp = require("./components/FormBuilderApp");
var flux = require("./flux").flux;
var DaybedBackend = require("./backends/daybed").Backend;

var daybed = new DaybedBackend();

React.renderComponent(<FormBuilderApp flux={flux} serializer={daybed.store} />,
                      document.getElementById('formbuilder'));
