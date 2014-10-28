/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var Fields = require("../Fields");

var FormContainer = React.createClass({
  mixins: [FluxMixin],

  updateViewerField: function(label, value) {
    this.getFlux().actions.updateViewerField(label, value);
  },

  getRenderer: function(element) {
    return Fields[element.fieldType].renderer({
      data: element.data,
      updateViewerField: this.updateViewerField
    });
  },

  render: function() {
    return (
        <div>
          {
            this.props.elements.map(function(element, i) {
              return <div className="form-viewer-element" key={i}>
                { this.getRenderer(element) }
              </div>;
            }.bind(this))
          }
        </div>
    );
  }
});

module.exports = FormContainer;
