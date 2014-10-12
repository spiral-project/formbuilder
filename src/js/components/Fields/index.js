/** @jsx React.DOM */

"use strict";

var TextAreaRenderer = require("./TextAreaRenderer");
var TextAreaEditor = require("./TextAreaEditor");
var CheckboxesRenderer = require("./CheckboxesRenderer");
var CheckboxesEditor = require("./CheckboxesEditor");

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
    icon: 'fa-align-justify',
    renderer: TextAreaRenderer,
    editor: TextAreaEditor,
    defaultData: {
      label: 'Label',
      description: 'description'
    }
  },
  'dropdown': {
    name: 'Dropdown'
  },
  'checkboxes': {
    name: 'Checkboxes',
    icon: 'fa-check-square',
    renderer: CheckboxesRenderer,
    editor: CheckboxesEditor,
    defaultData: {
      label: 'Label',
      values: ['Option 1', 'Option 2']
    }
  },
  'radio-buttons': {
    name: 'RadioButtons'
  },
  'submit': {
    name: 'Submit Form'
  }
};

module.exports = elements;
