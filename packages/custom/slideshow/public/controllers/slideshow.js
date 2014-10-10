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
  $scope.defaultFontSize = 25;
  $scope.defaultFontStyle = 'Arial';
  $scope.editorStageBackgroundColor = '#ffdddd';
  $scope.editorStage = {};
  $scope.editorLayer = {};

  $scope.activeStageElement = null;
  $scope.color = '#000000';

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
   $scope.addLabel = function() {
    var label = new Kinetic.Label({
      x: 20,
      y: 20,
      draggable: true
    });

    label.add(new Kinetic.Tag({
          stroke: 1
        }));

    label.add(new Kinetic.Text({
      text: 'Text',
      fontFamily: $scope.defaultFontStyle,
      fontSize: $scope.defaultFontSize,
      padding: 5,
      fill: 'black'
    }));
    label.getTag().visible(false);


    label.on('click', function() {
          // In den Code muss noch eine Fallunterscheidung bzgl. Label/Bild
          // gemacht werden
          if ($scope.activeStageElement !== null) {
            $scope.activeStageElement.getTag().visible(false);
          }

          $scope.activeStageElement = label;
          label.getTag().visible(true);
          $scope.draw();
      });

    $scope.editorLayer.add(label);
    $scope.draw();
  };

  $scope.normalText = function() {
  if ($scope.activeStageElement === null) {
      return;
    }

    var textObject = $scope.activeStageElement.getText();
    textObject.fontStyle('normal');
    $scope.draw();
  };

  $scope.boldText = function() {
  if ($scope.activeStageElement === null) {
      return;
    }

    var textObject = $scope.activeStageElement.getText();
    textObject.fontStyle('bold');
    $scope.draw();
  };
  $scope.italicText = function() {
  if ($scope.activeStageElement === null) {
      return;
    }

    var textObject = $scope.activeStageElement.getText();
    textObject.fontStyle('italic');
    $scope.draw();
  };

  $scope.draw = function() {
    $scope.editorStage.draw();
  };

  $scope.deleteActiveElement = function() {
  if ($scope.activeStageElement === null) {
      return;
    }

    $scope.activeStageElement.destroy();
    $scope.activeStageElement = null;
    $scope.draw();
  };

  $scope.scaleActiveElement = function(scaleValue) {
  if ($scope.activeStageElement === null) {
      return;
    }

    $scope.activeStageElement.scale({x:scaleValue,y:scaleValue});
    $scope.draw();
  };

  $scope.setLabelText = function(labelText) {
  if ($scope.activeStageElement === null) {
      return;
    }

   var textObject = $scope.activeStageElement.getText();
        textObject.setText(labelText);
        $scope.draw();
  };

  $scope.setActiveLabelColor = function() {
      if ($scope.activeStageElement === null) {
      return;
    }

    $scope.activeStageElement.fill('green');
  };

   /*
  * Nur für Labels
  */
  $scope.setColor = function(color) {
    if ($scope.activeStageElement === null) {
      return;
    }

    var textObject = $scope.activeStageElement.getText();
    textObject.fill(color);
    $scope.draw();
  };






    






    

}]);