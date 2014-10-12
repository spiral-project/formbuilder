/** @jsx React.DOM */

"use strict";

var TestUtils = require('react/addons').addons.TestUtils;

jest.dontMock('../FormBuilderApp');

var FormBuilderApp = require('../FormBuilderApp');

describe("FormBuilderApp", function() {
  var comp;

  beforeEach(function() {
    comp = TestUtils.renderIntoDocument(<FormBuilderApp />);
  });

  describe("#render", function() {
    it("should render HTML content", function() {
      expect(comp.getDOMNode().outerHTML.length > 0).toBe(true);
    });
  });

  describe("#addFormElement", function() {
    it("should add an object to the state", function() {
      comp.addFormElement('multi-line-text');
      expect(comp.state.formElements).to.length(1);
    });
  });
});
