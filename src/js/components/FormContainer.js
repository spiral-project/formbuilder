/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var FormElement = require("./FormElement");
var Fields = require("./Fields");


var FormContainer = React.createClass({
  mixins: [FluxMixin],
  render: function() {
    console.log("formcontainer render props", this.props);
    return (
        <div id="form-elements">
        {
          this.props.elements.map(function(element) {
            return <FormElement
                      key={element.id}
                      element={element}
                      editor={Fields[element.fieldType].editor}
                      renderer={Fields[element.fieldType].renderer} />;
          })
        }
        </div>
    );
  }
});

module.exports = FormContainer;
