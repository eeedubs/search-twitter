import React, { Component } from 'react';
import './styles/app.scss';
import TwitterLogin from 'react-twitter-auth';
import { GoogleLogin } from 'react-google-login';
import SearchBox from './SearchBox';

import ENV from './env.js';

class App extends Component {

  constructor(){
    super();
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ENV.twitterBearerToken
    };
  }

  twitterResponse = (response) => {
    console.log("Successful twitter authentication!");
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({
          isAuthenticated: true,
          user,
          token
        })
      }
    });
  };

  googleResponse = (response) => {
    console.log("Successful google authentication!");
    const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type: 'application/json'});
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
    };
    fetch('http://localhost:4000/api/v1/auth/google',options)
    .then(r => {
      const token = r.headers.get('x-auth-token');
      r.json()
      .then(user => {
        if (token) {
          this.setState({
            isAuthenticated: true,
            user,
            token
          })
        }
      });
    })
  };

  onFailed = (error) => {
    console.log("Authentication failed.");
    // alert(error);
  };

  logout = () => {
    this.setState({
      isAuthenticated: false,
      token: '',
      user: null
    })
  };

  render() {
    let content = !!this.state.isAuthenticated ? (
      <div className="authenticated-app">
        <div className="search-container">
          <SearchBox />
        </div>
        <div className="credentials">
          <div>
            <p>Authenticated as {this.state.user.email}</p>
          </div>
          <div>
            <button onClick={this.logout} className="logout-button" >
            Log out
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="socialAuth">
        <div>
          <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
                    onFailure={this.onFailed}
                    onSuccess={this.twitterResponse}
                    requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px", borderRadius: 3}}
                    showIcon={true}
                    className="twitter" />
          <GoogleLogin
                    clientId={ENV.googleClientID}
                    buttonText="Login"
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailed}
                    className="google" />
        </div>
      </div>
    );
    return (
      <main className="app">
        {content}
      </main>
    );
  }
}

export default App;
