const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../models/user');

router.get('/', (req, res)=>{
    res.send('You are connected to API for users.');
});

router.get('/welcome', (req,res)=>{
    res.send('Welcome message from user api.');
});

router.post('/register', (req, res)=>{
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2){
        errors.push({ msg: 'Please fill in all fields' });
    }

    if(password !== password2){
        errors.push({ msg: 'Passwords do not match' });
    }

    if(password.length < 6){
        errors.push({ msg: 'Password should be at least 6 characters'})
    }

    if(errors.length > 0){
        // res.send('register', {
        //     errors,
        //     name,
        //     email,
        //     password,
        //     password2
        // });
        res.send({
            success: false,
            msg: "Error occurs, please try again.",
            err_data: errors
        })

    }else{
        //validation passed
        User.findOne({ email: email })
            .then(user => {
                if(user){
                    //user exist
                    errors.push({ msg: 'Email is already registered' })
                    res.send({
                        success: false,
                        msg: 'Email is already registered',
                        err_data: errors
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    //hash password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            //set password to hashed
                            newUser.password = hash;
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
                        })
                    );
                }
            });
    }

})


//POST REQUEST FOR LOGIN
router.post('/login', (req, res) => {
   
})

module.exports = router;