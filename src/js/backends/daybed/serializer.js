"use strict";

var slugify = require('../../utils').slugify;
var capitalize = require('../../utils').capitalize;

var DaybedSerializer = function() {
  this.fieldsName = [];
};

DaybedSerializer.prototype = {
  serialize: function(inputData) {
    var outputData = {
      title: inputData.metadata.formName,
      description: inputData.metadata.formDescription,
      extra: {
        submitButtonLabel: inputData.metadata.submitButtonLabel
      },
      fields: []
    };

    inputData.formElements.forEach(function(element){
      var serializerName = "serialize" + capitalize(element.fieldType);
      var serializer;
      if (DaybedSerializer.prototype.hasOwnProperty(serializerName)) {
        serializer = this[serializerName].bind(this);
      } else {
        serializer = this.annotationSerializer(element.fieldType);
      }
      outputData.fields.push(serializer(element.data));
    }.bind(this));

    return outputData;
  },

  getName: function(label, tries) {
    // Make sure we don't create two fields with the same name
    var candidate = slugify(label);
    if (tries === undefined) {
      tries = 0;
    } else {
      candidate = candidate + "-" + tries;
    }
    if (this.fieldsName.indexOf(candidate) !== -1) {
      return this.getName(label, ++tries);
    }
    this.fieldsName.push(candidate);
    return candidate;
  },

  // Serialisation methods.

  annotationSerializer: function(type) {
    return function(data) {
      return {
        type: "annotation",
        label: data.label,
        annotationType: type
      };
    };
  },

  serializeList: function(daybedType, formbuilderType, data) {
    return {
      name: this.getName(data.label),
      label: data.label,
      type: daybedType,
      formbuilderType: formbuilderType,
      choices: data.values,
      required: data.required
    };
  },

  serializeText: function(type, data) {
    return {
      name: this.getName(data.label),
      label: data.label,
      hint: data.description,
      type: type,
      required: data.required
    };
  },

  serializeCheckboxes: function(data) {
    return this.serializeList("choices", "checkboxes", data);
  },

  serializeDropdown: function(data) {
    return this.serializeList("enum", "dropdown", data);
  },

  serializeRadiobuttons: function(data) {
    return this.serializeList("enum", "radiobuttons", data);
  },

  serializeSinglelinetext: function(data) {
    return this.serializeText("string", data);
  },

  serializeMultilinetext: function(data) {
    return this.serializeText("text", data);
  }
};

function serialize(data) {
  var serializer = new DaybedSerializer();
  return serializer.serialize(data);
}

module.exports = serialize;
