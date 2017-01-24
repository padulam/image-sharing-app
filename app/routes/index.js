module.exports = function(app, passport){
  var path = require('path');
  var dir = process.cwd();
  var bodyParser = require('body-parser');
  var jsonParser = bodyParser.json();
  var ImageSharingApi = require('../controllers/api/image-sharing-api.js');

  var imageSharingApi = new ImageSharingApi();

  function loggedIn(request, response, next){
    if(request.user!==undefined){
      return next();
    } else{
      response.redirect('/')
    }
  }

  app.get('/', function(request, response){
    response.sendFile(path.resolve(dir, 'public', 'index.html'));
  });

  app.route('/logout')
    .get(function(request, response){
      request.logout();
      response.redirect('/');
    });

  app.route('/api/user/:id')
    .get(function(request, response){
      response.json(request.user||null);
    });

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/',
      failureFlash: true
    }));

  app.route('/api/images')
    .post(jsonParser, imageSharingApi.addImage)
    .get(imageSharingApi.getImages);

  app.delete('/api/images/:image_id', imageSharingApi.removeImage);

  app.get('/api/userimages', imageSharingApi.getUsersImages);
};