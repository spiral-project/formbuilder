/** @jsx React.DOM */

"use strict";

var React = require("react");

var FormElement = React.createClass({

  getInitialState: function() {
    return {
      editor: this.props.editor,
      renderer: this.props.rendered
      rendered: false,
      data={}
    };
  },

  render: function() {
    if (this.state.rendered === false) {
      return <{this.state.renderer} data=this.state.data/>;
    } else {
      return <{this.state.editor} data=this.state.data/>;
    }
  }
});

module.exports = FormElement;
