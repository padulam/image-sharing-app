import React from 'react';

const Image = (props) => {
  const _handleImageError = (e) =>{
    e.target.src = "/images/placeholder.png";
  }
  
  const _handleLike = (e) =>{
    e.preventDefault();
    props.likeImage(props.id);
  }

  const _handleRemove = (e) =>{
    e.preventDefault();
    props.removeImage(props.id);
  }

  let removeImage;

  if(props.removeImage!==undefined){
    removeImage = <button className="btn btn-danger" id="removeButton" onClick={_handleRemove}>Remove</button>;
  }

  return(
    <li className="image-card">
      <img onError={_handleImageError} className="image-responsive" width="175"  src={props.url} alt={props.description}/>
      <div className="description-container">{props.description}</div>
      <div className="profile-pic-likes-container">
        <img height="25" width="25" src={props.owner.profileImage} alt="Profile Pic"/>
        {removeImage}
        <button className="likeBtn" onClick={_handleLike}>
          <i className={props.likes.indexOf(props.owner.username) > -1 ? "liked fa fa-heart" : "fa fa-heart"} aria-hidden="true"></i> {props.likes.length}
        </button>
      </div>
    </li>
  );
};

export default Image;