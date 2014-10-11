/** @jsx React.DOM */

"use strict";

var React = require("react");

var TextAreaRenderer = React.createClass({
  render: function() {
    return <form className="form-horizontal" role="form">
      <div className="form-group">
        <label htmlFor="label" className="col-sm-4 control-label">
          {this.props.data.label || "Label"}
        </label>
        <div className="col-sm-8">
          <input type="text"
                 className="form-control"
                 id={this.props.data.name || "Label"}
                 placeholder={this.props.data.description} />
        </div>
      </div>
    </form>
  }
});

module.exports = TextAreaRenderer;
