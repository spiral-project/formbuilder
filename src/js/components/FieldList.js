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
        this.props.fields.map(function(field, key) {
          return <li onClick={this.props.addFormElement}>{field}</li>;
        }.bind(this))
      }</ul>
    </div>;
  }
});

module.exports = FieldList;
