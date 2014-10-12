"use strict";

var serializer = function(data){
  console.log("name", data.formName);
  console.log("elements", data.formElements);
};

module.exports = serializer;
