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
        
        // await user.save();
        // const Result = await user.save();
        // console.log("resultt ==>",Result);
        console.log("user ==>",user);
        const data= await user.save();
        console.log("data==>",data);

        res.status(201).send("User created succesfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error while creating user");
    }
};


module.exports = { createUser };
