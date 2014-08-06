'use strict';

var _ = require('lodash');
var Suggesteddish = require('./suggestedDish.model');

// Get list of suggestedDishs
exports.index = function(req, res) {
  Suggesteddish.find(function (err, suggestedDishs) {
    if(err) { return handleError(res, err); }
    return res.json(200, suggestedDishs);
  });
};

// Get a single suggestedDish
exports.show = function(req, res) {
  Suggesteddish.findById(req.params.id, function (err, suggestedDish) {
    if(err) { return handleError(res, err); }
    if(!suggestedDish) { return res.send(404); }
    return res.json(suggestedDish);
  });
};

// Creates a new suggestedDish in the DB.
exports.create = function(req, res) {
  Suggesteddish.create(req.body, function(err, suggestedDish) {
    if(err) { return handleError(res, err); }
    return res.json(201, suggestedDish);
  });
};

// Updates an existing suggestedDish in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Suggesteddish.findById(req.params.id, function (err, suggestedDish) {
    if (err) { return handleError(res, err); }
    if(!suggestedDish) { return res.send(404); }
    var updated = _.merge(suggestedDish, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, suggestedDish);
    });
  });
};

// Deletes a suggestedDish from the DB.
exports.destroy = function(req, res) {
  Suggesteddish.findById(req.params.id, function (err, suggestedDish) {
    if(err) { return handleError(res, err); }
    if(!suggestedDish) { return res.send(404); }
    suggestedDish.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}