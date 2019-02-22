This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project follows [Alexander Leon's tutorial](https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa) for implementing Google and Twitter authentication. 

Search-Twitter
=====================

Search-Twitter is a simple React.js application which employs Twitter and Google APIs for authentication. Once authenticated, users can enter a query in an input field to search for the 20 most recent tweets which match the query.

## Screenshots

!![Authentication Screen]()


### Dependencies

* React.js
* React-DOM
* React Twitter Auth
* React Google Login
* Express
* node-sass
* Passport
* Passport-Google-Token
* Passport-Twitter-Token
* Twitter API

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies in both ./app and ./backend using the `npm install` command.
3. Create applications for [Twitter](https://developer.twitter.com/en/apps) and [Google](https://console.developers.google.com/). Details for creating these and obtaining the necessary authentication IDs, keys and secrets can be found [here](https://medium.com/@alexanderleon/implement-social-authentication-with-react-restful-api-9b44f4714fa).
4. Rename './app/src/newENV.js' to 'env.js' and fill in the fields accordingly.
5. Rename './backend/copy.env' to '.env' and fill in the fields accordingly.
6. Navigate to the ./app directory and start the web server using the `npm start` command. The app will be served at <http://localhost:3000/>.
7. Navigate to the ./backend directory and run the commands `mongod` and `npm start` using two terminal windows. You should have three terminal windows open while running this project.
8. Go to <http://localhost:3000/> in your browser.

## Limitations

1. You cannot use the same e-mail address to log in with both Twitter and Google. This application only supports one authentication method per e-mail address. 