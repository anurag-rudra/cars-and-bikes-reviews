// this file is the Child for Parent component Posts, ie an individual Post or Card in the web page is governed using this component

import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts'; // import the createPost action function

import useStyles from './styles'; // import the styles resource makeStyles from the styles.js file 

 // Post is a child component of parent Posts defined in /Posts/Posts.js - check the .map loop and then <Post>,
 // there are two input params - 
 // @param - 1. post - the 'post' array sent from the parent Posts
 //        - 2. setCurrentId - the setter method derived from Redux hook 'useState'.
 // within the loop 'post' has been defined as a props (property) of Post component
 // here the same property has been called using { post }. You can also use 'props'. { post } is the value of 'props'. 
 // { post } is an array consisting of the fields as defined in MongoDB database schema for each post
 // The concept above is PROPS in short for Property and is used to pass data from parent to child component
 // setCurrentId is (props) defined in the parent component App, then sent to Posts and then to it's child Post
 // setCurrentId is a setter method to update the id of a post
const Post = ({ post, setCurrentId }) => {  
    const classes = useStyles(); //define an object of type useStyles
    console.log('Inside ./Posts/Post/Post.js............');
    //console.log('post.title............', post.title);  <-- Use only for debugging -->
    //console.log('post.title............', post.selectedFile); <-- Use only for debugging -->

    const dispatch = useDispatch(); // useDispatch hook returns a reference to the dispatch function from the Redux store and this is used to dispatch actions - createPost, updatePost etc in ./actions/posts.js

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} style={{height: 0, paddingTop: '56.25%'}} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button 
                    style={{color: 'white'}} 
                    size="small" 
                    onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>                
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>            
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button color="primary" size="small" justifyContent="space-between" onClick={() => dispatch(likePost(post._id)) }>
                    <ThumbUpAltIcon fontSize="small" /> 
                    &nbsp; Like &nbsp;
                    {post.likeCount}
                </Button>
                <Button color="primary" size="small" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" /> 
                    &nbsp;Delete &nbsp;
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;