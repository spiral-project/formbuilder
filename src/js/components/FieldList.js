/** @jsx React.DOM */

"use strict";

var React = require("react");
var Glyphicon = require("react-bootstrap/Glyphicon");

var FieldList = React.createClass({
  getInitialState: function() {
    return {fields: this.props.fields};
  },

  render: function() {
    return <div id="formlist">
      <ul className="nav nav-sidebar">{
        Object.keys(this.props.fields).map(function(name) {
          var field = this.props.fields[name];
          return (
            <li key={name}>
              <a onClick={ function() {
                this.props.addFormElement(name);
              }.bind(this)}>
                <Glyphicon glyph={field.glyphicon || "plus"} />&nbsp;{this.props.fields[name].name}
              </a>
            </li>);
        }.bind(this))
      }</ul>
    </div>;
  }
});

module.exports = FieldList;
