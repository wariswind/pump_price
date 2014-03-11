angular.module('pump.controllers', [])

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate,$rootScope,fuelData) {
  $scope.leftButtons = [{
    type: 'button-light',
	content: '<i class="icon ion-ios7-paperplane-outline dark"></i>Buy Fuel',
    tap: function(e) {
      $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
    }
  }];
  $scope.rightButtons = [{
    type: 'button-icon button-clear ion-navicon',
    tap: function(e) {
      $ionicSideMenuDelegate.toggleRight($scope.$$childHead);
    }
  }];
  
  $scope.fuels=fuelData.getFuels().then(function(response) {
      $scope.fuels = response;
	  console.log($scope.fuels)
    })
  
})

// A simple controller that fetches a list of data from a service
.controller('homeCtrl', function($scope,$rootScope, $ionicModal,$ionicLoading,$http,localStorageService,fuelData) {
  // "Pets" is a service returning mock data (services.js)
   $scope.user={};
  //localStorageService.clearAll();
  $scope.show = function() {

    // Show the loading overlay and text
    $scope.loading = $ionicLoading.show({

      // The text to display in the loading indicator
      content: 'Loading',

      // The animation to use
      animation: 'fade-in',

      // Will a dark overlay or backdrop cover the entire view
      showBackdrop: true,

      // The maximum width of the loading indicator
      // Text will be wrapped if longer than maxWidth
      maxWidth: 200,
	 
    });
  };
$scope.hide = function(){
    $scope.loading.hide();
  };
  $ionicModal.fromTemplateUrl('templates/login.html', function(modal) {
    $scope.Mymodal = modal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });
  $ionicModal.fromTemplateUrl('templates/register.html', function(modal) {
    $scope.MyRegModal = modal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });
  $scope.memberReglog = function() {
    $scope.MyRegModal.show();
	$scope.Mymodal.hide();
  };
  $scope.memberlogmodel = function() {
	$scope.Mymodal.show();
	$scope.MyRegModal.hide();
  };
   $scope.openModal = function() {
    $scope.Mymodal.show();
  };
 
 $scope.Userdetails = localStorageService.get('localUser');
 
 
 if ($scope.Userdetails === null) {
	 
setTimeout( function() {$scope.openModal()}, 100);
      
 }
 else{
 }
   $scope.memberRegister = function() {
	$scope.show();
	 $http({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: 'http://localhost:88/pump_price/index.php/mobileapp/member_register',
    method: "POST",
    data: {
      "name" : $scope.user.name,
      "email" : $scope.user.email,
	  "phone" : $scope.user.phone,
	  "pasd" : $scope.user.pasd,
	  "regtype" : $scope.user.type,
    },
  })
  .success(function(data) {
    if(data.error == 1){
    	$scope.logdetails=data;
		localStorageService.add('localUser',$scope.logdetails);
		$scope.Userdetails = localStorageService.get('localUser');
		$scope.MyRegModal.hide();
	  }
	  else if(data.error == 0){
		  $scope.logregerror='Email or phone has already been used';
	  }
	 $scope.hide(); 
  });
 }
  $scope.memberSignIn = function() {
	  $http({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: 'http://localhost:88/pump_price/index.php/mobileapp/member_login',
    method: "POST",
    data: {
      "username" : $scope.user.username,
      "pasd" : $scope.user.pasd
    },
  })
  .success(function(data) {
	  if(data.error == 1){
    	$scope.logdetails=data;
		localStorageService.add('localUser',$scope.logdetails);
		$scope.Userdetails = localStorageService.get('localUser');
		$scope.Mymodal.hide();
	  }
	  else if(data.error == 0){
		  $scope.logerror=$scope.user.username+'Invalid login details'+$scope.user.pasd;
	  }
  });
 }
  
})


// A simple controller that shows a tapped item's data
.controller('LoginCtrl', function($scope, $stateParams) {
  // "Pets" is a service returning mock data (services.js)
})

.controller('fuelformCtrl', function($scope,$rootScope,$stateParams, $ionicModal,$ionicLoading,$http,localStorageService,fuelData) {
	$scope.fuel = fuelData.get($stateParams.fuelid);
})