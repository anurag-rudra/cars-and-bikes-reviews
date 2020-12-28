import mongoose from 'mongoose';

// define the schema or data model of each object in the MongoDb database
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema); // assign the schema postSchema to the model PostMessage

// export the PostMessage model so that other modules can import it usig import statement and then use it's methods and properties
export default PostMessage;