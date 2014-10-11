/** @jsx React.DOM */

"use strict";

var React = require("react");
var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Popover = require('react-bootstrap/Popover');
var Button = require('react-bootstrap/Button');

var FormElement = React.createClass({

  getInitialState: function() {
    return {
      data:{}
    };
  },

  render: function() {
    return (
      <OverlayTrigger trigger="click" placement="left" overlay={
        <Popover title="Edit element"><div className="field-editor">
          {this.props.editor({data: this.state.data})}
        </div></Popover>
      }>
        <div>{this.props.renderer({data: this.state.data})}</div>
      </OverlayTrigger>);
  }
});

module.exports = FormElement;
