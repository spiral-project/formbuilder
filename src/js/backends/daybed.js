"use strict";

var S = require('string');

var DaybedSerializer = function() {};

DaybedSerializer.prototype = {
  serialize: function(inputData) {
    var outputData = {
      title: S(inputData.formName || '').slugify().s,
      description: inputData.formName,
      fields: []
    };

    inputData.formElements.forEach(function(element){
      var serializerName = "serialize"+S(element.fieldType).capitalize().s;
      var serializer;
      if (DaybedSerializer.prototype.hasOwnProperty(serializerName)) {
        serializer = this[serializerName].bind(this);
      } else {
        serializer = this.defaultSerializer(element.fieldType);
      }
      outputData.fields.push(serializer(element.data));
    }.bind(this));

    return outputData;
  },

  defaultSerializer: function(type) {
    return function(data) {
      return {
        value: data.label,
        type: type,
        metadata: true
      };
    };
  },

  serializeList: function(type, data) {
    return {
      name: S(data.label).slugify().s,
      label: data.label,
      type: type,
      choices: data.values
    };
  },

  serializeText: function(type, data) {
    return {
      name: S(data.label).slugify().s,
      label: data.label,
      type: type,
    };
  },

  serializeCheckboxes: function(data) {
    return this.serializeList("choices", data);
  },

  serializeDropdown: function(data) {
    return this.serializeList("enum", data);
  },

  serializeRadiobuttons: function(data) {
    return this.serializeList("enum", data);
  },

  serializeSinglelinetext: function(data) {
    return this.serializeText("string", data);
  },

  serializeMultilinetext: function(data) {
    return this.serializeText("text", data);
  }
};

var DaybedBackend = function() {
  this.serializer = new DaybedSerializer();
};

DaybedBackend.prototype = {
  store: function(data) {
    console.log(this.serializer.serialize(data));
  }
};

module.exports = {
  Backend: DaybedBackend,
  Serializer: DaybedSerializer
};
