"use strict";

var capitalize = require('../../utils').capitalize;

var DaybedDeserializer = function() {};

DaybedDeserializer.prototype = {

  deserialize: function(inputData) {
    var outputData = {
      metadata: {
        formName: inputData.title,
        formDescription: inputData.description,
        submitButtonLabel: inputData.extra ? inputData.extra.submitButtonLabel : "Submit"
      },
      formElements: []
    };

    inputData.fields.forEach(function(field) {
      var deserializerName = "deserialize" + capitalize(field.type);
      if (DaybedDeserializer.prototype.hasOwnProperty(deserializerName)) {
        outputData.formElements.push(this[deserializerName](field));
      }
    }.bind(this));

    return outputData;
  },

  deserializeAnnotation: function(data) {
    return {
      data: {
        label: data.label
      },
      fieldType: data.annotationType
    };
  },

  deserializeChoices: function(data) {
    return {
      data: {
        name: data.name,
        label: data.label,
        values: data.choices,
        required: data.required
      },
      fieldType: "checkboxes"
    };
  },

  deserializeEnum: function(data) {
    return {
      data: {
        name: data.name,
        label: data.label,
        values: data.choices,
        required: data.required
      },
      fieldType: data.formbuilderType || "radiobuttons"
    };
  },

  deserializeString: function(data) {
    return {
      data: {
        name: data.name,
        label: data.label,
        description: data.hint,
        required: data.required
      },
      fieldType: "singlelinetext"
    };
  },

  deserializeText: function(data) {
    return {
      data: {
        name: data.name,
        label: data.label,
        description: data.hint,
        required: data.required
      },
      fieldType: "multilinetext"
    };
  }
};

function deserialize(data) {
  var serializer = new DaybedDeserializer();
  return serializer.deserialize(data);
}

module.exports = deserialize;
