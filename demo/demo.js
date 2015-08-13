var demoApp = angular.module("demoapp", ["nate.util"]);

demoApp.controller("mainCtrl", ["$scope", function($scope){
  
  console.log("Controller...");
  
  $scope.sentences = ["This is the first sentence ...", "This is the second sentence ... ", "This is the third sentence ...", "This is the forth sentence ..." ];
}]);