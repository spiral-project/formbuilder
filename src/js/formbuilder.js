/** @jsx React.DOM */

"use strict";

var React = require("react");
var FormBuilderApp = require("./components/FormBuilderApp");
var flux = require("./flux").flux;
var serializer = require("./daybed");

React.renderComponent(<FormBuilderApp flux={flux} serializer={serializer} />,
                      document.getElementById('formbuilder'));
