// This is the file which calls the REST APIs using AXIOS

import axios from 'axios'; // library to help make API calls

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);      // '() =>' this is an arrow function
export const createPost = (newPost) => axios.post(url, newPost); // here newPost is the input data which is the data submitted in a post
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost); // here updatedPost is the input data which is the post to be updated
export const deletePost = (id) => axios.delete(`${url}/${id}`); // here id is the input parameter which is used to determine which post to delete
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`); // here id is the input parameter which is used to determine which post to like