/** @jsx React.DOM */

"use strict";

var React = require("react");

var TEMPLATE = (
  "{{formName}}\n" +
  "---------------------\n" +
  "\n" +
  "  * User Link: {{userlink}}\n" +
  "  * Admin Link: {{adminlink}}"
);

var FormHeader = React.createClass({

  render: function() {
    var userLink, reportLink, downloadButton;
    if (this.props.userLink) {
      userLink = <div><a href={this.props.userLink} title="Share this URL to display the online form.">
          <i className="fa-link fa fa-1x"></i> {this.props.userLink}
        </a></div>;

    }
    if (this.props.reportLink) {
      reportLink = <div><a href={this.props.reportLink} title="Share this URL to display the form answers.">
          <i className="fa-link fa fa-1x"></i> {this.props.reportLink}
        </a></div>;

      var filename = "form-" + this.props.metadata.formName + ".txt";
      var fileContent = "data:text/plain;base64," + btoa(
        TEMPLATE
          .replace("{{userlink}}", this.props.userLink)
          .replace("{{adminlink}}", this.props.reportLink)
          .replace("{{formName}}", this.props.metadata.formName)
      );
      downloadButton = <a download={filename} href={fileContent} className="btn btn-primary pull-right">Download</a>;
    }

    var buttonClasses = "btn btn-success pull-right";
    if (!this.props.formReady) {
      buttonClasses = buttonClasses + " disabled";
    }

    var saveButtonValue = "Save form";

    if (this.props.formStatus === "saved") {
      saveButtonValue = <div><i className="fa fa-check"></i> Saved</div>;
    } else if (this.props.formStatus == "pending") {
      saveButtonValue = <div><i className="fa fa-refresh spin"></i> Save form</div>;
    }

    return <header>
      <button
        className={buttonClasses}
        onClick={this.props.submitForm} >
        {saveButtonValue}
      </button>
      {downloadButton}
      {userLink}
      {reportLink}
    </header>;
  }
});

module.exports = FormHeader;
