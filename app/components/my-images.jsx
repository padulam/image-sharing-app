import React from 'react';
import ajaxFunctions from '../common/ajax-functions';
import ImageGallery from './image-gallery.jsx';
import Image from './image.jsx';

export default class MyImages extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {images: []};
  }

  componentDidMount() {
    this._fetchImages();
  }

  _likeImage(imageId){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/images/' + imageId;
    let self = this;

    ajaxFunctions.ajaxRequest('PUT', apiUrl, function(data){
      let images = JSON.parse(data);

      self.setState({images: images});
    });
  }

  _removeImage(imageId){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/images/' + imageId;
    let self = this;

    ajaxFunctions.ajaxRequest('DELETE', apiUrl, function(data){
      let images = JSON.parse(data);

      self.setState({images: images});
    });
  }

  _getImages(){
    return this.state.images.map((image) => {
      return <Image
                id = {image._id}
                url = {image.url}
                description = {image.description}
                owner = {image.owner}
                likes = {image.likes}
                likeImage = {this._likeImage.bind(this)}
                removeImage = {this._removeImage.bind(this)}
                key = {image._id} />
    });
  }

  _fetchImages(){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/userimages';
    let self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let images = JSON.parse(data);

      self.setState({images: images});
    }));
  }

  render(){
    let images = this._getImages();
    let myImageGalleryDisplay;

    if(this.state.images.length>0){
      myImageGalleryDisplay = <ImageGallery images={images} />;
    }

    return(
      <div className="container">
        {myImageGalleryDisplay}
      </div>
    );
  }
}