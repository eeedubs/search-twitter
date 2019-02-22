import React, { Component } from 'react';
import './styles/app.scss';

class Tweets extends Component {

  render(){
    return (
      <div className="tweet">
        <p>@{this.props.tweet.user.screen_name}: "{this.props.tweet.text}"</p><br/>
        <p>Date posted: {this.props.tweet.created_at}</p>
      </div>
    )
  }
}

export default Tweets;