/** @jsx React.DOM */

var React = require("react");

var Modal = require("react-bootstrap/Modal");
var Button = require("react-bootstrap/Button");

var Router = require("react-router");

var TEMPLATE = (
  "As a reminder:\n" +
  "--------------\n" +
  "\n" +
  "  * User Link: {{userlink}}\n" +
  "  * Admin Link: {{adminlink}}"
);

var FormConfirmation = React.createClass({
  mixins: [Router.Navigation],

  getCompleteURl: function(url) {
    return (
      window.location.protocol +
      "//" + window.location.host +
      window.location.pathname + url
    );
  },

  getUserLink: function() {
    return this.getCompleteURl(
      this.makeHref('viewForm', this.props.formData.submittedFormParams)
    );
  },

  getAdminLink: function() {
    return this.getCompleteURl(
      this.makeHref('editForm', this.props.formData.submittedFormParams)
    );
  },

  onRequestHide: function() {
    this.props.hide();
    this.transitionTo('editForm', this.props.formData.submittedFormParams);
  },

  render: function() {
    var filename = "form-" + this.props.formData.metadata.formName + ".txt";
    var fileContent = "data:text/plain;base64," + btoa(
      TEMPLATE
        .replace("{{userlink}}", this.getUserLink())
        .replace("{{adminlink}}", this.getAdminLink())
        .replace("{{formName}}", this.props.formData.formName)
      );
    return (
      <Modal title="Modal heading" animation={true}
             onRequestHide={this.onRequestHide}>
        <div className="modal-body">
          <h4>Yay, your form has been created!</h4>
          <p>Please, store the following links for later use</p>

          <h4>Admin link</h4>
          <a href={this.getAdminLink()}>{this.getAdminLink()}</a>

          <h4>User link</h4>
          <p>Give this link to your fellow link clickers!</p>
          <a href={this.getUserLink()}>{this.getUserLink()}</a>
        </div>
        <div className="modal-footer">
          <a download={filename} href={fileContent} className="btn">Download</a>
          <Button onClick={this.onRequestHide}>Okay, thanks</Button>
        </div>
      </Modal>);
  }
});

module.exports = FormConfirmation;
