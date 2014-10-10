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

    return <div id="formcontainer">{elements}</div>;
  }
});

module.exports = FormContainer;
