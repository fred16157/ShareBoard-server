const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');
const salt = require('../config.json').salt;

router.get('/register', (req, res) => {
    res.render('register', { failed: req.query.failed, success: req.query.success });
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body; 

    if(await User.findOne({username: username}).exec()) return res.redirect('/register?failed=exists');
    await new User({username, password: encryptPass(password)}).save();
    return res.redirect('/register?success=true');
});

function encryptPass(pass) {
    return crypto.pbkdf2Sync(pass, salt, 100000, 64, 'sha256').toString('base64');
}

module.exports = router;