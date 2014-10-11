/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Popover = require('react-bootstrap/Popover');
var Button = require('react-bootstrap/Button');

var FormElement = React.createClass({
  mixins: [FluxChildMixin],

  updateFormElement: function(data) {
    var element = this.props.element;
    element.data = data;
    this.getFlux().actions.updateFormElement(element);
  },

  render: function() {
    return (
      <div className="form-element">
        <OverlayTrigger trigger="click" placement="left" overlay={
          <Popover title="Edit element"><div className="field-editor">
            {this.props.editor({data: this.props.element.data})}
          </div></Popover>
        }>
          <div>{this.props.renderer({data: this.props.element.data})}</div>
        </OverlayTrigger>
      </div>
    );
  }
});

module.exports = FormElement;
