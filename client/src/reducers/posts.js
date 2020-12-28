import {CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes.js';

// **** Reducer function changes the state of an application
//If the application’s state is managed by Redux, the changes 
//happen inside a reducer function — this is the only place where state changes happen.
// The reducer function makes use of the initial state of the application and something called action,
// to determine what the new state will look like.

//Reducers are functions that take the current state and an action as arguments, and return a new state result. 
// Reducers DO NOT update the current state, they create a copy and modify it to create a new state
//@param 1 :: current_state_of_Posts - current state from Redux store
//       2 :: action - data which needs to be updated 
const reducer = (current_state_of_Posts = [] , action) => {  // here current state is denoted by posts which is an array
    switch (action.type) {
        case UPDATE:
            console.log('Inside reducer switch case - UPDATE');
            //Using map loop through all posts and check if the id of any post matches the id of the action payload after it has been updated
            // If the id exists then return the action payload ie the updated post which in turn is a replacement of its previous state
            // for all other posts which have not been updated, return the posts as it is
            // array.map() returns a new array, so the old array with old post will be replaced with the new array containing the updated post
            // since reducer will create a new state in Redux store, it will use the existing data from the array 
            // but replace the post having action.payload._id with the data from action.payload, hence a new state will be created in Redux store
            console.log('Inside reducer switch case - UPDATE, posts array contains... ', current_state_of_Posts);
            console.log('Inside reducer switch case - UPDATE, action.payload ', action.payload);
            return current_state_of_Posts.map((post) => post._id === action.payload._id ? action.payload : post)            

        case FETCH_ALL:
            console.log('Inside reducer switch case - FETCH_ALL');
            return action.payload;

        case CREATE:
            console.log('Inside reducer switch case - CREATE');
            return [ ...current_state_of_Posts, action.payload];

        case DELETE:
            console.log('Inside reducer switch case - DELETE');
            console.log('Inside reducer switch case - DELETE, posts array contains... ', current_state_of_Posts);
            console.log('Inside reducer switch case - DELETE, action.payload ', action.payload);
            // use array.filter() to loop thorugh the array but not select(!==) the post which has the id which you want to delete
            // since reducer will create a new state in Redux store, it will not have the above id and hence this post will be deleted
            return current_state_of_Posts.filter((post) => post._id !== action.payload);            
        
        default:
            return current_state_of_Posts; // return the current state if no action is performed that is no posts have been created/modified/deleted
    }

}

export default reducer;