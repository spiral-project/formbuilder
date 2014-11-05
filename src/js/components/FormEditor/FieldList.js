/** @jsx React.DOM */

"use strict";

var React = require("react");

var FieldList = React.createClass({

  render: function() {

    return <ul id="field-list">
      <li className="optionTitle">Elements</li>
      <ul id="elements">
      {
        Object.keys(this.props.fields).map(function(name) {
          var field = this.props.fields[name];
          return (
              <li key={name} onClick={ function() {
                this.props.addFormElement(name);
              }.bind(this)}>
              <i className={field.icon + " fa fa-1x"}></i>
              &nbsp;&nbsp;{field.name}
            </li>);
        }.bind(this))
      }</ul></ul>;
  }
});

module.exports = FieldList;
