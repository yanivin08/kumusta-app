const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
<<<<<<< HEAD
const bcrypt = require('bcryptjs');
const saltRounds = 10;
=======
const { create_access_token, refresh_access_token } = require('../api/tokens');
>>>>>>> 20d08fddcb9bb5945eadd6696ad170fbd170e7f0

const User = require('../models/user');
const { update } = require('../models/user');

router.get('/', (req, res)=>{
    res.send('You are connected to API for users.');
});

router.get('/welcome', (req,res)=>{
    res.send('Welcome message from user api.');
<<<<<<< HEAD
})

router.get('/home', (req, res) => {
    res.send('Home page');
})

router.post('/register', (req,res)=>{
=======
});
>>>>>>> 20d08fddcb9bb5945eadd6696ad170fbd170e7f0

router.post('/register', (req, res)=>{
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
<<<<<<< HEAD
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
=======
router.post('/login', async (req, res) => {
    try{
        const { name, password } = req.body;

        User.findOne({ name })
            .then(async (user) => {
                if(user){
                    const valid = await bcrypt.compare(password, user.password);
                    if(valid) {
                        console.log(`User ${user.name} is logged in`);

                        const accessToken = create_access_token(name);
                        const refreshToken = refresh_access_token(name);

                        user.is_logged = true;
                        user.access_token = accessToken;
                        user.refresh_token = refreshToken;
                        await user.save()
                            .then(user => {
                                res.send({
                                    success: true,
                                    msg: `Welcome, ${user.name}`
                                });
                                // res.redirect('./homepage');
                                // Redirect not working?
                            });
                    } else {
                        res.send({
                            success: false,
                            msg: 'Incorrect password!'
                        });
                    }
                } else {
                    res.send({
                        success: false,
                        msg: `User ${name} doesn't exist`
                    })
                }
            });
    } catch(err) {
        res.send({
            success: false,
            msg: err.message
        });
    }

});
>>>>>>> 20d08fddcb9bb5945eadd6696ad170fbd170e7f0

module.exports = router;