/** @jsx React.DOM */

"use strict";

var React = require("react");
var FormElement = require("./FormElement");

var FormContainer = React.createClass({

  render: function() {
    var elements = this.props.items.map(function(element) {
      return <FormElement
                key={element.key}
                name={element.name}
                editor={element.editor}
                renderer={element.renderer} />;
    });

    return (
      <div id="form-container">
        <header>
          <input id="formName" type="text" />
          <button
            id="save-form"
            className="btn btn-success pull-right"
            onSubmit={this.props.submitForm} >
            Save form
          </button>
        </header>
        <div id="form-elements">
          {elements}
        </div>
      </div>
    );
  }
});

module.exports = FormContainer;
