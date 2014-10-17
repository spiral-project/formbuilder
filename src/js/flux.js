"use strict";

var Fluxxor = require("fluxxor");
var randomBytes = require("crypto").randomBytes;

var constants = {
  ADD_FORM_ELEMENT: "ADD_FORM_ELEMENT",
  UPDATE_FORM_ELEMENT: "UPDATE_FORM_ELEMENT",
  DELETE_FORM_ELEMENT: "DELETE_FORM_ELEMENT",
  SET_INITIAL_DATA: "SET_INITIAL_DATA",
  SET_FORM_NAME: "SET_FORM_NAME",
  SET_FORM_LIST: "SET_FORM_LIST"
};

var FormListStore = Fluxxor.createStore({
  initialize: function() {
    this.formList = [];

    this.bindActions(
      constants.SET_FORM_LIST, this.setFormList
    );
  },

  getState: function() {
    return this.formList;
  },

  setFormList: function(formList) {
    this.formList = formList;
    this.emit("change");
  }
});

var FormElementStore = Fluxxor.createStore({
  initialize: function() {
    this.elements = [];
    this.formName;

    // XXX. Make this evolve, it's a pain.
    this.bindActions(
      constants.ADD_FORM_ELEMENT, this.onAdd,
      constants.UPDATE_FORM_ELEMENT, this.onUpdate,
      constants.DELETE_FORM_ELEMENT, this.onDelete,
      constants.SET_INITIAL_DATA, this.setInitialData,
      constants.SET_FORM_NAME, this.setFormName
    );
  },

  setInitialData: function(payload) {
    this.formName = payload.formName;
    this.elements = payload.formElements;

    // The elements in react need to all have an id.
    this.elements.forEach(function(element, id) {
      element.id = id
    });
    this.emit("change");
  },

  setFormName: function(payload) {
    this.formName = payload;
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

  getState: function() {
    return {
      formElements: this.elements,
      formName: this.formName
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
  setFormName: function(data) {
    this.dispatch(constants.SET_FORM_NAME, data);
  },
  setFormList: function(formList) {
    this.dispatch(constants.SET_FORM_LIST, formList);
  }
};

var stores = {
  FieldElementsStore: new FormElementStore(),
  FormListStore: new FormListStore()
};

var flux = new Fluxxor.Flux(stores, actions);

module.exports = {
  flux: flux,
  actions: actions
};
