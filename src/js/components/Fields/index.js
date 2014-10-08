/** @jsx React.DOM */

"use strict";

var TextAreaRenderer = require("./TextAreaRenderer");
var TextAreaEditor = require("./TextAreaEditor");

// TODO Change this to return classes dynamically.
var getFieldClasses = function(name) {
  return {
    renderer: TextAreaRenderer,
    editor: TextAreaEditor
  };
}

module.exports = {
  'getFieldClasses': getFieldClasses
};
