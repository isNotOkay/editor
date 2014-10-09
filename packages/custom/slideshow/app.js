'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Slideshow = new Module('slideshow');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Slideshow.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Slideshow.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Slideshow.menus.add({
    title: 'slideshow example page',
    link: 'slideshow example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Slideshow.aggregateAsset('css', 'slideshow.css');
  Slideshow.aggregateAsset('css', 'color-palette.css');
  Slideshow.aggregateAsset('css', 'scrollable-slide-list.css');
  Slideshow.aggregateAsset('css', 'action-bar.css');
  Slideshow.aggregateAsset('js', 'kinetic-v5.1.0.min.js', {global:true});

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Slideshow.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Slideshow.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Slideshow.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Slideshow;
});
