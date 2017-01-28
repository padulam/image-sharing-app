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

  this.getUsersImages = function(request, response){
    Images.find({"owner.username": request.user.twitter.username}, function(err, images){
      if(err) response.json({error: err});

      response.json(images);
    });
  };

  this.likeImage = function(request, response){
    Images.findById(request.params.image_id, function(err, image){
      if(err) response.json({error: err});

      var likeLoc = image.likes.indexOf(request.user.twitter.username);
      
      if(likeLoc > -1){
        image.likes.splice(likeLoc, 1);
      } else{
        image.likes.push(request.user.twitter.username);
      }

      image.save(function(err){
        if(err) response.json({error: err});

        self.getImages(request, response);
      });
    });
  };
}

module.exports = ImageSharingApi;