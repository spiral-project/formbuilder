"use strict";

var Daybed = require('daybed.js');
var slugify = require('../utils').slugify;
var capitalize = require('../utils').capitalize;

var DaybedSerializer = function() {};

DaybedSerializer.prototype = {

  deserialize: function(inputData) {
    var outputData = {
      formName: inputData.title,
      formElements: []
    };

    inputData.fields.forEach(function(field) {
      var deserializerName = "deserialize" + capitalize(field.type);
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

  // Serialisation methods.

  annotationSerializer: function(type) {
    return function(data) {
      return {
        type: "annotation",
        label:data.label,
        annotationType: type
      };
    };
  },

  serializeList: function(daybedType, formbuilderType, data) {
    return {
      name: slugify(data.label),
      label: data.label,
      type: daybedType,
      formbuilderType: formbuilderType,
      choices: data.values,
      required: data.required
    };
  },

  serializeText: function(type, data) {
    return {
      name: slugify(data.label),
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

function serialize(data) {
  var serializer = new DaybedSerializer();
  return serializer.serialize(data);
}

function deserialize(data) {
  var serializer = new DaybedSerializer();
  return serializer.deserialize(data);
}

var DaybedBackend = function() {};

DaybedBackend.prototype = {
  initialize: function(host, getSession, setSession) {
    var configureSession = function (session) {
      this.session = session;
      setSession(session.token);
    }.bind(this);

    return Daybed.startSession(host, getSession())
      .then(configureSession)
      .catch(function() {
        // Create the session if the provided one is invalid.
        return Daybed.startSession(host)
          .then(configureSession)
          .catch(function() {
            console.log("start session failed.", arguments);
          });
      });
  },

  store: function(data) {
    var serialized = serialize(data);
    console.log("serialized", serialized);
    return this.session.saveModel(slugify(serialized.title), {
      definition: serialized
    });
  },

  load: function(modelId) {
    return this.session.loadModel(modelId).then(function(loadedModel) {
      console.log("loaded model", loadedModel);
      var deserialized = deserialize(loadedModel._definition);
      console.log("deserialized", deserialized);
      return deserialized
    });
  }
};

module.exports = {
  Backend: DaybedBackend,
  Serializer: DaybedSerializer
};
