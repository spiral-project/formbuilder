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
        <button id="save-form" className="btn btn-success pull-right">Save form</button>
      </header>
      {elements}
      </div>
    );
  }
});

module.exports = FormContainer;
