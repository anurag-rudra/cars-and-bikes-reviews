// this is the main file which connects React App to the index.html file

import React from 'react';
import ReactDOM from 'react-dom';
// Provider is a handle for the current state of the React app stored in Redux state store
// it helps to access the state from any of the components within the DOM - App, Form, Posts, Post
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware, compose } from 'redux';

// Redux Thunk is middleware that allows you to return functions, rather than just actions, within Redux
// One of the main use cases for this middleware is for handling actions that might not be synchronous, for example, 
//using axios to send a GET request. Redux Thunk allows us to dispatch those actions asynchronously and resolve each 
// promise that gets returned.
import thunk from 'redux-thunk';

import App from './App'; //App Component is the main component in React which acts as a container for all other components
import './index.css';


import reducers from './reducers/index.js'; //import the reducer specific to this app, reducers update the Redux state store

//A store is an immutable object tree in Redux. 
//A store is a state container which holds the application’s state. 
//Redux can have only a single store in your application. Whenever a store is created in Redux, you need to specify the reducer.
// reducer is the function which returns the next state of app.
const state_store = createStore(reducers, compose(applyMiddleware(thunk))); //this is the store which will contain current state

//React renders HTML to the web page using below statement
//here root corresponds to the DIV tag within App component(App.JS) which is the container within which all other components will be built
// react-redux 's Provider component makes the entire redux store 'state_store' available to the components in the hierarchy in this case App and it's children
ReactDOM.render(
    <Provider store = {state_store}>
        <App />
    </Provider>
    , document.getElementById('root')); 