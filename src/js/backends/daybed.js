"use strict";

var S = require('string');

var DaybedSerializer = function() {};

DaybedSerializer.prototype = {

  deserialize: function(inputData) {
    var outputData = {
      formName: inputData.title,
      formElements: []
    };

    inputData.fields.forEach(function(field) {
      var deserializerName = "deserialize"+S(field.type).capitalize().s;
      if (DaybedSerializer.prototype.hasOwnProperty(deserializerName)) {
        outputData.formElements.push(this[deserializerName](field));
      }
    }.bind(this));

    return outputData;
  },

  serialize: function(inputData) {
    var outputData = {
      title: inputData.formName,
      description: inputData.formName,
      fields: []
    };

    inputData.formElements.forEach(function(element){
      var serializerName = "serialize"+S(element.fieldType).capitalize().s;
      var serializer;
      if (DaybedSerializer.prototype.hasOwnProperty(serializerName)) {
        serializer = this[serializerName].bind(this);
      } else {
        serializer = this.metadataSerializer(element.fieldType);
      }
      outputData.fields.push(serializer(element.data));
    }.bind(this));

    return outputData;
  },

  // Serialisation methods.

  metadataSerializer: function(type) {
    return function(data) {
      return {
        type: "metadata",
        label:data.label,
        metadataType: type
      };
    };
  },

  serializeList: function(daybedType, formbuilderType, data) {
    return {
      name: S(data.label).slugify().s,
      label: data.label,
      type: daybedType,
      formbuilderType: formbuilderType,
      choices: data.values,
      required: data.required
    };
  },

  serializeText: function(type, data) {
    return {
      name: S(data.label).slugify().s,
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
  },

  // Deserialisation.
  deserializeMetadata: function(data) {
    return {
      data: {
        label: data.label
      },
      fieldType: data.metadataType
    };
  },

  deserializeChoices: function(data) {
    return {
      data: {
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
        label: data.label,
        description: data.hint,
        required: data.required
      },
      fieldType: "multilinetext"
    };
  }
};

var DaybedBackend = function() {
  this.serializer = new DaybedSerializer();
};

DaybedBackend.prototype = {
  store: function(data) {
    var ser = new DaybedSerializer();
    console.log('input', JSON.stringify(data));
    console.log('output', JSON.stringify(ser.serialize(data)));
  }
};

module.exports = {
  Backend: DaybedBackend,
  Serializer: DaybedSerializer
};
