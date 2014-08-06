'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SuggesteddishSchema = new Schema({
  location: {
    city: String,
    street: String,
    zip: String,
    state: String,
    country: String,
    googlePlaceID: String,
    geoPoint: {
      lat: Number,
      lng: Number
    },
    neighborhood: String
  },
  restaurantName: String,
  dishName: String,
  price: Number,
  snippet: String,
  isFullMeal: Boolean,
  containsDairy: Object,
  containsGrains: Object,
  containsLegumes: Object,
  meatQuality: Object,
  starchyVegetables: Object,
  containsSugar: Boolean,
  hasUnknownIngredients : Boolean,
  imageUrl: String
});

module.exports = mongoose.model('Suggesteddish', SuggesteddishSchema);