/** @jsx React.DOM */

"use strict";

var React = require("react");

var TextAreaEditor = React.createClass({
  updateData: function(event) {

  },
  render: function() {
    return <form className="form-horizontal" role="form">
      <div className="form-group">
        <label htmlFor="label" className="col-sm-2 control-label">
          Label
        </label>
        <div className="col-sm-10">
          <input type="text"
                 className="form-control"
                 id="label"
                 placeholder="Label" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description" className="col-sm-2 control-label">
          Description
        </label>
        <div className="col-sm-10">
          <input type="text"
                 className="form-control"
                 id="description"
                 placeholder="Put your description here" />
        </div>
      </div>
    </form>
  }
});

module.exports = TextAreaEditor;

