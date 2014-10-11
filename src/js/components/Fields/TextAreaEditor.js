/** @jsx React.DOM */

"use strict";

var React = require("react");

var TextAreaEditor = React.createClass({
  updateData: function(event) {

  },
  render: function() {
    return <form className="form" role="form">
          <input className="form-control input-sm"
                 type="text"
                 id="label"
                 placeholder="Label" />

          <input type="text"
                 className="form-control input-sm"
                 id="description"
                 placeholder="Put your description here" />
    </form>
  }
});

module.exports = TextAreaEditor;

