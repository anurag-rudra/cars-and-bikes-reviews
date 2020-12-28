//file for App Component. App Component is the main component in React which acts as a container for all other components
// In this app, App is the Parent of Form and Posts child components. Post is the child of Posts.

// import objects from other standard modules and libraries
import React, { useState, useEffect } from 'react'; // useState is the hook for the current state 
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'; 
import { useDispatch } from 'react-redux'; // helps to dispatch an action 

// import objects from other modules which aree part of this project
import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts.js';
import Form from './components/Form/Form.js';
import memories from './images/Web_logo.jpg';
import useStyles from './styles'; // import the styles resource makeStyles from the styles.js file 

const App = () => {
    // useState hook returns 2 values ie current state -"currentId" and a function that updates it -"setCurrentId"
    // currentId is set to null using useState at the initial stage when the data is not uploaded in the MongoDB
    // setCurrentId is used for the first time in ./Posts/Post/Post.js , tag <button className={classes.overlay2}>
    const [currentId, setCurrentId] = useState(null); 

    const classes = useStyles(); 

    // useDispatch hook returns a reference to the dispatch method within the Redux store and this is used to 
    // dispatch actions - createPost, updatePost etc in ./actions/posts.js
    const dispatch = useDispatch();  

    // useEffect is a react hook and is used here for the 'effect' to populate the values of the Post component 
    // that is all posts are fetched from MongoDb, when the Submit button is clicked or page is refreshed. 
    // @param1 - () ---> is the callback arrow function which calls the Redux store function dispatch()
    //       2 - [currentId, dispatch]---> is the dependency array. This array has two values - 'currentId', 'dispatch' which means the useEffect will be triggered for these two cases only.
    //                 This means if 'currentId' changes then trigger useEffect to populate the Posts component using getPosts()
    //                 If 'dispatch' function by any of the components - Form, Posts, Post
    // this useEffect is also called when the page is refreshed becasue the App component along with its choldren - Posts and Form are re-rendered
    useEffect(() => {
        console.log('Inside ./App.js useEffect........... calling getPosts()' )        
        dispatch(getPosts());   //getPosts() is an action function defined in the './actions/posts.js'
        console.log('Inside ./App.js - UseEffect currentId --> ',currentId)        
    }, [dispatch]);

    //@comment- note two properties have been defined in the child component Form - currentId & setCurrentId
    // These will be used as (props) in both Form and Posts components
    return (
        <Container maxWidth="md">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Cars & Bikes</Typography>
                <img className={classes.image} src={memories} alt="memories" height="100"/>                
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>

                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />                            
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

// export the App function from the App.JS module so that other modules can import it usig import statement
export default App; 