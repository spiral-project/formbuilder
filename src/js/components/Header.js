/** @jsx React.DOM */

"use strict";

var React = require("react");
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
  render: function() {
    return (
      <div className="navbar navbar-default navbar-static-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">Daybed formbuilder</a>
        </div>
        <div className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="formList">Your forms</Link></li>
            <li><a href="#">Daybed ?</a></li>
            <li><a href="#">Our values</a></li>
          </ul>
        </div>
      </div>
    </div>);
  }
});

module.exports = Header;
