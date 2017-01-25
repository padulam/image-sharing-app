import React from 'react';
import {Link, browserHistory} from 'react-router';
import ajaxFunctions from '../common/ajax-functions';
import AddImage from './add-image.jsx';
import SignIn from './sign-in.jsx';
import SignOut from './sign-out.jsx';

export default class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      user: undefined, 
      images: []
    }

    this._AuthenticateTwitter = this._AuthenticateTwitter.bind(this);
  }

  _AuthenticateTwitter(){
    window.location = '/auth/twitter'
  }

  _DeauthenticateTwitter(){
    window.location = '/logout';
  }

  _GetUserData(){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/user/:id';
    let self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let userObject = JSON.parse(data);

      self.setState({user: userObject});
    }));
  }

  _fetchImages(){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/images';
    let self = this;

    ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function(data){
      let images = JSON.parse(data);

      self.setState({images: images});
    }));
  }

  _addImage(imageUrl, imageDesc){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/images';
    let self = this;
    let imageData = {url: imageUrl, description: imageDesc};

    ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      let images = JSON.parse(data);
      console.log(images);

      self.setState({images: images});
    }, imageData);
  }

  componentWillMount() {
    this._GetUserData();
    this._fetchImages();
  }

  render(){
    let addImage;
    let userProfile;
    let signIn;

    if(!this.state.user){
      signIn = <SignIn AuthenticateTwitter={this._AuthenticateTwitter}/>;
    }else{
      userProfile = (
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.state.user.twitter.displayName} <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><Link to="/my-images">My Images</Link></li>
            <li role="separator" className="divider"></li>
            <li className="text-center"><SignOut DeauthenticateTwitter={this._DeauthenticateTwitter} /></li>
            </ul>
          </li>);
      addImage = <AddImage addImage={this._addImage.bind(this)}/>;
    }

    return(
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#voting-app-navbar" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">ImageBoard <i className="fa fa-camera" aria-hidden="true"></i></Link>
            </div>
            <div className="collapse navbar-collapse" id="voting-app-navbar">
              <ul className="nav navbar-nav navbar-right">
                {addImage}
                {signIn||userProfile}
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}