"use strict";

var Fluxxor = require("fluxxor");
var randomBytes = require("crypto").randomBytes;

var constants = {
  ADD_FORM_ELEMENT: "ADD_FORM_ELEMENT",
  UPDATE_FORM_ELEMENT: "UPDATE_FORM_ELEMENT",
  DELETE_FORM_ELEMENT: "DELETE_FORM_ELEMENT",
  SET_INITIAL_DATA: "SET_INITIAL_DATA",
  UPDATE_FORM_METADATA: "UPDATE_FORM_METADATA",
  UPDATE_VIEWER_FIELD: "UPDATE_VIEWER_FIELD"
};


var FormElementStore = Fluxxor.createStore({
  initialize: function() {
    this.elements = [];
    this.record = {};
    this.metadata = {};

    // XXX. Make this evolve, it's a pain.
    this.bindActions(
      constants.ADD_FORM_ELEMENT, this.onAdd,
      constants.UPDATE_FORM_ELEMENT, this.onUpdate,
      constants.DELETE_FORM_ELEMENT, this.onDelete,
      constants.SET_INITIAL_DATA, this.setInitialData,
      constants.UPDATE_FORM_METADATA, this.updateFormMetadata,
      constants.UPDATE_VIEWER_FIELD, this.updateViewerField
    );
  },

  setInitialData: function(payload) {
    if (payload === undefined) {
      payload = {
        metadata: {
          formName: 'Form title',
          formDescription: 'A paragraph describing your form.',
          submitButtonLabel: 'Submit'
        },
        formElements: []
      };
    }
    this.metadata = payload.metadata;
    this.elements = payload.formElements;
    this.record = {};

    // The elements in react need to all have an id.
    this.elements.forEach(function(element, id) {
      element.id = id
    });
    this.emit("change");
  },

  updateFormMetadata: function(payload) {
    this.metadata[payload.name] = payload.label;
    this.emit("change");
  },

  onAdd: function(payload){
    this.elements.push({
      id: this.elements.length,
      fieldType: payload.fieldType,
      data: payload.defaultData
    });
    this.emit("change");
  },

  onUpdate: function(payload) {
    var element = this.elements.filter(function(el) {
      return el.id === payload.element.id;
    })[0];

    var index = this.elements.indexOf(element);
    this.elements[index] = payload.element;
    this.emit("change");
  },

  onDelete: function(id) {
    this.elements = this.elements.filter(function(el) {
      return el.id !== id;
    });
    this.emit("change");
  },

  updateViewerField: function(payload) {
    this.record[payload.name] = payload.value;
    this.emit("change");
  },

  getState: function() {
    return {
      formElements: this.elements,
      metadata: this.metadata,
      record: this.record
    };
  }
});

var actions = {
  addFormElement: function(fieldType, defaultData) {
    this.dispatch(constants.ADD_FORM_ELEMENT, {
      fieldType: fieldType,
      defaultData: defaultData
    });
  },
  updateFormElement: function(element) {
    this.dispatch(constants.UPDATE_FORM_ELEMENT, {element: element});
  },
  deleteFormElement: function(id) {
    this.dispatch(constants.DELETE_FORM_ELEMENT, id);
  },
  setInitialData: function(data) {
    this.dispatch(constants.SET_INITIAL_DATA, data);
  },
  updateFormMetadata: function(name, label) {
    this.dispatch(constants.UPDATE_FORM_METADATA, {
      name: name,
      label: label
    });
  },
  updateViewerField: function(name, value) {
    this.dispatch(constants.UPDATE_VIEWER_FIELD, {
      name: name,
      value: value
    });
  }
};

var stores = {
  FieldElementsStore: new FormElementStore()
};

var flux = new Fluxxor.Flux(stores, actions);

module.exports = {
  flux: flux,
  actions: actions
};
