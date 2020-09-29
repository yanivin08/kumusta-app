const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.send('API for chat.');
})

router.get('/activeusers', (req,res)=>{
    res.send('List all active users.');
})

module.exports = router;