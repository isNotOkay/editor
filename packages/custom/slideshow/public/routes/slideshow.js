'use strict';

angular.module('mean.slideshow').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('slideshow example page', {
      url: '/slideshow',
      templateUrl: 'slideshow/views/index.html'
    });
  }
]);
