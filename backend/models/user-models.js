const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        require:true,
    },
    lastname:{
        type: String,
        require:true,
    },
    company:{
        type: String,
        optional: true,
    },
    email:{
        type: String,
        require:true,
    },
    password:{
        type: String,
        require:true,   
    },   
});

module.exports = mongoose.model('User', userSchema);
