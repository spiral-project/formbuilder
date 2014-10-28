/** @jsx React.DOM */

"use strict";

var React = require("react");
var CheckboxesEditor = require("./Checkboxes").Editor;
var RendererMixin = require("./RendererMixin");

var RadioButtonsRenderer = React.createClass({
  mixins: [RendererMixin],

  handleRadioClick: function(entryName) {
    return function(e) {
      this.nextValue = this.refs[entryName].getDOMNode().value;
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
          return <div key={i} className="radio">
            <label>
              <input type="radio"
                     ref={"entry-" + i}
                     value={value}
                     name={this.props.data.label}
                     onChange={this.handleRadioClick("entry-" + i)} /> {value}
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
  Renderer: RadioButtonsRenderer
};
