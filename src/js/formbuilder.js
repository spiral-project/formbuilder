/** @jsx React.DOM */

"use strict";

var React = require("react");
var FormBuilderApp = require("./components/FormBuilderApp");

React.renderComponent(<FormBuilderApp />,
                      document.getElementById('formbuilder'));
