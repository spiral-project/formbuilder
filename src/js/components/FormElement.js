/** @jsx React.DOM */

"use strict";

var React = require("react");

var Fields = require("./Fields");

var FormElement = React.createClass({

  getInitialState: function() {
    return {
      editor: undefined,
      renderer: undefined,
      rendered: false,
      data:{}
    };
  },

  render: function() {
    var classes = Fields.getFieldClasses(name, this.state.data);
    this.state.editor = classes.editor;
    this.state.renderer = classes.renderer;

    if (this.state.rendered === false) {
      return this.state.editor;
    } else {
      return this.state.renderer;
    }
  }
});

module.exports = FormElement;
