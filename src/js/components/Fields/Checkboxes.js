/** @jsx React.DOM */

"use strict";

var React = require("react");
var LinkedStateMixin = require("react/addons").addons.LinkedStateMixin;
var EditorMixin = require("./EditorMixin");
var RendererMixin = require("./RendererMixin");

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

        {this.getRequired()}

      </form>);
  }
});

var CheckboxesRenderer = React.createClass({
  mixins: [RendererMixin],

  handleCheckboxClick: function() {
    return function(e) {
      var values = Object.keys(this.refs).reduce(
        function(resultList, entryName) {
          var element = this.refs[entryName].getDOMNode();
          if (element.checked) {
            resultList.push(element.value);
          }
          return resultList;
        }.bind(this), []);
      this.nextValue = values.join(",");
      this.updateRecordData(e);
    }.bind(this);
  },

  render: function() {
    var values = this.props.data.values || [];

    return <form className="form-horizontal" role="form">
      <div className="form-group">
        <label htmlFor="label" className="col-sm-4 control-label">
          {this.props.data.label}{this.required()}

        </label>
        <div className="col-sm-8">
        { values.map(function(value, i) {
          return <div key={i} className="checkbox">
            <label>
              <input type="checkbox"
                     ref={"entry-" + i}
                     value={value}
                     name={this.props.data.label}
                     onChange={this.handleCheckboxClick()} />{value}
            </label>
          </div>;
          }.bind(this))
        }
        </div>
      </div>
    </form>;
  }
});

module.exports = {
  Editor: CheckboxesEditor,
  Renderer: CheckboxesRenderer
};

