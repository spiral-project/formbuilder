/** @jsx React.DOM */

"use strict";

var TextAreaRenderer = require("./TextAreaRenderer");
var TextAreaEditor = require("./TextAreaEditor");

// TODO Change this to return classes dynamically.
var getFieldClasses = function(name, data) {
  return {
    renderer: <TextAreaRenderer data={data} />,
    editor: <TextAreaEditor data={data} />
  };
}

module.exports = {
  'getFieldClasses': getFieldClasses
};
