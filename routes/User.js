const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send('You are connected to API for users.');
})

router.get('/register', (req,res)=>{
    res.send('API to register new user.');
})

module.exports = router;