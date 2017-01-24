var Images = require('../../models/images.js');
var Users = require('../../models/users.js');

function ImageSharingApi(){
  var self = this;

  this.addImage = function(request, response){
    var image = new Images();

    image.url = request.body.url;
    image.description = request.body.description;
    image.likes = [];
    image.owner = request.user.twitter;

    image.save(function(err){
      if(err) response.json({error: err});

      self.getImages(request, response);
    });
  };

  this.getImages = function(request, response){
    Images.find(function(err, images){
      if(err) response.json({error: err});

      response.json(images);
    });
  };

  this.removeImage = function(request, response){
    Images.remove({_id: request.params.image_id}, function(err, image){
      if(err) response.json({error: err});

      self.getImages(request, response);
    });
  };
}

module.exports = ImageSharingApi;