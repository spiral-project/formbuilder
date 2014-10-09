/** @jsx React.DOM */

"use strict";

var React = require("react");

var FormElement = React.createClass({

  getInitialState: function() {
    return {
      rendered: false,
      data:{}
    };
  },

  render: function() {
    if (this.state.rendered === false) {
      return this.props.editor({data: this.state.data});
    } else {
      return this.props.renderer({data: this.state.data});
    }
  }
});

module.exports = FormElement;
