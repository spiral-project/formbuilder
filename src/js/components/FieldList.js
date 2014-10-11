/** @jsx React.DOM */

"use strict";

var React = require("react");
var Glyphicon = require("react-bootstrap/Glyphicon");

var FieldList = React.createClass({
  getInitialState: function() {
    return {fields: this.props.fields};
  },

  render: function() {
    return <ul id="field-list">
      <li className="optionTitle">Elements</li>
      <ul id="elements">
      {
        Object.keys(this.props.fields).map(function(name) {
          var field = this.props.fields[name];
          if (field.renderer) {
            return (
              <li key={name} onClick={ function() {
                  this.props.addFormElement(name);
                }.bind(this)}>
                <Glyphicon glyph={field.glyphicon || "plus"} />&nbsp;{this.props.fields[name].name}
              </li>);
          }
        }.bind(this))
      }</ul></ul>;
  }
});

module.exports = FieldList;
