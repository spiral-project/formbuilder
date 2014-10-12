/** @jsx React.DOM */

"use strict";

var React = require("react");
var CheckboxesEditor = require("./Checkboxes").Editor;

var DropdownRenderer = React.createClass({
  render: function() {
    var values = this.props.data.values || [];
    return <form className="form-horizontal" role="form">
      <div className="form-group">
        <label htmlFor="label" className="col-sm-4 control-label">
          {this.props.data.label || "Label"}
        </label>
        <div className="col-sm-8">
        <select className="form-control">
        { values.map(function(value, i) {
          return <option key={i}>{value}</option>;
        })}
        </select>
        </div>
      </div>
    </form>;
  }
});

module.exports = {
  Editor: CheckboxesEditor,
  Renderer: DropdownRenderer
};
