var Daybed = require('daybed.js');
var serialize = require('./serializer');
var deserialize = require('./deserializer');
var slugify = require('../../utils').slugify;

var DaybedStorage = function() {};

DaybedStorage.prototype = {
  initialize: function(config, getSession, setSession) {
    var host = config.daybedHost;

    var configureSession = function (session) {
      this.session = session;
      setSession(session.token);
    }.bind(this);

    return Daybed.startSession(host, getSession())
      .then(configureSession)
      .catch(function() {
        // Create the session if the provided one is invalid.
        return Daybed.startSession(host)
          .then(configureSession)
          .catch(function() {
            console.log("start session failed.", arguments);
          });
      });
  },

  storeForm: function(data) {
    var serialized = serialize(data);
    var formId = slugify(serialized.title);
    return this.session.saveModel(formId, {
      definition: serialized
    }).then(function () {
      console.log(arguments);
      return formId;
    });
  },

  loadForm: function(modelId) {
    return this.session.loadModel(modelId).then(function(loadedModel) {
      var deserialized = deserialize(loadedModel._definition);
      deserialized.metadata.formId = modelId;
      return deserialized
    });
  },

  loadFormList: function() {
    return this.session.getModels();
  }
};

module.exports = DaybedStorage;
