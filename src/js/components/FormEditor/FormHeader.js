/** @jsx React.DOM */

"use strict";

var React = require("react");
var OverlayTrigger = require("react-bootstrap/OverlayTrigger");
var Tooltip = require("react-bootstrap/Tooltip");

var FormHeader = React.createClass({
  render: function() {
    var userLink, reportLink;
    if (this.props.userLink) {
      userLink = <OverlayTrigger placement="bottom" overlay={
        <Tooltip><strong>Share this URL</strong> to display the online form.</Tooltip>
        }>
        <a href={this.props.userLink}>
          <i className="fa-link fa fa-1x"></i> {this.props.userLink}
        </a>
      </OverlayTrigger>;

    }
    if (this.props.reportLink) {
      reportLink = <OverlayTrigger placement="bottom" overlay={
        <Tooltip><strong>Share this URL</strong> to display the form answers.</Tooltip>
        }>
        <a href={this.props.reportLink}>
          <i className="fa-link fa fa-1x"></i> {this.props.reportLink}
        </a>
      </OverlayTrigger>;
    }

    return <header>
      <button
        className="btn btn-success pull-right"
        onClick={this.props.submitForm} >
        Save form
      </button>
      <div>{userLink}</div>
      <div>{reportLink}</div>
    </header>;
  }
});

module.exports = FormHeader;
