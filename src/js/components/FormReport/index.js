/** @jsx React.DOM */

"use strict";

var React = require("react");
var Router = require("react-router");


var FormReport = React.createClass({
  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {definition: [], records: [], loaded: false};
  },

  // This is called when the URL changed for the same route.
  componentWillReceiveProps: function(newProps) {
    if (newProps.params.formId) {
      this.loadRecords(newProps.params);
    }
  },

  // This is called when the route loads for the first time.
  componentDidMount: function() {
    if (this.props.params.formId) {
      this.loadRecords(this.props.params);
    }
  },

  loadRecords: function(params) {
    return this.props.backend.loadRecords(params.formId, params.hawkToken)
      .then(function(recordsResponse) {
        return this.props.backend.loadForm(params.formId, params.hawkToken)
          .then(function(definitionResponse) {
            this.setState({
              definition: definitionResponse,
              records: recordsResponse.records,
              loaded: true
            });
          }.bind(this));
      }.bind(this))
      .catch(function(error) {
        console.log("error while loading the form's records", error);
      });
  },

  getUserLink: function() {
    if (this.props.params.formId) {
      return this.makeHref('viewForm', this.props.params);
    }
  },

  render: function() {
    var result;

    if (! this.state.loaded) {
      return <div className="center">Loading...</div>;
    }

    var nbEntries = this.state.records.length;
    var headers = this.state.definition.formElements.map(
      function(field) {
        return field.data.label;
      });

    if (nbEntries === 0) {
      result = "No entries yet.";
    } else {
      result = (
       <table className="table table-striped">
        <thead>
          <tr>{
            headers.map(function(value, i) {
              return <th key={i}>{value}</th>;
            })
          }</tr>
        </thead>
        <tbody>
          {
            this.state.records.map(function(record, j) {
              var row = [];
              row.push(this.state.definition.formElements.map(function(field, i) {
                var fieldName = field.data.name;
                if (fieldName !== "id") {
                  return <td key={i}>{record[fieldName]}</td>;
                }
              }.bind(this)));
              return <tr key={j}>{row}</tr>;
            }.bind(this))
          }
        </tbody>
      </table>);
    }

    return (
      <div className="container">
        <div id="form-viewer-container" className="col-md-12">
          <div className="row">
            <div className="col-md-5">
              <h1>{this.state.definition.metadata.formName}</h1>
            </div>
            <div className="col-md-4 center">
              <h3>{this.state.definition.metadata.formDescription}</h3>
            </div>
            <div className="col-md-2 right">
              <h3>{this.state.records.length} {this.state.records.length === 1 ? "entry" : "entries"}</h3>
            </div>
          </div>
          {result}
          <div className="row">
            <div className="col-md-12 right">
              <p><a href={this.getUserLink()} className="btn btn-success">Add a new entry</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = FormReport;
