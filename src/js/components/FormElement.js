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
      this.refs.overlay.hide();
    }
  },

  deleteFormElement: function() {
    if (this.state.deletable) {
      this.getFlux().actions.deleteFormElement(this.props.element.id);
    }
  },

  render: function() {
    var deletable;
    if (this.state.deletable) {
      deletable = <div className="col-md-2">
        <a className="fa-close fa fa-1x delete-link"
            onClick={this.deleteFormElement}></a>
      </div>;
    }

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
          { deletable }
        </div>
      </div>
    );
  }
});

module.exports = FormElement;
