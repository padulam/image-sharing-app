import React from 'react';
import Masonry from 'react-masonry-component';

let masonryOpts = {
  transitionDuration: 1000,
  gutter: 15,
  fitWidth: true,
  isAnimated: true
}

const ImageGallery = (props) => {
  return(
    <Masonry className="image-gallery" elementType="ul" options={masonryOpts} updateOnEachImageLoad={true} disableImagesLoaded={false}>
      {props.images}
    </Masonry>
  );
};

export default ImageGallery;