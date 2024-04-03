const User = require('../models/user-models');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    
    try {
        console.log(req.body);
        const { firstname, lastname, company,email , password} = req.body;


        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            firstname: firstname,
            lastname: lastname,
            company: company,
            email: email,
            password: hashedPassword
        });
        
        await user.save();
        res.status(201).send("User created succesfully");
    } catch (err) {
        res.status(500).send("Error while creating user");
    }
};


module.exports = { createUser };
