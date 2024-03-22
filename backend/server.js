// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user-routes');

// Initialize express app
const app = express();

// Configure express app
app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); // enable CORS

//Define port
const port = process.env.PORT || 3002;

async function main() {
    try {
        // establish a connection to the MongoDb database using Mongoosew
        await mongoose.connect('mongodb://localhost:27017/todo-app');
        console.log("Connected to MongoDB successfullyyyy");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}

main();
app.use('/user', userRoutes);
app.use('/todo', userRoutes);

//req listen garney
app.listen(port, () => { console.log(`Example app listening on port ${port}`); })
