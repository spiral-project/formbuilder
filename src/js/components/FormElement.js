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
    this.state.editor = Fields[name].editor(data=this.state.data);
    this.state.renderer = Fields[name].renderer(data=this.state.data);

    if (this.state.rendered === false) {
      return this.state.editor;
    } else {
      return this.state.renderer;
    }
  }
});

module.exports = FormElement;
