import React from 'react';

export default class AddImage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {url: undefined, description: undefined};

    this._handleUrlChange = this._handleUrlChange.bind(this);
    this._handleDescChange = this._handleDescChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e){
    e.preventDefault();
    this.props.addImage(this.state.url, this.state.description);
    this._url.value = "";
    this._description.value = "";
    this.setState({url: "", description: ""});
  }

  _handleUrlChange(){
    this.setState({url: this._url.value});
  }

  _handleDescChange(){
    this.setState({description: this._description.value});
  }

  render(){
    return (
      <form method="post" onSubmit={this._handleSubmit} className="navbar-form navbar-left">
        <div className="form-group">
          <label htmlFor="imageUrl" className="sr-only">Image URL</label>
          <input onChange={this._handleUrlChange} type="text" ref={v => this._url = v} name="imageUrl" className="form-control" id="imageUrl" placeholder="Image URL"/>
        </div>
        <div className="form-group">
        <label htmlFor="imageDescription" className="sr-only">Image description</label>
          <input type="text" onChange={this._handleDescChange} ref={v => this._description = v} name="imageDescription" className="form-control" id="imageDescription" placeholder="Image description"/>
        </div>
        <button className="btn btn-default" type="submit">Submit</button>
      </form>
    );
  }
}