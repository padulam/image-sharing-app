var Images = require('../../models/images.js');
var Users = require('../../models/users.js');

function ImageSharingApi(){
  this.addImage = function(request, response){
    var image = new Images();

    image.url = request.body.url;
    image.description = request.body.description;
    image.likes = [];
    image.owner = request.user.twitter;

    image.save(function(err){
      if(err) response.json({error: err});

      response.json(image);
    });
  };
}

module.exports = ImageSharingApi;