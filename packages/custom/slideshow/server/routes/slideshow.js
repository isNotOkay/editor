'use strict';

// The Package is past automatically as first parameter
module.exports = function(Slideshow, app, auth, database) {

  app.get('/slideshow/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/slideshow/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/slideshow/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/slideshow/example/render', function(req, res, next) {
    Slideshow.render('index', {
      package: 'slideshow'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
