import { combineReducers } from 'redux';
import posts from './posts';

// mention all the reducers below
// reducer is a state management concept in Javascript
// reducer is a function which takes two arguments - current state and action and retruns based on both arguments a new state
export default combineReducers({
    // left-side posts here is a reducer which will create a new post which means state will change
    // right-side posts is the handle to the current state of posts imported from reducers/posts.js
     posts: posts, 
});