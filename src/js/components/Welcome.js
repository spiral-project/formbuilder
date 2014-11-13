/** @jsx React.DOM */

"use strict";

var React = require("react");
var Router = require("react-router");
var Jumbotron = require("react-bootstrap/Jumbotron");
var Button = require("react-bootstrap/Button");

var Welcome = React.createClass({
  mixins: [Router.Navigation,],
  onClick: function() {
    this.transitionTo('createForm');
  },
  render: function() {
    return (
      <div>
        <Jumbotron>
          <div className="container">
          <h1>Hey, welcome!</h1>
          <p>
             This is the <strong>daybed formbuilder</strong>, a tool to help
             you create online forms easily.
          </p>
          <p><Button className="btn-primary btn-lg" onClick={this.onClick} bsStyle="primary">Interested? Create a new one!</Button></p>
          </div>
        </Jumbotron>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2><i className="fa fa-eye-slash"></i> Your privacy matters</h2>
              <p>With daybed, you're not giving google or any other giants your data.
              You can host your own servers really easily, or you can trust us to
              host some of your data (and we aren't evil ;))</p>
            </div>
            <div className="col-md-4">
              <h2><i className="fa fa-users"></i> Focused on community</h2>
              <p>All the code we write is written in the open and we try to be
              the most inclusive as we can to welcome your ideas</p>
              <p>Our main goal is not to host all the forms of the world, but
              to provide people with code they can run themselves.</p>
              <p>Daybed and the formbuilder are released under a BSD license</p>
            </div>
            <div className="col-md-4">
              <h2><i className="fa fa-unlock"></i> Account-less</h2>
              <p>You don't need to create an account to create a new form.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Welcome;
