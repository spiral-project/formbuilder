/** @jsx React.DOM */

"use strict";

var React = require("react");
var FormBuilderApp = require("./components/FormBuilderApp");
var flux = require("./flux").flux;

var serialize = function(data){
  console.log("name", data.formName);
  console.log("elements", data.formElements);
};

React.renderComponent(<FormBuilderApp flux={flux} serializer={serialize} />,
                      document.getElementById('formbuilder'));
