const express = require('express');
const User = require('../models/User');
const crypto = require('crypto');
const salt = require('../config.json').salt;
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body; 
    if(await User.findOne({username: username}).exec()) return res.status(400).json({reason: "user_exists"});
    await new User({username, password: encryptPass(password)}).save();
    return res.json({success: 1});
});

function encryptPass(pass) {
    return crypto.pbkdf2Sync(pass, salt, 100000, 64, 'sha256').toString('base64');
}

module.exports = router;