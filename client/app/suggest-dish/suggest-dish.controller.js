'use strict';

angular.module('suggestDishApp')
  .controller('SuggestDishCtrl', function ($scope, $resource, localconfig) {
    $scope.messages = {};
    $scope.messages.showSuccess = false;
    $scope.messages.showError = false;
    var googleService = initGoogleApi();

    $scope.dishImageUpload = function(file, message) {
      var res = JSON.parse(message);
      $scope.dish.imageUrl = res.url;
      $scope.dish.fileName = res.fileName;
    };

    function resetFields() {
      $scope.dish = {};
      $scope.hadSubmitted = false;
    }

    function initGoogleApi() {
      var pyrmont = new google.maps.LatLng(37.7833,-122.4167);

      var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: pyrmont,
        zoom: 15
      });

      var gs = new google.maps.places.PlacesService(map);
      return gs;
    }

    function noRestaurantFound(location) {
      alert('No Restaurants Found by Location: ' + location);
    }

    function searchRestaurantByKeyword(keyword, onSuccessCalback) {
      var pyrmont = new google.maps.LatLng(37.7833,-122.4167);
      var request = {
        location: pyrmont,
        radius: '40000',
        types: ['restaurant'],
        keyword: keyword
      };

      googleService.search(request, function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log('result', results[0]);
          var request = {
            reference: results[0].reference
          };

          googleService.getDetails(request, function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              if (_.isFunction(onSuccessCalback)) {
                onSuccessCalback(place);
              }
            } else {
              noRestaurantFound(keyword);
            }
          });
        } else {
          noRestaurantFound(keyword);
        }
      });

    }

    $scope.saveSuggestedDish = function(dishForm) {
      $scope.hadSubmitted = true;

      if (dishForm.$valid) {
        var suggestedDish = $scope.dish;

        searchRestaurantByKeyword($scope.location, function (place) {
          console.log('place', place);
          var addressComponents = place.address_components;
          var locationInfo = {};

          var streetNumber = "";
          var streetName = "";
          for (var i = 0; i < addressComponents.length; i++) {
            var ad = addressComponents[i];
            if (_.contains(ad.types, 'street_number')) {
              streetNumber = ad.long_name + ' ';
            } else if (_.contains(ad.types, 'route')) {
              streetName = ad.long_name;
            } else if (_.contains(ad.types, 'administrative_area_level_1')) {
              locationInfo.state = ad.long_name;
            } else if (_.contains(ad.types, 'country')) {
              locationInfo.country = ad.long_name;
            } else if (_.contains(ad.types, 'postal_code')) {
              locationInfo.zip = ad.long_name;
            } else if (_.contains(ad.types, 'locality')) {
              locationInfo.city = ad.long_name;
            }
          }
          locationInfo.street = streetNumber + streetName;
          locationInfo.googlePlaceID = place.reference;
          locationInfo.geoPoint = {
            lat: place.geometry.location.k,
            lng: place.geometry.location.B
          };
          suggestedDish.location = locationInfo;
          suggestedDish.restaurantName = place.name;

          console.log("suggestedDish", suggestedDish);

          var SuggestedDishApi = $resource('/api/suggestedDish');

//          //TODO: calculate score
          var res = SuggestedDishApi.save(suggestedDish, function (resp) {
            $scope.messages.showSuccess = true;
            $scope.messages.showError = false;

            resetFields();
          });
        });
      } else {
        $scope.messages.showSuccess = false;
        $scope.messages.showError = true;
      }

    };
    resetFields();
  });
