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
          if (field.renderer) {
            return (
              <li key={name} onClick={ function() {
                  this.props.addFormElement(name);
                }.bind(this)}>
                <i className={this.props.fields[name].icon + " fa fa-1x"}></i>
                &nbsp;&nbsp;{this.props.fields[name].name}
              </li>);
          }
        }.bind(this))
      }</ul></ul>;
  }
});

module.exports = FieldList;
