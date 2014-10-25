/** @jsx React.DOM */

"use strict";

var React = require("react");

var Fields = require("../Fields");

var FormContainer = React.createClass({

  getRenderer: function(element) {
    return Fields[element.fieldType].renderer({data: element.data});
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
