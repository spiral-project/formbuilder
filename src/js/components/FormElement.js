/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var OverlayTrigger = require('react-bootstrap/OverlayTrigger');
var Popover = require('react-bootstrap/Popover');

var FormElement = React.createClass({
  mixins: [FluxChildMixin],

  updateFormElement: function(data, hideOverlay) {
    if (hideOverlay === undefined) {
      hideOverlay = true;
    }

    var element = this.props.element;
    element.data = data;
    this.getFlux().actions.updateFormElement(element);

    if (hideOverlay) {
      this.refs.overlay.hide();
    }
  },

  deleteFormElement: function() {
    this.getFlux().actions.deleteFormElement(this.props.element.id);
  },

  render: function() {
    return (
      <div className="form-element container-fluid">
        <div className="row">
          <div className="col-md-10">
            <OverlayTrigger ref="overlay" trigger="click" placement="left"
              overlay={
                <Popover title="Edit element"><div className="field-editor">
                  {this.props.editor({
                    data: this.props.element.data,
                    updateFormElement: this.updateFormElement
                  })}
                </div></Popover>
            }>
              <div>{this.props.renderer({data: this.props.element.data})}</div>
            </OverlayTrigger>
          </div>
          <div className="col-md-2">
            <a className="fa-close fa fa-1x delete-link" onClick={this.deleteFormElement}></a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FormElement;
