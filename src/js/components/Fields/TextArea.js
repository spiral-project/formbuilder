/** @jsx React.DOM */

"use strict";

var React = require("react");
var LinkedStateMixin = require("react/addons").addons.LinkedStateMixin;
var EditorMixin = require("./EditorMixin");

var TextAreaEditor = React.createClass({
  mixins: [LinkedStateMixin, EditorMixin],

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}
            onKeyDown={this.handleKeyDown}
            className="form" role="form">
        <input valueLink={this.linkState('label')}
               className="form-control input-sm"
               type="text"
               id="label"
               placeholder="Label" />

        <input valueLink={this.linkState('description')}
               className="form-control input-sm"
               type="text"
               id="description"
               placeholder="Put your description here" />
      </form>);
  }
});

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

module.exports = {
  Editor: TextAreaEditor,
  Renderer: TextAreaRenderer
};

