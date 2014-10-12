/** @jsx React.DOM */

"use strict";

var Text = require("./Text");
var TextArea = require("./TextArea");
var Checkboxes = require("./Checkboxes");
var Dropdown = require("./Dropdown");
var RadioButtons = require("./RadioButtons");

var elements = {
  'legend': {
    name: 'Legend',
  },
  'paragraph': {
    name: 'Paragraph of text'
  },
  'single-line-text': {
    name: 'Single-line text-box',
    icon: 'fa-text-width',
    renderer: Text.Renderer,
    editor: Text.Editor,
    defaultData: {
      label: 'Label',
      description: 'description'
    }
  },
  'multi-line-text': {
    name: 'Multi-line text area',
    icon: 'fa-align-justify',
    renderer: TextArea.Renderer,
    editor: TextArea.Editor,
    defaultData: {
      label: 'Label',
      description: 'description'
    }
  },
  'dropdown': {
    name: 'Dropdown',
    icon: 'fa-caret-down',
    renderer: Dropdown.Renderer,
    editor: Dropdown.Editor,
    defaultData: {
      label: 'Label',
      values: ['Option 1', 'Option 2']
    }
  },
  'checkboxes': {
    name: 'Checkboxes',
    icon: 'fa-check-square-o',
    renderer: Checkboxes.Renderer,
    editor: Checkboxes.Editor,
    defaultData: {
      label: 'Label',
      values: ['Option 1', 'Option 2']
    }
  },
  'radio-buttons': {
    name: 'RadioButtons',
    icon: 'fa-dot-circle-o',
    renderer: RadioButtons.Renderer,
    editor: RadioButtons.Editor,
    defaultData: {
      label: 'Label',
      values: ['Option 1', 'Option 2']
    }
  },
  'submit': {
    name: 'Submit Form',
    icon: 'fa-hand-o-right'
  }
};

module.exports = elements;
