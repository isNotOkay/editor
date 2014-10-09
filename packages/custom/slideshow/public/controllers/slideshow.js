'use strict';

/*
 * SlideshowEditorCanvas
 * Dieses Modul enthält sämtliche Funktionen, die mit den Canvas-Elementen (= Stages)
 * des KineticJS Frameworks interagieren.
 *
 *
 */
angular.module('mean.slideshow').controller('SlideshowController', ['$scope', 'Global', 
  function($scope, Global) {
    $scope.global = Global;

  /*
   * Variablen
   *
   */
  $scope.slides = [
    {id: 0},
    {id: 1}
    ];
  $scope.ratio = 16 / 9;
  $scope.previewStageWidth = 100;
  $scope.previewStageHeight = $scope.previewStageWidth / $scope.ratio;
  $scope.slideWidth = 800;
  $scope.slideHeight = $scope.slideWidth / $scope.ratio;
  $scope.editorStageBackgroundColor = '#ffdddd';
  $scope.editorStage = {};
  $scope.editorLayer = {};

  /*
   * Wird von der Direktive "editorStage" aufgerufen.
   *
   */
  $scope.createEditorStage = function(editorStageDivID) {
    $scope.editorStage = new Kinetic.Stage({
      container: editorStageDivID,
      width: $scope.slideWidth,
      height: $scope.slideHeight
    });

    $scope.editorLayer = new Kinetic.Layer();

    var background = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: $scope.slideWidth,
      height: $scope.slideHeight,
      fill: $scope.editorStageBackgroundColor,
    });

    // add the shape to the layer
    $scope.editorLayer.add(background);
    $scope.editorStage.add($scope.editorLayer);
  };


  /*
   * Wird von der Direktive "scrollableSlideList" aufgerufen.
   *
   */
  $scope.createPreviewStage = function(previewStageDivID) {

    var stage = new Kinetic.Stage({
      container: previewStageDivID,
      width: $scope.previewStageWidth,
      height: $scope.previewStageHeight
    });

    var layer = new Kinetic.Layer();

    var background = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: $scope.previewStageWidth,
      height: $scope.previewStageHeight,
      fill: 'white',
      stroke: 'black',
      strokeWidth: 1
    });

    // add the shape to the layer
    layer.add(background);
    stage.add(layer);

  };

  /*
   * Wird als Callback für "window.resize" in der Direktive "editorStage" registriert.
   *
   * Beim Skalieren bleibt die ursprüngliche Position und Größe aller Elemente des Layers erhalten.
   * Die Skalierungsfunktion von KineticJS berechnet die Pixel neu. Dementsprechend verlieren
   * skalierte Elemente nicht an Schärfe.
   *
   */
  $scope.scaleEditorStage = function(editorStageDivID) {
    var editorStageContainerWidth = angular.element('#' + editorStageDivID).width();
    //if (editorStageContainerWidth <= $scope.slideWidth) {
      // Verhindern, dass der Editor zu klein wird.
      //return;
    //}

    // Hintergrundlayer mitsamt Elementen auf die Breite/Hoehe des Containers skalieren
    var scale = editorStageContainerWidth / $scope.slideWidth;
    $scope.editorStage.scale({
      x: scale,
      y: scale
    });
    $scope.editorStage.size({
      width: editorStageContainerWidth,
      height: editorStageContainerWidth / $scope.ratio
    });
    console.log($scope.editorStage.getWidth());
    console.log($scope.editorStage.getHeight());
  };


  /*
   * Skalierung von Labels, Bildern etc.
   *
   */
  $scope.scaleEditorElement = function() {
    // TODO
  };




  /*
   *
   *
   */
  $scope.addLabel = function(text, x, y) {
    var label = new Kinetic.Label({
      x: 170,
      y: 75,
    });

    label.add(new Kinetic.Text({
      text: 'text',
      fontFamily: 'Calibri',
      fontSize: 18,
      padding: 5,
      fill: 'black',
      draggable: true
    }));

    $scope.editorLayer.add(label);
    $scope.editorStage.draw();
  };

}]);