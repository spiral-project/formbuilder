var S = require('string');

function slugify(text) {
  return S(text).slugify().s;
}

function capitalize(text) {
  return S(text).capitalize().s;
}

module.exports = {
  slugify: slugify,
  capitalize: capitalize
};
