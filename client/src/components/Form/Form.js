// This file contains the component which appears on the right side of the page 
// which is used to upload files to the MongoDB 

//useState is a Hook that lets you add React state to function components
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import useStyles from './styles'; // import the styles resource makeStyles from the styles.js file
import { useSelector } from 'react-redux'; // useSelector helps to provide access to the state information using Redux session store

import { createPost, updatePost } from '../../actions/posts'; // import the createPost action function

// currentId, setCurrentId are (props) defined in the parent component App, similarly they have been consumed in Post.js also
// setCurrentId is a setter method to update the id of a post
// both the props are input params to the arrow function
const Form = ({ currentId, setCurrentId }) => {
    console.log('Inside ./Form/Form.js............');
    if (currentId){
        console.log('Inside ./Form/Form.js, Form called by a Post update, currentId ', currentId);        
    } else {
        console.log('Inside ./Form/Form.js, Fresh blank Form rendered in tha page with fields having null values');        
    }
    // useState hook returns 2 values current state -"postData" and a function that updates it -"setPostData"
    // postData is set to null using useState at the initial stage when the data is not uploaded in the MongoDB
    const  [postData, setPostData] = useState ( { 
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''        
    });

    // useSelector is a react-redux hook which allows you to extract data from the Redux store state, using a selector function.
    // here state is the selector function which receives the state of Redux store as an argument 
    // from this store, posts is fetched using state."posts"
    // useSelector re-renders a component if it's properties change and hence useEffect is called
    // clicking on '...' in an existing post is triggering the setCurrentId method which in turn is changing the state of a Form from null to this currentId.
    // then useSelector is re-rendering the Form using the value of the Post and using 'useEffect' hook
    const post = useSelector((state) => 
    currentId ? state.posts.find((posts_iterator) => posts_iterator._id === currentId) : null);  
    console.log('Inside ./Form/Form.js.....Post data from Redux store => ',post);

    
    // useEffect is a react hook and helps to populate the values of the form once a post is clicked for update
    // so here 'effect' is to populate the values of the form, when the '...' is clicked on top of an existing post, using the details of the post
    // when the '...' button is clicked on a post, it triggers the useEffect hook
    // @param1 - () ---> is the callback arrow function
    //       2 - [post]---> is the dependency array. This array has only one value which is 'post'.
    //                 This means if 'post' object changes then trigger useEffect to populate the Form fields wth Post data when the Form component is rendered.
    useEffect(() => {
        if(post) setPostData(post); // if useEffect is called due to '...' button click on a Post, then use setPostData to update the current state of postData using the value of Post which is retirved from the Redux state store
        console.log('Inside ./Form/Form.js - UseEffect function ')
        console.log('Inside ./Form/Form.js - UseEffect function Post data from Redux store  => ',post)
        console.log('Inside ./Form/Form.js - UseEffect function postData contains  => ',postData)
    }, [post])

    const classes = useStyles(); //define an object of type useStyles
    const dispatch = useDispatch(); // useDispatch hook returns a reference to the dispatch function from the Redux store and this is used to dispatch actions - createPost, updatePost etc in ./actions/posts.js


    // handleSubmit function is called below in the Paper tag 'onSubmit' ie when Submit button is clicked on the page
    const handleSubmit = (e) => {
        e.preventDefault();  // to prevent browser refresh when the submit is clicked bcz the submitted data will be lost before being parsed by the REST API

        // if the post exists ie it has a current id then update it 
        // currentId - is the input parameter to this arrow function, scroll up to check line const Form....
        if (currentId) {
            console.log('Inside ./Form/Form.js - handleSubmit - post exists ')
            dispatch(updatePost(currentId, postData)); // this calls the updatePost method defined in actions
        } else{
            console.log('Inside ./Form/Form.js - handleSubmit - new post')
            dispatch(createPost(postData)); // this calls the createPost method defined in actions
        }
        clear();
    }
    // clear function is called below in the Button tag 'onClick' ie when Clear button is clicked on the page
    const clear = () => {
        setCurrentId(null); // update the id of the Form component to null
        setPostData ({   // set the fields of the Form component to null
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''        
        });
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Edit this' : 'Create a' } post</Typography>        
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth
                    value={postData.creator}  //postData is an object within the state in which the post data that is the submitted data will be stored                
                    onChange={(e)  => setPostData({ ...postData, creator: e.target.value })} 
                    // in the above line e is the event which triggers onChange that is the submission of data
                    // ... postData helps to ensure that only the creator field is updated and the rest of the fields are not updated whenever setPostdata funciton is called
                />
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth
                    value={postData.title}  //postData is an object within the state in which the post data that is the submitted data will be stored                
                    onChange={(e)  => setPostData({ ...postData, title: e.target.value })} 
                    // in the above line e is the event which triggers onChange that is the submission of data
                    // ... postData helps to ensure that only the creator field is updated and the rest of the fields are not updated whenever setPostdata funciton is called
                />
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth
                    value={postData.message}  //postData is an object within the state in which the post data that is the submitted data will be stored                
                    onChange={(e)  => setPostData({ ...postData, message: e.target.value })} 
                    // in the above line e is the event which triggers onChange that is the submission of data
                    // ... postData helps to ensure that only the creator field is updated and the rest of the fields are not updated whenever setPostdata funciton is called
                />
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth
                    value={postData.tags}  //postData is an object within the state in which the post data that is the submitted data will be stored                
                    onChange={(e)  => setPostData({ ...postData, tags: e.target.value.split(',') })} 
                    // in the above line e is the event which triggers onChange that is the submission of data
                    // ... postData helps to ensure that only the creator field is updated and the rest of the fields are not updated whenever setPostdata funciton is called
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })} //here base64 is the image file after conversion
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" onSubmit={handleSubmit} fullwidth="true">
                    Submit
                </Button>
                <Button className={classes.buttonClear} variant="contained" color="secondary" size="small" onClick={clear} fullwidth="true">
                    Clear
                </Button>
            </form>
        </Paper>        
    );
}

export default Form;