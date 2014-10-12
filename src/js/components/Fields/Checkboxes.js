/** @jsx React.DOM */

"use strict";

var React = require("react");
var LinkedStateMixin = require("react/addons").addons.LinkedStateMixin;
var EditorMixin = require("./EditorMixin");

var CheckboxesEditor = React.createClass({
  mixins: [LinkedStateMixin, EditorMixin],

  updateValues: function() {
    var value = this.refs.values.getDOMNode().value;
    this.setState({
      values: value.split(', ')
    });
  },

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

        <input ref="values"
               onChange={this.updateValues}
               className="form-control input-sm"
               type="text"
               id="values"
               value={this.state.values.join(', ')} />

      </form>);
  }
});

var CheckboxesRenderer = React.createClass({
  render: function() {
    var values = this.props.data.values || [];
    return <form className="form-horizontal" role="form">
      <div className="form-group">
        <label htmlFor="label" className="col-sm-4 control-label">
          {this.props.data.label || "Label"}
        </label>
        <div className="col-sm-8">
        { values.map(function(value, i) {
          return <div key={i} className="checkbox">
            <label>
              <input type="checkbox" />{value}
            </label>
          </div>
          })
        }
        </div>
      </div>
    </form>
  }
});

module.exports = {
  Editor: CheckboxesEditor,
  Renderer: CheckboxesRenderer
}

