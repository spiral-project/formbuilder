/** @jsx React.DOM */

"use strict";

var Text = require("./Text");
var TextArea = require("./TextArea");
var Checkboxes = require("./Checkboxes");
var Dropdown = require("./Dropdown");
var RadioButtons = require("./RadioButtons");
var Title = require("./Title");
var Paragraph = require("./Paragraph");

var elements = {
  'title': {
    name: 'Title',
    icon: 'fa-font',
    renderer: Title.Renderer,
    editor: Title.Editor,
    defaultData: {
      label: 'Title'
    }
  },
  'paragraph': {
    name: 'Paragraph of text',
    icon: 'fa-paragraph',
    renderer: Paragraph.Renderer,
    editor: Paragraph.Editor,
    defaultData: {
      label: 'Some explanation text'
    }
  },
  'singlelinetext': {
    name: 'Single-line text-box',
    icon: 'fa-text-width',
    renderer: Text.Renderer,
    editor: Text.Editor,
    defaultData: {
      label: 'Label',
      description: 'description',
      required: false
    }
  },
  'multilinetext': {
    name: 'Multi-line text area',
    icon: 'fa-align-justify',
    renderer: TextArea.Renderer,
    editor: TextArea.Editor,
    defaultData: {
      label: 'Label',
      description: 'description',
      required: false
    }
  },
  'dropdown': {
    name: 'Dropdown',
    icon: 'fa-caret-down',
    renderer: Dropdown.Renderer,
    editor: Dropdown.Editor,
    defaultData: {
      label: 'Label',
      values: ['Option 1', 'Option 2'],
      required: false
    }
  },
  'checkboxes': {
    name: 'Checkboxes',
    icon: 'fa-check-square-o',
    renderer: Checkboxes.Renderer,
    editor: Checkboxes.Editor,
    defaultData: {
      label: 'Label',
      values: ['Option 1', 'Option 2'],
      required: false
    }
  },
  'radiobuttons': {
    name: 'RadioButtons',
    icon: 'fa-dot-circle-o',
    renderer: RadioButtons.Renderer,
    editor: RadioButtons.Editor,
    defaultData: {
      label: 'Label',
      values: ['Option 1', 'Option 2'],
      required: false
    }
  }
};

module.exports = elements;
