/** @jsx React.DOM */

var React = require("react");

var Modal = require("react-bootstrap/Modal");
var Button = require("react-bootstrap/Button");

var Router = require("react-router");

var FormConfirmation = React.createClass({
  mixins: [Router.Navigation],

  onRequestHide: function() {
    this.props.hide();
  },

  render: function() {
    return (
      <Modal title="Form submitted" animation={true}
             onRequestHide={this.onRequestHide}>
        <div className="modal-body">
          <h4>Yay, your answers has been submitted!</h4>
        </div>
        <div className="modal-footer">
          <Button onClick={this.onRequestHide}>Okay, thanks</Button>
        </div>
      </Modal>);
  }
});

module.exports = FormConfirmation;
