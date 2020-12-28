import mongoose from "mongoose";
import PostMessage from '../models/postMessage.js' // import the model which is the linked to the proper mongoDb schema

// this file stores the logic for all the callback functions that are called from the 
// routes in routes/posts.js

// this function is called by router.get('/'), so export it after defining it 
export const getPosts = async (req, res) => {  // make this callback func async because PostMessage.find() will take time to find all postmessages
    try {
        console.log(`Inside getPosts...... `);
        const postMessages = await PostMessage.find();
        //console.log(postMessages);
        console.log('Posts fetched successfully......');
        // postMessages that is the actual dataa is returned to actions/posts.js/getPosts , DO NOT ADD any custom message in json()
        res.status(200).json(postMessages)
    } catch(error) {
        res.status(404).json({ message: error });
    }    
}

// this function is called by router.post('/', createPost), so export it after defining it 
export const createPost = async (req, res) => {
    const post = req.body;    

    const newPost = new PostMessage(post); // create a new MongoDb object 'newPost' using the HTTP request body 'post' and schema postM essage

    try {
        console.log(`Inside createPost...... `);
        await newPost.save();
        console.log('Post created successfully......');
        // newPost that is the actual dataa is returned to actions/posts.js/createPost , DO NOT ADD any custom message in json()
        res.status(201).json(newPost);
    } catch(error) {
        res.status(409).json({ message: 'Error while uploading Post......'+ error });
    } 
}

// this function is called by router.post('/', createPost), so export it after defining it 
export const updatePost = async (req, res) => {
    // here id property of the Post is renamed to _id. _id represents the id of the record in MongoDB
    // id is renamed to _id because in the UpdatePost route URL, the query param is id and not _id
    // so after the HTTP request is received the name id is changed to _id
    const { id: _id } = req.params; // const {} is a destructuring assigment as per Javascript ES6, this is a better way to retrieve values from an Object or Array. The value within { id } is the key using which its value is fetched from the object
    const post = req.body; // this will contain the changes which need to be done in the existing post

    try{
        console.log(`Inside updatePost...... `);

        // check if the id passsed in the REST API call actually exists in the MongoDB
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post found with that id');

        // if the post exists, update it
        // @input-param -  { ...post, _id} - Here ...post helps to provide access to each individual item and _id is the id of the object in MongoDB.
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true });
        console.log('Post modified succesfully......');
        // updatedPost that is the actual dataa is returned to actions/posts.js/updatePost , DO NOT ADD any custom message in json()
        res.status(202).json(updatedPost);      

    } catch(error) {
        console.log('Error while updating post......',error);
        res.status(555).json(error);
    }
}

export const deletePost = async (req, res) => {

    console.log(`Inside deletePost...... `);
    try{
        const { id: _id } = req.params; // const {} is a destructuring assigment as per Javascript ES6, this is a better way to retrieve values from an Object or Array. The value within { id } is the key using which its value is fetched from the object

        // check if the id passsed in the REST API call actually exists in the MongoDB
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post found with that id');
        await PostMessage.findByIdAndRemove(_id);
        console.log('Post deleted successfully......');
        res.json({ message : 'Post deleted successfully...'});
    } catch(error) {
        console.log('Error while deleting post....',error)
    }
}

export const likePost = async (req, res) => {
    console.log(`Inside likePost...... `);
    try{
        const { id: _id } = req.params; // const {} is a destructuring assigment as per Javascript ES6, this is a better way to retrieve values from an Object or Array. The value within { id } is the key using which its value is fetched from the object
        
        // check if the id passsed in the REST API call actually exists in the MongoDB
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post found with that id');

        // if the post exists, then retrieve it from MongoDB
        const post = await PostMessage.findById({ _id }); // use { _id } so that it is treated as an object
        console.log('Post found using id....', _id);
        console.log('Current count of likes for this post....', post.likeCount);

        // once the post is retrieved, increase its count of likes by 1
        // if only DB field has to be updated mention the field name as shown below for likeCount and assign the new value
        const updated_data = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true});

        console.log('Post liked successfully.  updated_data.likeCount is ......', updated_data.likeCount);
        // updatedPost that is the actual dataa is returned to actions/posts.js/likePost , DO NOT ADD any custom message in json()
        res.status(203).json(updated_data);
    } catch(error){
        console.log('Error while liking post....',error)
    }   
}