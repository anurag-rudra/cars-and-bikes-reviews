import * as api from '../api'; // import * helps to import all objects from api module at once
import {CREATE, UPDATE, DELETE, FETCH_ALL } from '../constants/actionTypes.js';

//action creators
export const getPosts = () => async (dispatch) => {
    try{
        // using dispatch instead of return like a normal function is possible due to Redux
        console.log('Inside actions/posts.js/getPosts......Calling api.fetchPosts()');
        const  { data } = await api.fetchPosts();
        console.log('Inside actions/posts.js/getPosts......api.fetchPosts() ends....');
        console.log('Inside actions/posts.js/getPosts......after querying in database data is ', data);   
        // action must have a type property which denotes the type of action - fetch all records, update records, delete records etc
        // payload is the array where all the posts to be fetched are stored        
        const action = { type: FETCH_ALL, payload: data } ;
        console.log('Inside actions/posts.js/getPosts, calling reducer action FETCH_ALL');
        dispatch(action);
           
    } catch(error){
        console.log('Error in actions/posts.js/getPosts ',error);
    }
};

// dispatch is a feature of Redux
export const createPost = (post) => async (dispatch) => {
    try{
        console.log('Inside actions/posts.js/createPost......Calling createPost(post)');
        const { data } = await api.createPost(post);
        console.log('Inside actions/posts.js/createPost......api.createPost(post) ends....');
        console.log('Inside actions/posts.js/createPost, after creation in database data is ', data); 
        console.log('Inside actions/posts.js/updatePost, calling reducer action CREATE'); 
        dispatch({ type: CREATE, payload: data });              
    } catch (error) {
        console.log('Error in actions/posts.js/createPost ',error);
    }
};


export const updatePost = (id, post) => async (dispatch) => {
    try{
        console.log('Inside actions/posts.js/updatePost......Calling updatePost(id, post)');
        const { data } = await api.updatePost(id, post); // data is the response returned by the server
        console.log('Inside actions/posts.js/updatePost......api.updatePost ends....');
        console.log('Inside actions/posts.js/updatePost, after modification in database data is ', data);
        console.log('Inside actions/posts.js/updatePost, calling reducer action UPDATE');
        dispatch({ type: UPDATE, payload: data }); 
        
    } catch (error) {
        console.log('Error in actions/posts.js/updatePost ',error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try{
        console.log('Inside actions/posts.js/deletePost......Calling deletePost(id)');
        await api.deletePost(id);
        console.log('Inside actions/posts.js/deletePost......api.deletePost ends....');
        console.log('Inside actions/posts.js/deletePost, after deletion in database.');
        console.log('Inside actions/posts.js/deletePost, calling reducer action DELETE.');
        dispatch({ type: DELETE, payload: id }); 
        
    } catch (error) {
        console.log('Error in actions/posts.js/deletePost',error);
    }
};

export const likePost = (id) => async(dispatch) => {

    try{
        console.log('Inside actions/posts.js/likePost......Calling likePost(id)');
        const { data } = await api.likePost(id);
        console.log('Inside actions/posts.js/likePost......api.likePost ends....');
        console.log('Inside actions/posts.js/likePost, after modification in database data is ', data);
        console.log('Inside actions/posts.js/likePost, calling reducer action UPDATE');
        // increasing the count of likes is also a case of UPDATE so use the same logic
        dispatch({ type: UPDATE, payload: data });
    } catch(error){
        console.log('Error in actions/posts.js/likePost',error);
    }
}