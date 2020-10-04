const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const User = require('../models/User');

router.get('/', (req,res)=>{
    res.send('You are connected to API for users.');
})

router.get('/welcome', (req,res)=>{
    res.send('Welcome message from user api.');
})

router.get('/home', (req, res) => {
    res.send('Home page');
})

router.post('/register', (req,res)=>{

    const { name, email, password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2){
        res.send({
            success: false,
            msg: 'Please fill in all fields' 
        });
    }

    if(password !== password2){
        res.send({
            success: false,
            msg: 'Passwords did not match' 
        });
    }

    if(password.length < 6){
        res.send({
            success: false,
            msg: 'Password should be at least 6 characters' 
        });
    }
    
    //validation passed
    User.findOne({ email: email })
        .then(user => {
            if(user){
                //user exist
                res.send({
                    success: false,
                    msg: 'User already exists.',
                    err_data: errors
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //hash password
                bcrypt.genSalt(saltRounds, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //set password to hashed
                        newUser.password = hash;
                    })
                );

                //save user
                newUser.save()
                .then(user => {
                    res.send({
                        success: true,
                        msg: 'You are now successfully registered!'
                    })
                    res.redirect('./login')
                })
                .catch(err => console.log(err));
            }
        });

})


//POST REQUEST FOR LOGIN
router.post('/login', (req, res) => {
    User.findOne({name: req.body.name})
    .then(user => {
        // console.log(user);
        if (!user){
            res.send({
                success: false, 
                msg: "Username/Password is invalid."
            });
        }
        else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                console.log("result:", result);
                if ( result ) {
                    res.send({
                        success: true, 
                        msg: "Password accepted."
                    });
                    res.redirect('/home');
                }
                else {
                    res.send({
                        success: false, 
                        msg: "Username/Password is invalid."
                    });
                }
            })            
        }
    });
})

module.exports = router;