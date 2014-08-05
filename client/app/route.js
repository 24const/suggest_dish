'use strict';

angular.module('suggestDishApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('suggestDish', {
        url: '/',
        templateUrl: 'app/suggest-dish/suggest-dish.html',
        controller: 'SuggestDishCtrl'
      });
  });