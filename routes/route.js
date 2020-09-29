const router = require('express').Router();
const user = require('../models/user');
const User = require('../models/user');

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

// Create user
router.post('/', async (req, res) => {
    const userObj = new User({
        username: req.body.username,
        password: req.body.password,
    });

    try {
        const newUser = await userObj.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});