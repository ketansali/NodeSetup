"use strict";

var commonQuery = {};

commonQuery.cloneDeep = function (array) {
  if (array) return JSON.parse(JSON.stringify(array));
  return array;
};

commonQuery.decodeUris = function (body) {
  if (body) {
    Object.keys(body).map((x) => (body[x] = decodeURIComponent(body[x])));
  }
  return body;
};

module.exports = commonQuery;
