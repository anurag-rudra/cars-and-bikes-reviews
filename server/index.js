import express from 'express';
import bodyParser from 'body-parser'; //parse the incoming HTTP request bodies in body-parser middleware before you handle it in code
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // this library helps to import sensitive data into index.js

// postRoutes is the handle for the default asset exported from posts.js module which is the route object created in posts.js
import postRoutes from './routes/posts.js';
const app = express(); // express() function of the ExpressJS module used to create a new Express Object

try{
    //config reads your .env file, parses the contents, assigns it to process.env, 
    //and returns an Object with a parsed key containing the loaded content or an error key if it failed.
    const result = dotenv.config(); 
    console.log('.env file read and parsed....', result.parsed);
} catch (error){
    console.log('Error while reading .env file.....', error);
}
//dotenv.config();

//***** start of the section for the configuration needed by the express App object

//body-parser is needed only for POST and PUT requests??
//@param - limit controls the maximum request body size. If this is a number, then the value specifies the number of bytes
//@param - extended = true implies that the incoming HTTP request body will be parsed using  qs library and NOT using querystring library
// qs library allows nested object eg { person: { name: 'bobby', age: '3' } }
app.use(bodyParser.json({ limit: "30mb", extended:true })); //used if incoming request is JSON object
//urlencoded means eg how a GET query is formatted - 
//urlencoded?firstname=sid slayer&lastname=sloth when formatted using urlencoded will look like firstname=sid%20slayer&lastname=sloth
//addition of %20 to denote space is urlencoding
app.use(bodyParser.urlencoded({ limit: "30mb", extended:true })); //used if incoming request is string or arrays
app.use(cors()); // helps cross domain rest api calls e.g from test.com to xyz.com

//***** */ start of the section for REST API endpoints
app.use('/posts', postRoutes); // if the REST API call URL contains suffix /posts then route it to the module posts.js via the handle postRoutes


//***** start of the section for the database configuration 

//create a connection string to connect to MongoDB
const CONNECTION_URL = process.env.CONNECTION_URL;
//console.log('CONNECTION_URL..............', CONNECTION_URL);

//port on which the NodeJS server endpoint will listen for incoming HTTP requests
const PORT = process.env.PORT;
console.log('PORT..............', PORT);
console.log('type of PORT..............', typeof PORT);

//establish a connection with Mongoose DB
// if DB connection is sucessful then(.then()) let the Express App object listen on port 5000
// if DB connection fails, then(.catch()) display error message in console
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }) // useNewUrlParser & useUnifiedTopology values ensure no warnings in the console
    .then(() => 
        app.listen(PORT, () => console.log(`Server listening on port: ${PORT} `))
    ).catch((error) => console.log('Error while connecting to the MongoDb database', error));

mongoose.set('useFindAndModify', false); // ensures no warnings in the console





