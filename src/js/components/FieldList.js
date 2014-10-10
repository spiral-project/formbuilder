/** @jsx React.DOM */

"use strict";

var React = require("react");

var FieldList = React.createClass({
  getInitialState: function() {
    return {fields: this.props.fields};
  },

  render: function() {
    return <div id="formlist">
      <ul>{
        Object.keys(this.props.fields).map(function(name) {
          return (
            <li key={name}
                onClick={
                  function() {
                    this.props.addFormElement(name);
                  }.bind(this)}>
              {this.props.fields[name].name}
            </li>);
        }.bind(this))
      }</ul>
    </div>;
  }
});

module.exports = FieldList;
