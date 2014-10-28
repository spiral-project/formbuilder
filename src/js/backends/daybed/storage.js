var Daybed = require('daybed.js');
var serialize = require('./serializer');
var deserialize = require('./deserializer');
var slugify = require('../../utils').slugify;

var DaybedStorage = function(config) {
  this.host = config.daybedHost;
};

DaybedStorage.prototype = {

  bindSession: function(hawkToken) {
    var credentials;
    if (hawkToken !== undefined) {
      credentials = {token: hawkToken};
    }
    return Daybed.startSession(this.host, credentials);
  },

  bindOrCreateSession: function(hawkToken) {
    return this.bindSession(hawkToken).catch(function() {
      return this.bindSession();
    }.bind(this));
  },

  storeForm: function(formId, data, hawkToken) {
    var self = this;
    return this.bindOrCreateSession(hawkToken)
      .then(function(session){
        var serialized = serialize(data);
        return session.saveModel(formId, {
          definition: serialized,
          permissions: {
            "Everyone": [
              "read_definition",
              "create_record"
            ]
          }
        }).then(function (form) {
          return {
            formId: form.id,
            hawkToken: session.token
          };
        });
      });
  },

  loadForm: function(formId, hawkToken) {
    return this.bindOrCreateSession(hawkToken)
      .then(function(session){
        return session.getDefinition(formId)
          .then(function(definition) {
          var deserialized = deserialize(definition);
          deserialized.metadata.formId = formId;
          return deserialized;
        });
      });
  },

  storeRecord: function(formId, record) {
    return this.bindSession()
      .then(function(session) {
        var result = {};
        Object.keys(record).forEach(function(key) {
          result[slugify(key)] = record[key];
        });
        return session.saveRecord(formId, result);
      });
  }
};

module.exports = DaybedStorage;
