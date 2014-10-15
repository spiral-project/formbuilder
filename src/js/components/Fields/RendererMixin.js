  /** @jsx React.DOM */

"use strict";

var EditorMixin = {
  required: function() {
    return this.props.data.required ? '*' : '';
  }
};

module.exports = EditorMixin;
