/** @jsx React.DOM */

"use strict";

var React = require("react");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var FormElement = require("./FormElement");
var Fields = require("../Fields");
var Submit = require("../Fields/Submit");

var Sortable = require("react-components/sortable");

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

  handleReorder: function(elements) {
    this.getFlux().actions.reorderFormElements(
      // Flux is expecting ids, and elements are objects here.
      elements.map(function(element) {
        return element.key;
      })
    );
  },

  render: function() {
    return (
        <div id="form-editor-elements">
          <FormElement key="title"
                       element={{data: {label: this.props.metadata.formName},
                                 id: "title",
                                 currentlyEdited: this.props.metadata.editStatus.title}}
                       updateFormElement={this.updateFormMetadata('formName')}
                       editor={Fields.title.editor}
                       renderer={Fields.title.renderer}
                       deletable={false} />

          <FormElement key="description"
                       element={{data: {label: this.props.metadata.formDescription},
                                 id: "description",
                                 currentlyEdited: this.props.metadata.editStatus.description}}
                       updateFormElement={this.updateFormMetadata('formDescription')}
                       editor={Fields.paragraph.editor}
                       renderer={Fields.paragraph.renderer}
                       deletable={false} />
          <Sortable components={
                this.props.elements.map(function(element, i) {
                  return <FormElement
                            draggable={true}
                            key={element.id}
                            element={element}
                            updateFormElement={this.updateFormElement}
                            editor={Fields[element.fieldType].editor}
                            renderer={Fields[element.fieldType].renderer} />;
                }.bind(this))
              } onReorder={this.handleReorder}
                verify={() => true} />

          <FormElement key="submit"
                       element={{data: {label: this.props.metadata.submitButtonLabel},
                                 id: "submit",
                                 currentlyEdited: this.props.metadata.editStatus.submit}}
                       updateFormElement={this.updateFormMetadata('submitButtonLabel')}
                       editor={Submit.Editor}
                       renderer={Submit.Renderer}
                       deletable={false} />
        </div>
    );
  }
});

module.exports = FormContainer;
