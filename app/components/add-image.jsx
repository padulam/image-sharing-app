import React from 'react';
import {browserHistory} from 'react-router';
import ajaxFunctions from '../common/ajax-functions';

export default class AddImage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {url: undefined, description: undefined};

    this._addImage = this._addImage.bind(this);
    this._handleUrlChange = this._handleUrlChange.bind(this);
    this._handleDescChange = this._handleDescChange.bind(this);
  }

  _addImage(e){
    let appUrl = window.location.origin;
    let apiUrl = appUrl + '/api/images';
    let imageData = {url: this.state.url, description: this.state.description};
    e.preventDefault();

    ajaxFunctions.ajaxRequest('POST', apiUrl, function(data){
      browserHistory.push('/');
    }, imageData);
  }

  _handleUrlChange(){
    this.setState({url: this._url.value});
  }

  _handleDescChange(){
    this.setState({description: this._description.value});
  }

  render(){
    return (
      <div className="container image-container">
        <div className="jumbotron image-jumbo">
          <h1 id="addImageTitle">Add Image</h1>
          <form method="post" onSubmit={this._addImage}>
            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input onChange={this._handleUrlChange} type="text" ref={v => this._url = v} name="imageUrl" className="form-control" id="imageUrl"/>
            </div>
            <div className="form-group">
            <label htmlFor="imageDescription">Image description</label>
              <input type="text" onChange={this._handleDescChange} ref={v => this._description = v} name="imageDescription" className="form-control" id="imageDescription"/>
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}