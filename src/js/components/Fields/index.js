/** @jsx React.DOM */

"use strict";

var TextAreaRenderer = require("./TextAreaRenderer");
var TextAreaEditor = require("./TextAreaEditor");

var elements = {
  'legend': {
    name: 'Legend',
  },
  'paragraph': {
    name: 'Paragraph of text'
  },
  'single-line-text': {
    name: 'Single-line text-box'
  },
  'multi-line-text': {
    name: 'Multi-line text area',
    renderer: TextAreaRenderer,
    editor: TextAreaEditor
  },
  'dropdown': {
    name: 'Dropdown'
  },
  'checkboxes': {
    name: 'Checkboxes'
  },
  'radio-buttons': {
    name: 'RadioButtons'
  },
  'submit': {
    name: 'Submit Form'
};

module.exports = elements;
