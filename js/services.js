// JavaScript Document
angular.module('pump.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('fuelData', function($http, $rootScope) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var fuels=[];
  return {
    getFuels: function() {
      return $http.get('http://localhost:88/pump_price/index.php/mobileapp/fetch_fuel').then(function(response) {
        fuels = response.data;
        $rootScope.$broadcast('handleAllFuel',fuels);
        return fuels;
      })
    },
	get: function(fuelId) {
      // Simple index lookup
      return fuels[fuelId];
    }
  };

  
});
