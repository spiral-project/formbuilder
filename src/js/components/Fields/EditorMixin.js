"use strict";

var EditorMixin = {
  getInitialState: function() {
    return this.props.data;
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.updateFormElement(this.state);
  },

  handleKeyDown: function(e) {
    if (e.key === 'Enter'){
      this.handleSubmit(e);
    }
  }
};

module.exports = EditorMixin;
