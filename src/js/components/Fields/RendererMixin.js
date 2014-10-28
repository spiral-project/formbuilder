  /** @jsx React.DOM */

"use strict";

var RendererMixin = {
  getInitialState: function() {
    return {"value": this.props.data.value || ""};
  },

  updateRecordData: function (e) {
    if (this.props.updateViewerField) {
      var state = this.state;
      state.value = this.nextValue || this.refs.entry.getDOMNode().value;
      this.setState(state);
      this.props.updateViewerField(this.props.data.label,
                                   state.value);
    }
  },

  required: function() {
    return this.props.data.required ? '*' : '';
  }
};

module.exports = RendererMixin;
