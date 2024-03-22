const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        // Hash password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(req.body.Password, salt);
        const user = new User({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Company: req.body.Company,
            Email: req.body.Email,
            Password: hashedPassword
        });
        console.log("user--->", user);
        await user.save();
        res.status(201).send("STORED");
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports={createUser};
