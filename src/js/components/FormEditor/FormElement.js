/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Popover = require('react-bootstrap/Popover');

var FormElement = React.createClass({
  mixins: [FluxMixin],

  getInitialState: function() {
    return {
      deletable: (this.props.deletable === undefined) ? true : this.props.deletable
    };
  },

  updateFormElement: function(data, hideOverlay) {
    if (hideOverlay === undefined) {
      hideOverlay = true;
    }

    var element = this.props.element;
    element.data = data;
    this.props.updateFormElement(element);

    if (hideOverlay) {
      this.getFlux().actions.setEditorVisibility(this.props.element.id, false);
    }
  },

  deleteFormElement: function() {
    if (this.state.deletable) {
      this.getFlux().actions.deleteFormElement(this.props.element.id);
    }
  },

  togglePopover: function() {
    this.getFlux().actions.setEditorVisibility(
      this.props.element.id,
      !this.props.element.currentlyEdited
    );
  },

  render: function() {
    var deletable;
    if (this.state.deletable) {
      deletable = <div className="col-md-2">
        <a className="fa-close fa fa-1x delete-link"
            onClick={this.deleteFormElement}></a>
      </div>;
    }

    var popover;

    if (this.props.element.currentlyEdited) {
      popover = <div className="popover left">
          <div className="arrow"></div>
          <h3 className="popover-title">Edit form</h3>
          <div className="popover-content">
            <div className="field-editor">
            {this.props.editor({
              data: this.props.element.data,
              updateFormElement: this.updateFormElement
            })}
            </div>
          </div>
        </div>;
    }

    return (
      <div className="form-editor-element container-fluid">
        {popover}
        <div className="row" onClick={this.togglePopover}>
          <div className="col-md-10">
            <div>{this.props.renderer({data: this.props.element.data, disabled: true})}</div>
          </div>
          {deletable}
        </div>
      </div>
    );
  }
});

module.exports = FormElement;
