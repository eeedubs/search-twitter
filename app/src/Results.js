import React, { Component } from 'react';
import Tweet from './Tweet.js';
import './styles/app.scss';

class Results extends Component {
  constructor(props){
    super(props)
    this.state = {
      searched: false
    }
  }

  render(){
    return (
      this.props.searched ? (
        <div className="tweet-container">
          { this.props.searchResults.map((tweet, index) => {
            return ( <Tweet tweet={tweet} key={index}/> )
          })}
        </div>
      ) : (
        null
      )
    )
  }
}

export default Results;