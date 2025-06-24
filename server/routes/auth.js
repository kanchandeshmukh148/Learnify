const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

// Register
router.post('/register', async (req, res) => {
    // Validate data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send('Email already exists');

    // Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        // Create token
        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
        res.header('auth-token', token).send({ token, user: savedUser });
    } catch (err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    // Validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email not found');

    // Check password
    const validPass = await user.comparePassword(req.body.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // Create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send({ token, user });
});

module.exports = router;