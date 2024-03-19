// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize express app
const app = express();

// Configure express app
app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors()); // enable CORS

// Define port
const port = 3002;


const infoSchema = new mongoose.Schema({
    FirstName:String,
    LastName:String,
    Company:String,
    Email:String,
    Password:String

});

const Info = mongoose.model('Info', infoSchema);

// ===========================================================================



app.post('/create-info', async (req, res) => {

    try {
        const info = new Info({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Company: req.body.Company,
            Email:req.body.Email,
            Password:req.body.Password
        });
        console.log("info--->", info);
        await info.save();
        res.status(201).send(info);
    } catch (err) {
        res.status(400).send(err);
    }
});




async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/UserDB');
        console.log("Connected to MongoDB successfullyyyy");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}

main()


app.listen(port, () => {console.log(`Example app listening on port ${port}`)})
