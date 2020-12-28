// This is the Parent component Posts ie all Posts are governed from this file
// this file contains the logic and designie CSS, JS for all posts, logic and design 
// for each individual post same is captured in Posts/Post/Post.js

// import objects from standard modules
import React from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux'; // useSelector helps to provide access to the state information using Redux session store


// import objects from modules specific to the app
import Post from './Post/Post.js'
import useStyles from './styles'; // import the styles resource makeStyles from the styles.js file 

// setCurrentId is (props) defined in the parent component App, similarly it has been consumed in Form.js also3
// setCurrentId is a setter method to update the id of a post
const Posts = ({ setCurrentId }) => {
    console.log('Inside ./Posts/Posts.js............');
    
    const posts = useSelector((state) => state.posts);   // state."posts" is taken from the Reducers index.js and gives access to the global Redux store containing the state of the app
    console.log('Inside ./Posts/Posts.js - posts in the state store are',posts);

    const classes = useStyles(); //define an object of type useStyles

    

    //@comment in the inner Grid, xs is the size of grid for extra small devices, sm is for small and large devices
    //@comment - *** MAJOR activity***** in the line <Post post={post} /> 
    // 'Post' is the child component of parent Posts. 'post' on the left of equal sign is the property of this child component
    // '{post}' is the loop counter variable which holds the data of each post as the .map iterates
    // so in each iteration the 'post' property of child Post is assigned the data of each post.
    // This is then used in the './Post/Post.js'
    // another property sent from Parent Posts to child Post is setCurrentId
    // this way of data transfer among components can be avoided using Redux 
    return (
        !posts.length ? <div> <Typography variant="h3" color="Primary">You don't have any posts yet! </Typography> 
        <br></br><br></br><br></br>
        <Typography variant="h5" color="Tertiary"> Would you like to create a post?</Typography> 
        <Typography variant="h5" color="Tertiary"> Add details and click submit to create your first post now....</Typography>
        </div> 
        : (  //if-else block - if posts.length does not exist ie no posts exist then return CircularProgress else return the Grid block
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                { // posts.map is used to loop through all the current posts
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6}>  
                            <Post post={post} setCurrentId={setCurrentId} /> 
                        </Grid>
                    ))
                }
            </Grid>
        )
        
    );
}

export default Posts;