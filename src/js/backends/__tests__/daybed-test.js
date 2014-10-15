/** @jsx React.DOM */

"use strict";

jest.dontMock('../daybed');
jest.dontMock('string');

var daybed = require('../daybed');

describe("Daybed", function() {

  describe("Serializer", function() {
    var serializer;

    beforeEach(function() {
      serializer = new daybed.Serializer();
    });

    it("should be able to serialize form name", function() {
      var toSerialize = {
        formName: "Super form name",
        formElements: []
      };
      var serialized = serializer.serialize(toSerialize);

      expect(serialized.title).toEqual("Super form name");
      expect(serialized.description).toEqual(toSerialize.formName);
    });

    it("should call the 'serialize'+fieldType method", function() {
      serializer.__proto__.serializeSupertype = jest.genMockFunction();
      serializer.serialize({
        formName: 'Super form name',
        formElements: [{
          fieldType: 'supertype',
          data: 'some data'
        }]
      });

      expect(serializer.__proto__.serializeSupertype)
        .toBeCalledWith('some data');

    });

    it("should call the metadataSerializer when no fieldtype serializer " +
       "exists", function() {
      var mock = jest.genMockFunction();
      var fieldType;
      serializer.metadataSerializer = function(type) {
        fieldType = type;
        return mock;
      };
      serializer.serialize({
        formName: 'Super form name',
        formElements: [{
          fieldType: 'unknown',
          data: 'some data'
        }]
      });

      expect(fieldType).toEqual('unknown');
      expect(mock).toBeCalledWith('some data');
    });

    it.only("should be able to serialize checkboxes data", function() {
      var serialized = serializer.serializeCheckboxes({
        label: "Some choices",
        values: ["Option 1", "Option 2"],
        required: true
      });

      expect(serialized).toEqual({
        name: "some-choices",
        label: "Some choices",
        type: "choices",
        choices: ["Option 1", "Option 2"],
        formbuilderType: "checkboxes",
        required: true
      });
    });

    it("should be able to serialize dropdown data", function() {
      var serialized = serializer.serializeDropdown({
        label: "Some choices",
        values: ["Option 1", "Option 2"],
        required: true
      });

      expect(serialized).toEqual({
        name: "some-choices",
        label: "Some choices",
        type: "enum",
        choices: ["Option 1", "Option 2"],
        formbuilderType: "dropdown",
        required: true
      });
    });

    it("should be able to serialize radiobuttons data", function() {
      var serialized = serializer.serializeRadiobuttons({
        label: "Some choices",
        values: ["Option 1", "Option 2"],
        required: true
      });

      expect(serialized).toEqual({
        name: "some-choices",
        label: "Some choices",
        type: "enum",
        choices: ["Option 1", "Option 2"],
        formbuilderType: "radiobuttons",
        required: true
      });
    });

    it("should be able to serialize singleline-text data", function() {
      var serialized = serializer.serializeSinglelinetext({
        label: "Single line text",
        value: "my text",
        required: true
      });

      expect(serialized).toEqual({
        name: "single-line-text",
        label: "Single line text",
        type: "string",
        required: true
      });
    });

    it("should be able to serialize mutliline-text data", function() {
      var serialized = serializer.serializeMultilinetext({
        label: "Multi line text",
        value: "my text",
        required: true
      });

      expect(serialized).toEqual({
        name: "multi-line-text",
        label: "Multi line text",
        type: "text",
        required: true
      });
    });

    it("should be able to serialize metadata information", function() {
      var serialized = serializer.metadataSerializer("myType")({
        label: "Multi line text",
      });

      expect(serialized).toEqual({
        label: "Multi line text",
        type: "metadata",
        metadataType: "myType"
      });
    });

    it("should be able to do a roundtrip", function() {
      var inputData = {
        "formName":"mushrooms",
        "formElements":[
          {"fieldType":"title","data":{"label":"Mushrooms"}},
          {"fieldType":"paragraph","data":{"label":"Some explanation text"}},
          {"fieldType":"singlelinetext","data":{
            "label":"Label","description":"description","required":false}
          },
          {"fieldType":"multilinetext","data":{
            "label":"Label","description":"description","required":false}
          },
          {"fieldType":"dropdown","data":{
            "label":"Label","values":["Option 1","Option 2"],"required":false}
          },
          {"fieldType":"checkboxes","data":{
            "label":"Label","values":["Option 1","Option 2"],"required":false}
          },
          {"fieldType":"radiobuttons","data":{
            "label":"Label","values":["Option 1","Option 2"],"required":false}
          },
          {"fieldType":"submit","data":{"label":"Let's go!"}}]
      };

      expect(serializer.deserialize(serializer.serialize(inputData)))
        .toEqual(inputData);
    });
  });
});
