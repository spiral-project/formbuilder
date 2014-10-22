/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var FormElement = require("./FormElement");
var Fields = require("./Fields");


var FormContainer = React.createClass({
  mixins: [FluxMixin],

  updateFormElement: function(element) {
    this.getFlux().actions.updateFormElement(element);
  },

  updateFormMetadata: function(name) {
    return function (element) {
      this.getFlux().actions.updateFormMetadata(name, element.data.label);
    }.bind(this);
  },

  render: function() {
    return (
        <div id="form-elements">
          <FormElement key="title"
                       element={{data: {label: this.props.metadata.formName}}}
                       updateFormElement={this.updateFormMetadata('formName')}
                       editor={Fields['title'].editor}
                       renderer={Fields['title'].renderer}
                       deletable={false} />

          <FormElement key="description"
                       element={{data: {label: this.props.metadata.formDescription}}}
                       updateFormElement={this.updateFormMetadata('formDescription')}
                       editor={Fields['paragraph'].editor}
                       renderer={Fields['paragraph'].renderer}
                       deletable={false} />

          {
            this.props.elements.map(function(element) {
              return <FormElement
                        key={element.id}
                        element={element}
                        updateFormElement={this.updateFormElement}
                        editor={Fields[element.fieldType].editor}
                        renderer={Fields[element.fieldType].renderer} />;
            }.bind(this))
          }

          <FormElement key="submit"
                       element={{data: {label: this.props.metadata.submitButtonLabel}}}
                       updateFormElement={this.updateFormMetadata('submitButtonLabel')}
                       editor={Fields['submit'].editor}
                       renderer={Fields['submit'].renderer}
                       deletable={false} />
        </div>
    );
  }
});

module.exports = FormContainer;
