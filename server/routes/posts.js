//this file will be used to receive HTTP requests for all REST API end-points with suffic as /posts defined in the index.js
import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';


const router = express.Router(); // use the Router method within the express object to create a new router instance

console.log(`Inside routes/posts.js...... `);

//here the (func_name) specifies the callback function for every aync call from REACT App, the func_name is defined in /controllers/posts.js
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost); // patch is used to modify data and here :id is a variable and will contain the id of the post we want to modify
router.delete('/:id', deletePost); // delete is used to delete data and here :id is a variable and will contain the id of the post we want to delete
router.patch('/:id/likePost', likePost); // patch is used to modify data and here :id is a variable and will contain the id of the post we want to like or increase the count of likes


// export the App function from the App.JS module so that other modules can import it usig import statement
export default router;