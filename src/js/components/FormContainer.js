/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

var FormElement = require("./FormElement");
var Fields = require("./Fields");


var FormContainer = React.createClass({
  mixins: [FluxChildMixin],
  render: function() {
    return (
        <div id="form-elements">{
          this.props.elements.map(function(element) {
            return <FormElement
                      key={element.id}
                      element={element}
                      editor={Fields[element.fieldType].editor}
                      renderer={Fields[element.fieldType].renderer} />;
          })
        }</div>
    );
  }
});

module.exports = FormContainer;
