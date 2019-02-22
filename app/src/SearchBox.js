import React, { Component } from 'react';
import Results from './Results.js';
import './styles/app.scss';

class SearchBox extends Component {
  constructor(props){
    super(props)
    this.state = {
      query: "",
      searchResults: {},
      searched: false
    }
  }

  handleInputChange = event => {
    let query = event.target.value;
    this.setState({
      query: query
    })
  }

  clearQuery = () => {
    this.setState({
      query: "",
      searchResults: {},
      searched: false
    })
  }

  searchTweets = (event) => {
    event.preventDefault();
    let searchQuery = event.target[0].value; 
    console.log(searchQuery);
    this.clearQuery();
    fetch(`http://localhost:4000/tweets?search=${searchQuery}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "access-control-allow-origin": "localhost",
        "access-control-allow-credentials": "true"
      }
    })
    .then(response => response.json())
    .then((data, error) => {
      if (error){
        throw new Error("Error: ", error)
      } else {
        this.setState({
          searchResults: data.statuses,
          searched: true
        })
      }
    })
    .then(() => {
      console.log(this.state.searchResults);
    })
  }
  
  render(){
    return (
        <div style={{width: '100%'}}>
          <form onSubmit={this.searchTweets}>
            <input
              placeholder="Search for..."
              value={this.state.query}
              onChange={this.handleInputChange}
              className="search-field"
            />
          </form>
        <div className="search-results">
          <Results searchResults={this.state.searchResults} searched={this.state.searched} />
        </div>
      </div>
    )
  }
}

export default SearchBox;