const User = require('../models/user-models');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { password, firstname, lastname, email, company } = req.body;
        // Hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            firstName: firstname,
            lastName: lastname,
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

const login = async (req, res) => {
    const { username, password } = req.body;
    // Find the user
    const userDocument = await User.findOne({ username: username });
  
    if (!userDocument) {
      // User not found, handle the scenario here (e.g., return an error response).
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, userDocument.password);
    // const validPassword = await bcrypt.compare(sikshita123, sfdjlkfjlkfdsjldfsjfdjfd);
    
    if (!validPassword) return res.status(400).send('Invalid username or password');
  
    // Create tokens
    const accessToken = jwt.sign({ userId: userDocument._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: userDocument._id }, process.env.REFRESH_TOKEN_SECRET);
  
    // Update refresh token
    userDocument.refreshToken = refreshToken;
    await userDocument.save();
  
    // Send tokens
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.json({ accessToken });
}

module.exports = { createUser, login };
