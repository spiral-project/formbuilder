/** @jsx React.DOM */

"use strict";

var React = require("react");
var FormBuilderApp = require("./components/FormBuilderApp");
var flux = require("./flux").flux;

React.renderComponent(<FormBuilderApp flux={flux} />,
                      document.getElementById('formbuilder'));
