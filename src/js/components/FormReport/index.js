/** @jsx React.DOM */

"use strict";

var React = require("react");
var Router = require("react-router");
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;


var FormReport = React.createClass({
  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {records: []};
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
      .then(function(data) {
        this.setState(data);
      }.bind(this))
      .catch(function(error) {
        console.log("error while loading the form's records", error);
      });
  },

  render: function() {
    var result;
    console.log(this.state.records.length);

    if (this.state.records.length === 0) {
      result = "No results yet";
    } else {
      var header = Object.keys(this.state.records[0]).map(function(key) {
        return key;
      });

      result = (
       <table>
        <thead>
          <tr>{
            header.map(function(value) {
              return <th>{value}</th>
            })
          }</tr>
        </thead>
        <tbody>
          {
            this.state.records.map(function(record) {
              var row = [];
              row.push(header.map(function(id) {
                if (id !== "id") {
                  return <td>{record[id]}</td>;
                }
              }));
              return <tr>{row}</tr>;
            })
          }
        </tbody>
      </table>);
    }

    return (
      <div className="row">
        <div className="col-xs-3 col-sm-3"></div>
        <div id="form-viewer-container" className="col-xs-7 col-sm-7">
          <h1>Here are your form results</h1>
          {result}
        </div>
      </div>
    );
  }
});

module.exports = FormReport;
