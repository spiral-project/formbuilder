/** @jsx React.DOM */

"use strict";

var React = require("react");

var TextAreaEditor = require("./TextArea").Editor;
var RendererMixin = require("./RendererMixin");

var TextRenderer = React.createClass({
  mixins: [RendererMixin],

  render: function() {
    return <form className="form-horizontal" role="form">
      <div className="form-group">
        <label htmlFor={this.props.data.name} className="col-sm-4 control-label">
          {this.props.data.label}{this.required()}
        </label>
        <div className="col-sm-8">
          <input type="text"
                 className="form-control"
                 id={this.props.data.name}
                 placeholder={this.props.data.description}
                 ref="entry"
                 onChange={this.updateRecordData} />
        </div>
      </div>
    </form>;
  }
});

module.exports = {
  Editor: TextAreaEditor,
  Renderer: TextRenderer
};

