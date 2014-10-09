'use strict';

angular.module('mean.slideshow').directive('colorPaletteDirective',  function() {
  return {
    restrict: 'E',
    templateUrl: 'slideshow/views/color-palette.html',
    controller: function($scope, $element) {
      $scope.row0 = ['#000000', '#424242', '#919191', '#E0E0E0', '#FFFFFF'];
      $scope.row1 = ['#ac725e', '#d06b64', '#f83a22', '#fa573c', '#ff7537'];
      $scope.row2 = ['#ffad46', '#42d692', '#16a765', '#7bd148', '#b3dc6c'];
      $scope.row3 = ['#fbe983', '#fad165', '#92e1c0', '#9fe1e7', '#9fc6e7'];
      $scope.row4 = ['#4986e7', '#9a9cff', '#b99aff', '#c2c2c2', '#cabdbf'];
      $scope.rows = [$scope.row0, $scope.row1, $scope.row2, $scope.row3, $scope.row4];

      $scope.getColor = function(rowIndex, index) {
        console.log($scope.rows[rowIndex][index]);
      };
    }
  };
}); 


    

